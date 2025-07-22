import {
  Avatar,
  Label,
  NotificationList,
  NotificationListItem,
} from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import type { NotificationListPropTypes } from "@ui5/webcomponents-react";
import { useShellTitle } from "../context/ShellContext";
import classes from "../css/CustomStyle.module.css";
import { Utils } from "../utils/common";

export function BlogPosts() {
  const { blogs } = useProfile();
  const { themeState } = useShellTitle();

  const handleItemClick: NotificationListPropTypes["onItemClick"] = (event) => {
    window.open(event.detail.item.dataset.url, "_blank");
  };
  console.log("mn",classes);
  return (
    <NotificationList
      onItemClick={handleItemClick}
      style={{ marginTop: "1rem" }}
    >
      {blogs.SapCommunity.map((blog, index) => (
        <NotificationListItem
          data-url={blog.url}
          key={`blog-${index}`}
          avatar={
            blog.logo ? (
              <Avatar shape="Square" className={classes.customLogoPad}>
                <img
                  src={Utils.getLogoUrl(blog.logo, themeState)}
                  alt={`${blog.title} logo`}
                />
              </Avatar>
            ) : (
              <Avatar initials={blog.title.charAt(0)} />
            )
          }
          footnotes={
            <>
              <Label>Posted on {Utils.formatDateTime(blog.postedOn)}</Label>
              <Label>SAP Community</Label>
            </>
          }
          titleText={blog.title}
        />
      ))}
    </NotificationList>
  );
}

