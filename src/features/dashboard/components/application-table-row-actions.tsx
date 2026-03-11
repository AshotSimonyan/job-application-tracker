"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { EditIcon } from "@/components/icons/edit-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { deleteJobApplicationAction } from "@/features/dashboard/actions";
import { ConfirmDialog } from "@/features/dashboard/components/confirm-dialog";

import type { ApplicationTableRowActionsProps } from "@/features/dashboard/types";

export const ApplicationTableRowActions = ({
  applicationId,
  returnTo,
}: ApplicationTableRowActionsProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href={`/dashboard/applications/${applicationId}/edit`}
          aria-label="Edit application"
          title="Edit application"
          className="border-brand/15 bg-brand/6 text-brand inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-brand/12"
        >
          <EditIcon className="h-[1.1rem] w-[1.1rem]" />
        </Link>

        <button
          type="button"
          onClick={() => {
            setErrorMessage(null);
            setIsDialogOpen(true);
          }}
          aria-label="Archive application"
          title="Archive application"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300 dark:hover:bg-red-950/35"
        >
          <TrashIcon className="h-[1.1rem] w-[1.1rem]" />
        </button>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Archive application"
        description="This will remove the selected application from your active tracker while keeping the record in the database."
        errorMessage={errorMessage}
        confirmLabel="Archive"
        isBusy={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
            setErrorMessage(null);
            setIsDialogOpen(false);
          }
        }}
        onConfirm={async () => {
          const formData = new FormData();

          formData.set("application_id", applicationId);

          setIsDeleting(true);

          try {
            const result = await deleteJobApplicationAction(formData);

            if (result.status === "success") {
              setErrorMessage(null);
              setIsDialogOpen(false);
              router.push(returnTo);
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
