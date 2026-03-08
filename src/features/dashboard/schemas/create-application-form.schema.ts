import * as yup from "yup";

import { applicationStatusOrder } from "@/features/dashboard/content/dashboard-content";

import type { CreateApplicationFormValues } from "@/features/dashboard/types";

export const createApplicationFormSchema: yup.ObjectSchema<CreateApplicationFormValues> =
  yup
    .object({
      title: yup.string().trim().required("Job title is required."),
      company: yup.string().trim().required("Company is required."),
      location: yup.string().trim().default(""),
      source: yup.string().trim().default(""),
      url: yup.string().trim().url("Enter a valid URL.").default(""),
      status: yup
        .mixed<CreateApplicationFormValues["status"]>()
        .oneOf([...applicationStatusOrder])
        .required("Status is required."),
      notes: yup.string().trim().default(""),
      applied_at: yup.string().trim().default(""),
      resume_id: yup.string().trim().default(""),
    })
    .required();
