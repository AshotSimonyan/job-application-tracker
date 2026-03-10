"use client";

import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  ResumeMutationResult,
  ResumeUploadFormProps,
} from "@/features/dashboard/types";
import { cn } from "@/lib/utils/cn";

export const ResumeUploadForm = ({ action }: ResumeUploadFormProps) => {
  const router = useRouter();
  const fileInputId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [result, setResult] = useState<ResumeMutationResult | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      const nextResult = await action(formData);

      setResult(nextResult);

      if (nextResult.status === "success") {
        formRef.current?.reset();
        setSelectedFileName("");
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-line bg-surface-alt rounded-xl border p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-foreground text-xl font-semibold tracking-[-0.03em]">
          Upload a new resume
        </h2>
        <p className="text-muted text-sm leading-7">
          Add a PDF or Word document so it can be attached to future
          applications.
        </p>
      </div>

      {result ? (
        <div
          className={cn(
            "mt-4 rounded-xl border px-4 py-3 text-sm",
            result.status === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-950/60 dark:bg-red-950/30 dark:text-red-200"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-950/60 dark:bg-emerald-950/30 dark:text-emerald-200",
          )}
        >
          {result.message}
        </div>
      ) : null}

      <form
        ref={formRef}
        action={handleSubmit}
        className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
      >
        <label className="text-foreground grid gap-2 text-sm font-medium">
          Resume name
          <input
            type="text"
            name="name"
            placeholder="Frontend resume"
            className="border-line bg-surface text-foreground placeholder:text-muted/70 focus:border-brand h-11 rounded-xl border px-3.5 text-sm transition-colors outline-none"
          />
        </label>

        <div className="text-foreground grid gap-2 text-sm font-medium">
          <span>File</span>
          <div className="border-line bg-surface flex h-11 items-center gap-2 rounded-xl border px-2.5">
            <input
              id={fileInputId}
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(event) => {
                const nextFile = event.target.files?.[0];

                setSelectedFileName(nextFile?.name ?? "");
              }}
            />
            <label
              htmlFor={fileInputId}
              className="bg-panel text-panel-foreground inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-lg px-3 text-sm font-semibold"
            >
              Choose file
            </label>
            <span className="text-muted min-w-0 truncate text-sm">
              {selectedFileName || "PDF, DOC, or DOCX up to 5 MB"}
            </span>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-panel text-panel-foreground inline-flex h-11 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto"
          >
            {isLoading ? "Uploading..." : "Upload resume"}
          </button>
        </div>
      </form>
    </div>
  );
};
