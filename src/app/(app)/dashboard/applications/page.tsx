import { DashboardApplicationsView } from "@/features/dashboard/components/dashboard-applications-view";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

const DashboardApplicationsPage = async () => {
  const dashboardData = await getDashboardData();

  return <DashboardApplicationsView applications={dashboardData.applications} />;
};

export default DashboardApplicationsPage;
