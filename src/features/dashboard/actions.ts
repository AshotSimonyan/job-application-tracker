"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TablesInsert, TablesUpdate } from "@/lib/supabase/types";
import {
  getApplicationStatus,
  getDashboardFormValue,
  getNullableDashboardFormValue,
  sanitizeStorageFileName,
} from "@/features/dashboard/utils";

import type {
  ApplicationMutationResult,
  ResumeMutationResult,
} from "@/features/dashboard/types";

const resumeStorageBucket = "resumes";
const allowedResumeMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const maxResumeFileSize = 5 * 1024 * 1024;
const getSoftDeleteTimestamp = () => new Date().toISOString();

export const createJobApplicationAction = async (
  formData: FormData,
): Promise<ApplicationMutationResult> => {
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

export const updateJobApplicationAction = async (
  formData: FormData,
): Promise<ApplicationMutationResult> => {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase is not configured yet.",
    };
  }

  const applicationId = getDashboardFormValue(formData, "application_id");
  const title = getDashboardFormValue(formData, "title");
  const company = getDashboardFormValue(formData, "company");

  if (!applicationId || !title || !company) {
    return {
      status: "error",
      message: "Application, title, and company are required.",
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

  const payload: TablesUpdate<"job_applications"> = {
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

  const { data: application, error } = await supabase
    .from("job_applications")
    .update(payload)
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (!application) {
    return {
      status: "error",
      message: "Application not found.",
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    status: "success",
    message: "Application updated.",
  };
};

export const deleteJobApplicationAction = async (
  formData: FormData,
): Promise<ApplicationMutationResult> => {
  const applicationId = getDashboardFormValue(formData, "application_id");

  if (!isSupabaseConfigured() || !applicationId) {
    return {
      status: "error",
      message: "Unable to delete this application.",
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

  const { data: application, error } = await supabase
    .from("job_applications")
    .update({
      deleted_at: getSoftDeleteTimestamp(),
    })
    .eq("id", applicationId)
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (!application) {
    return {
      status: "error",
      message: "Application not found.",
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    status: "success",
    message: "Application archived.",
  };
};

export const uploadResumeAction = async (
  formData: FormData,
): Promise<ResumeMutationResult> => {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase is not configured yet.",
    };
  }

  const providedName = getDashboardFormValue(formData, "name");
  const resumeFile = formData.get("file");

  if (!(resumeFile instanceof File) || resumeFile.size === 0) {
    return {
      status: "error",
      message: "Choose a resume file to upload.",
    };
  }

  if (resumeFile.size > maxResumeFileSize) {
    return {
      status: "error",
      message: "Resume files must be smaller than 5 MB.",
    };
  }

  if (resumeFile.type && !allowedResumeMimeTypes.has(resumeFile.type)) {
    return {
      status: "error",
      message: "Upload a PDF, DOC, or DOCX file.",
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

  const originalFileName = resumeFile.name || "resume";
  const safeFileName =
    sanitizeStorageFileName(originalFileName) || `resume-${Date.now()}`;
  const storagePath = `${user.id}/${Date.now()}-${safeFileName}`;
  const displayName =
    providedName ||
    originalFileName.replace(/\.[a-z0-9]+$/i, "").trim() ||
    "Resume";

  const fileBytes = new Uint8Array(await resumeFile.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(resumeStorageBucket)
    .upload(storagePath, fileBytes, {
      cacheControl: "3600",
      contentType: resumeFile.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    return {
      status: "error",
      message:
        uploadError.message === "Bucket not found"
          ? "Create the `resumes` storage bucket before uploading files."
          : uploadError.message,
    };
  }

  const payload: TablesInsert<"resumes"> = {
    user_id: user.id,
    name: displayName,
    file_path: storagePath,
  };

  const { error: insertError } = await supabase.from("resumes").insert(payload);

  if (insertError) {
    await supabase.storage.from(resumeStorageBucket).remove([storagePath]);

    return {
      status: "error",
      message: insertError.message,
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    status: "success",
    message: "Resume uploaded.",
  };
};

export const deleteResumeAction = async (
  formData: FormData,
): Promise<ResumeMutationResult> => {
  const resumeId = getDashboardFormValue(formData, "resume_id");

  if (!isSupabaseConfigured() || !resumeId) {
    return {
      status: "error",
      message: "Unable to delete this resume.",
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

  const { data: resume, error: resumeError } = await supabase
    .from("resumes")
    .select("id")
    .eq("id", resumeId)
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .maybeSingle();

  if (resumeError || !resume) {
    return {
      status: "error",
      message: "Resume not found.",
    };
  }

  const { error: unlinkError } = await supabase
    .from("job_applications")
    .update({
      resume_id: null,
    })
    .eq("user_id", user.id)
    .eq("resume_id", resume.id)
    .is("deleted_at", null);

  if (unlinkError) {
    return {
      status: "error",
      message: unlinkError.message,
    };
  }

  const { data: deletedResume, error: deleteError } = await supabase
    .from("resumes")
    .update({
      deleted_at: getSoftDeleteTimestamp(),
    })
    .eq("id", resumeId)
    .eq("user_id", user.id)
    .is("deleted_at", null)
    .select("id")
    .maybeSingle();

  if (deleteError) {
    return {
      status: "error",
      message: deleteError.message,
    };
  }

  if (!deletedResume) {
    return {
      status: "error",
      message: "Resume not found.",
    };
  }

  revalidatePath("/dashboard", "layout");

  return {
    status: "success",
    message: "Resume archived.",
  };
};
