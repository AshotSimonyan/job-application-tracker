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

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsDialogOpen(true);
        }}
        aria-label={`Archive ${resumeName}`}
        title="Archive resume"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/35"
      >
        <TrashIcon className="h-[1.1rem] w-[1.1rem]" />
      </button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Archive resume"
        description={`This will remove ${resumeName} from your active resume list and unlink it from active applications. The record stays in the database.`}
        confirmLabel="Archive"
        isBusy={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
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
              setIsDialogOpen(false);
              router.refresh();
            }
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </>
  );
};
