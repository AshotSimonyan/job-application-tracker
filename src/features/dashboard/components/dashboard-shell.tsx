import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import type { DashboardShellProps } from "@/features/dashboard/types";

export const DashboardShell = ({ data, children }: DashboardShellProps) => {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-81px)] w-full max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start lg:px-10 lg:py-12">
      <DashboardSidebar data={data} />
      <div className="min-w-0">{children}</div>
    </div>
  );
};
