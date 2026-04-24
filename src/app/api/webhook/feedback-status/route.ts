// src/app/api/webhook/feedback-status/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, statusToGid } from "@/lib/asana-sections";
import { isFeedbackStatus, FeedbackStatus } from "@/lib/feedback-status";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.WEBHOOK_SECRET && authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { record?: unknown; old_record?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const record = (body.record as { id?: string; app_id?: string; asana_task_gid?: string | null; status?: string } | undefined);
  const oldRecord = (body.old_record as { status?: string } | undefined);

  if (!record?.asana_task_gid) {
    return NextResponse.json({ skipped: "no asana_task_gid" });
  }
  if (record.status === oldRecord?.status) {
    return NextResponse.json({ skipped: "status unchanged" });
  }
  if (!isFeedbackStatus(record.status)) {
    return NextResponse.json({ skipped: "unknown status", status: record.status });
  }

  if (!record.app_id) {
    return NextResponse.json({ skipped: "no app_id" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: project } = await supabase
    .from("projects")
    .select("asana_project_id")
    .eq("app_id", record.app_id)
    .single();

  const asanaProjectId = project?.asana_project_id as string | undefined;
  if (!asanaProjectId) return NextResponse.json({ skipped: "no asana_project_id" });

  // Fetch current sections from Asana — authoritative, never read the cached mapping.
  const secRes = await fetch(
    `https://app.asana.com/api/1.0/projects/${asanaProjectId}/sections?opt_fields=name`,
    { headers: { Authorization: `Bearer ${asanaPat}` } },
  );
  if (!secRes.ok) {
    return NextResponse.json({ error: "asana sections fetch failed", status: secRes.status }, { status: 502 });
  }
  const secJson = await secRes.json();
  const map = buildSectionMap(secJson.data ?? []);
  const targetGid = statusToGid(map, record.status as FeedbackStatus);
  if (!targetGid) {
    return NextResponse.json({ skipped: "target section missing from Asana", status: record.status });
  }

  // Asana's sections/addTask is idempotent: moving a task already in the target
  // section is a no-op returning 200. Safe against pg_net retry double-fires.
  const moveRes = await fetch(
    `https://app.asana.com/api/1.0/sections/${targetGid}/addTask`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${asanaPat}`, "Content-Type": "application/json" },
      body: JSON.stringify({ data: { task: record.asana_task_gid } }),
    },
  );
  if (!moveRes.ok) {
    return NextResponse.json({ error: "asana move failed", details: await moveRes.text() }, { status: 500 });
  }

  return NextResponse.json({ success: true, task: record.asana_task_gid, moved_to: record.status });
}
