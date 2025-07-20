import {
  Card,
  CardHeader,
  ResponsiveGridLayout,
} from "@ui5/webcomponents-react";
import { type TSkills } from "../context/ProfileContext";
export function SkillList({ skills }: { skills: TSkills }) {
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
