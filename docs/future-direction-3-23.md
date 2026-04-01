# Future Direction: Beta Gate as Checklist Verifier

**Date**: 2026-03-23
**Context**: Post-demo learnings. The original vision was to have the beta gate do all setup in one shot. That's too much — it becomes maintenance hell. Instead, encourage people to check boxes earlier in their development process. The beta gate just verifies everything is in place and fills gaps.

---

## Core Principle

The beta gate is NOT a setup wizard. It's a **checklist verifier**.

Most checklist items should already be done by the time someone initiates beta. The existing Vibe Coding Pipeline (steps 1-6 below) naturally sets up GitHub, auth, DB, Vercel, branding, and security during development. The beta gate is the **final step** that verifies everything got done properly and fills any gaps.

---

## Vibe Coding Pipeline (existing)

This is the flow that vibecoders go through today when building an app with Claude Code:

```
User: "Build me an app that does X, Y, Z"
          │
          ▼
┌─────────────────────────────┐
│ 1. BRANDED POC              │  sonance_brand design → CSS theme
│    Create HTML prototype    │  → write file → show user
│    with Sonance branding    │
└────────────┬────────────────┘
             │ User approves
             ▼
┌─────────────────────────────┐
│ 2. VALIDATE REQUIREMENTS    │  Does it need a DB? (Supabase decision)
│    Present infra plan       │  Does it need auth? (Auth decision)
│    to user                  │  Present plan → user confirms
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ 3. BUILD IT                 │  Implement with modular code structure
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ 4. GITHUB + AUTH + DB       │  github create_repository + push
│    Create repo, set up      │  supabase create_project (if needed)
│    Supabase + Cortex auth   │  cortex auth setup (if needed)
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ 5. DEPLOY                   │  vercel deploy
│    Ship to Vercel           │  add redirect URIs
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ 6. QUALITY + BRAND CHECK    │  security scan, lint, code review
│    Run security, lint,      │  brand evaluation
│    code review, brand eval  │  fix errors if needed
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│ 7. BETA GATE  ← THIS IS THE NEW STEP   │
│    Verify all boxes checked             │
│    Fill gaps, don't duplicate           │
│    Install feedback widget              │
│    Register in Cortex                   │
│    Activate beta disclaimer             │
└─────────────────────────────────────────┘
             │
             ▼
         ✅ App is in official beta
```

The key insight: **steps 1-6 already do most of the work**. The beta gate (step 7) should primarily be verification, not creation. If a vibecoder already created an Asana board during step 4, the gate doesn't create another one — it just checks the box.

---

## Beta Gate Checklist

Each item has two verification steps:
1. **Exists?** — Does the thing exist at all?
2. **Meets standards?** — Does it meet Dana company standards?

Items are ordered by when they'd typically be set up in the pipeline:

| # | Item | Step 1: Exists? | Step 2: Meets standards? | Typical pipeline step | Can auto-fix? |
|---|------|-----------------|--------------------------|----------------------|---------------|
| 1 | **GitHub repo** | Repo exists | Under `Dana-Innovations` org, not personal | Step 4 | Move repo to org |
| 2 | **Vercel deployment** | Project deployed on Vercel | Under `sonance-vercel` team, not personal | Step 5 | Transfer project |
| 3 | **Backend / DB** | Supabase project exists (if needed) | Under Dana Supabase org | Step 4 | Flag only |
| 4 | **Authentication** | Auth is implemented | Uses Cortex/Okta SSO, not custom auth | Step 4 | Flag only |
| 5 | **Privacy/security screening** | Security scan passed | No critical/high vulnerabilities, no exposed secrets | Step 6 | Re-run scan |
| 6 | **Registered in Cortex** | App has a project record in Cortex | All metadata populated (app_id, github_repo, etc.) | Step 7 (new) | Auto-create |
| 7 | **Asana board** | Asana project exists for this app | Under T&I workspace, has correct sections + custom fields | Step 7 (new) | Auto-create if missing, verify if exists |
| 8 | **Feedback widget** | Widget installed in the app codebase | Configured with correct `apiBaseUrl`, posting to production | Step 7 (new) | Auto-install via CLI |
| 9 | **Beta disclaimer** | Disclaimer component shown to users | Visible banner/modal indicating the app is in beta | Step 7 (new) | Auto-install |
| 10 | **Brand compliance** | App uses Sonance design system | Passes brand evaluation score threshold | Step 6 | Flag only |

---

## What Cortex already knows how to check

From existing MCP integrations:

| Check | How Cortex can verify | MCP / API |
|-------|----------------------|-----------|
| GitHub repo exists under Dana-Innovations | `github.list_repos` or `github.get_repo` | GitHub MCP |
| Vercel project under sonance-vercel | `vercel.list_projects` or `vercel.get_project` | Vercel MCP |
| Supabase project exists | `supabase.list_projects` | Supabase MCP |
| Auth configured | Check for Cortex auth setup in project config | Cortex internal |
| Security scan | `security_scan.scan_code_security` | Security skill |
| Asana board exists | `asana.list_projects` in T&I workspace | Asana MCP |
| Feedback widget installed | Grep codebase for `@danainnovations/feedback-widget` | Filesystem/GitHub MCP |
| Brand compliance | `sonance_brand.evaluate_design` | Brand MCP |

---

## Prioritization note

Focus on making the beta gate usable for **orchestrators** (power users who manage the pipeline) first. Edge cases like midway joins, migration paths, and partial states will be handled by orchestrator judgment initially. A smooth linear UX for vibecoders to self-serve the gate is later down the road.

---

## Open questions

1. **What triggers the beta gate?** CLI command (`/beta-gate`)? MCP tool? Automatic when certain conditions are met?
2. **Is it blocking or advisory?** Does it prevent deployment, or just produce a report?
3. **Who sees the output?** Just the vibecoder? Their power user sponsor? A dashboard?
4. **How do we handle "meets standards" failures?** Auto-fix where possible, but what about things like "auth uses custom login instead of Cortex SSO" — that's a significant refactor, not a quick fix.
5. **Beta disclaimer** — is this a component in the feedback widget package, or a separate thing? What does it look like?
6. **Where does the checklist state live?** Cortex DB per-project? So we can track which items are checked over time?
