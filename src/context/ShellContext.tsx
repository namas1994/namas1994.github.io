import { createContext, useContext } from "react";
export type TThemeMode = "dark" | "light";
export type ShellTitleContextType = {
  shellTitle: string;
  setShellTitle: (title: string) => void;
  initialized: React.RefObject<boolean>;
  themeState: TThemeMode;
  setThemeState: (mode: TThemeMode) => void;
};

export const ShellTitleContext = createContext<
  ShellTitleContextType | undefined
>(undefined);

export function useShellTitle() {
  const ctx = useContext(ShellTitleContext);
  if (!ctx)
    throw new Error("useShellTitle must be used within ShellTitleProvider");
  return ctx;
}
