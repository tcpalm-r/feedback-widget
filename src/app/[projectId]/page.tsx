import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardClient from "../dashboard/DashboardClient";
import ProjectEmpty from "./ProjectEmpty";

interface FeedbackItem {
  id: string;
  app_id: string;
  type: string;
  message: string;
  initials: string | null;
  resolved: boolean;
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
  const { data: feedback, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("app_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return <ProjectEmpty message={`Error loading feedback: ${error.message}`} />;
  }

  if (!feedback || feedback.length === 0) {
    return <ProjectEmpty projectId={projectId} />;
  }

  const grouped: Record<string, FeedbackItem[]> = {
    [projectId]: feedback,
  };

  return <DashboardClient grouped={grouped} total={feedback.length} singleProject />;
}
