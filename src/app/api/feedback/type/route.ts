import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

const VALID_TYPES = ["bug", "feature", "future", "misc"];

export async function PATCH(req: NextRequest) {
  const { id, type } = await req.json();

  if (!id || !VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `id and type (one of ${VALID_TYPES.join(", ")}) required` },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("feedback")
    .update({ type })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
