import { useRef, useState } from "react";
import { ShellTitleContext, type TThemeMode } from "./ShellContext";

export function ShellTitleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shellTitle, setShellTitle] = useState("Home");
  const initialized = useRef(false);
  const [themeState, setThemeState] = useState<TThemeMode>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  return (
    <ShellTitleContext.Provider
      value={{
        shellTitle,
        setShellTitle,
        initialized,
        themeState,
        setThemeState,
      }}
    >
      {children}
    </ShellTitleContext.Provider>
  );
}
