import { ApplicationForm } from "@/features/dashboard/components/application-form";

import type {
  ApplicationFormAction,
  DashboardApplicationItem,
  DashboardResumeItem,
} from "@/features/dashboard/types";

type EditApplicationFormProps = {
  action: ApplicationFormAction;
  application: DashboardApplicationItem;
  resumes: DashboardResumeItem[];
};

export const EditApplicationForm = ({
  action,
  application,
  resumes,
}: EditApplicationFormProps) => {
  return (
    <ApplicationForm
      action={action}
      resumes={resumes}
      defaultValues={{
        title: application.title,
        company: application.company,
        location: application.location ?? "",
        source: application.source ?? "",
        url: application.url ?? "",
        status: application.status,
        notes: application.notes ?? "",
        applied_at: application.appliedAt ?? "",
        resume_id: application.resumeId ?? "",
      }}
      mode="edit"
      title="Edit application"
      description="Update the saved details for this role."
      submitLabel="Save changes"
      successRedirectHref="/dashboard/applications"
      applicationId={application.id}
      backHref="/dashboard/applications"
    />
  );
};
