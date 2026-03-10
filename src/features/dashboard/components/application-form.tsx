"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { ChevronDownIcon } from "@/components/icons/chevron-down-icon";
import {
  applicationStatusLabels,
  applicationStatusOrder,
} from "@/features/dashboard/content/dashboard-content";
import { createApplicationFormSchema } from "@/features/dashboard/schemas/create-application-form.schema";
import type {
  ApplicationFormProps,
  ApplicationMutationResult,
  CreateApplicationFormValues,
} from "@/features/dashboard/types";
import { cn } from "@/lib/utils/cn";

export const ApplicationForm = ({
  action,
  resumes,
  defaultValues,
  mode,
  title,
  description,
  submitLabel,
  successRedirectHref,
  applicationId,
  backHref,
  backLabel = "Back to applications",
}: ApplicationFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApplicationMutationResult | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateApplicationFormValues>({
    resolver: yupResolver(createApplicationFormSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.set(key, value);
    });

    if (applicationId) {
      formData.set("application_id", applicationId);
    }

    setIsLoading(true);

    try {
      const nextResult = await action(formData);

      setResult(nextResult);

      if (nextResult.status === "success") {
        if (successRedirectHref) {
          router.push(successRedirectHref);
        } else {
          reset(defaultValues);
        }

        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  });

  const isBusy = isSubmitting || isLoading;
  const selectClassName =
    "border-line bg-surface-alt text-foreground focus:border-brand h-11 w-full appearance-none rounded-xl border px-3.5 pr-10 text-sm transition-colors outline-none";

  return (
    <section className="border-line bg-surface rounded-[1.5rem] border p-5 shadow-[0_24px_72px_-64px_rgba(8,22,47,0.28)] sm:p-6">
      <div>
        <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
          {mode === "create" ? "Add application" : "Edit application"}
        </p>
        <h2 className="text-foreground mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-[1.75rem]">
          {title}
        </h2>
        <p className="text-muted mt-2 max-w-3xl text-sm leading-7">
          {description}
        </p>
      </div>

      {result ? (
        <div
          className={cn(
            "mt-6 rounded-xl border px-4 py-3 text-sm",
            result.status === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-950/60 dark:bg-red-950/30 dark:text-red-200"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-950/60 dark:bg-emerald-950/30 dark:text-emerald-200",
          )}
        >
          {result.message}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-foreground grid gap-2 text-sm font-medium">
            Title
            <input
              type="text"
              placeholder="Frontend Engineer"
              className={cn(
                "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none",
                errors.title ? "border-red-400 focus:border-red-500" : undefined,
              )}
              {...register("title")}
            />
            {errors.title ? (
              <span className="text-sm text-red-600 dark:text-red-300">
                {errors.title.message}
              </span>
            ) : null}
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Company
            <input
              type="text"
              placeholder="Acme"
              className={cn(
                "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none",
                errors.company
                  ? "border-red-400 focus:border-red-500"
                  : undefined,
              )}
              {...register("company")}
            />
            {errors.company ? (
              <span className="text-sm text-red-600 dark:text-red-300">
                {errors.company.message}
              </span>
            ) : null}
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Location
            <input
              type="text"
              placeholder="Remote"
              className="border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none"
              {...register("location")}
            />
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Source
            <input
              type="text"
              placeholder="LinkedIn"
              className="border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none"
              {...register("source")}
            />
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            URL
            <input
              type="url"
              placeholder="https://company.com/jobs/role"
              className={cn(
                "border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none",
                errors.url ? "border-red-400 focus:border-red-500" : undefined,
              )}
              {...register("url")}
            />
            {errors.url ? (
              <span className="text-sm text-red-600 dark:text-red-300">
                {errors.url.message}
              </span>
            ) : null}
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Status
            <span className="relative">
              <select className={selectClassName} {...register("status")}>
                {applicationStatusOrder.map((status) => (
                  <option key={status} value={status}>
                    {applicationStatusLabels[status]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
            </span>
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Applied date
            <input
              type="date"
              className="border-line bg-surface-alt text-foreground focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none"
              {...register("applied_at")}
            />
          </label>

          <label className="text-foreground grid gap-2 text-sm font-medium">
            Resume
            <span className="relative">
              <select className={selectClassName} {...register("resume_id")}>
                <option value="">No resume selected</option>
                {resumes.map((resume) => (
                  <option key={resume.id} value={resume.id}>
                    {resume.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="text-muted pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
            </span>
          </label>
        </div>

        <label className="text-foreground grid gap-2 text-sm font-medium">
          Notes
          <textarea
            rows={5}
            placeholder="Add any context you want to keep with this application."
            className="border-line bg-surface-alt text-foreground placeholder:text-muted/70 focus:border-brand rounded-xl border px-3.5 py-3 text-sm transition-colors outline-none"
            {...register("notes")}
          />
        </label>

        <div className="flex items-center justify-between gap-4">
          {backHref ? (
            <Link
              href={backHref}
              className="border-line bg-surface-alt text-foreground inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-surface"
            >
              {backLabel}
            </Link>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={isBusy}
            className="bg-panel text-panel-foreground inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isBusy ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
};
