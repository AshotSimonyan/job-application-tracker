"use client";

import type { ConfirmDialogProps } from "@/features/dashboard/types";

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  errorMessage,
  confirmLabel,
  cancelLabel = "Cancel",
  isBusy = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(8,18,38,0.48)] px-6">
      <div className="border-line bg-surface w-full max-w-md rounded-[1.5rem] border p-6 shadow-[0_36px_100px_-62px_rgba(8,22,47,0.92)]">
        <div>
          <p className="text-brand text-xs font-semibold tracking-[0.26em] uppercase">
            Confirm action
          </p>
          <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-[-0.04em]">
            {title}
          </h2>
          <p className="text-muted mt-3 text-sm leading-7">{description}</p>
          {errorMessage ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950/60 dark:bg-red-950/30 dark:text-red-200">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isBusy}
            className="border-line bg-surface-alt text-foreground inline-flex h-10 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              void onConfirm();
            }}
            disabled={isBusy}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBusy ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
