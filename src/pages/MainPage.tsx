import {
  Button,
  FlexBox,
  Icon,
  Label,
  Link,
  List,
  ListItemCustom,
  ObjectPage,
  ObjectPageSection,
  ObjectPageSubSection,
  ObjectPageTitle,
  Panel,
  Tag,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import { useProfile } from "../context/ProfileContext";
import { EducationList } from "../components/EducationHistory";
import { SkillList } from "../components/SkillList";
import { BlogPosts } from "../components/BlogPosts";
import { WorkHistory } from "../components/WorkHistory";
import { useShellTitle } from "../context/ShellContext";
import "@ui5/webcomponents-icons/dist/feeder-arrow.js";
export function MainPage() {
  const profile = useProfile();
  const { themeState } = useShellTitle();
  return (
    <ObjectPage
      image={profile.profilePicture}
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
          subHeader={profile.jobTitle}
          snappedContent={
            <FlexBox alignItems="Center" wrap="Wrap">
              <FlexBox direction="Column" style={{ marginLeft: "64px" }}>
                <Label>{profile.location.city}</Label>
                <Label>
                  {profile.location.state}, {profile.location.country}
                </Label>
              </FlexBox>
            </FlexBox>
          }
        >
          <Tag key="as" design="Neutral" hideStateIcon>
            {profile.experience} years of experience
          </Tag>
        </ObjectPageTitle>
      }
    >
      <ObjectPageSection aria-label="About Me" id="intro" titleText="About Me">
        <Panel>
          {profile.introduction.description && (
            <Text>{profile.introduction.description}</Text>
          )}
          <List selectionMode="None">
            {profile.introduction.points &&
              profile.introduction.points.map((point) => (
                <ListItemCustom
                  style={{
                    minHeight: "1.7rem",
                  }}
                >
                  <Icon name="feeder-arrow" style={{ marginRight: "0.5rem" }} />
                  <Text>{point.description}</Text>
                </ListItemCustom>
              ))}
          </List>
        </Panel>
        <ObjectPageSubSection id="intro-social" titleText="Social Links">
          <FlexBox style={{ paddingLeft: "1rem" }}>
            {profile.socialLinks.map((link) => (
              <Link
                target="_blank"
                href={link.url}
                style={{ marginRight: "0.5rem" }}
              >
                <Button>
                  <FlexBox>
                    {link.logo && (
                      <img
                        // src={`/logo/${themeState}/${link.logo}`}
                        src={
                          link.logo.includes("common")
                            ? `/logo/${link.logo}`
                            : `/logo/${themeState}/${link.logo}`
                        }
                        style={{ height: "1rem", marginRight: "0.5rem" }}
                      />
                    )}
                    <Text
                      slot="children"
                      style={{
                        fontWeight: "bold",
                        color: "var(--sapButton_Lite_TextColor)",
                      }}
                    >
                      {link.platform}
                    </Text>
                  </FlexBox>
                </Button>
              </Link>
            ))}
          </FlexBox>
        </ObjectPageSubSection>
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
