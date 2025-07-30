import type { ReactNode } from "react";
import type { Locale } from "./i18n";

export type LocalizedString = Record<Locale, string>;

export type ProjectMedia = {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt: LocalizedString;
};

export type StackGroup = {
  label?: LocalizedString;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: LocalizedString;
  stack: StackGroup[];
  highlights?: string[];
  role: LocalizedString;
  year: number;
  github?: string;
  githubApi?: string;
  demo?: string;
  readme?: string;
  readmeApi?: string;
  media?: ProjectMedia;
  featured: boolean;
  order: number;
};

export type Decision = {
  title: string;
  body: ReactNode;
};

export type ProjectContent = {
  context: ReactNode;
  decisions: Decision[];
};

export type ProjectContentFactory = (locale: Locale) => ProjectContent;
