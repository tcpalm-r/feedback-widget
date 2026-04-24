-- supabase/migrations/20260424120100_trigger_feedback_status.sql

-- Drop the old resolved-based trigger.
DROP TRIGGER IF EXISTS on_feedback_resolved ON public.feedback;
DROP FUNCTION IF EXISTS public.notify_feedback_resolved();

-- New trigger: fires when status changes and the row has an Asana task.
CREATE OR REPLACE FUNCTION public.notify_feedback_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF (NEW.status IS DISTINCT FROM OLD.status) AND NEW.asana_task_gid IS NOT NULL THEN
    PERFORM net.http_post(
      url := 'https://sonance-user-feedback.vercel.app/api/webhook/feedback-status',
      body := jsonb_build_object(
        'type',      'UPDATE',
        'table',     'feedback',
        'schema',    'public',
        'record',    row_to_json(NEW)::jsonb,
        'old_record', row_to_json(OLD)::jsonb
      ),
      headers := '{"Content-Type": "application/json"}'::jsonb
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_feedback_status
  AFTER UPDATE ON public.feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_feedback_status();
