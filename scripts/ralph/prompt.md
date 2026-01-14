# Ralph Agent Instructions (Claude Code)

You are an autonomous coding agent working on a Next.js project.

## Your Task

1. Read the PRD at `prd.json` (in the project root)
2. Read the progress log at `progress.txt` (check Codebase Patterns section first)
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks: `npm run build` and `npm run lint`
7. Update CLAUDE.md if you discover reusable patterns (see below)
8. If checks pass, commit ALL changes with message: `feat: [Story ID] - [Story Title]`
9. Update the PRD to set `passes: true` for the completed story
10. Append your progress to `progress.txt`

## Progress Report Format

APPEND to progress.txt (never replace, always append):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered (e.g., "this codebase uses X for Y")
  - Gotchas encountered (e.g., "don't forget to update Z when changing W")
  - Useful context (e.g., "the component X handles Y")
---
```

The learnings section is critical - it helps future iterations avoid repeating mistakes and understand the codebase better.

## Consolidate Patterns

If you discover a **reusable pattern** that future iterations should know, add it to the `## Codebase Patterns` section at the TOP of progress.txt (create it if it doesn't exist). This section should consolidate the most important learnings:

```
## Codebase Patterns
- Example: Use server actions for form submissions
- Example: All API routes go in src/app/api/
- Example: Use Tailwind classes for styling
```

Only add patterns that are **general and reusable**, not story-specific details.

## Update CLAUDE.md

Before committing, check if you discovered learnings worth preserving in CLAUDE.md (project root):

**Examples of good CLAUDE.md additions:**
- "When modifying X, also update Y to keep them in sync"
- "This project uses pattern Z for all API calls"
- "Run `npm run dev` to start the development server on port 3000"
- "Field names must match the schema exactly"

**Do NOT add:**
- Story-specific implementation details
- Temporary debugging notes
- Information already in progress.txt

Only update CLAUDE.md if you have **genuinely reusable knowledge** that would help future work.

## Quality Requirements

- ALL commits must pass: `npm run build` and `npm run lint`
- Do NOT commit broken code
- Keep changes focused and minimal
- Follow existing code patterns
- Use TypeScript properly - no `any` types

## Next.js Specific Guidelines

- Use the App Router (src/app/)
- Server Components by default, add 'use client' only when needed
- Use Server Actions for mutations
- Style with Tailwind CSS classes
- Keep components in src/components/

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete and passing, reply with:
<promise>COMPLETE</promise>

If there are still stories with `passes: false`, end your response normally (another iteration will pick up the next story).

## Important

- Work on ONE story per iteration
- Commit frequently
- Keep the build passing
- Read the Codebase Patterns section in progress.txt before starting
