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

const buildUpdatedLabel = (appliedAt: string | null, updatedAt: string, createdAt: string) => {
  if (appliedAt) {
    return `Applied ${formatDate(appliedAt)}`;
  }

  const sourceDate = updatedAt || createdAt;

  return `Updated ${formatDate(sourceDate)}`;
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

const buildApplications = (
  applications: {
    id: string;
    company: string;
    title: string;
    status: ApplicationStatus;
    applied_at: string | null;
    updated_at: string;
    created_at: string;
  }[],
): DashboardApplicationItem[] => {
  return applications.map((application) => ({
    id: application.id,
    company: application.company,
    title: application.title,
    status: statusDisplayMap[application.status],
    updatedLabel: buildUpdatedLabel(
      application.applied_at,
      application.updated_at,
      application.created_at,
    ),
  }));
};

export const getDashboardData = async (): Promise<DashboardData> => {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      applicationCount: 0,
      resumeCount: 0,
      memberSinceLabel: "Recently joined",
      metrics: buildMetrics(0, 0, {
        saved: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      }),
      applications: [],
      statusSummary: buildStatusSummary({
        saved: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0,
      }),
    };
  }

  const [{ data: profile }, { count: resumeCount }, { data: applications }] = await Promise.all([
    supabase.from("profiles").select("created_at").eq("id", user.id).maybeSingle(),
    supabase
      .from("resumes")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("job_applications")
      .select("id, company, title, status, applied_at, updated_at, created_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false }),
  ]);

  const safeResumeCount = resumeCount ?? 0;
  const safeApplications = applications ?? [];
  const statusSummary = safeApplications.reduce<Record<ApplicationStatus, number>>(
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
    applicationCount: safeApplications.length,
    resumeCount: safeResumeCount,
    memberSinceLabel: profile?.created_at
      ? `Member since ${formatDate(profile.created_at)}`
      : "Recently joined",
    metrics: buildMetrics(safeApplications.length, safeResumeCount, statusSummary),
    applications: buildApplications(safeApplications),
    statusSummary: buildStatusSummary(statusSummary),
  };
};
