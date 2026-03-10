import type { AppLayoutProps } from "@/app/types";

const AuthLayout = ({ children }: AppLayoutProps) => {
  return <div className="flex min-h-0 flex-1 items-center">{children}</div>;
};

export default AuthLayout;
