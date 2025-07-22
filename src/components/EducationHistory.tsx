import { Avatar, FlexBox, Text, Timeline, TimelineItem } from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import calender from "@ui5/webcomponents-icons/dist/calendar.js";
import { useShellTitle } from "../context/ShellContext";
import { Utils } from "../utils/common";
export function EducationList() {
  const { education } = useProfile();
  const { themeState } = useShellTitle();
  return (
    <Timeline key="education">
      {education.map((edu, idx) => (
        <TimelineItem
          key={`edu-${idx}`}
          icon={calender}
          subtitleText={`${edu.startYear} - ${edu.endYear}`}
          titleText={edu.degree}
        >
          <FlexBox alignItems="Center" gap="0.5rem">
            {edu.logo ? (
              <Avatar initials={edu.school.charAt(0)} shape="Square">
                <img src={Utils.getLogoUrl(edu.logo, themeState)} />
              </Avatar>
            ) : (
              <Avatar initials={edu.school.charAt(0)} />
            )}
            <Text>{edu.school}</Text>
          </FlexBox>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
