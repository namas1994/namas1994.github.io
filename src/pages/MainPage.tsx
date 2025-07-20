import {
  FlexBox,
  Label,
  ObjectPage,
  ObjectPageSection,
  ObjectPageSubSection,
  ObjectPageTitle,
  Panel,
  Tag,
  Text,
  Title,
  Toolbar,
  ToolbarButton,
  type ToolbarButtonPropTypes,
} from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import { EducationList } from "../components/EducationHistory";
import { SkillList } from "../components/SkillList";
import { BlogPosts } from "../components/BlogPosts";
import { WorkHistory } from "../components/WorkHistory";

export function MainPage() {
  const profile = useProfile();
  const handleToolBarBtnClick: ToolbarButtonPropTypes["onClick"] = (e) => {
    window.open(e.target.dataset.url, "_blank");
  };

  return (
    <ObjectPage
      image="https://media.licdn.com/dms/image/v2/D5603AQHcbq4ia4wGXg/profile-displayphoto-shrink_800_800/B56ZVFc2oAHQAo-/0/1740626947405?e=1758153600&v=beta&t=Fr1VAP3RN06n_6U0a8iQ3Fz8INgz8WGvT7kRnM04xc0"
      imageShapeCircle
      mode="Default"
      style={{
        height: "calc(100vh - 52px)",
        maxHeight: "calc(100vh - 52px)",
        overflow: "auto",
      }}
      titleArea={
        <ObjectPageTitle
          header={<Title level="H2">{profile.name}</Title>}
          subHeader="Senior Developer"
          actionsBar={
            <Toolbar design="Transparent">
              {profile.socialLinks.map((link) => (
                <ToolbarButton
                  key={link.platform}
                  design="Transparent"
                  text={link.platform}
                  data-url={link.url}
                  onClick={handleToolBarBtnClick}
                />
              ))}
            </Toolbar>
          }
          snappedContent={
            <FlexBox alignItems="Center" wrap="Wrap">
              <FlexBox direction="Column" style={{ marginLeft: "64px" }}>
                <Label>Bengaluru</Label>
                <Label>Karnataka, India</Label>
              </FlexBox>
            </FlexBox>
          }
        >
          <Tag key="as" design="Positive" hideStateIcon>
            {profile.experience} years of experience
          </Tag>
        </ObjectPageTitle>
      }
    >
      <ObjectPageSection
        aria-label="Introduction"
        id="intro"
        titleText="Introduction"
      >
        <Panel>
          <Text>{profile.introduction.description}asdf</Text>
          <ul>
            {profile.introduction.points.length > 0 &&
              profile.introduction.points.map((point) => (
                <li key={point.index}>
                  <Text>{point.description}</Text>
                </li>
              ))}
          </ul>
        </Panel>
      </ObjectPageSection>

      <ObjectPageSection
        aria-label="Blog Posts"
        id="blog-posts"
        titleText="Blog Posts"
      >
        <BlogPosts />
      </ObjectPageSection>

      <ObjectPageSection aria-label="Skills" id="skill" titleText="Skills">
        <ObjectPageSubSection id="skill-sap" titleText="SAP Ecosystem">
          <SkillList skills={profile.skills.sapEcosystem} />
        </ObjectPageSubSection>
        <ObjectPageSubSection id="skill-backend" titleText="Backend">
          <SkillList skills={profile.skills.backend} />
        </ObjectPageSubSection>
        <ObjectPageSubSection id="skill-frontend" titleText="Frontend">
          <SkillList skills={profile.skills.frontend} />
        </ObjectPageSubSection>
      </ObjectPageSection>

      <ObjectPageSection
        aria-label="Education"
        id="education"
        titleText="Education"
      >
        <EducationList />
      </ObjectPageSection>

      {profile.workHistory.length === 0 ? (
        <></>
      ) : (
        <ObjectPageSection
          aria-label="Employment History"
          id="employment"
          titleText="Employment History"
        >
          <WorkHistory />
        </ObjectPageSection>
      )}
    </ObjectPage>
  );
}
