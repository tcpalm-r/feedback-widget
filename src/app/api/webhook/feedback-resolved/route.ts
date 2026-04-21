import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const asanaPat = process.env.ASANA_PAT!;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.WEBHOOK_SECRET &&
    authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { record, old_record } = body;

  if (!record?.asana_task_gid) {
    return NextResponse.json({ skipped: true, reason: "no asana_task_gid" });
  }

  const resolvedChanged = record.resolved !== old_record?.resolved;
  if (!resolvedChanged) {
    return NextResponse.json({ skipped: true, reason: "resolved not changed" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: project } = await supabase
    .from("projects")
    .select("asana_section_mapping")
    .eq("app_id", record.app_id)
    .single();

  const sectionMapping = project?.asana_section_mapping as Record<string, string> | null;
  if (!sectionMapping) {
    return NextResponse.json({ skipped: true, reason: "no section mapping" });
  }

  // Determine target section based on resolved state.
  // resolved=true → Testing (awaits manual QA). Once QA passes, a human drags
  // the task to Completed in Asana, which the cron syncs back to the DB.
  // Falls back to Completed if no Testing section is mapped for this project.
  let targetGid: string | undefined;
  let movedTo: string;

  if (record.resolved === true) {
    targetGid = sectionMapping.testing || sectionMapping.completed;
    movedTo = sectionMapping.testing ? "testing" : "completed";
  } else {
    // Unresolve — move back to "new" section (fallback: "bug")
    targetGid = sectionMapping.new || sectionMapping.bug || sectionMapping.backlog;
    movedTo = "new";
  }

  if (!targetGid) {
    return NextResponse.json({ skipped: true, reason: "no target section" });
  }

  const res = await fetch(
    `https://app.asana.com/api/1.0/sections/${targetGid}/addTask`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${asanaPat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: { task: record.asana_task_gid } }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "Failed to move Asana task", details: err },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    task: record.asana_task_gid,
    moved_to: movedTo,
  });
}
