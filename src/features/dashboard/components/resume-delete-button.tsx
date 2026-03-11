"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { TrashIcon } from "@/components/icons/trash-icon";
import { deleteResumeAction } from "@/features/dashboard/actions";
import { ConfirmDialog } from "@/features/dashboard/components/confirm-dialog";

import type { ResumeDeleteButtonProps } from "@/features/dashboard/types";

export const ResumeDeleteButton = ({
  resumeId,
  resumeName,
}: ResumeDeleteButtonProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setErrorMessage(null);
          setIsDialogOpen(true);
        }}
        aria-label={`Delete ${resumeName}`}
        title="Delete resume"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/35"
      >
        <TrashIcon className="h-[1.1rem] w-[1.1rem]" />
      </button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete resume"
        description={`This will delete ${resumeName} and unlink it from active applications.`}
        errorMessage={errorMessage}
        confirmLabel="Delete"
        isBusy={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
            setErrorMessage(null);
            setIsDialogOpen(false);
          }
        }}
        onConfirm={async () => {
          const formData = new FormData();

          formData.set("resume_id", resumeId);
          setIsDeleting(true);

          try {
            const result = await deleteResumeAction(formData);

            if (result.status === "success") {
              setErrorMessage(null);
              setIsDialogOpen(false);
              router.refresh();
            } else {
              setErrorMessage(result.message);
            }
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </>
  );
};
