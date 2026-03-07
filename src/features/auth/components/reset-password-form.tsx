"use client";

import Link from "next/link";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { resetPasswordFormSchema } from "@/features/auth/schemas/auth-form.schema";
import type {
  ResetPasswordFormProps,
  ResetPasswordFormValues,
} from "@/features/auth/types";
import { cn } from "@/lib/utils/cn";

export const ResetPasswordForm = ({
  action,
  message,
}: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordFormSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    formData.set("password", values.password);
    setIsLoading(true);

    void (async () => {
      await action(formData);
      setIsLoading(false);
    })();
  });

  const isBusy = isSubmitting || isLoading;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
          Set a new password
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          Choose a new password for your account and continue back into your
          workspace.
        </p>
      </div>

      {message ? (
        <div
          className={
            message.type === "error"
              ? "rounded-[1.5rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/30 dark:text-red-200"
              : "rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-950/60 dark:bg-emerald-950/30 dark:text-emerald-200"
          }
        >
          {message.text}
        </div>
      ) : null}

      <label className="text-foreground grid gap-2 text-sm font-medium">
        New password
        <input
          type="password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          className={cn(
            "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-12 rounded-2xl border px-4 text-sm transition-colors outline-none",
            errors.password ? "border-red-400 focus:border-red-500" : undefined,
          )}
          {...register("password")}
        />
        {errors.password ? (
          <span className="text-sm text-red-600 dark:text-red-300">
            {errors.password.message}
          </span>
        ) : null}
      </label>

      <div className="border-line bg-surface-alt text-muted rounded-[1.5rem] border p-4 text-sm leading-7">
        Use at least 6 characters. After saving, you will be redirected back
        into the app.
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="bg-panel text-panel-foreground inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isBusy ? "Updating..." : "Update password"}
      </button>

      <p className="text-muted text-sm">
        Need to start over?{" "}
        <Link href="/auth/forgot-password" className="text-brand font-semibold">
          Request a new link
        </Link>
      </p>
    </form>
  );
};
