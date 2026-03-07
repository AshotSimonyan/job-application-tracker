export type AuthMode = "sign-in" | "sign-up";

export type AuthShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: React.ReactNode;
};

export type AuthFormPlaceholderProps = {
  mode: AuthMode;
};
