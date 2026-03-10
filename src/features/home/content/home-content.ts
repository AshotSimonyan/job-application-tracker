export const homeHighlights = [
  { label: "Active roles", value: "24" },
  { label: "Interviews this week", value: "3" },
  { label: "Upcoming deadlines", value: "5" },
] as const;

export const homeRecentRoles = [
  {
    company: "Northstar Labs",
    title: "Frontend Engineer",
    status: "interview",
    updatedLabel: "Updated today",
  },
  {
    company: "Aperture Health",
    title: "Product Designer",
    status: "applied",
    updatedLabel: "Applied yesterday",
  },
] as const;

export const homePillars = [
  {
    title: "Track every opportunity",
    description:
      "Keep roles, companies, salary ranges, and application stages together so your pipeline stays easy to review.",
  },
  {
    title: "Stay ready for interviews",
    description:
      "Capture recruiter notes, interview schedules, and follow-up reminders without juggling multiple tools.",
  },
  {
    title: "Keep documents organized",
    description:
      "Store resume versions, cover letters, and portfolio links alongside the jobs they belong to.",
  },
] as const;
