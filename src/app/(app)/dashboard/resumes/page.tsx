import { DashboardResumesView } from "@/features/dashboard/components/dashboard-resumes-view";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

const DashboardResumesPage = async () => {
  const dashboardData = await getDashboardData();

  return <DashboardResumesView resumes={dashboardData.resumes} />;
};

export default DashboardResumesPage;
