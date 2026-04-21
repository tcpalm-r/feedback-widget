import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

const RESOLVED_SECTION_KEYS = ["testing", "completed"];

/**
 * Asana webhook endpoint.
 *
 * Handles two things:
 * 1. Handshake — Asana sends X-Hook-Secret, we echo it back
 * 2. Events — section_changed stories trigger resolve/unresolve sync
 */
export async function POST(request: Request) {
  // --- Handshake: Asana sends X-Hook-Secret on initial registration ---
  const hookSecret = request.headers.get("x-hook-secret");
  if (hookSecret) {
    return new NextResponse(null, {
      status: 200,
      headers: { "X-Hook-Secret": hookSecret },
    });
  }

  // --- Event processing ---
  let body: { events?: Array<Record<string, unknown>> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const events = body.events || [];

  // Heartbeat — empty events array
  if (events.length === 0) {
    return NextResponse.json({ ok: true });
  }

  // Collect task GIDs from section_changed events
  const taskGids = new Set<string>();
  for (const event of events) {
    const resource = event.resource as Record<string, unknown> | undefined;
    const parent = event.parent as Record<string, unknown> | undefined;

    if (
      resource?.resource_type === "story" &&
      resource?.resource_subtype === "section_changed" &&
      parent?.resource_type === "task" &&
      parent?.gid
    ) {
      taskGids.add(parent.gid as string);
    }
  }

  if (taskGids.size === 0) {
    return NextResponse.json({ ok: true, processed: 0 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Look up feedback entries for these task GIDs
  const { data: feedbackItems } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, resolved")
    .in("asana_task_gid", Array.from(taskGids));

  if (!feedbackItems || feedbackItems.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, reason: "no matching feedback" });
  }

  // Get section mappings for relevant projects
  const appIds = [...new Set(feedbackItems.map((f) => f.app_id))];
  const { data: projects } = await supabase
    .from("projects")
    .select("app_id, asana_section_mapping")
    .in("app_id", appIds);

  const resolvedSections = new Set<string>();
  for (const project of projects || []) {
    const mapping = project.asana_section_mapping as Record<string, string>;
    if (!mapping) continue;
    for (const [key, gid] of Object.entries(mapping)) {
      if (RESOLVED_SECTION_KEYS.includes(key)) {
        resolvedSections.add(gid);
      }
    }
  }

  // Check each task's current section and sync
  let resolvedCount = 0;
  let unresolvedCount = 0;

  await Promise.allSettled(
    feedbackItems.map(async (item) => {
      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
        { headers: { Authorization: `Bearer ${asanaPat}` } }
      );
      if (!res.ok) return;

      const json = await res.json();
      const memberships = json?.data?.memberships || [];
      const inResolvedSection = memberships.some(
        (m: { section?: { gid?: string } }) =>
          resolvedSections.has(m?.section?.gid || "")
      );

      if (inResolvedSection && !item.resolved) {
        await supabase
          .from("feedback")
          .update({ resolved: true, status: "resolved" })
          .eq("id", item.id);
        resolvedCount++;
      } else if (!inResolvedSection && item.resolved) {
        await supabase
          .from("feedback")
          .update({ resolved: false, status: "triaged" })
          .eq("id", item.id);
        unresolvedCount++;
      }
    })
  );

  return NextResponse.json({
    ok: true,
    processed: taskGids.size,
    resolved: resolvedCount,
    unresolved: unresolvedCount,
  });
}
