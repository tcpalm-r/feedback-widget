// src/app/api/webhook/asana/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, gidToStatus } from "@/lib/asana-sections";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

export async function POST(request: Request) {
  // --- Handshake: Asana sends X-Hook-Secret on initial registration ---
  const hookSecret = request.headers.get("x-hook-secret");
  if (hookSecret) {
    return new NextResponse(null, { status: 200, headers: { "X-Hook-Secret": hookSecret } });
  }

  let body: { events?: Array<Record<string, unknown>> };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const events = body.events || [];
  if (events.length === 0) return NextResponse.json({ ok: true });

  // Collect task GIDs from section_changed events.
  const taskGids = new Set<string>();
  for (const event of events) {
    const resource = event.resource as Record<string, unknown> | undefined;
    const parent = event.parent as Record<string, unknown> | undefined;
    if (resource?.resource_type === "story"
      && resource?.resource_subtype === "section_changed"
      && parent?.resource_type === "task"
      && parent?.gid) {
      taskGids.add(parent.gid as string);
    }
  }
  if (taskGids.size === 0) return NextResponse.json({ ok: true, processed: 0 });

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: feedbackItems } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status")
    .in("asana_task_gid", Array.from(taskGids));

  if (!feedbackItems?.length) return NextResponse.json({ ok: true, processed: 0, reason: "no matching feedback" });

  const appIds = [...new Set(feedbackItems.map((f) => f.app_id))];
  const { data: projects } = await supabase
    .from("projects").select("app_id, asana_project_id").in("app_id", appIds);

  const projectIdByApp = new Map<string, string>();
  for (const p of projects ?? []) {
    if (p.asana_project_id) projectIdByApp.set(p.app_id, p.asana_project_id as string);
  }

  // Fetch sections per project once.
  const mapByProject = new Map<string, Awaited<ReturnType<typeof buildSectionMap>> | undefined>();
  await Promise.allSettled(
    [...new Set(projectIdByApp.values())].map(async (pid) => {
      const res = await fetch(
        `https://app.asana.com/api/1.0/projects/${pid}/sections?opt_fields=name`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (!res.ok) return;
      const json = await res.json();
      mapByProject.set(pid, buildSectionMap(json.data ?? []));
    }),
  );

  let updated = 0;
  await Promise.allSettled(
    feedbackItems.map(async (item) => {
      const pid = projectIdByApp.get(item.app_id);
      const map = pid ? mapByProject.get(pid) : undefined;
      if (!map) return;

      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (!res.ok) return;
      const json = await res.json();
      const memberships = (json?.data?.memberships ?? []) as Array<{ section?: { gid?: string } }>;
      const sectionGid = memberships[0]?.section?.gid;
      if (!sectionGid) return;

      const newStatus = gidToStatus(map, sectionGid);
      if (!newStatus) return;
      if (newStatus === item.status) return;

      await supabase.from("feedback").update({ status: newStatus }).eq("id", item.id);
      updated++;
    }),
  );

  return NextResponse.json({ ok: true, processed: taskGids.size, updated });
}
