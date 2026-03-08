export type SiteHeaderUser = {
  email: string | null;
  displayName: string;
  initial: string;
};

export type SiteHeaderProps = {
  user: SiteHeaderUser | null;
};
