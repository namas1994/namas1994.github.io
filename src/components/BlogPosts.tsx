import {
  Label,
  NotificationList,
  NotificationListItem,
} from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import type { NotificationListPropTypes } from "@ui5/webcomponents-react";

export function BlogPosts() {
  const { blogs } = useProfile();

  const handleItemClick: NotificationListPropTypes["onItemClick"] = (event) => {
    window.open(event.detail.item.dataset.url, "_blank");
  };
  return (
    <NotificationList
      onItemClick={handleItemClick}
      style={{ marginTop: "1rem" }}
    >
      {blogs.SapCommunity.map((blog, index) => (
        <NotificationListItem
          data-url={blog.url}
          key={`blog-${index}`}
          footnotes={
            <>
              <Label>Posted on {formatDateTime(blog.postedOn)}</Label>
              <Label>SAP Community</Label>
            </>
          }
          titleText={blog.title}
        />
      ))}
    </NotificationList>
  );
}

function formatDateTime(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  // const time = date
  //   .toLocaleString("en-US", {
  //     hour: "numeric",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     hour12: true,
  //   })
  //   .replace(",", "");
  // return `${day}-${month}-${year}, ${time.toLowerCase()}`;
  return `${day}-${month}-${year}`;
}
