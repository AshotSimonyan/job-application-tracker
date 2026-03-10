import { createJobApplicationAction } from "@/features/dashboard/actions";
import { CreateApplicationForm } from "@/features/dashboard/components/create-application-form";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

const DashboardApplicationNewPage = async () => {
  const dashboardData = await getDashboardData();

  return (
    <div>
      <CreateApplicationForm
        action={createJobApplicationAction}
        resumes={dashboardData.resumes}
        successRedirectHref="/dashboard/applications"
        backHref="/dashboard/applications"
      />
    </div>
  );
};

export default DashboardApplicationNewPage;
