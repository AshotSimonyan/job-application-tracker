import type { Database } from "@/lib/supabase/types";

export type ApplicationStatus = Database["public"]["Enums"]["application_status"];

export type DashboardMetric = {
  label: string;
  value: string;
  note: string;
};

export type DashboardApplicationItem = {
  id: string;
  company: string;
  title: string;
  status: string;
  updatedLabel: string;
};

export type DashboardStatusSummaryItem = {
  label: string;
  count: number;
};

export type DashboardData = {
  applicationCount: number;
  resumeCount: number;
  memberSinceLabel: string;
  metrics: DashboardMetric[];
  applications: DashboardApplicationItem[];
  statusSummary: DashboardStatusSummaryItem[];
};

export type DashboardShellProps = {
  data: DashboardData;
};

export type DashboardSidebarProps = {
  data: DashboardData;
};

export type DashboardOverviewProps = {
  data: DashboardData;
};
