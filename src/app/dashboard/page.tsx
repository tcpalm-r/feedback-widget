import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardClient from "./DashboardClient";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  elements: Array<{
    url: string;
    region?: { x: number; y: number; width: number; height: number };
  }> | null;
  metadata: {
    url?: string;
    timestamp?: string;
    userAgent?: string;
  } | null;
  created_at: string;
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = getSupabaseAdmin();
  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Error loading feedback: {error.message}</div>;
  }

  // Group by app_id
  const grouped: Record<string, FeedbackItem[]> = {};
  for (const item of feedback || []) {
    if (!grouped[item.app_id]) {
      grouped[item.app_id] = [];
    }
    grouped[item.app_id].push(item);
  }

  return <DashboardClient grouped={grouped} total={feedback?.length || 0} />;
}
