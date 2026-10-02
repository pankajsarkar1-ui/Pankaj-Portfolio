/**
 * Case study copy for Refer & Earn, from the Figma case study frame ("Refer &
 * Earn — Case study", Practice DS). Screens are 2× exports of each phone's
 * Screen node; the crowns are the transparent originals from the final design
 * file (08 - Referral, Assets). Results are the program's own Jan–May 2026 data.
 */

const A = "/assets/work/refer";
const S = `${A}/screens`;

export const referAndEarn = {
  slug: "refer-and-earn",
  title: "Refer & Earn",
  subtitle: "Gamifying referrals to onboard 6,000+ new users every month.",
  meta: [
    { label: "Role", value: "Senior Product Designer" },
    { label: "Launched", value: "January 2026" },
    { label: "Product", value: "Delhivery Direct app" },
    { label: "Platforms", value: "Android and iOS" },
  ],
  hero: [
    { src: `${S}/level-1.png`, alt: "Refer & Earn after the first referrals, Level 1 in progress" },
    { src: `${S}/refer-page.png`, alt: "The Refer & Earn page: Earn ₹100, a share code, and the rewards card" },
    { src: `${S}/top-referrer.png`, alt: "Top Referrer: all four levels completed" },
  ],
  crowns: [
    { src: `${A}/crown-1.png`, w: 459, h: 402, label: "Level 1" },
    { src: `${A}/crown-2.png`, w: 382, h: 330, label: "Level 2" },
    { src: `${A}/crown-3.png`, w: 382, h: 337, label: "Level 3" },
    { src: `${A}/crown-4.png`, w: 366, h: 366, label: "Level 4" },
  ],

  problem: {
    heading: "Every new user cost ₹600–700 to acquire.",
    lede: "At that price, growing Delhivery Local at scale wasn't sustainable. We needed a cheaper way to bring in new shippers, and a reason for them to ship more often once they arrived.",
    cost: {
      paid: { label: "Paid acquisition", value: "₹600–700", unit: "per user", amount: 650 },
      referral: { label: "Referral, at most", value: "₹240", unit: "per converted user", amount: 240 },
      note: "₹100 to the new user, ₹100 to the referrer, and a ₹200 bonus every 5 referrals (₹40 each). Paid only after a delivered first order of ₹100 or more.",
    },
    hmw: {
      lead: "How might we",
      question: "reduce acquisition cost while getting new users to ship more often?",
    },
  },

  solution: {
    heading: "Both sides earn, but only after a real order.",
    steps: [
      { title: "Share your code", body: "From the Refer & Earn page, in one tap on WhatsApp, SMS or a copied link." },
      { title: "Friend signs up with it", body: "The code links both accounts at sign-up and can't be changed later." },
      { title: "Friend's first order is delivered", body: "An order of ₹100 or more, and ₹100 lands in each wallet." },
    ],
    game: {
      title: "Then it becomes a game.",
      body: "Every 5 successful referrals completes a level: a new crown and a ₹200 bonus on top. Four levels, then Top Referrer.",
    },
  },

  ideation: {
    heading: "Three directions before the final page.",
    lede: "The early versions led with a plain code and counters, then tried a dark, premium look. The final one keeps the red reward hero, puts sharing first, and adds the level progress card.",
    screens: [
      { src: `${S}/explore-1.png`, title: "Exploration 1", body: "Code and counters" },
      { src: `${S}/explore-2.png`, title: "Exploration 2", body: "Dark, premium" },
      { src: `${S}/explore-3.png`, title: "Exploration 3", body: "Light, benefits-led" },
      { src: `${S}/explore-final.png`, title: "Final", body: "Hero, share, progress" },
    ],
  },

  breakdown: {
    heading: "One scroll, built to get you sharing fast.",
    page: { src: `${A}/breakdown-page.png`, w: 702, h: 3798, alt: "The full Refer & Earn page, top to bottom" },
    /** `at` is the marker's height down the page, as a percentage. */
    notes: [
      { at: 12.6, title: "Money as the hook", body: "The illustration and “Earn ₹100” hold attention for the first few seconds and pull people into scrolling." },
      { at: 18.8, title: "Share first", body: "Copy, WhatsApp and share sit right under the code, so sharing a code takes one tap." },
      { at: 27.2, title: "Progress you can see", body: "Levels at 5, 10, 15 and 20 referrals, each adding a ₹200 bonus on top of the per-referral reward." },
      { at: 58.8, title: "Interest builds gradually", body: "Benefits follow the progress card to explain the banner's promise, then “How to earn” shows exactly how to get it." },
    ],
  },

  levels: {
    heading: "Every 5 referrals earns a new crown.",
    lede: "Each level is its own celebration screen with a milestone journey underneath, so the next reward is always one step away. Completing all four makes you a Top Referrer.",
    screens: [
      { src: `${S}/level-1.png`, title: "Level 1", body: "5 referrals" },
      { src: `${S}/level-2.png`, title: "Level 2", body: "10 referrals" },
      { src: `${S}/level-3.png`, title: "Level 3", body: "15 referrals" },
      { src: `${S}/level-4.png`, title: "Level 4", body: "20 referrals" },
      { src: `${S}/top-referrer.png`, title: "Top Referrer", body: "All levels done" },
    ],
    fills: {
      heading: "The refer page fills up as you go.",
      screens: [
        { src: `${S}/fill-0.png`, count: "0", body: "referrals" },
        { src: `${S}/fill-3.png`, count: "3", body: "referrals" },
        { src: `${S}/fill-5.png`, count: "5", body: "Level 1 done" },
        { src: `${S}/fill-10.png`, count: "10", body: "Level 2 done" },
        { src: `${S}/fill-15.png`, count: "15", body: "Level 3 done" },
        { src: `${S}/fill-20.png`, count: "20", body: "Top Referrer" },
      ],
    },
  },

  newUser: {
    heading: "From a WhatsApp message to ₹100 in the wallet.",
    screens: [
      { src: `${S}/referee-invite.png`, title: "The invite", body: "Arrives as a pre-filled WhatsApp message" },
      { src: `${S}/referee-code.png`, title: "The code", body: "Asked once, during sign-up" },
      { src: `${S}/referee-applied.png`, title: "Applied", body: "Linked to the referrer for good" },
      { src: `${S}/referee-nudge.png`, title: "The nudge", body: "₹100 waiting on Home" },
      { src: `${S}/referee-goal.png`, title: "The goal", body: "Book a first order to unlock ₹100" },
    ],
  },

  touchpoints: {
    heading: "Ask at the moment of delight.",
    lede: "After launch there was no surface promoting the program. Referral cards now appear where intent peaks: when a delivery lands, right after booking, after a good driver rating, and in the wallet.",
    screens: [
      { src: `${S}/touch-delivery.png`, title: "After delivery", body: "Highest intent: the package just arrived" },
      { src: `${S}/touch-booking.png`, title: "After booking", body: "A quiet card below the tracking CTA" },
      { src: `${S}/touch-rating.png`, title: "After rating", body: "Share opens with the message pre-filled" },
      { src: `${S}/touch-wallet.png`, title: "In the wallet", body: "An Earn ₹100 entry beside the balance" },
    ],
  },

  results: {
    heading: "Referrals became a growth channel.",
    period: "January to May 2026",
    numbers: [
      { value: "30k", body: "new users joined through referrals" },
      { value: "6,000+", body: "new users a month" },
      { value: "12k", body: "rewards used" },
      { value: "40%", body: "of new users retained" },
    ],
    next: {
      title: "What's next",
      text: "Measure which touchpoint drives the most shares, and test whether levels keep top referrers going after Level 4.",
    },
  },
} as const;
