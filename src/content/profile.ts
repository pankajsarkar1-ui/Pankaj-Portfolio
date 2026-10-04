/**
 * The About page: the card behind the plug. Pankaj's own notes, cut down and
 * loosened up; facts are his, wording is lighter.
 */
export const profile = {
  name: "Pankaj Sarkar",
  description:
    "Pankaj Sarkar is a product designer from Jalpaiguri, an MDes from IIT Delhi, and the designer behind the Delhivery app. Plug in to meet him.",
  hint: "Pull to connect",
  /** Shown once the plug is in. */
  status: "Live from Bengaluru",
  title: "Hi, I'm Pankaj.",
  /** The title as it renders: a handwritten "Hi," and an underlined name. */
  greeting: "Hi,",
  firstName: "Pankaj.",
  /** `**…**` marks a phrase the highlighter sweeps across. */
  paragraphs: [
    "I design the Delhivery app, which means I spend my days making sure **millions of parcels**, and the people waiting on them, feel a little less anxious. Six years in, I still get weirdly excited about a well-placed loading state.",
    "From Jalpaiguri in north Bengal, via IIT Delhi (MDes, 2023). Here I revamped the whole app and built Delhivery Local (deliveries within your city) and PTL (lots of boxes at once) **from zero**, plus Refer & Earn and Coins.",
    "Off the clock: sketching, comics with **Brown Pencils** (two anthologies so far), and rides with friends for the engine noise and the breeze.",
  ],
  portrait: { src: "/assets/hero/portrait.png", w: 820, h: 1024, alt: "Pankaj, chin on fist, in a black T-shirt" },
} as const;
