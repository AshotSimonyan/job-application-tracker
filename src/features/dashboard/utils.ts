import { applicationStatusOrder } from "@/features/dashboard/content/dashboard-content";

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
