// Single source of truth for portfolio content.
// Framed deliberately: every line is written to land with a YC partner,
// an investor, a staff+ engineer, and a CEO at the same time.

export const profile = {
  name: "Abhishek Chakram",
  initials: "AC",
  motto: "Data infrastructure · AI agents",
  // The one-liner. Outcome-first, not title-first.
  tagline: "I build the data infrastructure and AI agents that turn noise into revenue.",
  // The positioning: who I am and how I think, not a list of wins.
  // Split into hook / body / kicker for visual hierarchy.
  thesisHook: "Most engineers build the layer people see.",
  thesisHookAccent: "I build the one underneath it.",
  thesisBody:
    "The data plumbing that decides whether an AI product is fast, correct, and trusted in production. I’m drawn to problems that are locked, undocumented, or written off as impossible, and I ship the infrastructure that quietly carries the business.",
  thesisKicker: "Give me the part of the stack everyone else avoids.",
  identity: [
    "Senior Software Engineer, Fiber AI (YC S23)",
    "Data infrastructure for AI pipelines",
    "IIT Kharagpur ’23",
  ],
  location: "Bengaluru, India",
  links: {
    email: "abhishekchakram@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishekchakram",
    github: "https://github.com/abhishekFiberAi",
    twitter: "https://x.com/AbhishekChakram",
  },
};

// Headline metrics: the numbers that make people lean in.
export type StatItem = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  sub: string;
  href?: string;
};

export const stats: StatItem[] = [
  {
    value: 290,
    prefix: "$",
    suffix: "K",
    label: "Invested in Fiber AI by HubSpot’s CTO",
    sub: "Dharmesh Shah wrote a $290K angel check into Fiber after testing the AI search agent I built, ~6× his typical $50K check.",
    href: "https://www.fiber.ai/",
  },
  {
    value: 480,
    prefix: "$",
    suffix: "K+",
    label: "Annual revenue driven",
    sub: "From data systems I built and reverse-engineered for enterprise customers.",
  },
  {
    value: 4000,
    prefix: "",
    suffix: " RPS",
    label: "Billing infra throughput",
    sub: "Built from scratch: 50M+ credits processed, multi-tier costs, native Stripe.",
  },
  {
    value: 8,
    prefix: "#",
    suffix: "",
    label: "Global rank, CodeChef",
    sub: "Out of 40,000+ competitive programmers worldwide.",
  },
];

// Selected work: the proof. Each item is an outcome with receipts.
export type WorkItem = {
  tag: string;
  title: string;
  role: string;
  blurb: string;
  metrics: string[][];
  stack: string[];
  links?: string[][];
  accent?: boolean;
};

