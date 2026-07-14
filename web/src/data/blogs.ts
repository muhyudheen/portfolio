/* ============================================================
   Blog content. Structured into blocks so posts can render
   headings + lists, not just flat paragraphs.
   Phase 3 may move these to markdown files; the shape stays.
   ============================================================ */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'code'; text: string };

export type Blog = {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  blocks: Block[];
};

export const blogs: Blog[] = [
  {
    slug: 'lawhook-regulatory-circulars',
    title: 'Nobody Reads Regulatory Circulars. So I Built Something That Does.',
    date: 'July 14, 2026',
    dateTime: '2026-07-14',
    excerpt:
      'Lawhook is a regulatory monitoring project built around scrapers, webhooks, reliable delivery, and practical AI where it actually adds value.',
    tags: ['Lawhook', 'RegTech', 'Scrapers', 'Webhooks'],
    readingMinutes: 5,
    blocks: [
      { type: 'p', text: 'A few weeks ago, I was hunting for a project that would actually stand out on my portfolio.' },
      { type: 'p', text: 'Like every developer who has spent too much time on X, Reddit, and YouTube, I first started building a deep research platform called Nexus. It had cool features, fancy AI ideas, and enough buzzwords to impress a VC for at least 12 seconds.' },
      { type: 'p', text: 'Then reality hit. The space was crowded. Very crowded.' },
      { type: 'p', text: 'So I went on a quest to find a less competitive problem. After digging through dozens of ideas, I stumbled upon something surprisingly painful: regulatory updates. And that is how Lawhook was born.' },
      { type: 'p', text: 'Today is June 18th, and while writing this blog, I am also building scraper scripts for SEBI (India) and FCA (UK). So let us get into it.' },

      { type: 'h2', text: 'What is Lawhook?' },
      { type: 'p', text: 'Imagine you are running a business. One morning a regulator publishes a new circular. You do not see it. A few weeks later: fine, compliance issue, infrastructure changes, emergency meetings, and more coffee.' },
      { type: 'p', text: 'Governments are extremely good at publishing important updates. Humans are extremely good at missing them. That is the problem Lawhook tries to solve.' },
      { type: 'p', text: 'Lawhook continuously monitors regulatory sources and automatically delivers important updates to users. No endless browsing. No checking fifty websites every morning. No "Oops, we missed that circular from three months ago." Simple.' },

      { type: 'h2', text: 'Wait… is this one of those AI agent projects?' },
      { type: 'p', text: 'You know the type. "10 AI agents." "25 sub-agents." "Each agent has a role." "Each agent has a backstory." "One agent is emotionally supportive." No. At least not here.' },
      { type: 'p', text: 'Could I build a system where AI agents constantly search the web, gather information, summarize documents, and make decisions? Sure. Would it be expensive? Also sure. Very expensive.' },
      { type: 'p', text: 'The problem with regulatory information is that finding the right source matters more than generating fancy summaries. If an AI has to search, search again, find relevant documents, process them, verify them, and process them again, suddenly your token bill starts looking like a mortgage payment. As a student, I would prefer my wallet remain alive.' },

      { type: 'h2', text: 'So how does Lawhook work?' },
      { type: 'p', text: 'The answer is surprisingly boring. And boring is good. Lawhook relies heavily on:' },
      { type: 'ul', items: ['Scrapers', 'Webhooks', 'Reliable delivery systems', 'Good networking'] },
      { type: 'p', text: 'That is it. No magical AI kingdom. No army of autonomous agents. Just systems that do their job.' },
      { type: 'p', text: 'There are roughly 190+ countries in the world, many with different regulators and jurisdictions. Lawhook launches scrapers at intervals, detects changes, processes the updates, and delivers them directly to user webhooks. AI is used where it adds value, not where it looks cool in a demo. Honestly, AI is only a small percentage of the project. The interesting engineering is everything around it.' },
      { type: 'p', text: 'The whole pipeline is deliberately boring:' },
      { type: 'code', text: `Regulator sources  (RBI · SEBI · SEC · MAS · ASIC)

        │  scrape — demand-driven, cadence set by subscriber tier

        ▼

Change detection  (content hash — only real changes pass)

        │

        ▼

AI diff + severity  (added / removed / modified + plain-English summary)

        │

        ▼

Match subscriptions  (jurisdiction · industry · severity threshold)

        │

        ▼

Signed webhook  →  your endpoint` },

      { type: 'h2', text: 'The less glamorous part nobody talks about' },
      { type: 'p', text: 'The fun part isn’t scraping. The hard part starts after scraping. You have to think about:' },
      { type: 'ul', items: ['SSRF', 'XSS', 'Slowloris attacks', 'TLS validation', 'SNI handling', 'Rate limiting', 'Retry systems', 'Secure webhook delivery'] },
      { type: 'p', text: 'Every script I write goes through multiple rounds of review. My process looks something like this:' },
      { type: 'ol', items: ['I design the architecture, pressure-testing it against LLMs to find holes before writing a line', 'I write the implementation myself', 'I have an LLM try to break it, attack the auth, the validation, the edge cases', 'I fix what it finds', 'Manual review', 'Review again, because the best security vulnerability is the one you never deploy'] },

      { type: 'h2', text: 'What’s next?' },
      { type: 'p', text: 'Right now I am building jurisdiction scrapers and the infrastructure around them. The goal is simple: get regulatory updates from source to user as quickly and reliably as possible. No noise. No endless searching. No surprise fines. Just updates that matter. And hopefully fewer compliance-induced heart attacks.' },
      { type: 'p', text: 'So that is Lawhook: a project born from boredom, built because regulatory monitoring is painful, and powered mostly by scrapers, webhooks, networking, and stubbornness. Until then, it is me, a terminal window, several cups of tea, and a growing collection of scraper scripts.' },
    ],
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}
