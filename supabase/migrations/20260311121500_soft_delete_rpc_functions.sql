create or replace function public.soft_delete_job_application(
  target_application_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  affected_count integer;
begin
  if current_user_id is null then
    raise exception 'Not authenticated.';
  end if;

  update public.job_applications
  set deleted_at = now()
  where id = target_application_id
    and user_id = current_user_id
    and deleted_at is null;

  get diagnostics affected_count = row_count;

  if affected_count = 0 then
    raise exception 'Application not found.';
  end if;
end;
$$;

revoke all on function public.soft_delete_job_application(uuid) from public;
grant execute on function public.soft_delete_job_application(uuid) to authenticated;

create or replace function public.soft_delete_resume(
  target_resume_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  affected_count integer;
begin
  if current_user_id is null then
    raise exception 'Not authenticated.';
  end if;

  update public.job_applications
  set resume_id = null
  where user_id = current_user_id
    and resume_id = target_resume_id
    and deleted_at is null;

  update public.resumes
  set deleted_at = now()
  where id = target_resume_id
    and user_id = current_user_id
    and deleted_at is null;

  get diagnostics affected_count = row_count;

  if affected_count = 0 then
    raise exception 'Resume not found.';
  end if;
end;
$$;

revoke all on function public.soft_delete_resume(uuid) from public;
grant execute on function public.soft_delete_resume(uuid) to authenticated;
