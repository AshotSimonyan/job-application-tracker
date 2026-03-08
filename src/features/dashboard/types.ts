import type { ReactNode } from "react";

import type { Database } from "@/lib/supabase/types";

export type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
};

export type DashboardStatusSummaryItem = {
  label: string;
  count: number;
};

export type DashboardResumeItem = {
  id: string;
  name: string;
  createdAt: string;
  createdAtLabel: string;
};

export type DashboardApplicationItem = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  source: string | null;
  url: string | null;
  status: ApplicationStatus;
  statusLabel: string;
  notes: string | null;
  resumeId: string | null;
  resumeName: string | null;
  appliedAt: string | null;
  appliedAtLabel: string | null;
  createdAt: string;
  updatedAt: string;
  updatedLabel: string;
};

export type DashboardData = {
  applicationCount: number;
  resumeCount: number;
  memberSinceLabel: string;
  metrics: DashboardMetric[];
  applications: DashboardApplicationItem[];
  recentApplications: DashboardApplicationItem[];
  statusSummary: DashboardStatusSummaryItem[];
  resumes: DashboardResumeItem[];
};

export type CreateApplicationFormValues = {
  title: string;
  company: string;
  location: string;
  source: string;
  url: string;
  status: ApplicationStatus;
  notes: string;
  applied_at: string;
  resume_id: string;
};

export type CreateApplicationActionResult = {
  status: "success" | "error";
  message: string;
};

export type CreateApplicationFormAction = (
  formData: FormData,
) => Promise<CreateApplicationActionResult>;

export type CreateApplicationFormProps = {
  action: CreateApplicationFormAction;
  resumes: DashboardResumeItem[];
};

export type DashboardShellProps = {
  data: DashboardData;
  children: ReactNode;
};

export type DashboardSidebarProps = {
  data: DashboardData;
};

export type DashboardOverviewProps = {
  data: DashboardData;
};

export type DashboardApplicationsViewProps = {
  applications: DashboardApplicationItem[];
};

export type DashboardPipelineViewProps = {
  statusSummary: DashboardStatusSummaryItem[];
};

export type DashboardResumesViewProps = {
  resumes: DashboardResumeItem[];
};
