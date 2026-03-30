import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

const RESOLVED_SECTION_KEYS = ["completed"];

interface ScreenshotElement {
  url: string;
  storagePath?: string;
  region?: { x: number; y: number; width: number; height: number };
  sizeBytes?: number;
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // --- SYNC 1: Resolve feedback when Asana tasks move to Completed/On Hold ---

  const { data: unresolvedItems, error: fetchError } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid")
    .eq("resolved", false)
    .not("asana_task_gid", "is", null);

  if (fetchError) {
    return NextResponse.json(
      { error: "Failed to fetch feedback", details: fetchError.message },
      { status: 500 }
    );
  }

  let resolvedCount = 0;

  if (unresolvedItems && unresolvedItems.length > 0) {
    const appIds = [...new Set(unresolvedItems.map((item) => item.app_id))];
    const { data: projects } = await supabase
      .from("projects")
      .select("app_id, asana_section_mapping")
      .in("app_id", appIds);

    const sectionToResolved = new Map<string, boolean>();
    for (const project of projects || []) {
      const mapping = project.asana_section_mapping as Record<string, string>;
      if (!mapping) continue;
      for (const [key, gid] of Object.entries(mapping)) {
        if (RESOLVED_SECTION_KEYS.includes(key)) {
          sectionToResolved.set(gid, true);
        }
      }
    }

    const toResolve: string[] = [];
    const batchSize = 25;
    for (let i = 0; i < unresolvedItems.length; i += batchSize) {
      const batch = unresolvedItems.slice(i, i + batchSize);
      await Promise.allSettled(
        batch.map(async (item) => {
          const res = await fetch(
            `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
            { headers: { Authorization: `Bearer ${asanaPat}` } }
          );
          if (!res.ok) return;
          const json = await res.json();
          const memberships = json?.data?.memberships || [];
          for (const m of memberships) {
            if (sectionToResolved.has(m?.section?.gid)) {
              toResolve.push(item.id);
              break;
            }
          }
        })
      );
    }

    if (toResolve.length > 0) {
      await supabase
        .from("feedback")
        .update({ resolved: true, status: "resolved" })
        .in("id", toResolve);
      resolvedCount = toResolve.length;
    }
  }

  // --- SYNC 1b: Unresolve feedback when Asana tasks move OUT of Completed/On Hold ---

  const { data: resolvedItems } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid")
    .eq("resolved", true)
    .not("asana_task_gid", "is", null);

  let unresolvedCount = 0;

  if (resolvedItems && resolvedItems.length > 0) {
    // Reuse sectionToResolved from above, or rebuild if needed
    const resolvedAppIds = [...new Set(resolvedItems.map((item) => item.app_id))];
    const { data: resolvedProjects } = await supabase
      .from("projects")
      .select("app_id, asana_section_mapping")
      .in("app_id", resolvedAppIds);

    const resolvedSections = new Map<string, boolean>();
    for (const project of resolvedProjects || []) {
      const mapping = project.asana_section_mapping as Record<string, string>;
      if (!mapping) continue;
      for (const [key, gid] of Object.entries(mapping)) {
        if (RESOLVED_SECTION_KEYS.includes(key)) {
          resolvedSections.set(gid, true);
        }
      }
    }

    const toUnresolve: string[] = [];
    const batchSize2 = 25;
    for (let i = 0; i < resolvedItems.length; i += batchSize2) {
      const batch = resolvedItems.slice(i, i + batchSize2);
      await Promise.allSettled(
        batch.map(async (item) => {
          const res = await fetch(
            `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
            { headers: { Authorization: `Bearer ${asanaPat}` } }
          );
          if (!res.ok) return;
          const json = await res.json();
          const memberships = json?.data?.memberships || [];
          const inResolvedSection = memberships.some(
            (m: { section?: { gid?: string } }) => resolvedSections.has(m?.section?.gid || "")
          );
          if (!inResolvedSection) {
            toUnresolve.push(item.id);
          }
        })
      );
    }

    if (toUnresolve.length > 0) {
      await supabase
        .from("feedback")
        .update({ resolved: false, status: "triaged" })
        .in("id", toUnresolve);
      unresolvedCount = toUnresolve.length;
    }
  }

  // --- SYNC 2: Attach screenshots to Asana tasks ---

  // Find feedback with asana_task_gid + elements (screenshots) that haven't been attached yet
  // We use metadata._screenshots_attached as a flag to avoid re-processing
  const { data: screenshotItems } = await supabase
    .from("feedback")
    .select("id, asana_task_gid, elements, metadata")
    .not("asana_task_gid", "is", null)
    .not("elements", "is", null);

  let screenshotsAttached = 0;

  if (screenshotItems) {
    for (const item of screenshotItems) {
      // Skip if already processed
      const meta = (item.metadata as Record<string, unknown>) || {};
      if (meta._screenshots_attached) continue;

      const elements = item.elements as ScreenshotElement[];
      if (!Array.isArray(elements) || elements.length === 0) continue;

      let attached = false;
      for (const element of elements) {
        if (!element.url) continue;

        // Add screenshot as a comment with the URL (Asana renders image previews)
        const commentRes = await fetch(
          `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}/stories`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${asanaPat}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                text: `Screenshot: ${element.url}`,
              },
            }),
          }
        );
        if (commentRes.ok) attached = true;
      }

      if (attached) {
        // Mark as processed so we don't re-attach
        await supabase
          .from("feedback")
          .update({
            metadata: { ...meta, _screenshots_attached: true },
          })
          .eq("id", item.id);
        screenshotsAttached++;
      }
    }
  }

  return NextResponse.json({
    resolved: resolvedCount,
    unresolved: unresolvedCount,
    checked: (unresolvedItems?.length || 0) + (resolvedItems?.length || 0),
    screenshots_attached: screenshotsAttached,
  });
}
