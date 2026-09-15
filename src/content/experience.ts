export type ExperienceRow = {
  period: string;
  title: string;
  org: string;
};

export type ExperienceTab = {
  id: string;
  label: string;
  /** Width of the period column in px, per the Figma variant. */
  periodWidth: number;
  rows: ExperienceRow[];
};

export const experience = {
  label: "EXPERIENCE",
  title: "The road so far",
  tabs: [
    {
      id: "professional",
      label: "Professional",
      periodWidth: 240,
      rows: [
        { period: "2023 Nov — Now", title: "Sr. Product Designer", org: "Delhivery · Bengaluru" },
        { period: "2020 Oct — 2021 July", title: "Product Designer", org: "Alternative Minds" },
        { period: "2020 Mar — 2020 Sep", title: "UI & Visual Designer", org: "Maxmobility" },
        { period: "2018 Oct — 2020 Feb", title: "Junior Designer", org: "Vawsum" },
      ],
    },
    {
      id: "education",
      label: "Education",
      periodWidth: 160,
      rows: [
        { period: "2021 — 2023", title: "M. Des", org: "IIT Delhi" },
        { period: "2013 — 2017", title: "BE (Bachelor of Engineering)", org: "IIEST Shibpur · IT" },
        { period: "2010 — 2012", title: "HS - Science", org: "Jalpaiguri Zilla School, WB" },
        { period: "2005 — 2010", title: "Secondary", org: "Belakoba High School, WB" },
      ],
    },
  ] satisfies ExperienceTab[],
};
