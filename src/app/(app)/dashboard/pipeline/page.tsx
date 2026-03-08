import { DashboardPipelineView } from "@/features/dashboard/components/dashboard-pipeline-view";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

const DashboardPipelinePage = async () => {
  const dashboardData = await getDashboardData();

  return <DashboardPipelineView statusSummary={dashboardData.statusSummary} />;
};

export default DashboardPipelinePage;
