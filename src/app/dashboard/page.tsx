import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardClient from "./DashboardClient";
import type { FeedbackItem } from "./FeedbackCard";
import DashboardError from "./DashboardError";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("feedback")
    .select("id, app_id, type, message, initials, status, elements, metadata, created_at")
    .order("created_at", { ascending: false });

  if (error) return <DashboardError message={error.message} />;
  const items = (data ?? []) as FeedbackItem[];
  const appIds = [...new Set(items.map((i) => i.app_id))].sort();
  return <DashboardClient items={items} total={items.length} appIds={appIds} />;
}
