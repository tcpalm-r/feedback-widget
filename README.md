# Feedback Widget

A customizable feedback widget for Next.js applications with element selection capability. Users can submit feedback with optional visual element references, making it easy to provide context about specific UI components.

## Features

- **Shadow DOM isolation** - Widget styles don't conflict with your application
- **Draggable positioning** - Users can reposition the widget and position persists across sessions
- **Element selection mode** - Users can visually select up to 5 UI elements to reference in their feedback
- **JWT-based user detection** - Automatically extracts user ID from JWT tokens in cookies or localStorage
- **Supabase backend** - Feedback is stored in a Supabase database with Row Level Security

## Installation

```bash
git clone <repository-url>
cd feedback-widget
npm install
```

## Environment Setup

Create a `.env.local` file in the project root with your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project details:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase project dashboard under **Settings > API**.

## Supabase Setup

### 1. Create a Supabase Project

If you don't have one already, create a project at [supabase.com](https://supabase.com).

### 2. Run the Database Migration

The migration file is located at `supabase/migrations/001_feedback_table.sql`. You can run it in one of two ways:

**Option A: Using the Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_feedback_table.sql`
4. Paste and run the SQL

**Option B: Using the Supabase CLI**

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Migration Details

The migration creates a `feedback` table with:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `app_id` | TEXT | Application identifier (required) |
| `type` | TEXT | Feedback type (Bug, Feature, General) |
| `message` | TEXT | Feedback message (required) |
| `elements` | JSONB | Selected element data (optional) |
| `metadata` | JSONB | Auto-captured metadata (URL, userAgent, timestamp, userId) |
| `created_at` | TIMESTAMPTZ | Submission timestamp |

Row Level Security policies:
- **Public INSERT**: Anyone can submit feedback
- **Authenticated SELECT**: Only authenticated users can read feedback

## Configuration Options

Initialize the widget before rendering:

```tsx
import { FeedbackWidget } from '@/components/FeedbackWidget';

// Initialize with required appId
FeedbackWidget.init({
  appId: 'your-app-id',
});
```

### Configuration Reference

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `appId` | string | Yes | - | Unique identifier for your application |
| `position` | string | No | `'bottom-right'` | Initial widget position |
| `jwtConfig` | object | No | See below | JWT detection settings |

### Position Options

- `'bottom-right'` (default)
- `'bottom-left'`
- `'top-right'`
- `'top-left'`

### JWT Configuration

Customize how the widget detects user identity:

```tsx
FeedbackWidget.init({
  appId: 'your-app-id',
  jwtConfig: {
    cookieKeys: ['my_auth_token', 'session_token'],
    localStorageKeys: ['auth.token', 'user_session'],
    userIdClaim: 'user_id', // JWT claim containing the user ID
  },
});
```

**Default JWT detection keys:**
- Cookies: `token`, `jwt`, `access_token`, `auth_token`, `sb-access-token`
- localStorage: `token`, `jwt`, `access_token`, `auth_token`, `supabase.auth.token`
- User ID claim: `sub` (with fallback to `user_id`)

## Example Integration

```tsx
'use client';

import { FeedbackWidget } from '@/components/FeedbackWidget';
import { useSyncExternalStore } from 'react';

// Initialize before rendering
FeedbackWidget.init({
  appId: 'my-app',
  position: 'bottom-right',
  jwtConfig: {
    cookieKeys: ['my_token'],
    userIdClaim: 'user_id',
  },
});

// Hook to ensure client-side rendering
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function MyPage() {
  const isClient = useIsClient();

  return (
    <div>
      {/* Your page content */}
      {isClient && <FeedbackWidget />}
    </div>
  );
}
```

## Development

```bash
# Start development server
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Run linting
npm run lint
```

Visit the demo page at [http://localhost:3000/demo](http://localhost:3000/demo) to test the widget.

## Project Structure

```
src/
├── app/
│   ├── demo/           # Demo page for testing
│   └── ...
├── components/
│   └── FeedbackWidget/
│       ├── index.tsx       # Main widget component
│       ├── FeedbackForm.tsx    # Form UI
│       ├── SelectionMode.tsx   # Element selection overlay
│       ├── ElementList.tsx     # Selected elements display
│       ├── styles.ts           # Shadow DOM styles
│       └── utils/
│           ├── config.ts       # Configuration management
│           ├── storage.ts      # localStorage helpers
│           ├── positionStore.ts    # Position state
│           ├── jwt.ts          # JWT detection
│           └── elements.ts     # Element detection
└── lib/
    └── supabase.ts     # Supabase client

supabase/
└── migrations/
    └── 001_feedback_table.sql

tests/
├── unit/               # Vitest unit tests
└── e2e/                # Playwright E2E tests
```

## License

MIT
