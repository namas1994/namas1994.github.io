import {
  Avatar,
  Card,
  CardHeader,
  ResponsiveGridLayout,
} from "@ui5/webcomponents-react";
import { type TSkills } from "../context/ProfileContext";
import { useShellTitle } from "../context/ShellContext";
export function SkillList({ skills }: { skills: TSkills }) {
  const { themeState } = useShellTitle();
  return (
    <ResponsiveGridLayout
      columnSpanS={2}
      columnSpanM={4}
      columnSpanL={3}
      columnSpanXL={3}
      style={{ padding: "0 1rem" }}
    >
      {skills.map((skill) => (
        <Card
          header={
            <CardHeader
              // avatar={<Icon name="person-placeholder" />}
              avatar={
                skill.logo ? (
                  <Avatar initials={skill.name.charAt(0)} shape="Square">
                    <img
                      src={
                        skill.logo.includes("common")
                          ? `/logo/${skill.logo}`
                          : `/logo/${themeState}/${skill.logo}`
                      }
                      alt={`${skill.name} logo`}
                    />
                  </Avatar>
                ) : (
                  <Avatar initials={skill.name.charAt(0)} />
                )
              }
              subtitleText={skill.level}
              titleText={skill.name}
            />
          }
          key={`skill-${skill.index}`}
        />
      ))}
    </ResponsiveGridLayout>
  );
}
