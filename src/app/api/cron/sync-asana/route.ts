// src/app/api/cron/sync-asana/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, gidToStatus, statusToGid, SectionMap } from "@/lib/asana-sections";
import { isFeedbackStatus, FeedbackStatus } from "@/lib/feedback-status";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ----- Load every feedback row that has an Asana task -----
  const { data: linkedItems = [] } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status")
    .not("asana_task_gid", "is", null);

  // ----- Load project → Asana project GID map, then fetch sections per project -----
  const appIds = [...new Set((linkedItems ?? []).map((i) => i.app_id))];
  const { data: projects = [] } = await supabase
    .from("projects").select("app_id, asana_project_id").in("app_id", appIds);
  const projectIdByApp = new Map<string, string>();
  for (const p of projects ?? []) {
    if (p.asana_project_id) projectIdByApp.set(p.app_id, p.asana_project_id as string);
  }
  const mapByProject = new Map<string, SectionMap>();
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

  // ----- PASS 1: reconcile DB status against Asana section (drift catcher) -----
  let statusReconciled = 0;
  let orphaned = 0;
  const batchSize = 25;
  for (let i = 0; i < (linkedItems ?? []).length; i += batchSize) {
    const batch = (linkedItems ?? []).slice(i, i + batchSize);
    await Promise.allSettled(batch.map(async (item) => {
      const pid = projectIdByApp.get(item.app_id);
      const map = pid ? mapByProject.get(pid) : undefined;
      if (!map) return;

      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (res.status === 404) {
        // Asana task was deleted → move the feedback row to feedback_archive
        // (preserves content for accidental-deletion recovery) and remove it
        // from feedback so it stops appearing in dashboards / triagefb.
        await supabase.rpc("archive_feedback", {
          feedback_id: item.id,
          reason: "asana_task_deleted",
        });
        orphaned++;
        return;
      }
      if (!res.ok) return;
      const json = await res.json();
      const sectionGid = (json?.data?.memberships?.[0]?.section?.gid) as string | undefined;
      if (!sectionGid) return;
      const asanaStatus = gidToStatus(map, sectionGid);
      if (!asanaStatus) return;

      // If DB and Asana disagree, the *source of truth* is whichever moved more
      // recently. We can't tell from cron alone, so prefer DB — only correct when
      // the DB status has no matching Asana section (e.g. status points at an
      // unmapped section and task is actually in a real column). Otherwise, if
      // DB disagrees with Asana, push DB → Asana to honour the resolved guard.
      if (asanaStatus === item.status) return;

      const dbGid = statusToGid(map, item.status as FeedbackStatus);
      if (dbGid) {
        // DB has a valid target section; move Asana to match.
        await fetch(`https://app.asana.com/api/1.0/sections/${dbGid}/addTask`, {
          method: "POST",
          headers: { Authorization: `Bearer ${asanaPat}`, "Content-Type": "application/json" },
          body: JSON.stringify({ data: { task: item.asana_task_gid } }),
        });
        statusReconciled++;
      } else if (isFeedbackStatus(asanaStatus)) {
        // DB status is invalid or unmapped; trust Asana.
        await supabase.from("feedback").update({ status: asanaStatus }).eq("id", item.id);
        statusReconciled++;
      }
    }));
  }

  // ----- PASS 2: retry Cortex for rows with status='new' and no Asana task -----
  const CORTEX_API_URL = process.env.CORTEX_API_URL || "";
  let retried = 0;
  let retryFailed = 0;
  if (CORTEX_API_URL) {
    const { data: pending = [] } = await supabase
      .from("feedback").select("id, app_id").eq("status", "new").is("asana_task_gid", null)
      .order("created_at", { ascending: true }).limit(20);
    for (const item of (pending ?? [])) {
      try {
        const r = await fetch(`${CORTEX_API_URL}/api/v1/feedback/${item.id}/retry`, {
          method: "POST", headers: { "Content-Type": "application/json" },
        });
        if (r.ok) retried++;
        else retryFailed++;
      } catch { retryFailed++; }
    }
  }

  return NextResponse.json({
    checked: (linkedItems ?? []).length,
    status_reconciled: statusReconciled,
    orphaned,
    retried,
    retry_failed: retryFailed,
  });
}
