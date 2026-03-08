export const dashboardNavItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/pipeline", label: "Pipeline" },
  { href: "/dashboard/resumes", label: "Resumes" },
] as const;

export const applicationStatusOrder = [
  "saved",
  "applied",
  "interview",
  "offer",
  "rejected",
] as const;

export const applicationStatusLabels = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
} as const;
