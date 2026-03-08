"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TablesInsert } from "@/lib/supabase/types";
import {
  getApplicationStatus,
  getDashboardFormValue,
  getNullableDashboardFormValue,
} from "@/features/dashboard/utils";

import type { CreateApplicationActionResult } from "@/features/dashboard/types";

export const createJobApplicationAction = async (
  formData: FormData,
): Promise<CreateApplicationActionResult> => {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase is not configured yet.",
    };
  }

  const title = getDashboardFormValue(formData, "title");
  const company = getDashboardFormValue(formData, "company");

  if (!title || !company) {
    return {
      status: "error",
      message: "Title and company are required.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "Your session has expired. Sign in again.",
    };
  }

  const payload: TablesInsert<"job_applications"> = {
    user_id: user.id,
    title,
    company,
    location: getNullableDashboardFormValue(formData, "location"),
    source: getNullableDashboardFormValue(formData, "source"),
    url: getNullableDashboardFormValue(formData, "url"),
    status: getApplicationStatus(getDashboardFormValue(formData, "status")),
    notes: getNullableDashboardFormValue(formData, "notes"),
    resume_id: getNullableDashboardFormValue(formData, "resume_id"),
    applied_at: getNullableDashboardFormValue(formData, "applied_at"),
  };

  const { error } = await supabase.from("job_applications").insert(payload);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    status: "success",
    message: "Application added.",
  };
};
