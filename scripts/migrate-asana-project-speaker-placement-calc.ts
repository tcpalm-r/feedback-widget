// scripts/migrate-asana-project-speaker-placement-calc.ts
// One-shot: create a fresh Asana project using Template A, re-create tasks for
// speaker-placement-calc feedback items that still have an asana_task_gid,
// and point the DB's projects.asana_project_id + mapping at the new project.

import { createClient } from "@supabase/supabase-js";

const ASANA_PAT = process.env.ASANA_PAT!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const WORKSPACE_GID = process.env.ASANA_WORKSPACE_GID!; // required env — set before running
const TEAM_GID = process.env.ASANA_TEAM_GID!;           // optional, but usually needed

const TEMPLATE_A_SECTIONS = ["New", "Feature", "Bug", "Development", "Testing", "On Hold", "Completed"];

async function asana(path: string, init?: RequestInit) {
  const res = await fetch(`https://app.asana.com/api/1.0${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${ASANA_PAT}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`asana ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  // 1. Create the project.
  const project = await asana("/projects", {
    method: "POST",
    body: JSON.stringify({
      data: {
        name: "(APP) Speaker Placement Calculator",
        workspace: WORKSPACE_GID,
        team: TEAM_GID || undefined,
        default_view: "board",
      },
    }),
  });
  const projectGid = project.data.gid as string;
  console.log("created project", projectGid);

  // 2. Create sections in order (Asana creates sections in reverse; we add top-down so they render correctly).
  //    We also delete the default "Untitled section" that Asana auto-creates.
  const existing = await asana(`/projects/${projectGid}/sections`);
  for (const s of existing.data) {
    if (s.name === "Untitled section") {
      await asana(`/sections/${s.gid}`, { method: "DELETE" });
    }
  }
  const createdSections: Array<{ gid: string; name: string }> = [];
  for (const name of TEMPLATE_A_SECTIONS) {
    const r = await asana(`/projects/${projectGid}/sections`, {
      method: "POST",
      body: JSON.stringify({ data: { name } }),
    });
    createdSections.push({ gid: r.data.gid, name });
  }
  console.log("created sections", createdSections.map((s) => s.name));

  // 3. Update projects row with new project_id.
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { error: projErr } = await supabase.from("projects").update({
    asana_project_id: projectGid,
    // asana_section_mapping is now auto-maintained by the cron; seed it here once.
    asana_section_mapping: Object.fromEntries(
      createdSections.map((s) => [s.name.toLowerCase().replace(/\s+/g, "_"), s.gid]),
    ),
  }).eq("app_id", "speaker-placement-calc");
  if (projErr) throw projErr;
  console.log("updated projects row");

  // 4. Recreate tasks for every feedback row that still has a (stale) asana_task_gid.
  //    The old gids pointed at the shared demo-app board; the new project needs fresh tasks.
  const { data: items = [], error: fbErr } = await supabase
    .from("feedback")
    .select("id, message, status, asana_task_gid")
    .eq("app_id", "speaker-placement-calc")
    .not("asana_task_gid", "is", null);
  if (fbErr) throw fbErr;

  const sectionByStatus = new Map(createdSections.map((s) => [
    s.name.toLowerCase().replace(/\s+/g, "_"),
    s.gid,
  ]));

  for (const item of items ?? []) {
    const targetGid = sectionByStatus.get(item.status) ?? sectionByStatus.get("new");
    const created = await asana("/tasks", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name: (item.message as string).slice(0, 100),
          notes: item.message,
          projects: [projectGid],
        },
      }),
    });
    const newTaskGid = created.data.gid as string;
    if (targetGid) {
      await asana(`/sections/${targetGid}/addTask`, {
        method: "POST",
        body: JSON.stringify({ data: { task: newTaskGid } }),
      });
    }
    await supabase.from("feedback").update({ asana_task_gid: newTaskGid }).eq("id", item.id);
    console.log(`relinked ${item.id} → ${newTaskGid} (${item.status})`);
  }

  console.log("done");
}

main().catch((e) => { console.error(e); process.exit(1); });
