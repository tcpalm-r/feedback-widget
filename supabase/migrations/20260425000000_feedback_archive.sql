-- supabase/migrations/20260425000000_feedback_archive.sql
-- Archive table + atomic move-and-delete function. Used when an Asana task
-- is deleted: the cron's PASS 1 calls archive_feedback() to move the row
-- out of feedback (so it stops showing in the dashboard / triagefb) but
-- preserves the content for accidental-deletion recovery.

-- 1. Mirror table — same columns as feedback, plus archive metadata.
CREATE TABLE IF NOT EXISTS public.feedback_archive (
  id              uuid          PRIMARY KEY,
  app_id          text          NOT NULL,
  type            text,
  message         text          NOT NULL,
  initials        text,
  status          text          NOT NULL,
  asana_task_gid  text,
  triage          jsonb,
  elements        jsonb,
  metadata        jsonb,
  preview_deploy_url text,
  app_version     text,
  created_at      timestamptz   NOT NULL,
  archived_at     timestamptz   NOT NULL DEFAULT now(),
  archive_reason  text          NOT NULL
);

CREATE INDEX IF NOT EXISTS feedback_archive_app_id_idx     ON public.feedback_archive (app_id);
CREATE INDEX IF NOT EXISTS feedback_archive_archived_at_idx ON public.feedback_archive (archived_at DESC);

-- 2. Atomic copy-and-delete function. Returns the archived id when the
--    feedback row existed, or NULL when there was nothing to archive
--    (idempotent against double-fires).
CREATE OR REPLACE FUNCTION public.archive_feedback(
  feedback_id uuid,
  reason text DEFAULT 'asana_task_deleted'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  archived_id uuid;
BEGIN
  WITH moved AS (
    DELETE FROM public.feedback WHERE id = feedback_id RETURNING *
  )
  INSERT INTO public.feedback_archive (
    id, app_id, type, message, initials, status, asana_task_gid,
    triage, elements, metadata, preview_deploy_url, app_version,
    created_at, archive_reason
  )
  SELECT
    id, app_id, type, message, initials, status, asana_task_gid,
    triage, elements, metadata, preview_deploy_url, app_version,
    created_at, reason
  FROM moved
  RETURNING id INTO archived_id;

  RETURN archived_id;
END;
$$;
