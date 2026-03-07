"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { buildAuthPath, getSafeRedirectPath } from "@/features/auth/utils";

const getFormValue = (formData: FormData, field: string) => {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
};

export const signInAction = async (formData: FormData) => {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const next = getSafeRedirectPath(getFormValue(formData, "next"));

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

export const signOutAction = async () => {
  const supabase = await createServerSupabaseClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect(
    buildAuthPath("/auth/sign-in", {
      success: "You have signed out.",
    }),
  );
};
