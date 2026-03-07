import type { AuthMode } from "@/features/auth/types";

export const authMilestones = [
  "Keep every application in one workspace",
  "Review interviews, follow-ups, and deadlines at a glance",
  "Store resume and cover letter versions by role",
] as const;

export const authFormContent: Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    cta: string;
    alternateHref: string;
    alternateLabel: string;
    alternateAction: string;
    note: string;
  }
> = {
  "sign-in": {
    title: "Welcome back",
    subtitle:
      "Sign in to review your pipeline, upcoming interviews, and the next actions across your search.",
    cta: "Sign in",
    alternateHref: "/auth/sign-up",
    alternateLabel: "New here?",
    alternateAction: "Create an account",
    note: "Use email or continue with a provider once authentication is connected.",
  },
  "sign-up": {
    title: "Create your workspace",
    subtitle:
      "Start a dedicated space for tracking applications, saving documents, and following up with confidence.",
    cta: "Create account",
    alternateHref: "/auth/sign-in",
    alternateLabel: "Already have an account?",
    alternateAction: "Sign in",
    note: "A short setup flow can live here later for profile details and preferences.",
  },
};
