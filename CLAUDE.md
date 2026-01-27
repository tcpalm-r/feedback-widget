# Feedback Widget - Claude Code Instructions

## Project Overview
A Next.js project with a feedback widget component using the Ralph autonomous agent pattern.

## Tech Stack
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- npm for package management

## Key Commands
- `npm run dev` - Start development server on port 3005 (auto-kills existing process)
- `npm run build` - Build for production (also runs type checking)
- `npm run lint` - Run ESLint

## Dev Server
- Always run dev server on port 3005
- The dev script should kill any existing process on that port and remove the Next.js lock file before starting
- Example: `"dev": "lsof -ti:3005 | xargs kill -9 2>/dev/null; rm -f .next/dev/lock; next dev -p 3005"`

## Project Structure
- `src/app/` - App Router pages and API routes
- `src/components/` - React components
- `scripts/ralph/` - Ralph autonomous agent loop

## Running Ralph
```bash
./scripts/ralph/ralph.sh [max_iterations]
```

Ralph reads `prd.json` and autonomously implements user stories one at a time.

## Conventions
- Use Server Components by default
- Add 'use client' directive only when needed for interactivity
- Style with Tailwind CSS classes
- Use Server Actions for form mutations when possible


## Golden Rules
- Keep component files concise, clean and easy to understand. Under 300 lines of code. Suggest refactoring if needed.
- Keep the codebase modular and easy to maintain.
- Keep the codebase efficient and easy to optimize.
- Keep the codebase secure and easy to audit.
- Keep the codebase easy to test and easy to debug.
- Keep the codebase easy to deploy on vercel and easy to scale.