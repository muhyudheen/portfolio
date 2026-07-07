from pydantic import BaseModel, Field


class Project(BaseModel):
    slug: str
    title: str
    summary: str
    description: str
    status: str = Field(description="Current project status, for example shipped or in-progress.")
    year: str
    stack: list[str]
    highlights: list[str]
    links: dict[str, str] = Field(default_factory=dict)


class BlogPost(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    published_at: str
    tags: list[str]
    reading_minutes: int
