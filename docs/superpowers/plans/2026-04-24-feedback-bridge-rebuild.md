# Feedback Widget ↔ Asana Bridge Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the feedback DB / Asana sync into one single-source-of-truth status field, standardize every project on the Template A Kanban (New → Feature / Bug → Development → Testing → On Hold → Completed), auto-regenerate section mappings from Asana so they can never drift, rewrite both sync directions around the new schema, rebuild the dashboard UI to match, give `speaker-placement-calc` its own Asana project, and remove `demo-app` from the Asana sync.

**Architecture:**
- One authoritative `feedback.status` column (7-value enum matching Template A section names). The `resolved` boolean is removed; it is derivable.
- `projects.asana_section_mapping` is rebuilt every cron tick from the live Asana sections — keys are always the exact lowercased Asana section name. No hand-maintained mapping drift.
- Two sync endpoints: `POST /api/webhook/feedback-status` (DB → Asana, fired by pg trigger on status change) and `POST /api/webhook/asana` (Asana → DB, fired by section_changed events). Both use the same `mapping` and its inverse. The cron re-reconciles drift only — it is no longer the source of truth for any transition.
- Orphaned `asana_task_gid` (task deleted in Asana) → DB row resets to `status='new'`, `asana_task_gid=null`, and the existing Cortex retry path re-creates the task on next cron tick.
- Dashboard is rebuilt as a 7-column Kanban that reads and writes `status`; the `resolved`-based filter is replaced by status filters.

**Tech Stack:** Next.js 16 (App Router, RSC), TypeScript, Supabase (Postgres + pg_net + Supabase JS), Asana REST API, Tailwind CSS.

**Affected repositories:**
- `/Users/thomas.palmer/Feedback-widget` (widget + dashboard + sync code + Supabase migrations)
- Cortex (external) — requires one coordinated change to the `POST /api/v1/feedback` handler to emit `status='new'` instead of `status='triaged'` after it creates the Asana task; tracked as Task 16 but the code change happens outside this repo.

---

## File Structure

### New files

- `supabase/migrations/20260424120000_feedback_status_enum.sql` — adds the 7-value status type and check constraint, migrates existing rows, drops `resolved`.
- `supabase/migrations/20260424120100_trigger_feedback_status.sql` — replaces `on_feedback_resolved` / `notify_feedback_resolved()` with `on_feedback_status` / `notify_feedback_status()` firing on `status` change.
- `src/lib/feedback-status.ts` — canonical status enum, section-name ↔ status converters, helper types.
- `src/lib/asana-sections.ts` — pure functions for building the bidirectional map from an Asana sections list.
- `src/lib/asana-sections.test.ts` — unit tests for the mapping helpers.
- `src/app/api/webhook/feedback-status/route.ts` — new DB→Asana webhook handler (replaces `/api/webhook/feedback-resolved`).
- `src/app/api/feedback/status/route.ts` — dashboard PATCH endpoint (replaces `/api/feedback/resolve`).
- `src/app/dashboard/KanbanColumn.tsx` — single status column with drag-drop + click-to-move.
- `src/app/dashboard/FeedbackCard.tsx` — individual feedback card.
- `src/app/dashboard/StatusBadge.tsx` — coloured pill per status.
- `src/app/dashboard/use-feedback-mutation.ts` — client-side status-change hook (optimistic update + rollback).
- `scripts/migrate-asana-project-speaker-placement-calc.ts` — one-shot creation of the new Asana project + re-link of existing `asana_task_gid` values.

### Modified files

- `src/app/api/cron/sync-asana/route.ts` — rewritten around the new mapping + single sync rule.
- `src/app/api/webhook/asana/route.ts` — rewritten to use full mapping (no more binary "in resolved section?" collapse).
- `src/app/api/feedback/route.ts` — on fallback insert, use `status='new'` (replaces `status='pending_triage'`).
- `src/app/dashboard/DashboardClient.tsx` — completely rebuilt as Kanban; no `resolved` references.
- `src/app/dashboard/page.tsx` — pass status-indexed grouping instead of `resolved` toggle state.
- `src/app/dashboard/useDarkMode.ts` — extend palette with 7 per-status colours.

### Deleted files

- `src/app/api/webhook/feedback-resolved/route.ts` — replaced by `/api/webhook/feedback-status`.
- `src/app/api/feedback/resolve/route.ts` — replaced by `/api/feedback/status`.

---

### Task 1: Add the canonical status helper module

**Files:**
- Create: `src/lib/feedback-status.ts`
- Create: `src/lib/feedback-status.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/feedback-status.test.ts
import { describe, it, expect } from "vitest";
import {
  FEEDBACK_STATUSES,
  isFeedbackStatus,
  sectionNameToStatus,
  statusToSectionName,
  isResolvedStatus,
} from "./feedback-status";

describe("feedback-status", () => {
  it("lists the 7 Template A statuses in order", () => {
    expect(FEEDBACK_STATUSES).toEqual([
      "new", "feature", "bug", "development", "testing", "on_hold", "completed",
    ]);
  });

  it("validates a known status", () => {
    expect(isFeedbackStatus("bug")).toBe(true);
    expect(isFeedbackStatus("triaged")).toBe(false);
  });

  it("converts Asana section names to status keys (case- and space-insensitive)", () => {
    expect(sectionNameToStatus("New")).toBe("new");
    expect(sectionNameToStatus("On Hold")).toBe("on_hold");
    expect(sectionNameToStatus("  Development  ")).toBe("development");
    expect(sectionNameToStatus("Unknown Column")).toBeUndefined();
  });

  it("converts status keys back to canonical section names", () => {
    expect(statusToSectionName("on_hold")).toBe("On Hold");
    expect(statusToSectionName("new")).toBe("New");
  });

  it("treats testing and completed as resolved states", () => {
    expect(isResolvedStatus("testing")).toBe(true);
    expect(isResolvedStatus("completed")).toBe(true);
    expect(isResolvedStatus("development")).toBe(false);
    expect(isResolvedStatus("new")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/feedback-status.test.ts`
Expected: FAIL with "Cannot find module './feedback-status'".

- [ ] **Step 3: Write the minimal implementation**

