"use client";

import Link from "next/link";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { forgotPasswordFormSchema } from "@/features/auth/schemas/auth-form.schema";
import type {
  ForgotPasswordFormProps,
  ForgotPasswordFormValues,
} from "@/features/auth/types";
import { cn } from "@/lib/utils/cn";

export const ForgotPasswordForm = ({
  action,
  message,
}: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    formData.set("email", values.email);
    setIsLoading(true);

    void (async () => {
      try {
        await action(formData);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  const isBusy = isSubmitting || isLoading;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div>
        <h2 className="text-foreground text-3xl font-semibold tracking-[-0.04em]">
          Forgot your password?
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          Enter your email and we will send a password reset link to your inbox.
        </p>
      </div>

      {message ? (
        <div
          className={
            message.type === "error"
              ? "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/30 dark:text-red-200"
              : "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-950/60 dark:bg-emerald-950/30 dark:text-emerald-200"
          }
        >
          {message.text}
        </div>
      ) : null}

      <label className="text-foreground grid gap-2 text-sm font-medium">
        Email
        <input
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          className={cn(
            "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none",
            errors.email ? "border-red-400 focus:border-red-500" : undefined,
          )}
          {...register("email")}
        />
        {errors.email ? (
          <span className="text-sm text-red-600 dark:text-red-300">
            {errors.email.message}
          </span>
        ) : null}
      </label>

      <div className="border-line bg-surface-alt text-muted rounded-xl border p-4 text-sm leading-7">
        If the email belongs to an account, a reset link will be sent there.
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isBusy ? "Sending..." : "Send reset link"}
      </button>

      <p className="text-muted text-sm">
        Remembered it?{" "}
        <Link href="/auth/sign-in" className="text-brand font-semibold">
          Back to sign in
        </Link>
      </p>
    </form>
  );
};
