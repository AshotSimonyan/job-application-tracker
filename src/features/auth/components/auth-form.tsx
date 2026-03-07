"use client";

import Link from "next/link";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { authFormSchema } from "@/features/auth/schemas/auth-form.schema";
import { authFormContent } from "@/features/auth/content/auth-content";
import type { AuthFormProps, AuthFormValues } from "@/features/auth/types";
import { cn } from "@/lib/utils/cn";

export const AuthForm = ({ mode, action, message, next }: AuthFormProps) => {
  const content = authFormContent[mode];
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("next", next ?? "/dashboard");

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
          {content.title}
        </h2>
        <p className="text-muted mt-3 max-w-xl text-sm leading-7 sm:text-base">
          {content.subtitle}
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

      <div className="grid gap-4">
        <label className="text-foreground grid gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={cn(
              "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-12 rounded-2xl border px-4 text-sm transition-colors outline-none",
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

        <label className="text-foreground grid gap-2 text-sm font-medium">
          Password
          <input
            type="password"
            placeholder="Enter your password"
            autoComplete={
              mode === "sign-in" ? "current-password" : "new-password"
            }
            className={cn(
              "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-12 rounded-2xl border px-4 text-sm transition-colors outline-none",
              errors.password
                ? "border-red-400 focus:border-red-500"
                : undefined,
            )}
            {...register("password")}
          />
          {errors.password ? (
            <span className="text-sm text-red-600 dark:text-red-300">
              {errors.password.message}
            </span>
          ) : null}
        </label>
      </div>

      <div className="border-line bg-surface-alt text-muted rounded-[1.5rem] border p-4 text-sm leading-7">
        {content.note}
      </div>

      <button
        type="submit"
        disabled={isBusy}
        className="bg-panel text-panel-foreground inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isBusy ? "Please wait..." : content.cta}
      </button>

      <p className="text-muted text-sm">
        {content.alternateLabel}{" "}
        <Link href={content.alternateHref} className="text-brand font-semibold">
          {content.alternateAction}
        </Link>
      </p>
    </form>
  );
};
