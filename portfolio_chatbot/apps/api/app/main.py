import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from . import chat
from .data import BLOG_POSTS, PROJECTS
from .schemas import BlogPost, ChatReply, ChatRequest, Project


app = FastAPI(
    title="Muhammed Portfolio API",
    description="Content + chat API for the portfolio site.",
    version="0.2.0",
)

# Local dev origins + any deployed frontend set via FRONTEND_ORIGIN (comma-separated).
_default_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5175",
    "http://127.0.0.1:5175",
]
_env_origins = [o.strip() for o in os.getenv("FRONTEND_ORIGIN", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_default_origins + _env_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {"status": "ok", "service": "portfolio-api", "chat_configured": chat.is_configured()}


@app.post("/chat", response_model=ChatReply)
async def chat_endpoint(request: ChatRequest) -> ChatReply:
    try:
        reply, live = await chat.generate_reply(request.message, request.history)
    except Exception:
        # Never leak provider errors to the visitor; degrade gracefully.
        return ChatReply(reply=chat.FALLBACK_REPLY, live=False)
    return ChatReply(reply=reply, live=live)


@app.get("/projects", response_model=list[Project])
def list_projects() -> list[Project]:
    return PROJECTS


@app.get("/projects/{slug}", response_model=Project)
def get_project(slug: str) -> Project:
    for project in PROJECTS:
        if project.slug == slug:
            return project

    raise HTTPException(status_code=404, detail="Project not found")


@app.get("/blog", response_model=list[BlogPost])
def list_blog_posts() -> list[BlogPost]:
    return BLOG_POSTS


@app.get("/blog/{slug}", response_model=BlogPost)
def get_blog_post(slug: str) -> BlogPost:
    for post in BLOG_POSTS:
        if post.slug == slug:
            return post

    raise HTTPException(status_code=404, detail="Blog post not found")
