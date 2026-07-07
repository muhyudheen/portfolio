export type Blog = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  paragraphs: string[];
};

export const blogs: Blog[] = [
  {
    slug: 'lawhook-regulatory-circulars',
    title: 'Nobody Reads Regulatory Circulars. So I Built Something That Does.',
    date: 'June 18, 2026',
    dateTime: '2026-06-18',
    excerpt:
      'Lawhook is a regulatory monitoring project built around scrapers, webhooks, reliable delivery, and practical AI where it actually adds value.',
    tags: ['Lawhook', 'RegTech', 'Scrapers', 'Webhooks'],
    readingMinutes: 5,
    paragraphs: [
      'A few weeks ago, I was hunting for a project that would actually stand out on my portfolio. Like every developer who has spent too much time on X, Reddit, and YouTube, I first started building a deep research platform called Nexus. It had cool features, fancy AI ideas, and enough buzzwords to impress a VC for at least 12 seconds.',
      'Then reality hit. The space was crowded. Very crowded.',
      'So I went on a quest to find a less competitive problem. After digging through dozens of ideas, I stumbled upon something surprisingly painful: regulatory updates. And that is how Lawhook was born.',
      'Imagine you are running a business. One morning a regulator publishes a new circular. You do not see it. A few weeks later: fine, compliance issue, infrastructure changes, emergency meetings, and more coffee.',
      'Governments are extremely good at publishing important updates. Humans are extremely good at missing them. That is the problem Lawhook tries to solve.',
      'Lawhook continuously monitors regulatory sources and automatically delivers important updates to users. No endless browsing. No checking fifty websites every morning. No "Oops, we missed that circular from three months ago." Simple.',
      'This is not one of those projects with ten AI agents, twenty-five sub-agents, roleplay prompts, and one emotionally supportive agent. Could I build a system where AI agents constantly search the web, gather information, summarize documents, and make decisions? Sure. Would it be expensive? Also sure. Very expensive.',
      'The problem with regulatory information is that finding the right source matters more than generating fancy summaries. If an AI has to search, search again, find relevant documents, process them, verify them, and process them again, suddenly your token bill starts looking like a mortgage payment.',
      'So Lawhook relies heavily on scrapers, webhooks, reliable delivery systems, and good networking. No magical AI kingdom. No army of autonomous agents. Just systems that do their job.',
      'There are roughly 190+ countries in the world, many with different regulators and jurisdictions. Lawhook launches scrapers at intervals, detects changes, processes the updates, and delivers them directly to user webhooks. AI is used where it adds value, not where it looks cool in a demo.',
      'The hard part starts after scraping. You have to think about SSRF, XSS, Slowloris attacks, TLS validation, SNI handling, rate limiting, retry systems, and secure webhook delivery.',
      'Every script goes through multiple rounds of review: discuss architecture, write the implementation, ask another LLM to break it, fix the issues, manually review, enter Einstein Mode, and review everything again. The best security vulnerability is the one you never deploy.',
      'Right now I am building jurisdiction scrapers and the infrastructure around them. The goal is simple: get regulatory updates from source to user as quickly and reliably as possible. No noise. No endless searching. No surprise fines. Just updates that matter.',
      'So that is Lawhook: a project born from boredom, built because regulatory monitoring is painful, and powered mostly by scrapers, webhooks, networking, and stubbornness.',
    ],
  },
];

export function getBlog(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}
