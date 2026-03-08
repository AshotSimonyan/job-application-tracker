export const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", active: true },
  { href: "#applications", label: "Applications", active: false },
  { href: "#pipeline", label: "Pipeline", active: false },
  { href: "#resumes", label: "Resumes", active: false },
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
