import { notFound } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getApplicationStatusLabel } from "@/features/dashboard/utils";

import type { DashboardApplicationItem, DashboardResumeItem } from "@/features/dashboard/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const formatDate = (value: string) => {
  return dateFormatter.format(new Date(value));
};

export const getDashboardApplicationForEdit = async (
  applicationId: string,
): Promise<{
  application: DashboardApplicationItem;
  resumes: DashboardResumeItem[];
}> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const [{ data: application }, { data: resumes }] = await Promise.all([
    supabase
      .from("job_applications")
      .select(
        "id, title, company, location, source, url, status, notes, resume_id, applied_at, created_at, updated_at",
      )
      .eq("id", applicationId)
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase
      .from("resumes")
      .select("id, name, file_path, created_at")
      .eq("user_id", user.id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false }),
  ]);

  if (!application) {
    notFound();
  }

  const resumeItems: DashboardResumeItem[] = (resumes ?? []).map((resume) => ({
    id: resume.id,
    name: resume.name,
    filePath: resume.file_path,
    createdAt: resume.created_at,
    createdAtLabel: formatDate(resume.created_at),
  }));

  const resumeMap = new Map(resumeItems.map((resume) => [resume.id, resume.name]));

  return {
    application: {
      id: application.id,
      title: application.title,
      company: application.company,
      location: application.location,
      source: application.source,
      url: application.url,
      status: application.status,
      statusLabel: getApplicationStatusLabel(application.status),
      notes: application.notes,
      resumeId: application.resume_id,
      resumeName: application.resume_id
        ? (resumeMap.get(application.resume_id) ?? null)
        : null,
      appliedAt: application.applied_at,
      appliedAtLabel: application.applied_at
        ? formatDate(application.applied_at)
        : null,
      createdAt: application.created_at,
      updatedAt: application.updated_at,
      updatedLabel: application.applied_at
        ? `Applied ${formatDate(application.applied_at)}`
        : `Updated ${formatDate(application.updated_at || application.created_at)}`,
    },
    resumes: resumeItems,
  };
};