```ts
// src/lib/feedback-status.ts
export const FEEDBACK_STATUSES = [
  "new",
  "feature",
  "bug",
  "development",
  "testing",
  "on_hold",
  "completed",
] as const;

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

const SECTION_NAME_BY_STATUS: Record<FeedbackStatus, string> = {
  new: "New",
  feature: "Feature",
  bug: "Bug",
  development: "Development",
  testing: "Testing",
  on_hold: "On Hold",
  completed: "Completed",
};

const STATUS_BY_SECTION_KEY: Record<string, FeedbackStatus> = Object.fromEntries(
  FEEDBACK_STATUSES.map((s) => [SECTION_NAME_BY_STATUS[s].toLowerCase(), s]),
) as Record<string, FeedbackStatus>;

export function isFeedbackStatus(v: unknown): v is FeedbackStatus {
  return typeof v === "string" && (FEEDBACK_STATUSES as readonly string[]).includes(v);
}

export function sectionNameToStatus(name: string): FeedbackStatus | undefined {
  return STATUS_BY_SECTION_KEY[name.trim().toLowerCase()];
}

export function statusToSectionName(status: FeedbackStatus): string {
  return SECTION_NAME_BY_STATUS[status];
}

const RESOLVED: ReadonlySet<FeedbackStatus> = new Set(["testing", "completed"]);
export function isResolvedStatus(status: FeedbackStatus): boolean {
  return RESOLVED.has(status);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/feedback-status.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/feedback-status.ts src/lib/feedback-status.test.ts
git commit -m "feat: add canonical feedback status enum matching Template A sections"
```

---

### Task 2: Add the Asana sections → bidirectional map helper

**Files:**
- Create: `src/lib/asana-sections.ts`
- Create: `src/lib/asana-sections.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/asana-sections.test.ts
import { describe, it, expect } from "vitest";
import { buildSectionMap, gidToStatus, statusToGid } from "./asana-sections";

const SECTIONS = [
  { gid: "100", name: "New" },
  { gid: "200", name: "Feature" },
  { gid: "300", name: "Bug" },
  { gid: "400", name: "Development" },
  { gid: "500", name: "Testing" },
  { gid: "600", name: "On Hold" },
  { gid: "700", name: "Completed" },
];

describe("asana-sections", () => {
  it("builds a bidirectional map keyed by status name", () => {
    const map = buildSectionMap(SECTIONS);
    expect(map.byStatus.get("new")).toBe("100");
    expect(map.byStatus.get("on_hold")).toBe("600");
    expect(map.byGid.get("500")).toBe("testing");
  });

  it("ignores Asana sections that don't match a known status", () => {
    const map = buildSectionMap([...SECTIONS, { gid: "999", name: "Custom" }]);
    expect(map.byGid.get("999")).toBeUndefined();
  });

  it("reports missing statuses", () => {
    const partial = SECTIONS.slice(0, 3); // only new/feature/bug
    const map = buildSectionMap(partial);
    expect(map.missingStatuses).toEqual(["development", "testing", "on_hold", "completed"]);
  });

  it("statusToGid returns undefined for unmapped status", () => {
    const partial = buildSectionMap(SECTIONS.slice(0, 3));
    expect(statusToGid(partial, "completed")).toBeUndefined();
  });

  it("gidToStatus returns the status for a known gid", () => {
    const map = buildSectionMap(SECTIONS);
    expect(gidToStatus(map, "300")).toBe("bug");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/asana-sections.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Write the minimal implementation**

```ts
// src/lib/asana-sections.ts
import { FEEDBACK_STATUSES, FeedbackStatus, sectionNameToStatus } from "./feedback-status";

export interface AsanaSectionRef {
  gid: string;
  name: string;
}

export interface SectionMap {
  byStatus: Map<FeedbackStatus, string>;
  byGid: Map<string, FeedbackStatus>;
  missingStatuses: FeedbackStatus[];
}

export function buildSectionMap(sections: AsanaSectionRef[]): SectionMap {
  const byStatus = new Map<FeedbackStatus, string>();
  const byGid = new Map<string, FeedbackStatus>();

  for (const s of sections) {
    const status = sectionNameToStatus(s.name);
    if (!status) continue;
    byStatus.set(status, s.gid);
    byGid.set(s.gid, status);
  }

  const missingStatuses = FEEDBACK_STATUSES.filter((s) => !byStatus.has(s));
  return { byStatus, byGid, missingStatuses };
}

export function statusToGid(map: SectionMap, status: FeedbackStatus): string | undefined {
  return map.byStatus.get(status);
}

