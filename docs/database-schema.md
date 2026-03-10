# Database Schema

This is the MVP Supabase schema for the Job Application Tracker. It keeps the data model intentionally small so the first real product features can be built without extra tables.

## Tables

### `profiles`
One row per authenticated user.

Fields:
- `id` references `auth.users.id`
- `created_at`
- `updated_at`

### `resumes`
Stores metadata for uploaded resume files.

Fields:
- `id`
- `user_id`
- `name`
- `file_path`
- `created_at`
- `deleted_at` for soft deletes

### `job_applications`
Main MVP pipeline table.

Fields:
- `id`
- `user_id`
- `title`
- `company`
- `location`
- `source`
- `url`
- `status`
- `notes`
- `resume_id`
- `applied_at`
- `created_at`
- `updated_at`
- `deleted_at` for soft deletes

## Status enum

`application_status`
- `saved`
- `applied`
- `interview`
- `offer`
- `rejected`

## Security model

Row Level Security is enabled only for:
- `profiles`
- `resumes`
- `job_applications`

Rules:
- users can only access rows that belong to them
- normal reads only return active rows where `deleted_at` is `null`
- `profiles` is keyed directly by `auth.uid()`

## Included automation

The schema includes:
- an `updated_at` trigger helper
- a trigger that creates a `profiles` row automatically when a new auth user is created

## Why this is the MVP

This is enough to support the next product steps:
- load the signed-in user's profile
- create and list job applications
- attach a resume to an application
- archive resumes and applications without hard deleting database rows
- replace the static dashboard with real data
