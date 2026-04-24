import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardClient from "../dashboard/DashboardClient";
import type { FeedbackItem } from "../dashboard/FeedbackCard";
import ProjectEmpty from "./ProjectEmpty";

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
  return <DashboardClient items={items} total={items.length} appIds={[projectId]} />;
}