export const work: WorkItem[] = [
  {
    tag: "Fiber AI · YC S23",
    title: "AI Search Agent",
    role: "Senior Software Engineer",
    blurb:
      "Natural-language search for people and companies, handling both broad and deeply niche prompts. The product that convinced HubSpot’s CTO to write a $290K check and grew to 60+ customers, including agent.ai.",
    metrics: [
      ["$290K", "angel investment unlocked"],
      ["60+", "paying customers"],
      ["agent.ai", "among marquee logos"],
    ],
    stack: ["TypeScript", "LLM agents", "Vector search", "Postgres"],
    links: [
      ["fiber.ai", "https://www.fiber.ai/"],
      ["API docs", "https://api.fiber.ai/docs/#tag/agentic-search"],
    ],
    accent: true,
  },
  {
    tag: "Fiber AI · Data layer",
    title: "Reverse-Engineering the GTM Data Stack",
    role: "Senior Software Engineer",
    blurb:
      "Reverse-engineered Sales Navigator to scrape millions of profiles and LinkedIn’s follower graph, turning locked data into productized pipelines that enterprise customers pay for monthly.",
    metrics: [
      ["$36K/mo", "from Cardinal (YC W26)"],
      ["$50K/yr", "from Anysphere (Cursor)"],
      ["millions", "of profiles, productized"],
    ],
    stack: ["Reverse engineering", "Distributed scraping", "ETL"],
    links: [["fiber.ai", "https://www.fiber.ai/"]],
  },
  {
    tag: "Fiber AI · Infra",
    title: "Billing Infrastructure",
    role: "Senior Software Engineer",
    blurb:
      "Designed and shipped Fiber’s billing engine from zero: a credits system sustaining 4,000 RPS, multi-tier cost accounting, and native Stripe integration that the rest of the business now runs on.",
    metrics: [
      ["4,000 RPS", "sustained throughput"],
      ["50M+", "credits processed"],
      ["Native", "Stripe integration"],
    ],
    stack: ["Node.js", "TypeScript", "Stripe", "Redis", "Postgres"],
  },
  {
    tag: "Side build · 2026",
    title: "Jared",
    role: "Solo",
    blurb:
      "An autonomous email agent for recruiters: drip sequences with reply detection that halts follow-ups, GPT-classified responses, and an auto-referral loop that enrolls referred contacts on its own.",
    metrics: [
      ["Celery", "scheduled multi-step sequences"],
      ["GPT-4o", "reply classification"],
      ["Nylas", "HMAC-verified webhooks"],
    ],
    stack: ["FastAPI", "Celery", "Redis", "OpenAI", "Next.js"],
    links: [["Source", "https://github.com/Abhiiitkgp1001/Jared"]],
  },
  {
    tag: "Advisor · 2025",
    title: "Clan",
    role: "Technical Advisor",
    blurb:
      "Built joinclan.ai end-to-end, solo. The team later hired a full-time CTO and kept me on as Technical Advisor to steer architecture.",
    metrics: [
      ["Solo", "end-to-end build"],
      ["Advisor", "post-handoff"],
    ],
    stack: ["Next.js", "Full-stack"],
    links: [
      ["joinclan.ai", "https://www.joinclan.ai/"],
      [
        "Feature",
        "https://www.linkedin.com/feed/update/urn:li:activity:7444387956171362304/",
      ],
    ],
  },
];

// Career trajectory.
export type TimelineItem = {
  when: string;
  org: string;
  role: string;
  note: string;
  href?: string;
};

export const timeline: TimelineItem[] = [
  {
    when: "2024 – Now",
    org: "Fiber AI (YC S23)",
    role: "Senior Software Engineer",
    note: "Data infrastructure for AI pipelines: search agents, scraping, billing.",
    href: "https://www.fiber.ai/",
  },
  {
    when: "2023 – 2024",
    org: "MathWorks",
    role: "Software Engineer",
    note: "Best Enhancement Award, MathWorks Hack Day 2023.",
    href: "https://www.mathworks.com/",
  },
  {
    when: "2023",
    org: "Calculus Carbon",
    role: "SDE, Backend",
    note: "Backend systems for carbon credit markets.",
    href: "https://www.linkedin.com/company/calculus-carbon/",
  },
  {
    when: "2019 – 2023",
    org: "IIT Kharagpur",
    role: "B.Tech, Aerospace Engineering",
    note: "Officiating Secretary, Technology Students’ Gymkhana.",
    href: "https://www.iitkgp.ac.in/",
  },
];

// Recognition: credibility at a glance.
export const recognition = [
  ["Global Rank 8", "CodeChef · 40K+ participants"],
  ["Top 1%", "IIT-JEE Advanced · of 1.2M candidates"],
  ["Rank 120", "IIM Indore IPMAT · of 30K+ applicants"],
  ["Best Enhancement", "MathWorks Hack Day 2023"],
  ["Finalist", "Smart India Hackathon 2023"],
  ["2,000 of 25,000+", "YC Startup School India 2026"],
];

export const sections = [
  { id: "intro", label: "Intro" },
  { id: "numbers", label: "Numbers" },
  { id: "thesis", label: "Thesis" },
  { id: "work", label: "Work" },
  { id: "path", label: "Path" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];
