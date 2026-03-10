alter table public.resumes
add column deleted_at timestamptz;

alter table public.job_applications
add column deleted_at timestamptz;

drop index if exists public.resumes_user_id_idx;
create index resumes_user_id_idx
on public.resumes (user_id)
where deleted_at is null;

drop index if exists public.job_applications_user_id_idx;
create index job_applications_user_id_idx
on public.job_applications (user_id)
where deleted_at is null;

drop index if exists public.job_applications_status_idx;
create index job_applications_status_idx
on public.job_applications (status)
where deleted_at is null;

drop index if exists public.job_applications_resume_id_idx;
create index job_applications_resume_id_idx
on public.job_applications (resume_id)
where deleted_at is null;

drop policy if exists "Users can manage their own resumes" on public.resumes;
drop policy if exists "Users can read their own active resumes" on public.resumes;
drop policy if exists "Users can insert their own active resumes" on public.resumes;
drop policy if exists "Users can update their own active resumes" on public.resumes;

create policy "Users can read their own active resumes"
on public.resumes
for select
using (auth.uid() = user_id and deleted_at is null);

create policy "Users can insert their own active resumes"
on public.resumes
for insert
with check (auth.uid() = user_id and deleted_at is null);

create policy "Users can update their own active resumes"
on public.resumes
for update
using (auth.uid() = user_id and deleted_at is null)
with check (auth.uid() = user_id);

drop policy if exists "Users can manage their own job applications" on public.job_applications;
drop policy if exists "Users can read their own active job applications" on public.job_applications;
drop policy if exists "Users can insert their own active job applications" on public.job_applications;
drop policy if exists "Users can update their own active job applications" on public.job_applications;

create policy "Users can read their own active job applications"
on public.job_applications
for select
using (auth.uid() = user_id and deleted_at is null);

create policy "Users can insert their own active job applications"
on public.job_applications
for insert
with check (auth.uid() = user_id and deleted_at is null);

create policy "Users can update their own active job applications"
on public.job_applications
for update
using (auth.uid() = user_id and deleted_at is null)
with check (auth.uid() = user_id);
