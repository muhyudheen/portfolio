/* ============================================================
   Single source of truth for the REAL portfolio content.
   (Replaces the fake CaixaBank/Gymondo/Zattoo template data.)
   ============================================================ */

export const profile = {
  name: 'Muhammed Muhyudheen',
  initials: 'MMT',
  role: 'AI / ML Engineer',
  email: 'muhyudheenthengilan@gmail.com',
  available: true,
  tagline:
    'Machine Learning & Deep Learning specialist combining advanced algorithms with autonomous systems. Focused on building intelligent, scalable, and agentic AI solutions that solve complex real-world problems.',
  location: 'India',
  socials: {
    linkedin: 'https://www.linkedin.com/in/muhyudheen77',
    github: 'https://github.com/muhyudheen',
  },
} as const;

export const marquee: string[] = [
  'Artificial Intelligence',
  'Machine Learning',
  'Gen AI',
  'PyTorch',
  'TensorFlow',
  'Neural Networks',
  'Deep Learning',
  'Large Language Models',
  'Computer Vision',
  'Predictive Modeling',
];

export type ProjectStatus = 'in-progress' | 'planned' | 'shipped' | 'coming-soon';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Longer multi-paragraph write-up shown on the project detail page. */
  overview?: string[];
  /** Omit to hide the status badge entirely. */
  status?: ProjectStatus;
  year: string;
  stack: string[];
  highlights: string[];
  accent: string; // gradient seed used by the card visual
  links?: { label: string; href: string; external?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: 'lawhook',
    name: 'Lawhook',
    tagline: 'Regulatory monitoring that nobody else wants to build.',
    description:
      'A RegTech system that continuously monitors regulatory sources across jurisdictions and delivers important updates straight to user webhooks — built on scrapers, reliable delivery, and practical AI where it actually adds value.',
    overview: [
      'Governments are excellent at publishing important updates, and humans are excellent at missing them. A missed circular can mean fines, compliance issues, infrastructure changes, and emergency meetings. Lawhook closes that gap: it continuously monitors regulatory sources and automatically delivers what matters straight to a user’s webhook — no checking fifty websites every morning.',
      'It is deliberately not an "army of AI agents" project. Finding the right source matters far more than generating fancy summaries, so Lawhook leans on the boring-but-reliable stack: scrapers, webhooks, robust delivery, and good networking. AI is used only where it genuinely adds value, not where it looks impressive in a demo — which keeps the token bill from looking like a mortgage payment.',
      'The architecture launches jurisdiction scrapers at intervals (starting with SEBI in India and FCA in the UK), detects changes, processes the updates, and delivers them to user webhooks. With 190+ countries and many regulators each, the real engineering challenge is everything around the scraping.',
      'Security is the hard part: defending against SSRF, XSS, and Slowloris; handling TLS validation and SNI; and building rate limiting, retries, and secure webhook delivery. Every script goes through multiple review rounds — architecture discussion, implementation, an adversarial LLM pass to break it, fixes, manual review, and a final sweep — because the best vulnerability is the one you never deploy.',
    ],
    year: '2026',
    stack: ['Python', 'FastAPI', 'Scrapers', 'Webhooks', 'Networking', 'Security'],
    highlights: [
      'Launches jurisdiction scrapers at intervals, detects changes, and delivers to webhooks.',
      'Hardened against SSRF, XSS, Slowloris, with TLS validation, rate limiting and retries.',
      'AI used only where it adds value — not where it looks cool in a demo.',
    ],
    accent: 'orange',
    links: [{ label: 'Read the story', href: '/blog/lawhook-regulatory-circulars' }],
  },
  {
    slug: 'polymath',
    name: 'Polymath',
    tagline: 'A cross-domain scientific discovery engine.',
    description:
      'A research-intelligence platform that reads scientific literature across disciplines and surfaces non-obvious, testable cross-domain hypotheses no single researcher could find manually.',
    overview: [
      'Scientific breakthroughs disproportionately happen at the intersection of fields — but academia rewards deep specialisation and publishing inside silos. Researchers have no scalable way to notice when another discipline has already solved their problem. Polymath is built to close that gap.',
      'It continuously ingests papers from PubMed, arXiv, Semantic Scholar, and IEEE into a Neo4j knowledge graph, embeds them with a scientific transformer (Specter2), and runs a Graph Neural Network that detects when two problems in different domains are structurally isomorphic — the same underlying mechanism, even when the vocabulary is completely different. That goes well beyond keyword or citation matching.',
      'When it finds a bridge, an agentic LLM pipeline reasons about mechanism transfer, feasibility, and novelty, then synthesises a structured, testable hypothesis — scored on novelty, feasibility, and impact, with a full evidence trail through the citation graph and a one-click research brief ready to drop into a grant application.',
      'Think of it as a research collaborator that has read every paper in every field, whose only job is to ask one question: has this exact problem already been solved — somewhere else?',
    ],
    status: 'coming-soon',
    year: '2026',
    stack: ['Python', 'PyTorch Geometric', 'LangGraph', 'Neo4j', 'Qdrant', 'FastAPI', 'RAG'],
    highlights: [
      'A Graph Neural Network detects structural isomorphism between problems across domains.',
      'An agentic LLM pipeline synthesises testable hypotheses with novelty and feasibility scoring.',
      'Every hypothesis is fully explainable via an evidence trail through the knowledge graph.',
    ],
    accent: 'purple',
  },
  {
    slug: 'weather-intel-bot',
    name: 'Weather Intel Bot',
    tagline: 'Backend-first weather intelligence assistant.',
    description:
      'A FastAPI-powered assistant that combines API integration, prompt design, and structured responses to turn raw weather data into concise decision support.',
    year: '2025',
    stack: ['Python', 'FastAPI', 'LLM', 'API Integration'],
    highlights: [
      'Designed for low-latency weather question answering.',
      'Structured responses so any UI can render forecasts consistently.',
      'Foundation for agentic tool-calling workflows.',
    ],
    accent: 'blue',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const aboutBio: { text: string; emphasis?: string }[] = [
  {
    text: "I'm a Machine Learning and Agentic AI specialist focused on the intersection of rigorous data science and intelligent autonomous systems. Through my dual-track studies in Data Science and Mechanical Engineering at IIT Madras, I build predictive models that bridge theoretical mathematics with automated AI pipelines.",
  },
  {
    text: 'Recently, I engineered a high-speed Weather Intel Bot using FastAPI, and architected machine learning pipelines designed to solve advanced fluid dynamics and Navier–Stokes equations.',
  },
  {
    text: 'My approach is rooted in robust pipeline engineering — leveraging deep learning architectures and backend frameworks like FastAPI when complexity demands it, while maintaining strict evaluation metrics and AI-native workflows to accelerate development.',
  },
];

export type Education = {
  institution: string;
  detail: string;
  period: string;
};

export const education: Education[] = [
  {
    institution: 'IIT Madras',
    detail: 'BS — Data Science & Applications',
    period: 'Ongoing',
  },
  {
    institution: 'Mechanical Engineering',
    detail: 'Dual-track undergraduate studies',
    period: 'Ongoing',
  },
];

export const skills: string[] = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'Keras',
  'Scikit-learn',
  'LangChain',
  'XGBoost',
  'LightGBM',
  'HuggingFace',
  'FastAPI',
  'Kaggle',
  'Colab',
];
