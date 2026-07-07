from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .data import BLOG_POSTS, PROJECTS
from .schemas import BlogPost, Project


app = FastAPI(
    title="Muhammed Portfolio API",
    description="Static content API for portfolio projects and blog posts.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3005",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3005",
    ],
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "portfolio-api"}


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