export function gidToStatus(map: SectionMap, gid: string): FeedbackStatus | undefined {
  return map.byGid.get(gid);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/asana-sections.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/asana-sections.ts src/lib/asana-sections.test.ts
git commit -m "feat: add bidirectional Asana section↔status mapping helper"
```

---

### Task 3: Add the status enum migration

**Files:**
- Create: `supabase/migrations/20260424120000_feedback_status_enum.sql`

- [ ] **Step 1: Write the migration**

```sql
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
```

- [ ] **Step 2: Apply it via the Supabase MCP tool**

Run the migration using the `mcp__supabase__apply_migration` tool with project_id `kmlsiaasvgiwtxqxqkbb`, name `feedback_status_enum`, and the SQL above.
Expected: success, no rows rejected.

- [ ] **Step 3: Verify the rollout**

Run via `mcp__supabase__execute_sql`:

```sql
SELECT status, COUNT(*) FROM feedback GROUP BY status ORDER BY 2 DESC;
```

Expected: only the 7 canonical values appear. No rows with `pending_triage`, `triaged`, `resolved`, `deferred`, `up_next`, `in_progress`.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260424120000_feedback_status_enum.sql
git commit -m "feat(db): collapse resolved+status into single 7-value status enum"
```

---

### Task 4: Replace the DB trigger with a status-change trigger

**Files:**
- Create: `supabase/migrations/20260424120100_trigger_feedback_status.sql`

- [ ] **Step 1: Write the migration**

```sql
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
```

- [ ] **Step 2: Apply it via the Supabase MCP tool**

Use `mcp__supabase__apply_migration` (project `kmlsiaasvgiwtxqxqkbb`, name `trigger_feedback_status`).
Expected: success.

- [ ] **Step 3: Verify the trigger exists**

Run via `mcp__supabase__execute_sql`:

```sql
SELECT tgname FROM pg_trigger
WHERE tgrelid = 'public.feedback'::regclass AND NOT tgisinternal;
```

Expected: one row, `on_feedback_status`.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/20260424120100_trigger_feedback_status.sql
git commit -m "feat(db): replace on_feedback_resolved with on_feedback_status trigger"
```

---

### Task 5: Add `POST /api/webhook/feedback-status` (DB → Asana)

**Files:**
- Create: `src/app/api/webhook/feedback-status/route.ts`

- [ ] **Step 1: Write the handler**

```ts
// src/app/api/webhook/feedback-status/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, statusToGid } from "@/lib/asana-sections";
import { isFeedbackStatus, FeedbackStatus } from "@/lib/feedback-status";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.WEBHOOK_SECRET && authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const record = body.record as { id?: string; app_id?: string; asana_task_gid?: string | null; status?: string } | undefined;
  const oldRecord = body.old_record as { status?: string } | undefined;

  if (!record?.asana_task_gid) {
    return NextResponse.json({ skipped: "no asana_task_gid" });
  }
  if (record.status === oldRecord?.status) {
    return NextResponse.json({ skipped: "status unchanged" });
  }
  if (!isFeedbackStatus(record.status)) {
    return NextResponse.json({ skipped: "unknown status", status: record.status });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: project } = await supabase
    .from("projects")
    .select("asana_project_id, asana_section_mapping")
    .eq("app_id", record.app_id)
    .single();

  const asanaProjectId = project?.asana_project_id as string | undefined;
  if (!asanaProjectId) return NextResponse.json({ skipped: "no asana_project_id" });

  // Fetch current sections from Asana — authoritative, never read the cached mapping.
  const secRes = await fetch(
    `https://app.asana.com/api/1.0/projects/${asanaProjectId}/sections?opt_fields=name`,
    { headers: { Authorization: `Bearer ${asanaPat}` } },
  );
  if (!secRes.ok) {
    return NextResponse.json({ error: "asana sections fetch failed", status: secRes.status }, { status: 502 });
  }
  const secJson = await secRes.json();
  const map = buildSectionMap(secJson.data ?? []);
  const targetGid = statusToGid(map, record.status as FeedbackStatus);
  if (!targetGid) {
    return NextResponse.json({ skipped: "target section missing from Asana", status: record.status });
  }

  const moveRes = await fetch(
    `https://app.asana.com/api/1.0/sections/${targetGid}/addTask`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${asanaPat}`, "Content-Type": "application/json" },
      body: JSON.stringify({ data: { task: record.asana_task_gid } }),
    },
  );
  if (!moveRes.ok) {
    return NextResponse.json({ error: "asana move failed", details: await moveRes.text() }, { status: 500 });
  }

  return NextResponse.json({ success: true, task: record.asana_task_gid, moved_to: record.status });
}
```

- [ ] **Step 2: Build verification**

Run: `npm run build`
Expected: successful build, no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/webhook/feedback-status/route.ts
git commit -m "feat(webhook): add /api/webhook/feedback-status for DB→Asana moves"
```

---

### Task 6: Delete the obsolete feedback-resolved webhook

**Files:**
- Delete: `src/app/api/webhook/feedback-resolved/route.ts`

- [ ] **Step 1: Remove the file and verify the trigger no longer targets it**

```bash
git rm src/app/api/webhook/feedback-resolved/route.ts
```

Trigger already points at `/api/webhook/feedback-status` from Task 4. No other references exist — verify with grep:

```bash
grep -r "feedback-resolved" src/ supabase/ 2>&1 || echo "clean"
```

Expected: `clean`.

- [ ] **Step 2: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove obsolete feedback-resolved webhook"
```

---

### Task 7: Rewrite `/api/webhook/asana` to use full mapping

**Files:**
- Modify: `src/app/api/webhook/asana/route.ts` (replace body after handshake/event-filter)

- [ ] **Step 1: Replace the handler body**

Replace the entire contents of `src/app/api/webhook/asana/route.ts` with:

```ts
// src/app/api/webhook/asana/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, gidToStatus } from "@/lib/asana-sections";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

export async function POST(request: Request) {
  // --- Handshake: Asana sends X-Hook-Secret on initial registration ---
  const hookSecret = request.headers.get("x-hook-secret");
  if (hookSecret) {
    return new NextResponse(null, { status: 200, headers: { "X-Hook-Secret": hookSecret } });
  }

  let body: { events?: Array<Record<string, unknown>> };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const events = body.events || [];
  if (events.length === 0) return NextResponse.json({ ok: true });

  // Collect task GIDs from section_changed events.
  const taskGids = new Set<string>();
  for (const event of events) {
    const resource = event.resource as Record<string, unknown> | undefined;
    const parent = event.parent as Record<string, unknown> | undefined;
    if (resource?.resource_type === "story"
      && resource?.resource_subtype === "section_changed"
      && parent?.resource_type === "task"
      && parent?.gid) {
      taskGids.add(parent.gid as string);
    }
  }
  if (taskGids.size === 0) return NextResponse.json({ ok: true, processed: 0 });

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: feedbackItems } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status")
    .in("asana_task_gid", Array.from(taskGids));

  if (!feedbackItems?.length) return NextResponse.json({ ok: true, processed: 0, reason: "no matching feedback" });

  const appIds = [...new Set(feedbackItems.map((f) => f.app_id))];
  const { data: projects } = await supabase
    .from("projects").select("app_id, asana_project_id").in("app_id", appIds);

  const projectIdByApp = new Map<string, string>();
  for (const p of projects ?? []) {
    if (p.asana_project_id) projectIdByApp.set(p.app_id, p.asana_project_id as string);
  }

  // Fetch sections per project once.
  const mapByProject = new Map<string, Awaited<ReturnType<typeof buildSectionMap>> | undefined>();
  await Promise.allSettled(
    [...new Set(projectIdByApp.values())].map(async (pid) => {
      const res = await fetch(
        `https://app.asana.com/api/1.0/projects/${pid}/sections?opt_fields=name`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (!res.ok) return;
      const json = await res.json();
      mapByProject.set(pid, buildSectionMap(json.data ?? []));
    }),
  );

  let updated = 0;
  await Promise.allSettled(
    feedbackItems.map(async (item) => {
      const pid = projectIdByApp.get(item.app_id);
      const map = pid ? mapByProject.get(pid) : undefined;
      if (!map) return;

      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (!res.ok) return;
      const json = await res.json();
      const memberships = (json?.data?.memberships ?? []) as Array<{ section?: { gid?: string } }>;
      const sectionGid = memberships[0]?.section?.gid;
      if (!sectionGid) return;

      const newStatus = gidToStatus(map, sectionGid);
      if (!newStatus) return;
      if (newStatus === item.status) return;

      await supabase.from("feedback").update({ status: newStatus }).eq("id", item.id);
      updated++;
    }),
  );

  return NextResponse.json({ ok: true, processed: taskGids.size, updated });
}
```

- [ ] **Step 2: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/webhook/asana/route.ts
git commit -m "refactor(webhook): use full section map in Asana→DB sync, drop binary resolved check"
```

