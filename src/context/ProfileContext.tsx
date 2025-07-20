import { createContext, useContext } from "react";

export const BLOG_TYPE = {
  sapCommunity: "SapCommunity",
  medium: "Medium",
  github: "GitHub",
  stackOverflow: "StackOverflow",
} as const;

export type BlogType = typeof BLOG_TYPE[keyof typeof BLOG_TYPE];

type TSkillGroup = "sapEcosystem" | "backend" | "frontend";
type TSkillLevel =
  | "Beginner"
  | "Intermediate"
  | "Proficient"
  | "Advanced"
  | "Expert";
export type TSkills = {
  index: number;
  name: string;
  level: TSkillLevel;
  logo?: string;
}[];
export type ProfileContextType = {
  name: string;
  profilePicture: string;
  jobTitle: string;
  experience: string;
  location: { city: string; state: string; country: string };
  introduction: {
    description?: string;
    points?: { index: number; description: string }[];
  };
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startYear: string;
    endYear: string;
    logo?: string;
  }[];
  skills: Record<TSkillGroup, TSkills>;
  workHistory: string[];
  blogs: Record<BlogType, { title: string; url: string; postedOn: string }[]>;
  socialLinks: { platform: string; url: string; logo?: string }[];
  initialized?: React.RefObject<boolean>;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
