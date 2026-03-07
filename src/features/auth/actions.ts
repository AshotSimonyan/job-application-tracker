"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { buildAuthPath, getSafeRedirectPath } from "@/features/auth/utils";

const getFormValue = (formData: FormData, field: string) => {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
};

const getMissingEnvRedirect = (pathname: string, next?: string) => {
  return buildAuthPath(pathname, {
    error:
      "Supabase is not configured yet. Add your local environment variables first.",
    next,
  });
};

export const signInAction = async (formData: FormData) => {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const next = getSafeRedirectPath(getFormValue(formData, "next"));

  if (!isSupabaseConfigured()) {
    redirect(getMissingEnvRedirect("/auth/sign-in", next));
  }

  if (!email || !password) {
    redirect(
      buildAuthPath("/auth/sign-in", {
        error: "Enter your email and password.",
        next,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      buildAuthPath("/auth/sign-in", {
        error: error.message,
        next,
      }),
    );
  }

  revalidatePath("/", "layout");
  redirect(next);
};

export const signUpAction = async (formData: FormData) => {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const next = getSafeRedirectPath(getFormValue(formData, "next"));

  if (!isSupabaseConfigured()) {
    redirect(getMissingEnvRedirect("/auth/sign-up", next));
  }

  if (!email || !password) {
    redirect(
      buildAuthPath("/auth/sign-up", {
        error: "Enter your email and password.",
        next,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const origin = (await headers()).get("origin");
  const emailRedirectTo = origin
    ? `${origin}/auth/confirm?next=${encodeURIComponent(next)}`
    : undefined;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: emailRedirectTo ? { emailRedirectTo } : undefined,
  });

  if (error) {
    redirect(
      buildAuthPath("/auth/sign-up", {
        error: error.message,
        next,
      }),
    );
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect(next);
  }

  redirect(
    buildAuthPath("/auth/sign-in", {
      success: "Check your email to confirm your account.",
      next,
    }),
  );
};

export const requestPasswordResetAction = async (formData: FormData) => {
  const email = getFormValue(formData, "email");

  if (!isSupabaseConfigured()) {
    redirect(getMissingEnvRedirect("/auth/forgot-password"));
  }

  if (!email) {
    redirect(
      buildAuthPath("/auth/forgot-password", {
        error: "Enter your email address.",
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const origin = (await headers()).get("origin");
  const emailRedirectTo = origin
    ? `${origin}/auth/confirm?next=${encodeURIComponent("/auth/reset-password")}`
    : undefined;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: emailRedirectTo,
  });

  if (error) {
    redirect(
      buildAuthPath("/auth/forgot-password", {
        error: error.message,
      }),
    );
  }

  redirect(
    buildAuthPath("/auth/forgot-password", {
      success:
        "If an account exists for that email, a reset link has been sent.",
    }),
  );
};

export const updatePasswordAction = async (formData: FormData) => {
  const password = getFormValue(formData, "password");

  if (!isSupabaseConfigured()) {
    redirect(getMissingEnvRedirect("/auth/reset-password"));
  }

  if (!password) {
    redirect(
      buildAuthPath("/auth/reset-password", {
        error: "Enter a new password.",
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      buildAuthPath("/auth/forgot-password", {
        error: "Your reset session has expired. Request a new reset link.",
      }),
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(
      buildAuthPath("/auth/reset-password", {
        error: error.message,
      }),
    );
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
};

export const signOutAction = async () => {
  if (!isSupabaseConfigured()) {
    redirect(
      buildAuthPath("/auth/sign-in", {
        error:
          "Supabase is not configured yet. Add your local environment variables first.",
      }),
    );
  }

  const supabase = await createServerSupabaseClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect(
    buildAuthPath("/auth/sign-in", {
      success: "You have signed out.",
    }),
  );
};
