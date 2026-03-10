import { DashboardApplicationsView } from "@/features/dashboard/components/dashboard-applications-view";
import { getDashboardApplicationsPageData } from "@/features/dashboard/server/get-dashboard-applications-page-data";

import type { DashboardApplicationsPageProps } from "@/features/dashboard/types";

const DashboardApplicationsPage = async ({
  searchParams,
}: DashboardApplicationsPageProps) => {
  const resolvedSearchParams = await searchParams;
  const applicationsPageData =
    await getDashboardApplicationsPageData(resolvedSearchParams);

  return <DashboardApplicationsView {...applicationsPageData} />;
};

export default DashboardApplicationsPage;
