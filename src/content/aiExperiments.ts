export type MediaCard = {
  id: string;
  caption: string;
  /** Small line above the caption, e.g. "Logistics story · 0:34". */
  meta?: string;
  poster?: string;
  /** Local file — autoplays muted and looping in the tile. */
  video?: string;
  /** YouTube id — shows the poster in the tile, embeds the player in the lightbox. */
  youtubeId?: string;
  /** Natural card width in the Figma frame; drives flex-basis. */
  width: number;
  /** Cards on a dark backdrop use the lighter hairline. */
  lightBorder?: boolean;
};

export type MediaTab = {
  id: string;
  label: string;
  cards: MediaCard[];
};

/** A tab with no clips yet shows a centred illustration instead of a row. */
export type AiTab = MediaTab & {
  placeholder?: { image: string; ribbon: string; repeat: number };
};

export const aiExperiments = {
  label: "AI EXPERIMENTS",
  titleLead: "The buzz around  “",
  titleAccent: "AI",
  titleTrail: "”",
  cardHeight: 300,
  tabs: [
    {
      id: "experiments",
      label: "Experiments",
      cards: [
        {
          id: "landing-page-concept",
          caption: "Landing Page concept",
          meta: "Logistics story · 0:34",
          poster: "/assets/ai/posters/landing-page-concept.jpg",
          video: "/assets/video/landing-page-concept.mp4",
          width: 525,
        },
        {
          id: "dot-planet",
          caption: "Dot Planet that explodes",
          poster: "/assets/ai/posters/dot-planet.jpg",
          video: "/assets/video/dot-planet.mp4",
          width: 284.667,
          lightBorder: true,
        },
        {
          id: "coins-animation",
          caption: "Delhivery Coins Animation",
          poster: "/assets/ai/posters/coins-animation.jpg",
          video: "/assets/video/coins-animation.mp4",
          width: 284.667,
        },
        {
          id: "building-builder",
          caption: "Building Builder",
          poster: "/assets/ai/posters/building-builder.jpg",
          video: "/assets/video/building-builder.mp4",
          width: 441,
        },
        {
          id: "stress-buster",
          caption: "Stress Buster",
          poster: "/assets/ai/posters/stress-buster.jpg",
          video: "/assets/video/stress-buster.mp4",
          width: 441,
          lightBorder: true,
        },
      ],
    },
    {
      id: "utility",
      label: "Utility",
      cards: [],
      placeholder: {
        image: "/assets/ai/utility-face.jpg",
        ribbon: "Will Update soon",
        repeat: 3,
      },
    },
  ] satisfies AiTab[],
};
