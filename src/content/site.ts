/** The CV, served as a file from /public; it opens in a new tab. */
export const RESUME = "/Pankaj-Sarkar-Resume.pdf";

/** Links to files (the CV) open in a new tab and skip route prefetching. */
export const opensFile = (href: string) => /\.pdf$/i.test(href);

export const site = {
  name: "Pankaj Sarkar",
  greeting: "Hey, I'm Pankaj Sarkar",
  role: "Senior Product Designer at Delhivery",
  summary:
    "I lead mobile design for one of India's largest logistics platforms — from courier booking to order tracking.",
  summaryLines: [
    "I lead mobile design for one of India's largest logistics platforms",
  ],
  portrait: "/assets/hero/portrait.png",
  ctaLabel: "Let's talk",
  nav: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Resume", href: RESUME },
  ],
  contact: {
    eyebrow: "Let's talk",
    headline: "Drink's on me.",
    links: [
      {
        label: "sapankaj48@gmail.com",
        href: "mailto:sapankaj48@gmail.com",
        copy: "sapankaj48@gmail.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pankaj-sarkar-exp-design/",
        dot: "linkedin" as const,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/cazz_dsn/",
        dot: "instagram" as const,
      },
    ],
  },
} as const;
