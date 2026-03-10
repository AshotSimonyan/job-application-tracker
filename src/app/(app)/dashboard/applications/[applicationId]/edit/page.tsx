import { updateJobApplicationAction } from "@/features/dashboard/actions";
import { EditApplicationForm } from "@/features/dashboard/components/edit-application-form";
import { getDashboardApplicationForEdit } from "@/features/dashboard/server/get-dashboard-application-for-edit";

import type { DashboardApplicationEditPageProps } from "@/features/dashboard/types";

const DashboardApplicationEditPage = async ({
  params,
}: DashboardApplicationEditPageProps) => {
  const { applicationId } = await params;
  const { application, resumes } =
    await getDashboardApplicationForEdit(applicationId);

  return (
    <div>
      <EditApplicationForm
        action={updateJobApplicationAction}
        application={application}
        resumes={resumes}
      />
    </div>
  );
};

export default DashboardApplicationEditPage;
