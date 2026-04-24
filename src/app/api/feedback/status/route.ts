import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isFeedbackStatus } from "@/lib/feedback-status";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  if (typeof id !== "string" || !isFeedbackStatus(status)) {
    return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("feedback").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
