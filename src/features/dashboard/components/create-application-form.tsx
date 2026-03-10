import { ApplicationForm } from "@/features/dashboard/components/application-form";

import type { CreateApplicationFormProps } from "@/features/dashboard/types";

const defaultValues = {
  title: "",
  company: "",
  location: "",
  source: "",
  url: "",
  status: "saved",
  notes: "",
  applied_at: "",
  resume_id: "",
} as const;

export const CreateApplicationForm = ({
  action,
  resumes,
  successRedirectHref,
  backHref,
}: CreateApplicationFormProps) => {
  return (
    <ApplicationForm
      action={action}
      resumes={resumes}
      defaultValues={{ ...defaultValues }}
      mode="create"
      title="New application"
      description="Add a role to your tracker and keep your pipeline current."
      submitLabel="Add application"
      successRedirectHref={successRedirectHref}
      backHref={backHref}
    />
  );
};