---

### Task 8: Rewrite the cron reconciler around the new mapping

**Files:**
- Modify: `src/app/api/cron/sync-asana/route.ts` (entire file)

- [ ] **Step 1: Replace the cron with a single reconcile pass + screenshots + Cortex retry**

Replace the entire contents of `src/app/api/cron/sync-asana/route.ts` with:

```ts
// src/app/api/cron/sync-asana/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildSectionMap, gidToStatus, statusToGid, SectionMap } from "@/lib/asana-sections";
import { isFeedbackStatus, FeedbackStatus } from "@/lib/feedback-status";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const asanaPat = process.env.ASANA_PAT!;

interface ScreenshotElement { url?: string; }

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ----- Load every feedback row that has an Asana task -----
  const { data: linkedItems = [] } = await supabase
    .from("feedback")
    .select("id, app_id, asana_task_gid, status, elements, metadata")
    .not("asana_task_gid", "is", null);

  // ----- Load project → Asana project GID map, then fetch sections per project -----
  const appIds = [...new Set((linkedItems ?? []).map((i) => i.app_id))];
  const { data: projects = [] } = await supabase
    .from("projects").select("app_id, asana_project_id").in("app_id", appIds);
  const projectIdByApp = new Map<string, string>();
  for (const p of projects ?? []) {
    if (p.asana_project_id) projectIdByApp.set(p.app_id, p.asana_project_id as string);
  }
  const mapByProject = new Map<string, SectionMap>();
  await Promise.allSettled(
    [...new Set(projectIdByApp.values())].map(async (pid) => {
      const res = await fetch(
        `https://app.asana.com/api/1.0/projects/${pid}/sections?opt_fields=name`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (!res.ok) return;
      const json = await res.json();
      mapByProject.set(pid, buildSectionMap(json.data ?? []));
    }),
  );

  // ----- PASS 1: reconcile DB status against Asana section (drift catcher) -----
  let statusReconciled = 0;
  let orphaned = 0;
  const batchSize = 25;
  for (let i = 0; i < (linkedItems ?? []).length; i += batchSize) {
    const batch = (linkedItems ?? []).slice(i, i + batchSize);
    await Promise.allSettled(batch.map(async (item) => {
      const pid = projectIdByApp.get(item.app_id);
      const map = pid ? mapByProject.get(pid) : undefined;
      if (!map) return;

      const res = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}?opt_fields=memberships.section.gid`,
        { headers: { Authorization: `Bearer ${asanaPat}` } },
      );
      if (res.status === 404) {
        // Asana task was deleted → reset so Cortex retry recreates it.
        await supabase.from("feedback")
          .update({ asana_task_gid: null, status: "new" }).eq("id", item.id);
        orphaned++;
        return;
      }
      if (!res.ok) return;
      const json = await res.json();
      const sectionGid = (json?.data?.memberships?.[0]?.section?.gid) as string | undefined;
      if (!sectionGid) return;
      const asanaStatus = gidToStatus(map, sectionGid);
      if (!asanaStatus) return;

      // If DB and Asana disagree, the *source of truth* is whichever moved more
      // recently. We can't tell from cron alone, so prefer DB — only correct when
      // the DB status has no matching Asana section (e.g. status points at an
      // unmapped section and task is actually in a real column). Otherwise, if
      // DB disagrees with Asana, push DB → Asana to honour the resolved guard.
      if (asanaStatus === item.status) return;

      const dbGid = statusToGid(map, item.status as FeedbackStatus);
      if (dbGid) {
        // DB has a valid target section; move Asana to match.
        await fetch(`https://app.asana.com/api/1.0/sections/${dbGid}/addTask`, {
          method: "POST",
          headers: { Authorization: `Bearer ${asanaPat}`, "Content-Type": "application/json" },
          body: JSON.stringify({ data: { task: item.asana_task_gid } }),
        });
        statusReconciled++;
      } else if (isFeedbackStatus(asanaStatus)) {
        // DB status is invalid or unmapped; trust Asana.
        await supabase.from("feedback").update({ status: asanaStatus }).eq("id", item.id);
        statusReconciled++;
      }
    }));
  }

  // ----- PASS 2: attach screenshots to Asana tasks (idempotent via metadata flag) -----
  const { data: screenshotItems = [] } = await supabase
    .from("feedback").select("id, asana_task_gid, elements, metadata")
    .not("asana_task_gid", "is", null).not("elements", "is", null);
  let screenshotsAttached = 0;
  for (const item of (screenshotItems ?? [])) {
    const meta = (item.metadata as Record<string, unknown>) || {};
    if (meta._screenshots_attached) continue;
    const elements = item.elements as ScreenshotElement[];
    if (!Array.isArray(elements) || elements.length === 0) continue;
    let any = false;
    for (const el of elements) {
      if (!el?.url) continue;
      const r = await fetch(
        `https://app.asana.com/api/1.0/tasks/${item.asana_task_gid}/stories`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${asanaPat}`, "Content-Type": "application/json" },
          body: JSON.stringify({ data: { text: `Screenshot: ${el.url}` } }),
        },
      );
      if (r.ok) any = true;
    }
    if (any) {
      await supabase.from("feedback")
        .update({ metadata: { ...meta, _screenshots_attached: true } }).eq("id", item.id);
      screenshotsAttached++;
    }
  }

  // ----- PASS 3: retry Cortex for rows with status='new' and no Asana task -----
  const CORTEX_API_URL = process.env.CORTEX_API_URL || "";
  let retried = 0;
  let retryFailed = 0;
  if (CORTEX_API_URL) {
    const { data: pending = [] } = await supabase
      .from("feedback").select("id, app_id").eq("status", "new").is("asana_task_gid", null)
      .order("created_at", { ascending: true }).limit(20);
    for (const item of (pending ?? [])) {
      try {
        const r = await fetch(`${CORTEX_API_URL}/api/v1/feedback/${item.id}/retry`, {
          method: "POST", headers: { "Content-Type": "application/json" },
        });
        if (r.ok) retried++;
        else retryFailed++;
      } catch { retryFailed++; }
    }
  }

  return NextResponse.json({
    checked: (linkedItems ?? []).length,
    status_reconciled: statusReconciled,
    orphaned,
    screenshots_attached: screenshotsAttached,
    retried,
    retry_failed: retryFailed,
  });
}
```

- [ ] **Step 2: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/cron/sync-asana/route.ts
git commit -m "refactor(cron): unify sync around full section map, detect orphans, drop race hack"
```

---

### Task 9: Update the inbound submission endpoint to use `status='new'`

**Files:**
- Modify: `src/app/api/feedback/route.ts:160-164` (fallback insert path)

- [ ] **Step 1: Read the current fallback and update**

Read `src/app/api/feedback/route.ts` around line 160. Find the fallback insert that sets `status: 'pending_triage'` and change it to `status: 'new'`.

- [ ] **Step 2: Apply the edit**

Use Edit on `src/app/api/feedback/route.ts`. Change:

```ts
.insert({ ...feedbackRecord, status: 'pending_triage' })
```

to:

```ts
.insert({ ...feedbackRecord, status: 'new' })
```

- [ ] **Step 3: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/feedback/route.ts
git commit -m "refactor(feedback): use status='new' on fallback insert"
```

---

### Task 10: Add `PATCH /api/feedback/status` (dashboard writes)

**Files:**
- Create: `src/app/api/feedback/status/route.ts`
- Delete: `src/app/api/feedback/resolve/route.ts`

- [ ] **Step 1: Create the new endpoint**

```ts
// src/app/api/feedback/status/route.ts
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
```

- [ ] **Step 2: Delete the old endpoint**

```bash
git rm src/app/api/feedback/resolve/route.ts
```

- [ ] **Step 3: Verify no consumers remain**

```bash
grep -r "/api/feedback/resolve" src/ 2>&1 || echo clean
```

Expected: `clean` (dashboard will be rewritten in Tasks 11-14 to call the new endpoint).

- [ ] **Step 4: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/feedback/status/route.ts
git commit -m "feat(api): add PATCH /api/feedback/status (replaces /resolve)"
```

---

### Task 11: Extend `useDarkMode.ts` with per-status colours

**Files:**
- Modify: `src/app/dashboard/useDarkMode.ts`

- [ ] **Step 1: Read the current palette and extend it**

Read `src/app/dashboard/useDarkMode.ts`. Add a `statusColors` export that maps each of the 7 statuses to `{ bg, border, text }` tuples for light + dark mode.

- [ ] **Step 2: Apply the edit**

Add this to the bottom of `src/app/dashboard/useDarkMode.ts`:

```ts
import type { FeedbackStatus } from "@/lib/feedback-status";

export interface StatusColors { bg: string; border: string; text: string; }

export function statusColors(dark: boolean): Record<FeedbackStatus, StatusColors> {
  // Light + dark tuple per status. Colour vibe: new=slate, feature=purple,
  // bug=red, development=amber, testing=blue, on_hold=gray, completed=green.
  return dark ? {
    new:         { bg: "#1e293b", border: "#334155", text: "#cbd5e1" },
    feature:     { bg: "#2e1065", border: "#4c1d95", text: "#ddd6fe" },
    bug:         { bg: "#450a0a", border: "#7f1d1d", text: "#fecaca" },
    development: { bg: "#451a03", border: "#78350f", text: "#fed7aa" },
    testing:     { bg: "#172554", border: "#1e3a8a", text: "#bfdbfe" },
    on_hold:     { bg: "#111827", border: "#1f2937", text: "#9ca3af" },
    completed:   { bg: "#052e16", border: "#14532d", text: "#bbf7d0" },
  } : {
    new:         { bg: "#f1f5f9", border: "#cbd5e1", text: "#334155" },
    feature:     { bg: "#f5f3ff", border: "#ddd6fe", text: "#6d28d9" },
    bug:         { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c" },
    development: { bg: "#fff7ed", border: "#fed7aa", text: "#c2410c" },
    testing:     { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8" },
    on_hold:     { bg: "#f9fafb", border: "#e5e7eb", text: "#4b5563" },
    completed:   { bg: "#f0fdf4", border: "#bbf7d0", text: "#166534" },
  };
}
```

- [ ] **Step 3: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/useDarkMode.ts
git commit -m "feat(dashboard): add status colour palette"
```

---

### Task 12: Add `StatusBadge`, `FeedbackCard`, and `use-feedback-mutation`

**Files:**
- Create: `src/app/dashboard/StatusBadge.tsx`
- Create: `src/app/dashboard/FeedbackCard.tsx`
- Create: `src/app/dashboard/use-feedback-mutation.ts`

- [ ] **Step 1: Create the mutation hook**

```ts
// src/app/dashboard/use-feedback-mutation.ts
"use client";
import { useCallback, useState } from "react";
import type { FeedbackStatus } from "@/lib/feedback-status";

export function useFeedbackMutation() {
  const [pendingId, setPendingId] = useState<string | null>(null);

  const setStatus = useCallback(async (id: string, status: FeedbackStatus): Promise<boolean> => {
    setPendingId(id);
    try {
      const res = await fetch("/api/feedback/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      return res.ok;
    } finally {
      setPendingId(null);
    }
  }, []);

  return { setStatus, pendingId };
}
```

- [ ] **Step 2: Create the status badge**

```tsx
// src/app/dashboard/StatusBadge.tsx
import type { FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";
import { statusColors } from "./useDarkMode";

export function StatusBadge({ status, dark }: { status: FeedbackStatus; dark: boolean }) {
  const c = statusColors(dark)[status];
  return (
    <span
      style={{
        background: c.bg, border: `1px solid ${c.border}`, color: c.text,
        padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 500,
      }}
    >
      {statusToSectionName(status)}
    </span>
  );
}
```

- [ ] **Step 3: Create the feedback card**

```tsx
// src/app/dashboard/FeedbackCard.tsx
"use client";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";

export interface FeedbackItem {
  id: string;
  app_id: string;
  type: string | null;
  message: string;
  initials: string | null;
  status: FeedbackStatus;
  elements: Array<{ url: string }> | null;
  metadata: { url?: string; timestamp?: string; userAgent?: string } | null;
  created_at: string;
}

interface Props {
  item: FeedbackItem;
  dark: boolean;
  pending: boolean;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
}

export function FeedbackCard({ item, dark, pending, onStatusChange }: Props) {
  const bg = dark ? "#0f172a" : "#ffffff";
  const border = dark ? "#1e293b" : "#e5e7eb";
  const fg = dark ? "#e2e8f0" : "#111827";
  const meta = dark ? "#94a3b8" : "#6b7280";

  return (
    <div style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 8,
      padding: 12, marginBottom: 8, opacity: pending ? 0.5 : 1,
    }}>
      <div style={{ fontSize: 12, color: fg, marginBottom: 6, whiteSpace: "pre-wrap" }}>
        {item.message}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 10, color: meta }}>
          {item.initials ?? "??"} · {new Date(item.created_at).toLocaleDateString()}
        </div>
        <select
          value={item.status}
          disabled={pending}
          onChange={(e) => onStatusChange(item.id, e.target.value as FeedbackStatus)}
          style={{ fontSize: 10, padding: "2px 6px", borderRadius: 6 }}
        >
          {FEEDBACK_STATUSES.map((s) => (
            <option key={s} value={s}>{statusToSectionName(s)}</option>
          ))}
        </select>
      </div>
      {item.elements?.[0]?.url && (
        <a href={item.elements[0].url} target="_blank" rel="noopener"
           style={{ fontSize: 10, color: "#3b82f6", marginTop: 6, display: "inline-block" }}>
          Screenshot
        </a>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/StatusBadge.tsx src/app/dashboard/FeedbackCard.tsx src/app/dashboard/use-feedback-mutation.ts
git commit -m "feat(dashboard): add status badge, feedback card, mutation hook"
```

---

### Task 13: Add `KanbanColumn.tsx`

**Files:**
- Create: `src/app/dashboard/KanbanColumn.tsx`

- [ ] **Step 1: Create the column component**

```tsx
// src/app/dashboard/KanbanColumn.tsx
"use client";
import { FeedbackCard, type FeedbackItem } from "./FeedbackCard";
import type { FeedbackStatus } from "@/lib/feedback-status";
import { statusToSectionName } from "@/lib/feedback-status";
import { statusColors } from "./useDarkMode";

interface Props {
  status: FeedbackStatus;
  items: FeedbackItem[];
  dark: boolean;
  pendingId: string | null;
  onStatusChange: (id: string, status: FeedbackStatus) => void;
}

export function KanbanColumn({ status, items, dark, pendingId, onStatusChange }: Props) {
  const c = statusColors(dark)[status];
  return (
    <div style={{
      flex: "1 1 220px", minWidth: 220, display: "flex", flexDirection: "column",
      background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontWeight: 600, color: c.text, fontSize: 13 }}>
          {statusToSectionName(status)}
        </span>
        <span style={{ fontSize: 11, color: c.text, opacity: 0.75 }}>{items.length}</span>
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        {items.map((it) => (
          <FeedbackCard key={it.id} item={it} dark={dark}
            pending={pendingId === it.id} onStatusChange={onStatusChange} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 3: Commit**

```bash
git add src/app/dashboard/KanbanColumn.tsx
git commit -m "feat(dashboard): add Kanban column component"
```

---

### Task 14: Rebuild `DashboardClient.tsx` as a 7-column Kanban

**Files:**
- Modify: `src/app/dashboard/DashboardClient.tsx` (complete rewrite)
- Modify: `src/app/dashboard/page.tsx` (update props passed to `DashboardClient`)

- [ ] **Step 1: Replace `DashboardClient.tsx` entirely**

Replace the file with:

```tsx
// src/app/dashboard/DashboardClient.tsx
"use client";
import { useMemo, useState } from "react";
import { FEEDBACK_STATUSES, type FeedbackStatus } from "@/lib/feedback-status";
import { useDarkMode } from "./useDarkMode";
import { useFeedbackMutation } from "./use-feedback-mutation";
import { KanbanColumn } from "./KanbanColumn";
import type { FeedbackItem } from "./FeedbackCard";

interface Props {
  items: FeedbackItem[];
  total: number;
  appIds: string[];
}

export default function DashboardClient({ items, total, appIds }: Props) {
  const { dark, toggleDark } = useDarkMode();
  const [appFilter, setAppFilter] = useState<string>("all");
  const [localItems, setLocalItems] = useState(items);
  const { setStatus, pendingId } = useFeedbackMutation();

  const filtered = useMemo(
    () => appFilter === "all" ? localItems : localItems.filter((i) => i.app_id === appFilter),
    [localItems, appFilter],
  );

  const grouped = useMemo(() => {
    const g: Record<FeedbackStatus, FeedbackItem[]> = {
      new: [], feature: [], bug: [], development: [], testing: [], on_hold: [], completed: [],
    };
    for (const it of filtered) g[it.status].push(it);
    return g;
  }, [filtered]);

  const handleStatusChange = async (id: string, status: FeedbackStatus) => {
    const prev = localItems;
    setLocalItems(localItems.map((it) => it.id === id ? { ...it, status } : it)); // optimistic
    const ok = await setStatus(id, status);
    if (!ok) setLocalItems(prev); // rollback
  };

  const bg = dark ? "#0f172a" : "#f3f4f6";
  const fg = dark ? "#f1f5f9" : "#111827";

  return (
    <div style={{ minHeight: "100vh", background: bg, color: fg, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600 }}>Feedback</h1>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{filtered.length} of {total} items</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={appFilter} onChange={(e) => setAppFilter(e.target.value)}
            style={{ padding: "4px 8px", borderRadius: 6 }}>
            <option value="all">All apps</option>
            {appIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
          <button onClick={toggleDark} style={{ padding: "4px 10px", borderRadius: 6 }}>
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>
      <div style={{ display: "flex", gap: 10, flex: 1, overflow: "auto" }}>
        {FEEDBACK_STATUSES.map((s) => (
          <KanbanColumn key={s} status={s} items={grouped[s]} dark={dark}
            pendingId={pendingId} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Read the current `page.tsx` to understand how data loads**

Read `src/app/dashboard/page.tsx` and note what shape it currently passes into `DashboardClient`.

- [ ] **Step 3: Update `page.tsx` to pass the new shape**

Replace `src/app/dashboard/page.tsx` with (adjust data loading to match whatever SSR/RSC pattern the file already uses — the client-facing contract is the key change):

```tsx
// src/app/dashboard/page.tsx
import { createClient } from "@supabase/supabase-js";
import DashboardClient from "./DashboardClient";
import type { FeedbackItem } from "./FeedbackCard";
import DashboardError from "./DashboardError";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data, error } = await supabase
    .from("feedback")
    .select("id, app_id, type, message, initials, status, elements, metadata, created_at")
    .order("created_at", { ascending: false });

  if (error) return <DashboardError message={error.message} />;
  const items = (data ?? []) as FeedbackItem[];
  const appIds = [...new Set(items.map((i) => i.app_id))].sort();
  return <DashboardClient items={items} total={items.length} appIds={appIds} />;
}
```

- [ ] **Step 4: Build verification**

Run: `npm run build`
Expected: successful build.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/DashboardClient.tsx src/app/dashboard/page.tsx
git commit -m "feat(dashboard): rebuild as 7-column Kanban keyed on status"
```

---

### Task 15: Create the new Asana project for `speaker-placement-calc` and re-link tasks

**Files:**
- Create: `scripts/migrate-asana-project-speaker-placement-calc.ts`

This task requires a live Asana PAT and live Supabase credentials. Run it once, manually, not as part of CI.

- [ ] **Step 1: Write the migration script**

```ts
// scripts/migrate-asana-project-speaker-placement-calc.ts
// One-shot: create a fresh Asana project using Template A, re-create tasks for
// speaker-placement-calc feedback items that still have an asana_task_gid,
// and point the DB's projects.asana_project_id + mapping at the new project.

import { createClient } from "@supabase/supabase-js";

const ASANA_PAT = process.env.ASANA_PAT!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const WORKSPACE_GID = process.env.ASANA_WORKSPACE_GID!; // required env — set before running
const TEAM_GID = process.env.ASANA_TEAM_GID!;           // optional, but usually needed

const TEMPLATE_A_SECTIONS = ["New", "Feature", "Bug", "Development", "Testing", "On Hold", "Completed"];

async function asana(path: string, init?: RequestInit) {
  const res = await fetch(`https://app.asana.com/api/1.0${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${ASANA_PAT}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`asana ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  // 1. Create the project.
  const project = await asana("/projects", {
    method: "POST",
    body: JSON.stringify({
      data: {
        name: "(APP) Speaker Placement Calculator",
        workspace: WORKSPACE_GID,
        team: TEAM_GID || undefined,
        default_view: "board",
      },
    }),
  });
  const projectGid = project.data.gid as string;
  console.log("created project", projectGid);

  // 2. Create sections in order (Asana creates sections in reverse; we add top-down so they render correctly).
  //    We also delete the default "Untitled section" that Asana auto-creates.
  const existing = await asana(`/projects/${projectGid}/sections`);
  for (const s of existing.data) {
    if (s.name === "Untitled section") {
      await asana(`/sections/${s.gid}`, { method: "DELETE" });
    }
  }
  const createdSections: Array<{ gid: string; name: string }> = [];
  for (const name of TEMPLATE_A_SECTIONS) {
    const r = await asana(`/projects/${projectGid}/sections`, {
      method: "POST",
      body: JSON.stringify({ data: { name } }),
    });
    createdSections.push({ gid: r.data.gid, name });
  }
  console.log("created sections", createdSections.map((s) => s.name));

  // 3. Update projects row with new project_id.
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { error: projErr } = await supabase.from("projects").update({
    asana_project_id: projectGid,
    // asana_section_mapping is now auto-maintained by the cron; seed it here once.
    asana_section_mapping: Object.fromEntries(
      createdSections.map((s) => [s.name.toLowerCase().replace(/\s+/g, "_"), s.gid]),
    ),
  }).eq("app_id", "speaker-placement-calc");
  if (projErr) throw projErr;
  console.log("updated projects row");

  // 4. Recreate tasks for every feedback row that still has a (stale) asana_task_gid.
  //    The old gids pointed at the shared demo-app board; the new project needs fresh tasks.
  const { data: items = [], error: fbErr } = await supabase
    .from("feedback")
    .select("id, message, status, asana_task_gid")
    .eq("app_id", "speaker-placement-calc")
    .not("asana_task_gid", "is", null);
  if (fbErr) throw fbErr;

  const sectionByStatus = new Map(createdSections.map((s) => [
    s.name.toLowerCase().replace(/\s+/g, "_"),
    s.gid,
  ]));

  for (const item of items ?? []) {
    const targetGid = sectionByStatus.get(item.status) ?? sectionByStatus.get("new");
    const created = await asana("/tasks", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name: (item.message as string).slice(0, 100),
          notes: item.message,
          projects: [projectGid],
        },
      }),
    });
    const newTaskGid = created.data.gid as string;
    if (targetGid) {
      await asana(`/sections/${targetGid}/addTask`, {
        method: "POST",
        body: JSON.stringify({ data: { task: newTaskGid } }),
      });
    }
    await supabase.from("feedback").update({ asana_task_gid: newTaskGid }).eq("id", item.id);
    console.log(`relinked ${item.id} → ${newTaskGid} (${item.status})`);
  }

  console.log("done");
}

main().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Run the script with the required env**

```bash
cd /Users/thomas.palmer/Feedback-widget
export ASANA_PAT="$ASANA_PAT"  # already in .env.local
export NEXT_PUBLIC_SUPABASE_URL="$(grep ^NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d= -f2-)"
export SUPABASE_SERVICE_ROLE_KEY="$(grep ^SUPABASE_SERVICE_ROLE_KEY .env.local | cut -d= -f2-)"
export ASANA_WORKSPACE_GID="<workspace gid — ask user>"
export ASANA_TEAM_GID="<team gid — ask user>"
npx tsx scripts/migrate-asana-project-speaker-placement-calc.ts
```

Expected output: "created project …", "created sections …", "updated projects row", one "relinked …" per feedback item, "done".

- [ ] **Step 3: Unregister demo-app**

Run via `mcp__supabase__execute_sql`:

```sql
UPDATE public.projects
SET asana_project_id = NULL, asana_section_mapping = '{}'::jsonb
WHERE app_id = 'demo-app';
```

Expected: 1 row updated.

- [ ] **Step 4: Commit the script**

```bash
git add scripts/migrate-asana-project-speaker-placement-calc.ts
git commit -m "chore: one-shot script to create Template A project for speaker-placement-calc"
```

---

### Task 16: Coordinate the Cortex-side change

**Files:** none in this repo. This is a coordination note so executor flags it.

- [ ] **Step 1: Flag the Cortex dependency to the user**

After Task 15, the widget no longer writes `status='pending_triage'` (Task 9) and the DB's 7-value CHECK constraint (Task 3) rejects anything outside `{new, feature, bug, development, testing, on_hold, completed}`. Cortex's `POST /api/v1/feedback` handler currently writes `status='triaged'` after creating the Asana task — that insert will now FAIL the CHECK constraint until Cortex is updated.

Tell the user: **"Cortex's feedback ingestion needs a one-line change to write `status='new'` instead of `status='triaged'` when it inserts a new feedback row. Please open a ticket / PR in the Cortex repo. Until that ships, new submissions through Cortex will error with a CHECK constraint violation and fall through to the widget's direct-insert fallback."**

- [ ] **Step 2: (No commit — documentation-only.)**

---

### Task 17: End-to-end verification

**Files:** none.

- [ ] **Step 1: Submit a test feedback via the widget**

Open any instrumented app, click the widget, submit "E2E test — 2026-04-24". Note its UUID from the dashboard.

- [ ] **Step 2: Verify Asana state**

Within 10 seconds, the Asana task should appear in the project's **New** section (Cortex creates the task + sets `asana_task_gid`). The dashboard should show it in the **New** column.

If Cortex hasn't been updated (Task 16), the row will have `status='new'` in the DB but no `asana_task_gid`; the 5-min cron retry will re-drive Cortex.

- [ ] **Step 3: Transition through the lifecycle**

From the dashboard, change the status dropdown step-by-step: `new → bug → development → testing → completed`. After each change:

```bash
# Check DB
mcp__supabase__execute_sql "SELECT status, asana_task_gid FROM feedback WHERE id='<uuid>'"

# Check Asana section
curl -s -H "Authorization: Bearer $ASANA_PAT" \
  "https://app.asana.com/api/1.0/tasks/<asana_task_gid>?opt_fields=memberships.section.name" | jq
```

Expected at each step: DB status matches the dashboard selection; Asana task section name matches (case-sensitive, e.g. "Bug", "Development", "Testing", "Completed").

- [ ] **Step 4: Drag the task in Asana back to `Development`**

In the Asana Kanban UI, drag the test task from Completed → Development. Within ~10s, the Asana webhook should update the DB to `status='development'`. Verify with the same SQL.

- [ ] **Step 5: Simulate an orphan**

Delete the test Asana task entirely. Wait 5 minutes (or trigger the cron manually via `curl https://sonance-user-feedback.vercel.app/api/cron/sync-asana`). The DB row should now show `asana_task_gid=null`, `status='new'`, and (if Cortex is updated) a new Asana task should appear in the New column.

- [ ] **Step 6: No commit.** Document the outcome in the PR description or session handoff note.

---

## Self-Review

**Spec coverage:**
- ✅ Template A canonical — Tasks 1, 2, 15 (enum, mapping helper, new project using Template A sections).
- ✅ Drop `resolved` boolean — Task 3 (migration).
- ✅ Section-mapping keys Asana-authoritative — Task 8 (cron now fetches sections fresh every run) + Task 15 (initial seed).
- ✅ One sync rule both directions — Task 5 (DB → Asana), Task 7 (Asana → DB), Task 8 (drift catcher uses same map).
- ✅ Dashboard rebuild — Tasks 11-14.
- ✅ Orphan handling — Task 8 PASS 1 (404 → reset row) + Cortex retry via PASS 3.
- ✅ Separate speaker-placement-calc from demo-app — Task 15 Steps 1-3.
- ✅ Cortex coordination — Task 16.
- ✅ End-to-end verification — Task 17.

**Placeholder scan:** none found.

**Type consistency:** `FeedbackStatus`, `SectionMap`, `FeedbackItem`, `statusToSectionName`, `sectionNameToStatus`, `buildSectionMap`, `statusToGid`, `gidToStatus` all defined once (Tasks 1-2) and referenced consistently in later tasks (5, 7, 8, 10, 12-14).

**Ordering note for executor:** Run Tasks 1-14 in order (each is independent once the prior commit lands). **Do not run Task 15 in production until Task 16 is resolved** (Cortex-side change) — otherwise new submissions will hit the CHECK constraint. A safer order: 1-14 → Task 17 Step 1 (submit test, confirm widget fallback still works) → coordinate Task 16 → Task 15 → Task 17 Steps 2-6.
