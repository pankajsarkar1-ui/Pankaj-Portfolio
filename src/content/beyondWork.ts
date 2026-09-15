import type { MediaTab } from "./aiExperiments";

export const beyondWork = {
  label: "BEYOND WORK",
  title: "When I'm not in Figma",
  cardHeight: 293.333,
  tabs: [
    {
      id: "fun-me",
      label: "Fun me",
      cards: [
        { id: "heaven-on-earth", caption: "Heaven on Earth", poster: "/assets/beyond/fun/heaven-on-earth.jpg", width: 289.333 },
        { id: "happy-time", caption: "Happy Time", poster: "/assets/beyond/fun/happy-time.jpg", width: 289.333 },
        { id: "guardian", caption: "Guardian", poster: "/assets/beyond/fun/guardian.jpg", width: 289.333 },
        { id: "high-on-breathing", caption: "High on Breathing", poster: "/assets/beyond/fun/high-on-breathing.jpg", width: 289.333 },
        { id: "selling-comic-books", caption: "Selling comic books", poster: "/assets/beyond/fun/selling-comic-books.jpg", width: 289.333 },
        { id: "lifeline", caption: "Lifeline", poster: "/assets/beyond/fun/lifeline.jpg", width: 289.333 },
        { id: "moving-pixels", caption: "Moving Pixels", poster: "/assets/beyond/fun/moving-pixels.jpg", width: 289.333 },
        { id: "presenting-my-thesis", caption: "Presenting my Thesis", poster: "/assets/beyond/fun/presenting-my-thesis.jpg", width: 289.333 },
      ],
    },
    {
      id: "artist-me",
      label: "Artist me",
      cards: [
        { id: "mr-jextra", caption: "Mr. Jextra", poster: "/assets/beyond/artist/mr-jextra.jpg", width: 289.333 },
        { id: "comic-short-circuit", caption: "My Comic - Short Circuit", poster: "/assets/beyond/artist/comic-short-circuit.jpg", width: 289.333 },
        { id: "quick-sketch", caption: "Quick Sketch", poster: "/assets/beyond/artist/quick-sketch.jpg", width: 289.333 },
        { id: "nayan-sukh-prapti", caption: "Nayan Sukh Prapti", poster: "/assets/beyond/artist/nayan-sukh-prapti.jpg", width: 289.333 },
        { id: "mountain-sketches", caption: "Mountain Sketches", poster: "/assets/beyond/artist/mountain-sketches.jpg", width: 289.333 },
        { id: "bookmarks", caption: "Bookmarks", poster: "/assets/beyond/artist/bookmarks.jpg", width: 289.333 },
        { id: "comic-thought-circuit", caption: "Another Comic - Thought Circuit", poster: "/assets/beyond/artist/comic-thought-circuit.jpg", width: 289.333 },
        { id: "taking-action", caption: "Taking Action", poster: "/assets/beyond/artist/taking-action.jpg", width: 289.333 },
      ],
    },
    {
      id: "proud-me",
      label: "Proud me",
      cards: [
        { id: "presenting-ai-project", caption: "Presenting our AI Project", poster: "/assets/beyond/proud/presenting-ai-project.jpg", width: 289.333 },
        { id: "won-2nd-prize", caption: "Won 2nd Prize", poster: "/assets/beyond/proud/won-2nd-prize.jpg", width: 289.333 },
        { id: "launching-a-book", caption: "Launching a Book", poster: "/assets/beyond/proud/launching-a-book.jpg", width: 289.333 },
        { id: "design-degree-show", caption: "Talking about Design Degree Show", poster: "/assets/beyond/proud/design-degree-show.jpg", width: 289.333 },
        { id: "stamp-design", caption: "Stamp Design - Enna Ernaux", poster: "/assets/beyond/proud/stamp-design.jpg", width: 289.333 },
      ],
    },
    {
      id: "me-in-motion",
      label: "Me in Motion",
      cards: [
        { id: "comin-21-intro", caption: "Comin’21 Intro", poster: "/assets/beyond/motion/comin-21-intro.jpg", video: "/assets/video/comin-21-intro.mp4", width: 521 },
        { id: "koshtak", caption: "Koshtak", poster: "/assets/beyond/motion/koshtak.jpg", video: "/assets/video/koshtak.mp4", width: 513 },
        { id: "exploding-shapes", caption: "Exploding Shapes", poster: "/assets/beyond/motion/exploding-shapes.jpg", video: "/assets/video/exploding-shapes.mp4", width: 289.333 },
        { id: "koshthak-film", caption: "Koshthak — a life within the brackets", poster: "/assets/beyond/motion/koshthak-film.jpg", youtubeId: "gGpJOv8jSGs", width: 521 },
        { id: "19-er-gondi", caption: "19 er gondi", poster: "/assets/beyond/motion/19-er-gondi-film.jpg", youtubeId: "_ONHIhNsmsQ", width: 521 },
      ],
    },
  ] satisfies MediaTab[],
};
