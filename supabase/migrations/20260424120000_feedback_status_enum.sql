-- supabase/migrations/20260424120000_feedback_status_enum.sql

-- 1. Map existing values to the new enum. resolved=true or status='resolved'/'completed' → 'completed'.
--    status='deferred' → 'on_hold'. status='in_progress' or 'development' → 'development'.
--    status='up_next' → 'new'. status='pending_triage' or 'triaged' → 'new'.
--    Anything else → 'new' (safe default).
UPDATE public.feedback
SET status = CASE
  WHEN resolved = true                       THEN 'completed'
  WHEN status IN ('resolved','completed')    THEN 'completed'
  WHEN status = 'testing'                    THEN 'testing'
  WHEN status IN ('in_progress','development') THEN 'development'
  WHEN status IN ('deferred','on_hold')      THEN 'on_hold'
  WHEN status IN ('pending_triage','triaged','up_next','new') THEN 'new'
  ELSE 'new'
END;

-- 2. Enforce the 7-value enum via CHECK. Using CHECK (not CREATE TYPE) so the
--    set of values is easy to extend later without an enum alter/drop dance.
ALTER TABLE public.feedback
  DROP CONSTRAINT IF EXISTS feedback_status_check;
ALTER TABLE public.feedback
  ADD  CONSTRAINT feedback_status_check
  CHECK (status IN ('new','feature','bug','development','testing','on_hold','completed'));

-- 3. Make status NOT NULL with sensible default.
ALTER TABLE public.feedback ALTER COLUMN status SET DEFAULT 'new';
ALTER TABLE public.feedback ALTER COLUMN status SET NOT NULL;

-- 4. Drop the redundant resolved column. Its semantic is now derivable
--    (resolved = status IN ('testing','completed')).
ALTER TABLE public.feedback DROP COLUMN IF EXISTS resolved;

-- 5. Index on status — the dashboard and cron both filter on it heavily.
CREATE INDEX IF NOT EXISTS feedback_status_idx ON public.feedback (status);
