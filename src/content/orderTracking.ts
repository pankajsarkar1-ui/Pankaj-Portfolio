/**
 * Case study copy for the Order Tracking project, shaped for the page's visual
 * formats: short lines, structured data for the diagrams, quotes verbatim.
 * Every figure here comes from the project itself — nothing is illustrative.
 * The problem's escalation thread and knowledge gap are drawn from real
 * customer escalations, paraphrased and stripped of anything identifying.
 */

export const orderTracking = {
  slug: "order-tracking",
  title: "Order Tracking System",
  subtitle:
    "Rebuilding parcel tracking for 2M+ daily visits — across three platforms that each told the customer a different story.",
  meta: [
    { label: "Role", value: "Lead Product Designer" },
    { label: "Scale", value: "2M+ daily visits" },
    { label: "Platforms", value: "Android · iOS · Web" },
    { label: "Duration", value: "3 months" },
  ],

  problem: {
    heading: "2M+ visits a day. One question.",
    lede: "If you've ordered from Amazon, Flipkart, Myntra or Meesho, Delhivery has probably carried a parcel to your door. The order belongs to the brand. The wait belongs to us.",
    question: "Where is my package?",
    moment: {
      line: "A festive gift, 50 km from home, sitting still for days.",
      lead: "All the page could say:",
      status: "In transit",
      detail: "Last scanned at the hub · 3 days ago",
      image: {
        label: "A relatable moment",
        hint: "A photo of someone checking their phone for a parcel, or a gift waiting at a doorstep.",
      },
    },
    thread: {
      title: "Every silence becomes a ticket",
      tally: "Five messages. Zero answers.",
      body: "Each stock reply bought another follow-up. Support had nothing better to send — no readable view of what came next, only the last scan.",
      caption: "Paraphrased from real escalations.",
      messages: [
        { from: "customer", day: "Day 1", text: "Where is my package? It's been in transit since Monday." },
        { from: "support", day: "Day 1", text: "Your shipment is in transit and will be delivered soon." },
        { from: "customer", day: "Day 2", text: "Same status as yesterday. Last scanned in Mumbai." },
        { from: "support", day: "Day 2", text: "There's been an uncontrollable delay. We regret the inconvenience." },
        { from: "customer", day: "Day 3", text: "That tells me nothing. When will it actually arrive?" },
      ],
      outcome: "Escalated",
    },
    gap: {
      title: "We knew more than we said",
      caption: "Tracking was built on the last scan, so it only ever reported the past. What would happen next was already in our systems, but it never reached the screen.",
      saw: "What the customer saw",
      knew: "What our systems knew",
      rows: [
        {
          saw: "In transit, with an uncontrollable delay",
          knew: "The truck was 130 km from Bangalore. Delivery was likely the next day.",
        },
        {
          saw: "Last scanned at Vadodara. Delivery by 27 Oct.",
          knew: "Expected in Goa by 25 Oct, two days before the date we showed.",
        },
        {
          saw: "A route from Delhi to Vadodara",
          knew: "A Vadodara to Goa parcel. Delhi was only where the order was manifested.",
        },
      ],
      image: {
        label: "The misleading route",
        hint: "The old app drawing a Delhi to Vadodara path for a Vadodara to Goa parcel. Blur any address or phone number.",
      },
    },
    platforms: {
      title: "One parcel, three stories",
      caption: "The same delivered parcel — on delhivery.com, direct.delhivery.com and the app.",
    },
    drift: {
      title: "A date that keeps moving",
      caption: "Worse than a late one — especially on a high-value parcel.",
      /** Day indices on a 5 → 10 Jun axis; `promise` is null once it slips past. */
      axis: ["5 Jun", "6 Jun", "7 Jun", "8 Jun", "9 Jun", "10 Jun"],
      rows: [
        { today: 0, promise: 2, note: "Arriving in 2 days" },
        { today: 1, promise: 5, note: "Arriving in 4 days" },
        { today: 2, promise: null, note: "Anxiety" },
      ],
    },
    statement: {
      heading: "Tracking only ever looked backwards.",
      body: "It told people where their parcel had been, and never what would happen next. Every silence turned into a follow-up.",
      who: [
        { title: "The customer", body: "Refreshing the same status, with no idea what comes next." },
        { title: "The support agent", body: "Reading raw scans, sending stock replies." },
        { title: "The brand", body: "Taking the blame for a wait it can't see." },
      ],
    },
  },

  goals: {
    heading: "Fewer tickets. More trust.",
    business: {
      label: "Business",
      title: "Cut the ticket count",
      body: "Most tickets ask one thing: where is my package, and when will it arrive?",
    },
    human: {
      label: "Experience",
      title: "Earn trust through clarity",
      lead: "It's never just a package. It's",
      things: ["a hope", "a pride", "a long-awaited watch", "a book"],
      close: "It's an emotion — so share every detail, and earn that trust.",
    },
  },

  research: {
    heading: "Three conversations reframed the problem.",
    alterEgo: {
      title: "With my alter ego",
      dialogue: [
        {
          q: "Do we even need a new tracking system? Can't we just handle tickets better?",
          a: "I don't want users reaching the ticket page at all. Trust has to be won on the tracking page itself.",
        },
        {
          q: "Why can't the current design earn that trust?",
          a: "It looks fine when everything goes right. The moment there's a delay it gives you nothing — and web and app don't even match.",
        },
      ],
      verdict: "A system-level revamp is needed.",
    },
    support: {
      title: "With customer service",
      body: "People reach CS when things go wrong — that's where the real failure modes live.",
      tickets: [
        "Orders delayed",
        "Fake remark from the field executive",
        "Longer TAT than expected",
        "Where is my package?",
        "Package damaged",
      ],
      verdict: "Design for the happy flow — and for the moment it breaks.",
    },
    customers: {
      title: "With our customers",
      /** Seven conversations; the first five had nothing to report. */
      total: 7,
      quiet: 5,
      quietQuote: { text: "I don't have any problem.", aside: "What?" },
      quotes: [
        {
          who: "Customer 6",
          text: "The FE says he'll reach in 2–3 hours. I wait, and I can't plan anything for those 2–3 hours.",
        },
        {
          who: "Customer 7",
          text: "For a high-value order I check the app constantly, but I see the same information all day.",
        },
      ],
      verdict: "Reduce anxiety. Earn trust through clarity.",
    },
  },

  turn: {
    heading: "The map nobody wanted",
    benchmarks: [
      { label: "Couriers", names: ["DHL", "Bluedart", "India Post"] },
      { label: "Consumer apps", names: ["Swiggy", "Zomato", "Amazon", "Flipkart"] },
    ],
    beats: [
      {
        title: "The pattern",
        body: "In quick commerce, the map is a pillar of trust. You always know where your order is.",
        tone: "plain",
      },
      {
        title: "The question",
        body: "Could a courier app carry a map — for the whole journey, not just the last mile?",
        tone: "plain",
      },
      {
        title: "Instant rejection",
        body: "Not feasible. Too much effort for the return. Three versions proposed; the map turned down.",
        tone: "rejected",
      },
      {
        title: "A month later",
        body: "I was asked to build the entire flow with a map view.",
        tone: "twist",
      },
    ],
  },

  execution: {
    figure: "7",
    unit: "days in Goa",
    body: "My manager and I spent a week at our Goa head office, built entirely around the tracking page — with CS to find the underlying problems, and operations to learn what could live on the map.",
    who: ["CS team", "Operations", "Data-driven decisions"],
  },

  anatomy: {
    heading: "Built from three parts",
    map: {
      title: "The map",
      body: "Two views, depending on how close the parcel is.",
      image: "/assets/work/tracking/anatomy-map.png",
      alt: "The map, isolated — hub nodes joined by straight lines across the journey",
      points: [
        {
          title: "Macro view",
          body: "The whole journey. Straight lines between hubs — no polylines, less noise.",
          image: "/assets/work/tracking/anatomy-map.png",
          alt: "Macro view — hub nodes joined by straight lines across the journey",
        },
        {
          title: "Micro view",
          body: "Out for delivery: a real route and the executive's live location.",
          // TODO: swap in the real micro-view crop (placeholder shares the macro image for now).
          image: "/assets/work/tracking/anatomy-map.png",
          alt: "Micro view — a real route and the delivery executive's live location",
        },
        {
          title: "Delay, on the map",
          body: "Delays sit on the map. Tap a node to see the hub behind the estimate.",
          // TODO: swap in the real delay-view crop (placeholder shares the macro image for now).
          image: "/assets/work/tracking/anatomy-map.png",
          alt: "Delay view — a late node on the map with the hub behind the estimate",
        },
      ],
    },
    card: {
      title: "The tracking card",
      body: "Two segments, scannable in a glance.",
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
    },
    timeline: {
      title: "The timeline",
      body: "The whole story, in seconds.",
      image: "/assets/work/tracking/anatomy-timeline.png",
      alt: "The timeline, isolated — a vertical bar reading how much of the journey is done",
      points: [
        {
          title: "The bar is alive",
          body: "It fills as the journey moves — and turns yellow exactly where a parcel ran late.",
        },
        {
          title: "Only what still matters",
          body: "Where it was, where it is, where it's heading — with the distance left.",
        },
      ],
    },
    whole: {
      title: "Assembled",
      body: "Map, card and timeline in one screen. One scroll, and the customer never has to ask where their package is.",
      image: "/assets/work/tracking/03-on-the-way.png",
      alt: "The full tracking screen, with the map, tracking card and timeline in place",
    },
  },

  flow: {
    heading: "Six states, one answer",
    intro: "The C2C journey end to end. Each state answers the same question with a little more certainty.",
    screens: [
      {
        src: "/assets/work/tracking/01-placed.png",
        state: "Order placed",
        note: "Expected pickup date, set before anything moves.",
      },
      {
        src: "/assets/work/tracking/02-pickup-today.png",
        state: "Out for pickup",
        note: "Picking up today, executive one tap away.",
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
    journeys: {
      title: "Two journeys, same surfaces",
      body: "C2C starts with a pickup. B2C starts with a seller. Only the first promise changes.",
      screens: [
        { src: "/assets/work/tracking/b2c-seller-preparing.png", state: "Seller is preparing" },
        { src: "/assets/work/tracking/b2c-on-the-way.png", state: "On the way" },
      ],
    },
  },

  edge: {
    heading: "Built for when it goes wrong",
    body: "The happy flow was never the hard part. Every edge case needed its own state — on the same three surfaces.",
    image: "/assets/work/tracking/delay.png",
    alt: "Delay state, with the late stretch of the timeline turned yellow",
    cases: [
      { id: "delay", label: "Delay" },
      { id: "lost", label: "Lost" },
      { id: "weight", label: "Weight mismatch" },
      { id: "payment", label: "Incomplete payment" },
      { id: "returns", label: "Returns" },
      { id: "refunds", label: "Refunds" },
      { id: "reattempt", label: "Reattempts" },
      { id: "otp", label: "OTP" },
    ],
  },

  impact: {
    question: "Where is my package?",
    lead: "The question that drove most of our support volume",
    answer: "now answers itself on the page.",
    stat: "50%",
    statLabel: "reduction in ticket creation",
  },
} as const;
