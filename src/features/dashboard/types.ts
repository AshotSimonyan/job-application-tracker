import type { ReactNode } from "react";

import type { Database } from "@/lib/supabase/types";

export type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
};

export type DashboardStatusSummaryItem = {
  status: ApplicationStatus;
  label: string;
  count: number;
};

export type DashboardResumeItem = {
  id: string;
  name: string;
  filePath: string;
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

export type ApplicationMutationResult = {
  status: "success" | "error";
  message: string;
};

export type ResumeMutationResult = {
  status: "success" | "error";
  message: string;
};

export type ApplicationFormAction = (
  formData: FormData,
) => Promise<ApplicationMutationResult>;

export type ApplicationFormMode = "create" | "edit";

export type ApplicationFormProps = {
  action: ApplicationFormAction;
  resumes: DashboardResumeItem[];
  defaultValues: CreateApplicationFormValues;
  mode: ApplicationFormMode;
  title: string;
  description: string;
  submitLabel: string;
  successRedirectHref?: string;
  applicationId?: string;
  backHref?: string;
  backLabel?: string;
};

export type CreateApplicationFormProps = {
  action: ApplicationFormAction;
  resumes: DashboardResumeItem[];
  successRedirectHref?: string;
  backHref?: string;
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
  page: number;
  pageSize: number;
  search: string;
  totalApplications: number;
  totalPages: number;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
};

export type DashboardPipelineViewProps = {
  statusSummary: DashboardStatusSummaryItem[];
};

export type DashboardResumesViewProps = {
  resumes: DashboardResumeItem[];
  action: (formData: FormData) => Promise<ResumeMutationResult>;
};

export type ResumeUploadFormProps = {
  action: (formData: FormData) => Promise<ResumeMutationResult>;
};

export type ResumeDeleteButtonProps = {
  resumeId: string;
  resumeName: string;
};

export type DashboardApplicationsSearchParams = {
  page?: string | string[];
  q?: string | string[];
  sort?: string | string[];
  dir?: string | string[];
};

export type DashboardApplicationsPageProps = {
  searchParams: Promise<DashboardApplicationsSearchParams>;
};

export type DashboardApplicationEditPageParams = {
  applicationId: string;
};

export type DashboardApplicationEditPageProps = {
  params: Promise<DashboardApplicationEditPageParams>;
};

export type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  isBusy?: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export type ApplicationTableRowActionsProps = {
  applicationId: string;
  returnTo: string;
};

export type DashboardApplicationsPageData = {
  applications: DashboardApplicationItem[];
  page: number;
  pageSize: number;
  search: string;
  totalApplications: number;
  totalPages: number;
  sortBy: DashboardApplicationsSortField;
  sortDirection: DashboardApplicationsSortDirection;
};

export type DashboardApplicationsSortField =
  | "updated_at"
  | "title"
  | "company"
  | "status"
  | "applied_at";

export type DashboardApplicationsSortDirection = "asc" | "desc";

export type ApplicationStatusBadgeProps = {
  status: ApplicationStatus;
  label?: string;
  className?: string;
};
