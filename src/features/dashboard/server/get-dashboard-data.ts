import { cache } from "react";

import {
  applicationStatusLabels,
  applicationStatusOrder,
} from "@/features/dashboard/content/dashboard-content";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import type {
  ApplicationStatus,
  DashboardApplicationItem,
  DashboardData,
  DashboardMetric,
  DashboardResumeItem,
  DashboardStatusSummaryItem,
} from "@/features/dashboard/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const statusDisplayMap: Record<ApplicationStatus, string> = {
  saved: applicationStatusLabels.saved,
  applied: applicationStatusLabels.applied,
  interview: applicationStatusLabels.interview,
  offer: applicationStatusLabels.offer,
  rejected: applicationStatusLabels.rejected,
};

const pluralize = (count: number, singular: string, plural?: string) => {
  if (count === 1) {
    return singular;
  }

  return plural ?? `${singular}s`;
};

const formatDate = (value: string) => {
  return dateFormatter.format(new Date(value));
};

const buildUpdatedLabel = (
  appliedAt: string | null,
  updatedAt: string,
  createdAt: string,
) => {
  if (appliedAt) {
    return `Applied ${formatDate(appliedAt)}`;
  }

  return `Updated ${formatDate(updatedAt || createdAt)}`;
};

const buildMetrics = (
  totalApplications: number,
  resumeCount: number,
  statusSummary: Record<ApplicationStatus, number>,
): DashboardMetric[] => {
  return [
    {
      label: "Applications",
      value: String(totalApplications),
      note:
        totalApplications > 0
          ? `${statusSummary.saved} saved, ${statusSummary.applied} applied`
          : "Start by saving the first role you want to track.",
    },
    {
      label: "Interviews",
      value: String(statusSummary.interview),
      note:
        statusSummary.interview > 0
          ? `${statusSummary.interview} ${pluralize(statusSummary.interview, "role")} in progress`
          : "No interviews scheduled yet.",
    },
    {
      label: "Resumes",
      value: String(resumeCount),
      note:
        resumeCount > 0
          ? `${resumeCount} ${pluralize(resumeCount, "version")} ready to attach`
          : "Add a resume once storage is connected.",
    },
  ];
};

const buildStatusSummary = (
  statusSummary: Record<ApplicationStatus, number>,
): DashboardStatusSummaryItem[] => {
  return applicationStatusOrder.map((status) => ({
    label: statusDisplayMap[status],
    count: statusSummary[status],
  }));
};

const buildResumes = (
  resumes: {
    id: string;
    name: string;
    created_at: string;
  }[],
): DashboardResumeItem[] => {
  return resumes.map((resume) => ({
    id: resume.id,
    name: resume.name,
    createdAt: resume.created_at,
    createdAtLabel: formatDate(resume.created_at),
  }));
};

const buildApplications = (
  applications: {
    id: string;
    title: string;
    company: string;
    location: string | null;
    source: string | null;
    url: string | null;
    status: ApplicationStatus;
    notes: string | null;
    resume_id: string | null;
    applied_at: string | null;
    created_at: string;
    updated_at: string;
  }[],
  resumes: DashboardResumeItem[],
): DashboardApplicationItem[] => {
  const resumeMap = new Map(resumes.map((resume) => [resume.id, resume.name]));

  return applications.map((application) => ({
    id: application.id,
    title: application.title,
    company: application.company,
    location: application.location,
    source: application.source,
    url: application.url,
    status: application.status,
    statusLabel: statusDisplayMap[application.status],
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
    updatedLabel: buildUpdatedLabel(
      application.applied_at,
      application.updated_at,
      application.created_at,
    ),
  }));
};

const getEmptyDashboardData = (): DashboardData => {
  const emptySummary = {
    saved: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  } satisfies Record<ApplicationStatus, number>;

  return {
    applicationCount: 0,
    resumeCount: 0,
    memberSinceLabel: "Recently joined",
    metrics: buildMetrics(0, 0, emptySummary),
    applications: [],
    recentApplications: [],
    statusSummary: buildStatusSummary(emptySummary),
    resumes: [],
  };
};

export const getDashboardData = cache(async (): Promise<DashboardData> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return getEmptyDashboardData();
  }

  const [{ data: profile }, { data: resumeRows }, { data: applicationRows }] =
    await Promise.all([
      supabase.from("profiles").select("created_at").eq("id", user.id).maybeSingle(),
      supabase
        .from("resumes")
        .select("id, name, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("job_applications")
        .select(
          "id, title, company, location, source, url, status, notes, resume_id, applied_at, created_at, updated_at",
        )
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false }),
    ]);

  const resumes = buildResumes(resumeRows ?? []);
  const applications = buildApplications(applicationRows ?? [], resumes);
  const statusSummary = applications.reduce<Record<ApplicationStatus, number>>(
    (summary, application) => {
      summary[application.status] += 1;
      return summary;
    },
    {
      saved: 0,
      applied: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    },
  );

  return {
    applicationCount: applications.length,
    resumeCount: resumes.length,
    memberSinceLabel: profile?.created_at
      ? `Member since ${formatDate(profile.created_at)}`
      : "Recently joined",
    metrics: buildMetrics(applications.length, resumes.length, statusSummary),
    applications,
    recentApplications: applications.slice(0, 3),
    statusSummary: buildStatusSummary(statusSummary),
    resumes,
  };
});
