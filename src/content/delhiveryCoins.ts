/**
 * Case study copy for Delhivery Coins, taken from the Figma case study frame
 * ("Delhivery Coins — Case study", Practice DS). Short lines, structured data
 * for the visuals. Image paths point at 2× exports from that frame (coins at 3×).
 */

const A = "/assets/work/coins";

export const delhiveryCoins = {
  slug: "delhivery-coins",
  title: "Delhivery Coins",
  subtitle: "Loyalty that gets redeemed, not just earned.",
  meta: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Timeline", value: "May to June 2026" },
    { label: "Platforms", value: "Android, iOS and BD dashboard" },
    { label: "Design system", value: "Tarmac Design System" },
  ],
  /** Three bare screens, framed and fanned in code on the coral banner. */
  hero: [
    { src: `${A}/screens/exp-unlock.png`, alt: "Home, with the one-time Delhivery Coins card" },
    { src: `${A}/screens/hero-intro.png`, alt: "The Coins intro, with the coin landing in" },
    { src: `${A}/screens/exp-track.png`, alt: "The Coins hub: balance, totals and what's expiring" },
  ],

  problem: {
    heading: "Our most frequent shippers had no reason to stay.",
    lede: "Local shippers book with us every week, yet nothing rewarded them for coming back. And most coin programs that do exist look generous but rarely pay out. Here's why, in three numbers:",
    beats: [
      { label: "Earn", value: "6", unit: "coins", body: "per weekly ₹300 order" },
      { label: "Need", value: "25", unit: "coins", body: "before you can redeem anything" },
      { label: "Expire", value: "30", unit: "days", body: "after each batch is earned" },
    ],
    result: {
      label: "Result",
      title: "You never get there.",
      body: "Book weekly and the oldest coins expire just as the balance nears 25.",
    },
    hmw: {
      lead: "How might we",
      question: "reward frequent shippers with coins they actually get to spend?",
    },
    video: {
      label: "Problem explainer video",
      hint: "A 16:9 MP4 that walks through why the balance never reaches the redeem bar.",
    },
  },

  context: {
    heading: "The shippers worth keeping.",
    numbers: [
      { value: "4.39", body: "Local orders a month from the average business shipper" },
      { value: "18,991", body: "shippers met the entry bar of 4 orders and ₹1,000 in 30 days" },
      { value: "92.5%", body: "of them are businesses, the customers worth keeping" },
    ],
  },

  /** The program as shipped — the answer to the three numbers above. */
  program: {
    heading: "The program, in four numbers",
    body: "A weekly ₹300 order now earns 9 coins, so a shipper can redeem by their second booking.",
    rules: [
      { value: "3", body: "coins per ₹100" },
      { value: "10", body: "coins to redeem" },
      { value: "₹1", body: "per coin" },
      { value: "30", body: "day expiry" },
    ],
  },

  coin: {
    heading: "From notebook sketches to a coin worth keeping.",
    lede: "I sketched shapes on paper first, then built the final coin up layer by layer: a hexagon base, a bevelled rim, light and shadow facets, and finally the D.",
    sketches: [
      { src: `${A}/sketch-1.png`, w: 1176, h: 880, alt: "Notebook page of coin shape sketches: hexagons, cubes and a teardrop D" },
      { src: `${A}/sketch-2.png`, w: 1176, h: 880, alt: "Notebook spread with a coins hub wireframe and a hexagon coin with a D" },
    ],
    steps: [
      { src: `${A}/step-1-shape.png`, label: "1. Shape" },
      { src: `${A}/step-2-rim.png`, label: "2. Rim" },
      { src: `${A}/step-3-depth.png`, label: "3. Depth" },
      { src: `${A}/step-4-face.png`, label: "4. Face" },
      { src: `${A}/step-5-facets.png`, label: "5. Facets" },
      { src: `${A}/step-6-mark.png`, label: "6. Mark" },
    ],
    finals: [
      { src: `${A}/coin-active.png`, title: "Active", body: "Coins you can spend" },
      { src: `${A}/coin-disabled.png`, title: "Disabled", body: "Expired or unavailable" },
    ],
  },

  landing: {
    heading: "Four dark directions, then one light answer.",
    lede: "Early explorations went dark and dense. The final page is light and warm, explains the earn rate with a worked example, and leads with a single action: book a Local order.",
    explorations: [
      { src: `${A}/screens/explore-1.png`, label: "Exploration 1" },
      { src: `${A}/screens/explore-2.png`, label: "Exploration 2" },
      { src: `${A}/screens/explore-3.png`, label: "Exploration 3" },
      { src: `${A}/screens/explore-4.png`, label: "Exploration 4" },
    ],
    final: { src: `${A}/screens/landing-final.png`, label: "Final" },
  },

  checkout: {
    heading: "One card, refined across three rounds.",
    lede: "The coin card lives inside the existing booking review. Across two iteration rounds and the final, I reworked how the saving and the earn preview read, while keeping redemption a single toggle that starts off and is never auto-applied.",
    rounds: [
      { phone: `${A}/checkout-iter-1.png`, card: `${A}/card-iter-1.png`, title: "Iteration 1", when: "June 15 to 22" },
      { phone: `${A}/checkout-iter-2.png`, card: `${A}/card-iter-2.png`, title: "Iteration 2", when: "From June 23" },
      { phone: `${A}/checkout-final.png`, card: `${A}/card-final.png`, title: "Final", when: "Shipped on Tarmac, June 29" },
    ],
    states: {
      heading: "Every balance gets a clear answer.",
      items: [
        { src: `${A}/state-no-coins.png`, h: 476, title: "No coins yet", body: "The toggle stays disabled; the card shows what this order will earn." },
        { src: `${A}/state-under-10.png`, h: 476, title: "Under 10 coins", body: "Progress, not a dead end: exactly how many more coins you need." },
        { src: `${A}/state-ready.png`, h: 476, title: "Ready to use", body: "One toggle, off by default, with the saving shown in rupees." },
        { src: `${A}/state-expiring.png`, h: 544, title: "Expiring tonight", body: "A nudge only when coins are about to lapse." },
      ],
    },
  },

  experience: {
    heading: "Every touchpoint, from unlock to audit.",
    screens: [
      { src: `${A}/screens/exp-unlock.png`, title: "Unlock", body: "A one-time card on Home" },
      { src: `${A}/screens/exp-learn.png`, title: "Learn", body: "The rules, with a worked example" },
      { src: `${A}/screens/exp-track.png`, title: "Track", body: "Balance, totals, what's expiring" },
      { src: `${A}/screens/exp-review.png`, title: "Review", body: "Every coin earned and spent" },
      { src: `${A}/screens/exp-filter.png`, title: "Filter", body: "Earned, spent or expired" },
    ],
  },

  outcome: {
    heading: "What shipped, and what's still open.",
    columns: [
      {
        title: "Designed",
        body: "The program's full app surface: landing, coins hub, history and filters, and every checkout state, built on the Tarmac Design System.",
      },
      {
        title: "Measuring",
        body: "First redemption within 30 days of enrolment, the share of coins that expire unused, and retention of enrolled shippers.",
      },
      {
        title: "Still open",
        body: "The redemption cap sits between 5% and 10% of an order. I'd settle it with live data before scaling the program.",
      },
    ],
    impact: {
      heading: "The first month, in numbers.",
      /**
       * HYPOTHETICAL. These figures are illustrative, not launch data. While
       * `illustrative` is true the page says so; swap in real numbers and set it
       * to false before presenting them as results.
       */
      illustrative: true,
      note: "Illustrative figures until launch data is in.",
      enrolment: {
        title: "Shippers enrolled, cumulative",
        /** Out of the 18,991 who met the entry bar (see context). */
        eligible: 18991,
        weeks: [
          { label: "Week 1", value: 4000 },
          { label: "Week 2", value: 7200 },
          { label: "Week 3", value: 9600 },
          { label: "Week 4", value: 11400 },
        ],
        caption: "60% of eligible shippers enrolled by week four.",
      },
      stats: [
        { value: "62%", body: "of earned coins redeemed before they expired" },
        { value: "41%", body: "of enrolled shippers redeemed within 30 days" },
        { value: "18%", body: "of coins expired unused" },
        { value: "+14 pts", body: "30-day repeat bookings against shippers not enrolled" },
      ],
    },
    reflection: {
      title: "Reflection",
      text: "The best loyalty UI turned out to be mostly arithmetic: a toggle that starts off, a count of coins still to go, and a date on every coin.",
    },
  },
} as const;
