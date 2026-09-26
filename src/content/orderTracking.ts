/**
 * Case study copy for the Order Tracking project. Kept beside the other
 * content files so the page component stays layout-only.
 */

export const orderTracking = {
  slug: "order-tracking",
  eyebrow: "Case study",
  title: "Order Tracking System",
  subtitle: [
    "Rebuilding parcel tracking for an app with 2M+ daily visits, across three",
    "platforms that each told the customer a different story.",
  ],
  meta: [
    { label: "My role", value: "Lead Product Designer" },
    { label: "Scale", value: "2M+ daily visits" },
    { label: "Platform", value: "Android · iOS · Web" },
    { label: "Duration", value: "3 months" },
  ],
  headline: {
    stat: "50%",
    statLabel: "reduction in ticket creation",
  },

  context: {
    label: "The context",
    body: "An app with 2M+ daily visits for tracking e-commerce parcels felt outdated, lacked critical information, and created trust issues because tracking details were inconsistent across Delhivery platforms.",
    pull: "And the question remains — where is my package?",
  },

  challenges: {
    label: "The challenges",
    items: [
      {
        n: "01",
        title: "Not the same UI anywhere",
        body: "Three platforms, three different experiences for the same package — delhivery.com, direct.delhivery.com and the Delhivery app.",
      },
      {
        n: "02",
        title: "Anxiety compounds",
        body: "How do you reduce anxiety and build trust while someone waits? A date that keeps moving is worse than a late one.",
        timeline: [
          { date: "5 Jun", note: "Order arriving in 2 days" },
          { date: "6 Jun", note: "Order arriving in 4 days" },
          { date: "7 Jun", note: "Anxiety — especially on a high-value parcel" },
        ],
      },
    ],
  },

  goals: {
    label: "Goals",
    items: [
      {
        kind: "Business",
        title: "Reduce ticket count",
        body: "Most tickets arrive because of one simple question: where is my package, and when will it arrive?",
      },
      {
        kind: "UX",
        title: "Gain trust through clarity",
        body: "It is not just a package. It is a hope, a pride, a long-awaited watch, a book. It is an emotion — so it is our job to share every possible detail and earn that trust.",
      },
    ],
  },

  approach: {
    label: "Approach",
    intro: "Three conversations reframed the problem.",
    tracks: [
      {
        n: "01",
        title: "A conversation with my alter ego",
        qa: [
          {
            q: "Do we even need a new tracking system? Can't we solve this by handling tickets better?",
            a: "I don't want users reaching the ticket-raising page at all. The trust has to be won on the tracking page itself.",
          },
          {
            q: "Why can't the current design gain that trust?",
            a: "It looks fine when everything goes right. The moment there is a delay or a caveat it gives you nothing — and the web and app experiences don't even match.",
          },
        ],
        verdict: "A system-level revamp is needed.",
      },
      {
        n: "02",
        title: "Talking to the customer service team",
        body: "People reach CS when things go wrong, so this is where the real failure modes live.",
        list: [
          "Orders delayed",
          "Field executive leaving a fake remark",
          "Longer TAT than expected",
          "Where is my package?",
          "Package damaged",
        ],
        verdict:
          "Design for the happy flow and for the moment things go wrong.",
      },
      {
        n: "03",
        title: "Talking to our customers",
        quotes: [
          {
            who: "First 5 customers",
            text: "I don't have any problem.",
            aside: "What?",
          },
          {
            who: "6th customer",
            text: "The FE says he'll reach in 2–3 hours. I wait, and I can't plan anything for those 2–3 hours.",
          },
          {
            who: "7th customer",
            text: "For a high-value order I check the app constantly, but I see the same information all day.",
          },
        ],
        verdict: "Reduce anxiety and gain trust through clarity.",
      },
    ],
  },

  pivot: {
    label: "The turn",
    benchmarks: {
      primary: ["DHL", "Bluedart", "India Post"],
      secondary: ["Swiggy", "Zomato", "Amazon", "Flipkart"],
    },
    steps: [
      {
        title: "The pattern",
        body: "In quick commerce the map is one of the pillars of trust. You always know where your order is.",
      },
      {
        title: "The question",
        body: "Could we bring a map to a courier app — and not just for out-for-delivery, but for the entire package journey?",
      },
      {
        title: "Instant rejection",
        body: "Not feasible. Too much effort for the return. Three versions were proposed and the map idea was turned down.",
      },
      {
        title: "A month later",
        body: "I was asked to build the entire flow with a map view.",
      },
    ],
  },

  execution: {
    label: "Execution",
    body: "My manager and I flew to our Goa head office for seven days built entirely around the tracking page. We sat with the CS team to understand the underlying problems, then with operations to learn which nuances could live on the map. Every decision from there was data-driven.",
    sections: ["Map", "Tracking card", "Timeline + order details"],
  },

  anatomy: {
    label: "Anatomy",
    parts: [
      {
        n: "01",
        title: "The map",
        body: "Two views, depending on how close the parcel is.",
        image: "/assets/work/tracking/anatomy-map.png",
        alt: "The map, isolated — hub nodes joined by straight lines across the journey",
        points: [
          {
            title: "Macro view",
            body: "The overall journey. No polylines — straight lines between nodes, where each node is a hub or gateway the truck stops at. Less visual noise, more legibility.",
          },
          {
            title: "Micro view",
            body: "Appears once the package is out for delivery, with a real polyline and the delivery executive's live location.",
          },
          {
            title: "Delay, on the map",
            body: "Delay information sits on the map itself, and tapping a node reveals the hub behind the estimate.",
          },
        ],
      },
      {
        n: "02",
        title: "The tracking card",
        body: "Two segments, both scannable in a glance.",
        image: "/assets/work/tracking/tracking-card.png",
        alt: "The tracking card, isolated from the screen",
        /** Pins onto the isolated card; `top` is a percentage of its height. */
        annotations: [
          {
            top: 13,
            title: "Pickup date",
            body: "If a shipper is slow to hand the parcel over, that delay shouldn't read as ours.",
          },
          {
            top: 40,
            title: "The answer, in one scan",
            body: "Date in bold, days remaining right beside it.",
          },
          {
            top: 66,
            title: "Consignee and content",
            body: "Who it's for, and what's inside.",
          },
          {
            top: 89,
            title: "AWB",
            body: "Tap and hold to copy.",
          },
        ],
        points: [
          {
            title: "When will it arrive",
            body: "The date in bold with the remaining days beside it. The pickup date matters too — if a shipper is slow to hand the parcel over, that delay belongs to the customer's understanding, not ours.",
          },
          {
            title: "What is inside",
            body: "Consignee details and contents, with the AWB for identification. Tap and hold to copy it.",
          },
        ],
      },
      {
        n: "03",
        title: "The timeline",
        body: "Designed so the whole story reads in seconds.",
        image: "/assets/work/tracking/anatomy-timeline.png",
        alt: "The timeline, isolated — a vertical bar reading how much of the journey is done",
        points: [
          {
            title: "The bar is alive",
            body: "The vertical bar is a visual read of how much of the journey is done. If the parcel runs late, that stretch turns yellow — so you can see exactly where it slipped.",
          },
          {
            title: "Only what still matters",
            body: "Once a parcel is moving, the full history is noise. We show where it was, where it is, and where it is heading — with the distance left.",
          },
        ],
      },
    ],
    whole: {
      title: "Assembled",
      body: "Map, card and timeline stack into a single screen — the customer reads the whole story in one scroll, without ever asking where their package is.",
      image: "/assets/work/tracking/03-on-the-way.png",
      alt: "The full tracking screen, with the map, tracking card and timeline in place",
      parts: ["The map", "Tracking card", "Timeline"],
    },
  },

  flow: {
    label: "The flow",
    intro:
      "The C2C journey, end to end. Every state answers the same question with a little more certainty.",
    screens: [
      {
        src: "/assets/work/tracking/01-placed.png",
        state: "Order placed",
        note: "Expected pickup date, set before anything moves.",
      },
      {
        src: "/assets/work/tracking/02-pickup-today.png",
        state: "Out for pickup",
        note: "Picking up today, with the executive one tap away.",
      },
      {
        src: "/assets/work/tracking/03-on-the-way.png",
        state: "On the way",
        note: "Delivery date in bold, days left beside it.",
      },
      {
        src: "/assets/work/tracking/04-out-soon.png",
        state: "Nearly there",
        note: "Left the facility — distance and next stop.",
      },
      {
        src: "/assets/work/tracking/05-arriving-today.png",
        state: "Out for delivery",
        note: "Arriving today, live executive location.",
      },
      {
        src: "/assets/work/tracking/06-delivered.png",
        state: "Delivered",
        note: "Closed out, two days early.",
      },
    ],
  },

  wrong: {
    label: "When things go wrong",
    body: "The happy flow was never the hard part. The system had to hold up for delays, lost parcels, weight mismatches, incomplete payments, returns, refunds and reattempts — each with its own state on the same three surfaces.",
    image: "/assets/work/tracking/delay.png",
    alt: "Delay state showing the timeline stretch turning yellow",
    cases: [
      "Delay",
      "Lost",
      "Weight mismatch",
      "Incomplete payment",
      "Returns",
      "Refunds",
      "Reattempts",
      "OTP",
    ],
  },

  b2c: {
    label: "Two journeys",
    body: "A C2C parcel starts with a pickup. A B2C parcel starts with a seller. The same three surfaces absorb both, changing only what the first state promises.",
    screens: [
      {
        src: "/assets/work/tracking/b2c-seller-preparing.png",
        state: "B2C — seller is preparing",
      },
      {
        src: "/assets/work/tracking/b2c-on-the-way.png",
        state: "B2C — on the way",
      },
    ],
  },

  result: {
    label: "Result",
    stat: "50%",
    statLabel: "reduction in ticket creation",
    body: "The question that drove most of our support volume — where is my package — now answers itself on the page.",
  },
} as const;
