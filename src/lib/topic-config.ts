export type TopicConfig = {
  slug: string;
  /** Exact label shown in the navbar */
  navLabel: string;
  kicker: string;
  title: string;
  crumb: string;
  edition: string;
  description: string;
  chips: string[];
  navOrder: number;
};

export const HR_TOPICS: TopicConfig[] = [
  {
    slug: "compliance",
    navLabel: "Compliance & Law",
    kicker: "Compliance & Law",
    title: "Compliance and Law",
    crumb: "Compliance",
    edition: "Compliance Weekly",
    description:
      "State rules, federal shifts, and court decisions are landing faster than annual policy reviews can absorb. We track what changes what you actually have to do.",
    chips: [
      "Wage & Hour",
      "Leave",
      "Immigration",
      "Pay Equity",
      "Classification",
      "Recordkeeping",
    ],
    navOrder: 1,
  },
  {
    slug: "talent",
    navLabel: "Talent & Hiring",
    kicker: "Talent & Hiring",
    title: "Talent and Hiring",
    crumb: "Talent",
    edition: "Talent Weekly",
    description:
      "Sourcing, assessment, mobility, and retention, covered for the teams who have to fill roles and keep good people once the offer is signed.",
    chips: [
      "Recruiting",
      "Skills",
      "Retention",
      "Mobility",
      "Employer Brand",
      "Assessment",
    ],
    navOrder: 2,
  },
  {
    slug: "rewards",
    navLabel: "Total Rewards",
    kicker: "Total Rewards",
    title: "Total Rewards",
    crumb: "Total Rewards",
    edition: "Rewards Weekly",
    description:
      "Compensation, benefits, retirement, and wellbeing, decoded for the teams balancing what people want against what the budget allows.",
    chips: [
      "Compensation",
      "Benefits",
      "Retirement",
      "Wellbeing",
      "Recognition",
      "Communication",
    ],
    navOrder: 3,
  },
  {
    slug: "analytics",
    navLabel: "People Analytics",
    kicker: "People Analytics & HR Tech",
    title: "People Analytics and HR Tech",
    crumb: "People Analytics",
    edition: "Tech Weekly",
    description:
      "Workforce data, HR systems, and AI, covered for the teams being asked to prove their impact with numbers and buy tools that actually deliver.",
    chips: [
      "Workforce Data",
      "HR Systems",
      "Artificial Intelligence",
      "Data Quality",
      "Reporting",
      "Procurement",
    ],
    navOrder: 4,
  },
  {
    slug: "culture",
    navLabel: "Culture & DEI",
    kicker: "Culture & DEI",
    title: "Culture and DEI",
    crumb: "Culture & DEI",
    edition: "Culture Weekly",
    description:
      "Workplace culture, belonging, and team health, covered for the teams building an environment people choose to stay in, not just show up to.",
    chips: [
      "Inclusion",
      "Measurement",
      "Management",
      "ERGs",
      "Team Health",
      "Listening",
    ],
    navOrder: 5,
  },
  {
    slug: "playbooks",
    navLabel: "Playbooks",
    kicker: "Playbooks & Research",
    title: "Playbooks and Research",
    crumb: "Playbooks",
    edition: "Research Digest",
    description:
      "Practical, downloadable tools built for the way HR teams actually work. Every resource is free in exchange for your work email.",
    chips: [
      "Playbooks",
      "Benchmarks",
      "Guides",
      "Webinars",
      "Reports",
      "Toolkits",
    ],
    navOrder: 6,
  },
];

const topicMap = new Map(HR_TOPICS.map((t) => [t.slug, t]));

export function getTopicConfig(slug: string): TopicConfig | undefined {
  return topicMap.get(slug);
}

export function getNavTopics(): TopicConfig[] {
  return [...HR_TOPICS].sort((a, b) => a.navOrder - b.navOrder);
}

export function sortTopicsByNavOrder<T extends { slug: string }>(
  topics: T[],
): T[] {
  return [...topics].sort((a, b) => {
    const ao = topicMap.get(a.slug)?.navOrder ?? 99;
    const bo = topicMap.get(b.slug)?.navOrder ?? 99;
    return ao - bo;
  });
}

export const FLAG_SIGNALS = [
  { label: "Pay transparency", text: "filings climb across state legislatures" },
  { label: "AI policy", text: "rewrites jump as managers adopt public tools" },
  {
    label: "Health costs",
    text: "return as the top benefits concern for 2027 planning",
  },
  {
    label: "Skills based hiring",
    text: "shifts from pilot to standing policy",
  },
  {
    label: "Manager capacity",
    text: "emerges as a workforce planning line item",
  },
];

export const HR_TOPIC_SLUGS = new Set(HR_TOPICS.map((t) => t.slug));

/** Topics that receive AI news articles (excludes playbooks/research hub). */
export const HR_NEWS_TOPIC_SLUGS = new Set(
  HR_TOPICS.filter((t) => t.slug !== "playbooks").map((t) => t.slug),
);
