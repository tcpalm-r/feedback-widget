import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import type { ProjectCustomFieldsConfig } from "@/lib/asana-custom-fields";

const VALID_TYPES = ["bug", "feature", "future", "misc"] as const;
const ASANA_PAT = process.env.ASANA_PAT!;

export async function PATCH(req: NextRequest) {
  const { id, type } = await req.json();

  if (!id || !(VALID_TYPES as readonly string[]).includes(type)) {
    return NextResponse.json(
      { error: `id and type (one of ${VALID_TYPES.join(", ")}) required` },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  // Read the row first so we know the app + Asana task to push to.
  const { data: row, error: readErr } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid")
    .eq("id", id)
    .single();
  if (readErr || !row) {
    return NextResponse.json({ error: readErr?.message ?? "feedback not found" }, { status: 404 });
  }

  const { error: updateErr } = await supabase
    .from("feedback")
    .update({ type })
    .eq("id", id);
  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  // Push to Asana if this row has a linked task and the project has a Type custom field.
  let asanaPushed = false;
  let asanaSkipReason: string | null = null;
  if (!row.asana_task_gid) {
    asanaSkipReason = "no asana_task_gid";
  } else {
    const { data: project } = await supabase
      .from("projects")
      .select("asana_custom_fields")
      .eq("app_id", row.app_id)
      .single();
    const config = project?.asana_custom_fields as ProjectCustomFieldsConfig | null;
    const typeFieldGid = config?.type;
    const optionGid = config?.enum_options?.type?.[type as string];

    if (!typeFieldGid || !optionGid) {
      asanaSkipReason = "project missing Type custom field config";
    } else {
      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${row.asana_task_gid}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${ASANA_PAT}`, "Content-Type": "application/json" },
          body: JSON.stringify({ data: { custom_fields: { [typeFieldGid]: optionGid } } }),
        }
      );
      if (res.ok) {
        asanaPushed = true;
      } else {
        asanaSkipReason = `asana ${res.status}`;
      }
    }
  }

  return NextResponse.json({ ok: true, asana_pushed: asanaPushed, asana_skip_reason: asanaSkipReason });
}
