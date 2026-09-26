import { site } from "./site";

/**
 * The hero deck. Each card carries its own headline, so shuffling the stack
 * swaps the line beside it — the first is the day job, the rest are not.
 */
export const heroCards = [
  {
    id: "work",
    image: "/assets/hero/portrait-card.png",
    alt: site.name,
    title: site.role,
  },
  {
    id: "comics",
    image: "/assets/hero/card-comics.png",
    alt: "Thought Circuit, a graphic anthology I made, with its printed poster",
    title: "I make graphic narratives",
  },
  {
    id: "cat",
    image: "/assets/hero/card-cat.png",
    alt: "My cat sitting beside a laptop with a Figma file open",
    title: "I get judged daily by my cat",
  },
] as const;

export type HeroCard = (typeof heroCards)[number];
