from .schemas import BlogPost, Project


PROJECTS: list[Project] = [
    Project(
        slug="weather-intel-bot",
        title="Weather Intel Bot",
        summary="A FastAPI-powered weather intelligence assistant focused on quick, actionable forecasts.",
        description=(
            "A backend-first assistant that combines API integration, prompt design, and structured "
            "responses to turn weather data into concise decision support."
        ),
        status="in-progress",
        year="2025",
        stack=["Python", "FastAPI", "LLM", "API Integration"],
        highlights=[
            "Designed for low-latency weather question answering.",
            "Uses structured responses so the UI can render forecasts consistently.",
            "Built as a foundation for agentic tool-calling workflows.",
        ],
        links={},
    ),
    Project(
        slug="formula-1-pit-stop-prediction",
        title="Formula 1 Pit Stop Prediction",
        summary="Machine learning experiments for predicting F1 pit stop strategy and race timing windows.",
        description=(
            "A data science project exploring race telemetry-style features, model evaluation, and "
            "prediction workflows for Formula 1 pit stop timing."
        ),
        status="in-progress",
        year="2025",
        stack=["Python", "Pandas", "Scikit-learn", "Kaggle", "XGBoost"],
        highlights=[
            "Frames race strategy as a supervised prediction problem.",
            "Focuses on feature engineering and repeatable evaluation.",
            "Built to improve with richer race and tire degradation datasets.",
        ],
        links={},
    ),
    Project(
        slug="agentic-ai-portfolio",
        title="Agentic AI Portfolio Assistant",
        summary="A portfolio chatbot concept that answers visitor questions and captures useful lead context.",
        description=(
            "A production blueprint for combining a premium portfolio frontend with a backend AI assistant, "
            "tool calling, lead capture, and unknown-question logging."
        ),
        status="planned",
        year="2026",
        stack=["Next.js", "FastAPI", "OpenAI", "PostgreSQL", "Redis"],
        highlights=[
            "Keeps secrets and tool execution on the backend.",
            "Separates portfolio content, chat telemetry, and lead capture.",
            "Designed for weekly improvement from unknown-question logs.",
        ],
        links={},
    ),
]


BLOG_POSTS: list[BlogPost] = [
    BlogPost(
        slug="lawhook-regulatory-circulars",
        title="Nobody Reads Regulatory Circulars. So I Built Something That Does.",
        excerpt=(
            "Lawhook is a regulatory monitoring project built around scrapers, webhooks, "
            "reliable delivery, and practical AI where it actually adds value."
        ),
        content=(
            "Lawhook continuously monitors regulatory sources and automatically delivers important "
            "updates to users. It avoids unnecessary agent complexity and focuses on source reliability, "
            "scrapers, webhooks, secure delivery, retries, rate limits, and practical AI usage."
        ),
        published_at="2026-06-18",
        tags=["Lawhook", "RegTech", "Scrapers", "Webhooks"],
        reading_minutes=5,
    ),
]
