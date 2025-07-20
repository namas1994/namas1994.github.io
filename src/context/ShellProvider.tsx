import { useEffect, useRef, useState } from "react";
import { ShellTitleContext } from "./ShellContext";

export function ShellTitleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shellTitle, setShellTitle] = useState("Home");
  const initialized = useRef(false);
  useEffect(() => {
    document.title =
      shellTitle === "Dashboard" ? "Portfolio" : `Portfolio: ${shellTitle}`;
  }, [shellTitle]);

  return (
    <ShellTitleContext.Provider
      value={{ shellTitle, setShellTitle, initialized }}
    >
      {children}
    </ShellTitleContext.Provider>
  );
}
