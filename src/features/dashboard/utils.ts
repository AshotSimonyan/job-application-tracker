import {
  applicationStatusLabels,
  applicationStatusOrder,
} from "@/features/dashboard/content/dashboard-content";
import { cn } from "@/lib/utils/cn";

import type { ApplicationStatus } from "@/features/dashboard/types";

export const getDashboardFormValue = (formData: FormData, field: string) => {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
};

export const getNullableDashboardFormValue = (
  formData: FormData,
  field: string,
) => {
  const value = getDashboardFormValue(formData, field);

  return value || null;
};

export const getApplicationStatus = (value?: string | null): ApplicationStatus => {
  if (value && applicationStatusOrder.includes(value as ApplicationStatus)) {
    return value as ApplicationStatus;
  }

  return "saved";
};

export const getApplicationStatusLabel = (status: ApplicationStatus) => {
  return applicationStatusLabels[status];
};

export const getApplicationStatusBadgeClassName = (
  status: ApplicationStatus,
  className?: string,
) => {
  const toneClassName = {
    saved:
      "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200",
    applied:
      "border-blue-200 bg-blue-100 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-200",
    interview:
      "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200",
    offer:
      "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-200",
    rejected:
      "border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/40 dark:text-rose-200",
  } satisfies Record<ApplicationStatus, string>;

  return cn(
    "inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase",
    toneClassName[status],
    className,
  );
};

export const getApplicationStatusBarClassName = (status: ApplicationStatus) => {
  const barClassName = {
    saved: "bg-slate-400 dark:bg-slate-500",
    applied: "bg-blue-500 dark:bg-blue-400",
    interview: "bg-amber-500 dark:bg-amber-400",
    offer: "bg-emerald-500 dark:bg-emerald-400",
    rejected: "bg-rose-500 dark:bg-rose-400",
  } satisfies Record<ApplicationStatus, string>;

  return barClassName[status];
};

export const sanitizeStorageFileName = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
};
