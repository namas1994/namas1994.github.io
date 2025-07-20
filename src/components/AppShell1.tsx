import "@ui5/webcomponents-icons/dist/palette.js";
import {
  Avatar,
  ShellBar,
  ShellBarItem,
  Title,
  UserMenu,
  UserMenuAccount,
  UserMenuItem,
  ResponsivePopover,
  Modals,
  type UserMenuPropTypes,
  type UserMenuItemPropTypes,
  type ButtonDomRef,
  type ShellBarPropTypes,
} from "@ui5/webcomponents-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AppShell.module.css";
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
];

export function AppShell1() {
  const popoverOpenerRef = useRef<ButtonDomRef | undefined>(undefined);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [popoverAvatarOpen, setPopoverAvatarOpen] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState(getTheme);
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleThemeSwitchItemClick: ShellBarPropTypes["onNotificationsClick"] =
    (e) => {
      popoverOpenerRef.current = e.detail.targetRef as ButtonDomRef;
      setPopoverOpen(!popoverOpen);
    };

  const handleThemeSwitch: UserMenuItemPropTypes["onClick"] = (e) => {
    setTheme(e.currentTarget.dataset.key!);
    setCurrentTheme(e.currentTarget.dataset.key!);
  };

  const handleProfileClick: ShellBarPropTypes["onProfileClick"] = () => {
    setPopoverAvatarOpen(true);
  };
  const SEC_TO_CLOSE = 5;
  const [sec, setSec] = useState(SEC_TO_CLOSE);

  const { shellTitle } = useShellTitle();
  const handleLogout: UserMenuPropTypes["onSignOutClick"] = () => {
    const interval = setInterval(() => {
      setSec((prev) => {
        Modals.showToast({
          duration: 1000,
          children: `This window will close in ${prev} seconds.`,
        });
        return prev - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      window.close();
    }, sec * 1000);
  };
  return (
    <>
      <ShellBar
        // logo={<img src={reactLogo} alt={"Vite Logo"} />}
        primaryTitle="Portfolio"
        profile={
          <Avatar
            id="shellBar-avatar"
            interactive
            icon="employee"
            initials="AD"
          />
        }
        onProfileClick={handleProfileClick}
        onLogoClick={handleLogoClick}
        onNotificationsClick={handleThemeSwitchItemClick}
      >
        <ShellBarItem slot="content">
          <Title>{shellTitle}</Title>
        </ShellBarItem>
      </ShellBar>

      <UserMenu
        opener={"shellBar-avatar"}
        open={popoverAvatarOpen}
        onClose={() => {
          setPopoverAvatarOpen(false);
        }}
        accounts={
          <UserMenuAccount
            avatarInitials="NM"
            subtitleText="admin@cdd.com"
            titleText="Hi !!!"
          />
        }
        
        onSignOutClick={handleLogout}
      >
        <UserMenuItem icon="paletteIcon" text="Change Theme">
          {THEMES.map((theme) => (
            <UserMenuItem
              key={theme.key}
              selected={currentTheme === theme.key}
              data-key={theme.key}
              text={theme.value}
              onClick={handleThemeSwitch}
            />
          ))}
        </UserMenuItem>
      </UserMenu>

      <ResponsivePopover
        className={classes.popover}
        placement="Bottom"
        open={popoverOpen}
        headerText="Notifications"
        opener={popoverOpenerRef.current}
        onClose={() => {
          setPopoverOpen(false);
        }}
      >
        {/* <Notification /> */}
      </ResponsivePopover>
    </>
  );
}
