import { DashboardOverview } from "@/features/dashboard/components/dashboard-overview";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

const DashboardPage = async () => {
  const dashboardData = await getDashboardData();

  return <DashboardOverview data={dashboardData} />;
};

export default DashboardPage;
