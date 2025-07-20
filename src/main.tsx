import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Modals, ThemeProvider } from "@ui5/webcomponents-react";
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { App } from "./App";
import { MainPage } from "./pages/MainPage";
import { ShellTitleProvider } from "./context/ShellProvider";
import { ProfileProvider } from "./context/ProfileProvider";
import "./css/index.css";
import "@ui5/webcomponents-react/dist/Assets.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <MainPage /> }],
  },
]);

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(prefersDark ? "sap_horizon_dark" : "sap_horizon");

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    setTheme(event.matches ? "sap_horizon_dark" : "sap_horizon");
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Modals />
      <ShellTitleProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </ShellTitleProvider>
    </ThemeProvider>
  </StrictMode>
);
