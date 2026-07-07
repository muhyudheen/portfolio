# Muhammed Portfolio + AI Chatbot (Production Blueprint)

## 1) Project Goal
Build a premium personal portfolio website with an in-character AI assistant that speaks as you, captures leads, and logs unknown questions for continuous improvement.

## 2) Recommended Architecture
- Frontend: Next.js (App Router) + TypeScript
- Backend API: FastAPI (Python)
- LLM: OpenAI (tool calling)
- Data: PostgreSQL (chat telemetry, leads, unknown questions)
- Cache / limits: Redis
- Observability: Sentry + structured logs

This split lets you keep all secrets and tool logic on the backend while the frontend stays fast and elegant.

## 3) Exact Folder Structure
```text
portfolio_chatbot/
├── README.md
├── .gitignore
├── .env.example
├── docker-compose.yml
├── Makefile
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.ts
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── resume.pdf
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx
│   │       │   ├── projects/page.tsx
│   │       │   ├── about/page.tsx
│   │       │   ├── contact/page.tsx
│   │       │   ├── chat/page.tsx
│   │       │   └── api/health/route.ts
│   │       ├── components/
│   │       │   ├── sections/
│   │       │   │   ├── Hero.tsx
│   │       │   │   ├── FeaturedProjects.tsx
│   │       │   │   ├── ExperienceTimeline.tsx
│   │       │   │   └── ContactCTA.tsx
│   │       │   ├── chat/
│   │       │   │   ├── ChatLauncher.tsx
│   │       │   │   ├── ChatPanel.tsx
│   │       │   │   ├── MessageList.tsx
│   │       │   │   └── Composer.tsx
│   │       │   └── ui/
│   │       │       ├── Button.tsx
│   │       │       ├── Card.tsx
│   │       │       └── SectionHeading.tsx
│   │       ├── lib/
│   │       │   ├── apiClient.ts
│   │       │   ├── analytics.ts
│   │       │   └── constants.ts
│   │       ├── styles/
│   │       │   ├── globals.css
│   │       │   └── theme.css
│   │       └── types/
│   │           └── chat.ts
│   └── api/
│       ├── pyproject.toml
│       ├── uv.lock
│       ├── Dockerfile
│       ├── tests/
│       │   ├── test_chat_route.py
│       │   ├── test_tool_calls.py
│       │   └── test_health.py
│       └── app/
│           ├── main.py
│           ├── core/
│           │   ├── config.py
│           │   ├── logging.py
│           │   └── security.py
│           ├── api/
│           │   ├── deps.py
│           │   └── routes/
│           │       ├── health.py
│           │       ├── chat.py
│           │       └── leads.py
│           ├── schemas/
│           │   ├── chat.py
│           │   └── lead.py
│           ├── services/
│           │   ├── llm_service.py
│           │   ├── persona_service.py
│           │   └── lead_service.py
│           ├── tools/
│           │   ├── registry.py
│           │   ├── record_user_details.py
│           │   └── record_unknown_question.py
│           ├── prompts/
│           │   └── persona.md
│           ├── db/
│           │   ├── models.py
│           │   ├── session.py
│           │   └── migrations/
│           └── clients/
│               ├── openai_client.py
│               └── pushover_client.py
├── packages/
│   ├── eslint-config/
│   └── tsconfig/
├── infra/
│   ├── vercel.json
│   ├── render.yaml
│   ├── nginx/
│   └── terraform/
│       ├── main.tf
│       └── variables.tf
└── .github/
    └── workflows/
        ├── web-ci.yml
        ├── api-ci.yml
        └── deploy.yml
```

## 4) Frameworks and Core Libraries
### Frontend
- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS (utility styling)
- Framer Motion (intentional page transitions and section reveals)
- React Hook Form + Zod (forms and validation)

### Backend
- FastAPI + Uvicorn
- Pydantic v2 (request/response schemas)
- SQLAlchemy + Alembic (database access and migrations)
- OpenAI Python SDK (chat + tool calling)
- httpx (external integrations)

### Data and Infra
- PostgreSQL (lead and question records)
- Redis (rate-limiting and session helpers)
- Sentry (error monitoring)

## 5) Chatbot Tooling Design
Keep tool execution server-side only.

- Tool: record_user_details
  - Input: email, name, notes
  - Action: save to DB + optional Pushover notification
- Tool: record_unknown_question
  - Input: question
  - Action: save to DB for future FAQ and prompt improvements

Use the same loop pattern you already implemented: keep iterating until finish_reason is not tool_calls, then return final assistant content.

## 6) Deployment Tools
### Recommended production stack
- Web deployment: Vercel
- API deployment: Render (or Railway)
- Database: Supabase Postgres (or Neon)
- Redis: Upstash Redis
- DNS + SSL: Cloudflare

### CI/CD
- GitHub Actions
  - Lint/test web and API on pull requests
  - Deploy web on merge to main
  - Deploy API on merge to main

## 7) Environment Variables
Create .env files from this template:

```bash
# web
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com

# api
OPENAI_API_KEY=
PUSHOVER_USER=
PUSHOVER_TOKEN=
DATABASE_URL=postgresql+psycopg://...
REDIS_URL=redis://...
SENTRY_DSN=
ALLOWED_ORIGINS=https://yourdomain.com
```

## 8) Build Phases (Recommended)
1. Scaffold monorepo (web + api)
2. Implement static portfolio pages
3. Add chat UI shell and streaming responses
4. Port tool-calling logic from your current app.py to API route
5. Add DB persistence for leads and unknown questions
6. Add auth/rate limiting for abuse protection
7. Ship to Vercel + Render
8. Add analytics, evaluate unknown-question logs, and iterate weekly

## 9) Minimum Launch Checklist
- Homepage, projects, about, contact pages complete
- Chatbot responds in your persona consistently
- Tools write lead and unknown-question data correctly
- Mobile UX is smooth for chat panel
- Error monitoring and logs enabled
- HTTPS + custom domain connected

## 10) Nice-to-Have Next
- RAG from your resume, case studies, and blog posts
- Voice mode (STT/TTS)
- Admin dashboard for leads and unanswered questions
- Booking integration (Calendly)
