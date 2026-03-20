# Feedback Widget → Cortex Integration Architecture

**Date**: 2026-03-10 (updated 2026-03-19)
**Status**: Phase 2 in progress — auto-triage working locally, Cortex PRs pending merge

---

## Problem

- Feedback widget collects user feedback into Supabase, but there's no automated pipeline from feedback → task → fix → shipped
- Triage was manual (`/triagefb` slash command run per-project)
- No shared visibility across power users (Thomas, Elliott, Derrick, Ari)
- No tracking of what's been triaged, what's in progress, what shipped
- The standalone Next.js app at `sonance-user-feedback.vercel.app` is an extra deployment to maintain

## Vision

One architecture, two experiences. Power users work in Claude Code and own the full loop. Vibecoders never see a line of code — they live in Asana, approve AI-generated PRs, and test their app in the browser. Both flows are powered by the same Cortex feedback MCP and Asana pipeline.

As Dana scales AI-assisted development to non-technical employees, every new app launches into **required beta** with the feedback widget enabled. Feedback flows in, AI triages and fixes, humans approve — the entire cycle is visible and managed in Asana.

---

## Current State (2026-03-19)

### What's deployed and working

| Component | URL / Location | Status |
|-----------|---------------|--------|
| Cortex API (prod) | `https://cortex-bice.vercel.app` | UP — `POST /api/v1/feedback` live with auto-triage |
| Feedback widget app | `https://sonance-user-feedback.vercel.app` | UP — still serving, consumer apps point here |
| Widget npm package | `@danainnovations/feedback-widget` v0.2.7 | Published — widget posts to `{apiBaseUrl}/api/feedback` |
| Feedback DB | Supabase `kmlsiaasvgiwtxqxqkbb` | 98 items (20 pending, 22 triaged, 56 resolved), 19 with Asana tasks |

### Registered projects

| app_id | Asana configured | auto_agent_enabled | owner_type |
|--------|------------------|--------------------|------------|
| `speaker-placement-calc` | yes | no | power_user |
| `demo-app` | yes | yes | power_user |
| `logistics-agent` | no | no | power_user |
| `sonance-sales-reports` | no | no | power_user |

### Known blockers

1. **Path mismatch**: Widget hardcodes `{apiBaseUrl}/api/feedback`. Cortex serves at `/api/v1/feedback`. No `apiBaseUrl` value satisfies both.
2. **Screenshot upload**: Widget uploads to `{apiBaseUrl}/api/screenshot`. Cortex has no screenshot endpoint.

---

## Architecture

### Target flow (widget → Cortex directly)

```
User submits feedback (widget in browser)
    ↓
POST /api/v1/feedback → Cortex (cortex-bice.vercel.app)
    ↓
Cortex validates payload + app_id
    ↓
Cortex inserts into Supabase feedback table (status: "pending_triage")
    ↓
Returns { success: true } immediately
    ↓
BackgroundTask: Haiku classifies → updates triage → creates Asana task
```

Widget posts directly to Cortex. No middleman. The standalone feedback-widget app (`sonance-user-feedback.vercel.app`) is retired once migration is complete.

### Why direct to Cortex (not through the feedback-widget app)

- **One fewer server**: Consumer apps + Cortex. No proxy needed.
- **Single source of truth**: Cortex owns insert + triage + Asana — no split responsibility
- **Local dev**: 2 servers (app + Cortex), not 3
- **Reliability**: If Cortex is down, submissions fail clearly instead of silently skipping triage

### Triage strategy: per-submission (updated from batch)

The original architecture proposed batch triage every 5 minutes. PR #172 changes this to **per-submission auto-triage** via FastAPI `BackgroundTask`. This is better because:

- **Instant Asana tasks**: feedback appears in Asana within ~5 seconds, not up to 5 minutes
- **Simpler**: No cron job or scheduled task infrastructure
- **Same resilience**: If triage fails, item stays `pending_triage` — `triage_batch` MCP tool still exists for manual catch-up
- **Same cost**: One Haiku call per item either way

---

## What's done

**Cortex (all on `main`, deployed to `cortex-bice.vercel.app`):**
- Feedback MCP with 11 tools covering the full lifecycle (list, triage, Asana routing, task management, PR summaries, preview URLs)
- `POST /api/v1/feedback` — public REST endpoint, auto-triages via Haiku BackgroundTask, creates Asana task (~5s)
- `POST /api/v1/feedback/register` — registers new app, creates Asana project + sections, idempotent
- TriageEngine (Haiku via Apollo), smart Asana routing (auto-fixable high-confidence → Up Next, else → Backlog)
- `elements` field accepts `list | dict | None` for screenshot attachments
- DB schema: `feedback` table has `status`, `triage`, `asana_task_gid`, `preview_deploy_url` columns
- 4 registered projects, 2 with Asana configured (speaker-placement-calc, demo-app)
- PRs #166, #171, #172 code pushed to main (PRs can be closed)

