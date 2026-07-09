from typing import Literal

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[ChatMessage] = Field(default_factory=list)


class ChatReply(BaseModel):
    reply: str
    live: bool = Field(description="True when answered by the LLM, False for the fallback.")


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
