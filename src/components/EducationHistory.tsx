import { Timeline, TimelineItem } from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import calender from "@ui5/webcomponents-icons/dist/calendar.js";
export function EducationList() {
  const { education } = useProfile();
  return (
    <Timeline key="education">
      {education.map((edu, idx) => (
        <TimelineItem
          key={`edu-${idx}`}
          icon={calender}
          subtitleText={`${edu.startYear} - ${edu.endYear}`}
          titleText={edu.degree}
        >
          {edu.school}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
