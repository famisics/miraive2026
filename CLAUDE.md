# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

For project overview and setup, see [README.md](./README.md).

## Command Guide

### Development

- `ni` — Install dependencies
- `nr dev` — Start all projects (Web + API) with Turbopack enabled
- `nr build` — Build all projects
- `nr api:dev` — Start API only (Cloudflare Workers via Wrangler)
- `nr web:dev` — Start Web only

### Quality Checks

Always run `nr ci` after implementing features (runs lint:fix + typecheck + format in one go).

Individual commands (rarely needed):
- `nr lint` — ESLint check
- `nr lint:fix` — ESLint auto-fix
- `nr typecheck` — TypeScript type check
- `nr format` — Prettier formatting

### Database

Run inside each package directory:

**Turso** (`packages/db-turso/`):
- `nr db:generate` — Generate schema changes
- `nr db:push` — Apply to DB directly

**Supabase** (`packages/db-supabase/`):
- `nr db:generate` — Generate schema changes
- `nr db:migrate` — Run migrations

### Deploy

- `nr web:vercel:deploy` — Deploy to Vercel
- `nr web:workers:deploy` — Deploy to Cloudflare Workers

## Directory Structure

```
ui-next-template/
├── apps/
│   ├── api/                   # Hono backend API (Cloudflare Workers)
│   │   └── src/
│   │       ├── index.ts       # App entry point + AppType export
│   │       ├── client.ts      # Type-safe RPC client factory
│   │       ├── db.ts          # DB switcher (Turso / Supabase)
│   │       └── routes/        # Route handlers
│   └── web/                   # Next.js frontend
│       └── src/
│           ├── middleware.ts  # Security headers
│           ├── consts.ts      # Route constants
│           ├── lib/
│           │   ├── api.ts     # API client factory (lazy proxy)
│           │   └── utils.ts   # cn() utility
│           ├── components/ui/ # shadcn/ui components
│           └── app/           # App Router pages
│               ├── layout.tsx
│               ├── page.tsx
│               ├── api/[[...route]]/route.ts  # Hono handler
│               ├── users/
│               └── microcms-users/
├── packages/
│   ├── config/                # Shared dev tool configs
│   │   ├── eslint/            # ESLint Flat Config (base + next)
│   │   ├── typescript/        # tsconfig (base, nextjs, library)
│   │   └── prettier/          # Prettier config
│   ├── db-turso/              # Turso + Drizzle ORM (SQLite)
│   ├── db-supabase/           # Supabase + Drizzle ORM (PostgreSQL)
│   └── cms-microcms/          # microCMS SDK wrapper
├── turbo.json                 # Turborepo task definitions
└── package.json               # Root workspace definition
```

## Architecture

### Monorepo

Turborepo manages workspaces (`apps/`, `packages/`). Dependencies resolved via `workspace:*` protocol (Bun). Task dependencies and caching controlled in `turbo.json`.

### Dual API Deployment

Hono handles requests both inside Next.js App Router (`/api/[[...route]]`) and as a standalone Cloudflare Workers app. This enables unified deployment with optional separation.

```
Client → Next.js API Route (/api/[[...route]])
                ↓
           Hono Router
                ↓
      Route Handlers (users, health)
                ↓
      Repository Layer (userRepository)
                ↓
      DB Client (Turso or Supabase)
```

### Type-Safe RPC

The API app exports `AppType` from `apps/api/src/index.ts`. The web app imports it via `@api/*` path alias to get end-to-end type inference through `hc<AppType>()`.

```typescript
// apps/web/src/lib/api.ts
import type { AppType } from '@api/index'
import { hc } from 'hono/client'

export const api = hc<AppType>(baseUrl)
// Usage: api.users.$get() — fully typed
```

### Repository Pattern

Both DB packages implement the same interface, enabling transparent switching in `apps/api/src/db.ts`:

```typescript
// Switch between Turso and Supabase by changing the import
import { userRepository } from '@packages/db-turso'
```

Methods: `getMany()`, `getOne(id)`, `create(data)`, `update(id, data)`, `remove(id)`

## Key Design Patterns

### Import Path Aliases

| Alias | Resolves To |
|-------|------------|
| `@web/*` | `apps/web/src/*` |
| `@api/*` | `apps/api/src/*` |
| `@packages/*` | `packages/*/src/*` |

### Zod Validation

All API request/response validation uses Zod schemas with `@hono/zod-validator`. Drizzle schemas are generated via `drizzle-zod` to keep DB and API types in sync.

### shadcn/ui Configuration

- Style: `new-york`, Icons: `lucide`, Base color: `zinc`
- Component config: `apps/web/components.json`
- Conditional class merging: `cn()` from `@web/lib/utils`

```typescript
import { cn } from '@web/lib/utils'
```

### ESLint Import Order

Imports are enforced in this order: `builtin` → `external` → `internal` → `parent` → `sibling` → `index`. Internal groups: `@packages/**`, `@web/**`, `@api/**`, CSS files last.

## Core Concepts

### Database Schema (users table)

Both `db-turso` and `db-supabase` define equivalent schemas:

| Column | Type | Notes |
|--------|------|-------|
| `id` | integer/serial | Primary key, auto-increment |
| `name` | text | Not null |
| `createdAt` | timestamp | Default: now |
| `updatedAt` | timestamp | Default: now |

### Security Middleware

`apps/web/src/middleware.ts` applies security headers to all routes except `/api/`, `/_next/`, `/favicon.ico`:
- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- `Referrer-Policy`, `Permissions-Policy` (camera/microphone/geolocation blocked)

## Common Tasks

### Add a New API Route

1. Create `apps/api/src/routes/your-route.ts` with a Hono router
2. Register it in `apps/api/src/routes/index.ts`
3. Validate requests/responses with Zod + `@hono/zod-validator`

### Add a New Page

1. Create a directory under `apps/web/src/app/your-page/`
2. Add `page.tsx` (server component by default)
3. Fetch data using the type-safe API client: `api.resource.$get()`
4. Register the route in `apps/web/src/consts.ts` if needed

### Change Database Schema

1. Edit schema in `packages/db-turso/src/schema.ts` (and/or `db-supabase`)
2. Run `nr db:generate` inside the package directory
3. Run `nr db:push` (Turso) or `nr db:migrate` (Supabase)

### Add a New shadcn/ui Component

```bash
cd apps/web
nlx shadcn@latest add <component-name>
```

### Add CMS Content Type

1. Define the type in `packages/cms-microcms/src/contents/your-type.ts`
2. Export it from `packages/cms-microcms/src/index.ts`

## TypeScript Configuration

Three tsconfig presets in `packages/config/typescript/`:

- `base.json` — ES2022 target, strict mode, `noEmit: true`
- `nextjs.json` — Extends base, adds DOM libs, JSX preserve, Next.js plugin
- `library.json` — Extends base, enables declarations + composite (for packages)

## Prettier Settings

`printWidth: 100`, `semi: false`, `singleQuote: true`, `bracketSameLine: true`, `arrowParens: 'avoid'`, `prettier-plugin-tailwindcss` enabled.
