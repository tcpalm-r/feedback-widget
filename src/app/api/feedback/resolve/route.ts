import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { id, resolved } = await req.json();

  if (!id || typeof resolved !== "boolean") {
    return NextResponse.json({ error: "id and resolved (boolean) required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("feedback")
    .update({ resolved })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
