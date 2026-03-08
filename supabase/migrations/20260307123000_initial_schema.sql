create extension if not exists "uuid-ossp";

create type public.application_status as enum (
  'saved',
  'applied',
  'interview',
  'offer',
  'rejected'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  file_path text not null,
  created_at timestamptz not null default now()
);

create table public.job_applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  company text not null,
  location text,
  source text,
  url text,
  status public.application_status not null default 'saved',
  notes text,
  resume_id uuid references public.resumes (id) on delete set null,
  applied_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index resumes_user_id_idx on public.resumes (user_id);
create index job_applications_user_id_idx on public.job_applications (user_id);
create index job_applications_status_idx on public.job_applications (status);
create index job_applications_resume_id_idx on public.job_applications (resume_id);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger set_job_applications_updated_at
before update on public.job_applications
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.job_applications enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can manage their own resumes"
on public.resumes
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage their own job applications"
on public.job_applications
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);