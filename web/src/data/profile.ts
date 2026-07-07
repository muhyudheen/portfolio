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

export type ProjectStatus = 'in-progress' | 'planned' | 'shipped';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Longer multi-paragraph write-up shown on the project detail page. */
  overview?: string[];
  status: ProjectStatus;
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
    status: 'in-progress',
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
    slug: 'weather-intel-bot',
    name: 'Weather Intel Bot',
    tagline: 'Backend-first weather intelligence assistant.',
    description:
      'A FastAPI-powered assistant that combines API integration, prompt design, and structured responses to turn raw weather data into concise decision support.',
    status: 'in-progress',
    year: '2025',
    stack: ['Python', 'FastAPI', 'LLM', 'API Integration'],
    highlights: [
      'Designed for low-latency weather question answering.',
      'Structured responses so any UI can render forecasts consistently.',
      'Foundation for agentic tool-calling workflows.',
    ],
    accent: 'blue',
  },
  {
    slug: 'formula-1-pit-stop-prediction',
    name: 'Formula 1 Pit-Stop Prediction',
    tagline: 'Modeling race strategy as a prediction problem.',
    description:
      'A data-science project exploring telemetry-style features, model evaluation, and prediction workflows for Formula 1 pit-stop timing windows.',
    status: 'in-progress',
    year: '2025',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Kaggle'],
    highlights: [
      'Frames pit-stop strategy as a supervised prediction problem.',
      'Focuses on feature engineering and repeatable evaluation.',
      'Built to improve with richer tire-degradation datasets.',
    ],
    accent: 'green',
  },
  {
    slug: 'agentic-ai-portfolio',
    name: 'Agentic AI Portfolio Assistant',
    tagline: 'A portfolio that can answer for itself.',
    description:
      'A site assistant that answers visitor questions about my work and captures useful lead context — tool calling and secrets kept safely on the backend.',
    status: 'planned',
    year: '2026',
    stack: ['Next.js', 'FastAPI', 'OpenAI', 'Tool Calling'],
    highlights: [
      'Keeps secrets and tool execution on the backend.',
      'Separates portfolio content, chat telemetry, and lead capture.',
      'Improves weekly from unknown-question logs.',
    ],
    accent: 'red',
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
    text: 'Recently, I engineered a high-speed Weather Intel Bot using FastAPI, developed predictive models for Formula 1 pit stops in Kaggle competitions, and architected machine learning pipelines designed to solve advanced fluid dynamics and Navier–Stokes equations.',
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
