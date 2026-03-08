import type { User } from "@supabase/supabase-js";

import type { SiteHeaderUser } from "@/components/layout/site-header.types";

const getDisplayName = (user: User) => {
  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name.trim()
      : "";

  if (metadataName) {
    return metadataName;
  }

  if (user.email) {
    return user.email.split("@")[0] ?? "Account";
  }

  return "Account";
};

const getInitial = (displayName: string) => {
  return displayName.charAt(0).toUpperCase() || "A";
};

export const getSiteHeaderUser = (user: User | null): SiteHeaderUser | null => {
  if (!user) {
    return null;
  }

  const displayName = getDisplayName(user);

  return {
    email: user.email ?? null,
    displayName,
    initial: getInitial(displayName),
  };
};
