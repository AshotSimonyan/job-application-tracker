# Job Application Tracker

A production-style Next.js portfolio project scaffold for tracking job applications. This repo uses the App Router, TypeScript, Tailwind CSS, and a feature-oriented structure prepared for future Supabase auth, database, and storage integration.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9
- Prettier 3
- Supabase SSR utilities scaffolded for future integration

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` builds the app for production.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint across the repo.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run format` formats the repo with Prettier.
- `npm run format:check` verifies formatting.

## Environment

Copy `.env.example` into `.env.local` when you are ready to connect Supabase.

## Folder Structure

```text
src/
  app/                  Next.js routes, route groups, and layouts
  components/           Shared layout and UI primitives
  config/               Site-wide metadata and navigation config
  features/             Feature-oriented UI modules
  lib/                  Shared utilities and Supabase helpers
```

## Supabase Readiness

The project includes browser and server Supabase client factories, environment validation helpers, and a placeholder database type definition so you can layer in auth, data access, and storage later without restructuring the app.

## Database

Initial Supabase schema files live in `supabase/migrations/`.

- `20260307123000_initial_schema.sql` sets up the first app tables, enums, triggers, and row-level security policies.
- `docs/database-schema.md` documents the table responsibilities and relationships.