**Feedback widget (`@danainnovations/feedback-widget` v0.2.7 on npm):**
- Widget UI (floating button, form, screenshot capture) — working
- CLI init (`npx @danainnovations/feedback-widget init`) — working
- `init.ts` locally updated to point at Cortex + use new registration endpoint (uncommitted)

**Verified locally (2026-03-19):**
- `curl POST localhost:8000/api/v1/feedback` → triaged + Asana task created within 5s

## Action items

1. **Add `/api/feedback` compat route in Cortex** — widget hardcodes `/api/feedback`, Cortex serves `/api/v1/feedback`. One alias route unblocks everything without an npm publish.
2. **Add `/api/screenshot` endpoint to Cortex** — widget uploads to `{apiBaseUrl}/api/screenshot`. Cortex has no screenshot endpoint. Should write to the same Supabase storage bucket (`feedback-screenshots`).
3. **Update widget default API base + publish** — commit the `init.ts` change (`DEFAULT_API_BASE` → `cortex-bice.vercel.app`), publish v0.3.0. Consumer apps pick up the new default on `npm update`.

---

## Local dev setup (target)

Two servers:

| Server | Port | Purpose |
|--------|------|---------|
| Consumer app (e.g. speaker-placement-calc) | 3000 | The app being tested |
| Cortex | 8000 | Receives feedback, triages, creates Asana tasks |

Widget `apiBaseUrl` in local dev: `http://localhost:8000`

Cortex must be on a branch with auto-triage code (currently `feature/auto-triage`, will be `main` after merge).

---

## User Personas

### Power User (Thomas, Elliott, Derrick, Ari)

Engineers and technical leads who use Claude Code daily.

**Their flow:**
1. Get notified of new feedback (Asana notification)
2. Optionally review triage classification in Asana
3. Run `/fix-next` in Claude Code or say "work on the next feedback task"
4. Claude Code pulls the task, investigates the codebase, codes the fix, opens a PR
5. Power user reviews the diff in Claude Code or GitHub, merges
6. Task auto-moves to "Shipped" in Asana

### Vibecoder (non-technical employee building with AI)

Product people, ops staff, designers — building apps with Claude Code but not comfortable reading code.

**Their flow:**
1. Their app is in required beta with the feedback widget installed
2. Beta testers submit feedback via the widget
3. AI triages and creates Asana tasks automatically
4. Easy bugs: AI codes the fix, opens a PR, vibecoder sees "Waiting for Review" with preview deploy link
5. Vibecoder tests the fix on the preview URL
6. If good, clicks "Approve" in Asana → merge + deploy
7. Complex items: vibecoder adds context, power user picks it up

**Key design principle:** The vibecoder flow works entirely within Asana + browser. No CLI, no git, no code review.

---

## Cortex Feedback MCP

### Location: `core/cortex/hermes/mcps/builtin/feedback/`

```
feedback/
├── __init__.py      # exports FeedbackMCP
├── mcp.py           # @register_mcp class, auth config, health check
├── client.py        # Supabase client for feedback DB
├── models.py        # Pydantic models (FeedbackItem, FeedbackProject, FeedbackSubmission, TriageResult)
├── engine.py        # TriageEngine — Haiku classification via Apollo
└── tools.py         # MCP tools (list, get, triage, resolve, etc.)
```

### MCP Tools

| Tool | Category | Auth | Description |
|------|----------|------|-------------|
| `list_feedback` | READ | No | Query feedback (filter by app_id, date, status) |
| `get_feedback` | READ | No | Get single item with full details + screenshots |
| `triage_feedback` | WRITE | No | Haiku-classify a single item by ID |
| `triage_batch` | WRITE | No | Triage all `pending_triage` items, create Asana tasks |
| `resolve_feedback` | WRITE | No | Mark feedback resolved, link to PR |
| `get_next_task` | READ | No | Pull top unassigned task from Asana |
| `update_task_status` | WRITE | No | Move task between Asana sections |

### REST Endpoints (public, CORS-enabled)

| Endpoint | Purpose |
|----------|---------|
| `POST /api/v1/feedback` | Accept widget submissions. Insert + auto-triage in background. |
| `POST /api/v1/feedback/register` | Register new app. Creates Asana project + sections + DB row. Idempotent. |
| `OPTIONS /api/v1/feedback` | CORS preflight |
| **TODO**: `POST /api/v1/feedback/screenshot` | Screenshot upload (currently only on feedback-widget app) |
| **TODO**: `POST /api/feedback` | Alias for `/api/v1/feedback` (path compat for widget) |

