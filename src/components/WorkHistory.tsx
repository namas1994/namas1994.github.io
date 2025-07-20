import { Timeline, TimelineItem } from "@ui5/webcomponents-react";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";

export function WorkHistory() {
  return (
    <Timeline onLoadMore={function Xs() {}}>
      <TimelineItem
        icon={calendar}
        name="John Smith"
        subtitleText="2019/01/01"
        titleText="Schedule Call"
      />
      <TimelineItem
        icon="calendar"
        subtitleText="2019/01/02"
        titleText="Weekly Sync - CP Design"
      >
        <div>MR SOF02 2.43</div>
      </TimelineItem>
    </Timeline>
  );
}
