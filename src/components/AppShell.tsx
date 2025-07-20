import "@ui5/webcomponents-icons/dist/palette.js";
import {
  ShellBar,
  ShellBarItem,
  Title,
  ResponsivePopover,
  type ButtonDomRef,
  List,
  ListItemStandard,
  type ListPropTypes,
  type ShellBarItemPropTypes,
} from "@ui5/webcomponents-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AppShell.module.css";
import ListMode from '@ui5/webcomponents/dist/types/ListSelectionMode.js';
import {
  getTheme,
  setTheme,
} from "@ui5/webcomponents-base/dist/config/Theme.js";
import { useShellTitle } from "../context/ShellContext";

const THEMES = [
  { key: "sap_horizon", value: "Morning Horizon (Light)" },
  { key: "sap_horizon_dark", value: "Evening Horizon (Dark)" },
  { key: "sap_horizon_hcb", value: "Horizon High Contrast Black" },
  { key: "sap_horizon_hcw", value: "Horizon High Contrast White" },
  // { key: "sap_fiori_3", value: "Quartz Light" },
  // { key: "sap_fiori_3_dark", value: "Quartz Dark" },
  // { key: "sap_fiori_3_hcb", value: "Quartz High Contrast Black" },
  // { key: "sap_fiori_3_hcw", value: "Quartz High Contrast White" },
];

export function AppShell() {
  const popoverOpenerRef = useRef<ButtonDomRef | undefined>(undefined);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(getTheme);
  const { shellTitle, setThemeState } = useShellTitle();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");
  const handleThemeSwitchItemClick: ShellBarItemPropTypes["onClick"] = (e) => {
    popoverOpenerRef.current = e.detail.targetRef as ButtonDomRef;
    setPopoverOpen(true);
  };

  const handleThemeSwitch: ListPropTypes["onSelectionChange"] = (e) => {
    const { targetItem } = e.detail;
    setThemeState(
      targetItem.dataset.key?.includes("dark") ||
        targetItem.dataset.key?.includes("hcb")
        ? "dark"
        : "light"
    );
    void setTheme(targetItem.dataset.key!);
    setCurrentTheme(targetItem.dataset.key!);
    setPopoverOpen(false);
  };

  return (
    <>
      <ShellBar
        // logo={<img src={reactLogo} alt={"Vite Logo"} />}
        primaryTitle="Portfolio"
        onLogoClick={handleLogoClick}
      >
        <ShellBarItem slot="content">
          <Title>{shellTitle}</Title>
        </ShellBarItem>
        <ShellBarItem
          icon="palette"
          text="Change Theme"
          onClick={handleThemeSwitchItemClick}
        />
      </ShellBar>

      <ResponsivePopover
        placement="Bottom"
        className={classes.popover}
        open={popoverOpen}
        opener={popoverOpenerRef.current}
        onClose={() => {
          setPopoverOpen(false);
        }}
      >
        <List
          onSelectionChange={handleThemeSwitch}
          headerText="Themes"
          selectionMode={ListMode.Single}
        >
          {THEMES.map((theme) => (
            <ListItemStandard
              key={theme.key}
              selected={currentTheme === theme.key}
              data-key={theme.key}
              text={theme.value}
            />
          ))}
        </List>
      </ResponsivePopover>
    </>
  );
}
