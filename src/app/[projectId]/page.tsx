import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardClient from "../dashboard/DashboardClient";
import ProjectEmpty from "./ProjectEmpty";
import type { FeedbackStatus } from "@/lib/feedback-status";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  status: FeedbackStatus;
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("feedback")
    .select("id, app_id, type, message, initials, status, elements, metadata, created_at")
    .eq("app_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return <ProjectEmpty message={`Error loading feedback: ${error.message}`} />;
  }

  if (!data || data.length === 0) {
    return <ProjectEmpty projectId={projectId} />;
  }

  const items = data as FeedbackItem[];
  const grouped: Record<string, FeedbackItem[]> = { [projectId]: items };
  return <DashboardClient grouped={grouped} total={items.length} singleProject />;
}
