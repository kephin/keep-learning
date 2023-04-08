import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://kephin.vercel.app/",
  author: "Kevin Hsiao",
  desc: "Personal blog of learning new technologies",
  title: "Keep Learning",
  ogImage: "og.jpg",
  lightAndDarkMode: true,
  postPerPage: 10,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kephin",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/wen-hsiung-hsiao-434493124",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
];