---

## Asana Project Structure

Each registered app gets an Asana project. Current section mapping:

| Section | Key | Purpose |
|---------|-----|---------|
| Backlog | `backlog` | Triaged items, not yet picked up |
| Up Next | `up_next` | Auto-fixable items (high confidence) routed here |
| In Progress | `in_progress` | Being worked on |
| Deferred | `deferred` | Deprioritized |
| Completed | `completed` | Done |

Auto-triage routing logic:
- `auto_fixable && confidence >= 0.7 && project.auto_agent_enabled` → **Up Next**
- Everything else → **Backlog**

---

## Database Schema

**Supabase project**: `kmlsiaasvgiwtxqxqkbb` (feedback DB — shared between feedback-widget app and Cortex)

**feedback table** (98 rows):

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| id | uuid | gen_random_uuid() | PK |
| app_id | text | — | required |
| type | text | — | bug, feature, etc. |
| message | text | — | required |
| initials | text | — | nullable |
| elements | jsonb | — | screenshot attachment metadata |
| metadata | jsonb | — | request forensics |
| resolved | boolean | false | legacy flag |
| created_at | timestamptz | now() | |
| status | text | 'pending_triage' | pending_triage → triaged → resolved |
| app_version | text | — | nullable |
| triage | jsonb | — | Haiku classification result |
| asana_task_gid | text | — | links to Asana task |
| preview_deploy_url | text | — | Vercel preview link |

**projects table** (4 rows):

| Column | Type | Default | Notes |
|--------|------|---------|-------|
| app_id | text | — | PK |
| name | text | — | required |
| created_at | timestamptz | now() | |
| github_repo | text | — | e.g. `Dana-Innovations/sales-reports` |
| asana_project_id | text | — | GID of Asana project |
| asana_section_mapping | jsonb | — | `{ "backlog": "gid", "up_next": "gid", ... }` |
| auto_agent_enabled | boolean | false | Route easy bugs for AI auto-fix |
| current_version | text | — | semver |
| beta_required | boolean | false | |
| owner_type | text | 'power_user' | power_user or vibecoder |
| vercel_project_id | text | — | For preview deploy linking |

---

## Open Questions

### Goal clarity

1. **What's the immediate goal?**
   → Demo first (speaker-placement-calc end-to-end: widget → triage → Asana task), then production for all consumer apps.

2. **Who is the audience for the demo?**
   → Internal tech and innovation team, ~20 people at Dana.

3. **Is the standalone feedback-widget app still serving a purpose?**
   → Yes. Keep it running — dashboard is reliable and tested. Screenshots are critical (must be saved to DB and attached to Asana tasks). Treat as legacy but don't delete. Both apps can work harmoniously.

### Architecture decisions

4. **Who makes Cortex changes?**
   → We can make changes but must submit as a PR; Elliott approves. Test everything locally before pushing. No haphazard PRs.

5. **Are screenshots required for the demo?**
   → Yes. Screenshots are inseparable from feedback — they must be saved and attached to Asana tasks.

6. **How should `apiBaseUrl` be configured?**
   → Long-term vision: a unified setup flow (CLI or Cortex MCP tool) that registers the project, creates the Asana board, and installs the widget — all in one step. `apiBaseUrl` gets set at setup time, not as a global package default. Both CLI (`npx @danainnovations/feedback-widget init`) and MCP tool should be able to do this.

7. **Widget → Cortex directly, or widget → feedback-widget app → Cortex?**
   → **For now: widget → feedback-widget app → Cortex.** Consumer apps don't change. Screenshots keep working. Triage + Asana is additive. Only this repo changes. If Cortex is down, feedback still gets saved. Demo runs against production (both apps already deployed on Vercel). End goal is to simplify — whether that means posting directly to Cortex or consolidating further, we'll decide once the core loop is proven.

8. **How does the feedback-widget app notify Cortex to triage?**
   → **Forward to Cortex, fall back to direct insert.** The `/api/feedback` route tries to POST to Cortex's `/api/v1/feedback`. If Cortex handles it → done (insert + triage + Asana). If Cortex is down → fall back to direct Supabase insert (feedback saved, no triage). No Cortex changes needed. No duplicates. No new endpoints. Screenshots still handled by this app. Verified locally on 2026-03-19 — submission was triaged + Asana task created within 5s.

9. **How does the feedback-widget app know the Cortex URL in production?**
   → Env var (`CORTEX_API_URL`) on the Vercel project. Can be set via Vercel CLI.
