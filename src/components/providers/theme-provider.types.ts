export type Theme = "light" | "dark";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeContextValue = {
  theme: Theme;
  isMounted: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};
