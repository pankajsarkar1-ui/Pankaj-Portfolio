export const site = {
  initials: "PS",
  name: "Pankaj Sarkar",
  greeting: "Hey, I'm Pankaj Sarkar",
  role: "Senior Product Designer at Delhivery",
  summary:
    "I lead mobile design for one of India's largest logistics platform - from courier booking to order tracking.",
  summaryLines: [
    "I lead mobile design for one of India's largest logistics platform",
  ],
  portrait: "/assets/hero/portrait.png",
  ctaLabel: "Coffee's on me",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#beyond" },
    { label: "Resume", href: "#experience" },
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
