// src/app/api/webhook/asana/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, gidToStatus } from "@/lib/asana-sections";
import { extractTypeAndSeverity, type AsanaCustomFieldEntry, type ProjectCustomFieldsConfig } from "@/lib/asana-custom-fields";

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

  // Collect task GIDs from each event type.
  const taskGidsForSectionChange = new Set<string>();
  const taskGidsForCustomFieldChange = new Set<string>();
  for (const event of events) {
    const resource = event.resource as Record<string, unknown> | undefined;
    const parent = event.parent as Record<string, unknown> | undefined;
    if (resource?.resource_type !== "story") continue;
    if (parent?.resource_type !== "task" || !parent?.gid) continue;
    const sub = resource.resource_subtype;
    if (sub === "section_changed") taskGidsForSectionChange.add(parent.gid as string);
    // Asana fires typed subtypes like enum_custom_field_changed, text_custom_field_changed,
    // number_custom_field_changed, date_custom_field_changed. Match them all — the handler
    // below doesn't care which type changed; it re-reads the task's full custom_fields.
    else if (typeof sub === "string" && sub.endsWith("_custom_field_changed")) {
      taskGidsForCustomFieldChange.add(parent.gid as string);
    }
  }

  const allTaskGids = new Set<string>([...taskGidsForSectionChange, ...taskGidsForCustomFieldChange]);
  if (allTaskGids.size === 0) return NextResponse.json({ ok: true, processed: 0 });

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: feedbackItems } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status, type, triage")
    .in("asana_task_gid", Array.from(allTaskGids));

  if (!feedbackItems?.length) return NextResponse.json({ ok: true, processed: 0, reason: "no matching feedback" });

  const appIds = [...new Set(feedbackItems.map((f) => f.app_id))];
  const { data: projects } = await supabase
    .from("projects").select("app_id, asana_project_id, asana_custom_fields").in("app_id", appIds);

  const projectIdByApp = new Map<string, string>();
  const customFieldsConfigByApp = new Map<string, ProjectCustomFieldsConfig>();
  for (const p of projects ?? []) {
    if (p.asana_project_id) projectIdByApp.set(p.app_id, p.asana_project_id as string);
    if (p.asana_custom_fields) customFieldsConfigByApp.set(p.app_id, p.asana_custom_fields as ProjectCustomFieldsConfig);
  }

  // Fetch sections per project once (used by section-change pass only).
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

  // --- PASS A: section_changed → DB status ---
  let statusUpdated = 0;
  await Promise.allSettled(
    feedbackItems
      .filter((item) => taskGidsForSectionChange.has(item.asana_task_gid as string))
      .map(async (item) => {
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
        statusUpdated++;
      }),
  );

  // --- PASS B: custom_field_changed → DB type + triage.severity ---
  let customFieldUpdated = 0;
  await Promise.allSettled(
    feedbackItems
      .filter((item) => taskGidsForCustomFieldChange.has(item.asana_task_gid as string))
      .map(async (item) => {
        const config = customFieldsConfigByApp.get(item.app_id);
        if (!config) return;

        const res = await fetch(
          `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=custom_fields.gid,custom_fields.enum_value.gid,custom_fields.enum_value.name`,
          { headers: { Authorization: `Bearer ${asanaPat}` } },
        );
        if (!res.ok) return;
        const json = await res.json();
        const customFields = (json?.data?.custom_fields ?? []) as AsanaCustomFieldEntry[];
        const extracted = extractTypeAndSeverity(customFields, config);

        const updates: Record<string, unknown> = {};
        if (extracted.type && extracted.type !== item.type) {
          updates.type = extracted.type;
        }
        const currentSeverity = ((item.triage as Record<string, unknown> | null)?.severity) ?? "";
        if (extracted.severity && extracted.severity !== currentSeverity) {
          const newTriage = { ...((item.triage as Record<string, unknown> | null) ?? {}), severity: extracted.severity };
          updates.triage = newTriage;
        }
        if (Object.keys(updates).length === 0) return;

        await supabase.from("feedback").update(updates).eq("id", item.id);
        customFieldUpdated++;
      }),
  );

  return NextResponse.json({
    ok: true,
    processed: allTaskGids.size,
    status_updated: statusUpdated,
    custom_field_updated: customFieldUpdated,
  });
}
