export const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", active: true },
  { href: "#applications", label: "Applications", active: false },
  { href: "#schedule", label: "Schedule", active: false },
  { href: "#documents", label: "Documents", active: false },
] as const;

export const dashboardMetrics = [
  { label: "Active applications", value: "24", note: "+4 this week" },
  { label: "Interviews booked", value: "6", note: "2 coming up" },
  { label: "Follow-ups due", value: "9", note: "Across 5 companies" },
] as const;

export const dashboardApplications = [
  {
    company: "Northstar Labs",
    role: "Product Designer",
    stage: "Interviewing",
    updated: "Updated 2 days ago",
  },
  {
    company: "Aperture Health",
    role: "Frontend Engineer",
    stage: "Applied",
    updated: "Applied yesterday",
  },
  {
    company: "Mosaic Commerce",
    role: "Growth Marketing Manager",
    stage: "Offer",
    updated: "Decision this Friday",
  },
] as const;

export const dashboardPanels = [
  {
    id: "schedule",
    title: "Upcoming schedule",
    description:
      "Two recruiter calls, one final round, and a portfolio review are lined up this week.",
  },
  {
    id: "documents",
    title: "Documents",
    description:
      "Keep resume versions, tailored cover letters, and portfolio links attached to each role.",
  },
] as const;
