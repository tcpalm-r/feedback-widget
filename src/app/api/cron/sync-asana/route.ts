import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

/**
 * Maps Asana section keys (from projects.asana_section_mapping) to the
 * feedback status and resolved flag in Supabase.
 *
 * Backlog / New  → triaged  (shows in /triagefb)
 * Up Next        → up_next  (hidden from /triagefb)
 * In Progress    → in_progress
 * Deferred       → deferred
 * Testing        → resolved + resolved=true (awaiting manual verification)
 * Completed      → resolved + resolved=true (verified)
 *
 * Testing and Completed share the same DB state; Testing is the interstitial
 * landing slot after we ship a fix. SYNC 4 moves DB-marked resolved items
 * into the Testing section automatically.
 */
const SECTION_STATUS_MAP: Record<string, { status: string; resolved: boolean }> = {
  backlog:     { status: "triaged",     resolved: false },
  new:         { status: "triaged",     resolved: false },
  up_next:     { status: "up_next",     resolved: false },
  in_progress: { status: "in_progress", resolved: false },
  deferred:    { status: "deferred",    resolved: false },
  testing:     { status: "resolved",    resolved: true  },
  completed:   { status: "resolved",    resolved: true  },
};

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

  // --- SYNC 1: Bidirectional section-based status sync ---
  // For every feedback item with an Asana task, check which section the task
  // is in and update status + resolved to match.

  const { data: linkedItems, error: fetchError } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status, resolved")
    .not("asana_task_gid", "is", null);

  if (fetchError) {
    return NextResponse.json(
      { error: "Failed to fetch feedback", details: fetchError.message },
      { status: 500 }
    );
  }

  // Build a lookup: section GID → { status, resolved } for all relevant projects
  const appIds = [...new Set((linkedItems || []).map((item) => item.app_id))];
  const { data: projects } = await supabase
    .from("projects")
    .select("app_id, asana_section_mapping")
    .in("app_id", appIds);

  const sectionGidToState = new Map<string, { status: string; resolved: boolean }>();
  for (const project of projects || []) {
    const mapping = project.asana_section_mapping as Record<string, string>;
    if (!mapping) continue;
    for (const [key, gid] of Object.entries(mapping)) {
      const state = SECTION_STATUS_MAP[key];
      if (state) {
        sectionGidToState.set(gid, state);
      }
    }
  }

  // Check each item's Asana task section and compute updates
  const updates: { id: string; status: string; resolved: boolean }[] = [];
  const batchSize = 25;

  for (let i = 0; i < (linkedItems || []).length; i += batchSize) {
    const batch = (linkedItems || []).slice(i, i + batchSize);
    await Promise.allSettled(
      batch.map(async (item) => {
        try {
          const res = await fetch(
            `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
            { headers: { Authorization: `Bearer ${asanaPat}` } }
          );
          if (!res.ok) return;
          const json = await res.json();
          const memberships = json?.data?.memberships || [];

          for (const m of memberships) {
            const sectionGid = m?.section?.gid;
            if (!sectionGid) continue;
            const newState = sectionGidToState.get(sectionGid);
            if (!newState) continue;

            // Only update if status or resolved actually changed
            if (item.status !== newState.status || item.resolved !== newState.resolved) {
              updates.push({ id: item.id, ...newState });
            }
            break; // Use the first matched section
          }
        } catch {
          // Skip failed lookups — will retry next cron run
        }
      })
    );
  }

  // Apply updates grouped by target state to minimize DB calls
  const updatesByState = new Map<string, string[]>();
  for (const u of updates) {
    const key = `${u.status}|${u.resolved}`;
    if (!updatesByState.has(key)) updatesByState.set(key, []);
    updatesByState.get(key)!.push(u.id);
  }

  for (const [key, ids] of updatesByState) {
    const [status, resolvedStr] = key.split("|");
    const resolved = resolvedStr === "true";
    await supabase
      .from("feedback")
      .update({ status, resolved })
      .in("id", ids);
  }

  // --- SYNC 2: Attach screenshots to Asana tasks ---

  const { data: screenshotItems } = await supabase
    .from("feedback")
    .select("id, asana_task_gid, elements, metadata")
    .not("asana_task_gid", "is", null)
    .not("elements", "is", null);

  let screenshotsAttached = 0;

  if (screenshotItems) {
    for (const item of screenshotItems) {
      const meta = (item.metadata as Record<string, unknown>) || {};
      if (meta._screenshots_attached) continue;

      const elements = item.elements as ScreenshotElement[];
      if (!Array.isArray(elements) || elements.length === 0) continue;

      let attached = false;
      for (const element of elements) {
        if (!element.url) continue;

        const commentRes = await fetch(
          `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}/stories`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${asanaPat}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: { text: `Screenshot: ${element.url}` },
            }),
          }
        );
        if (commentRes.ok) attached = true;
      }

      if (attached) {
        await supabase
          .from("feedback")
          .update({ metadata: { ...meta, _screenshots_attached: true } })
          .eq("id", item.id);
        screenshotsAttached++;
      }
    }
  }

  // --- SYNC 3: Retry pending_triage items that never got triaged/Asana tasks ---

  const CORTEX_API_URL = process.env.CORTEX_API_URL || "";
  let retriedCount = 0;
  let retryFailedCount = 0;

  if (CORTEX_API_URL) {
    const { data: pendingItems } = await supabase
      .from("feedback")
      .select("id, app_id")
      .eq("status", "pending_triage")
      .is("asana_task_gid", null)
      .order("created_at", { ascending: true })
      .limit(20);

    if (pendingItems && pendingItems.length > 0) {
      for (const item of pendingItems) {
        try {
          const res = await fetch(
            `${CORTEX_API_URL}/api/v1/feedback/${item.id}/retry`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (res.ok) {
            retriedCount++;
          } else {
            retryFailedCount++;
          }
        } catch {
          retryFailedCount++;
        }
      }
    }
  }

  return NextResponse.json({
    checked: linkedItems?.length || 0,
    status_updated: updates.length,
    screenshots_attached: screenshotsAttached,
    retried: retriedCount,
    retry_failed: retryFailedCount,
  });
}
