"""Provider-agnostic chat backend.

Defaults to Google Gemini via its OpenAI-compatible endpoint, but works with any
OpenAI-compatible /chat/completions API (OpenAI, OpenRouter, Groq, the IITM/aipipe
proxy, ...). Configure via environment:

    LLM_API_KEY   - API key / bearer token
                    (falls back to GEMINI_API_KEY / GOOGLE_API_KEY / OPENAI_API_KEY)
    LLM_BASE_URL  - default https://generativelanguage.googleapis.com/v1beta/openai
    LLM_MODEL     - default gemini-2.5-flash

If no key is set, replies with a friendly fallback so the widget still works.
"""

import os

import httpx

from .persona import EMAIL, build_system_prompt
from .schemas import ChatMessage

LLM_API_KEY = (
    os.getenv("LLM_API_KEY")
    or os.getenv("GEMINI_API_KEY")
    or os.getenv("GOOGLE_API_KEY")
    or os.getenv("OPENAI_API_KEY")
)
LLM_BASE_URL = os.getenv(
    "LLM_BASE_URL", "https://generativelanguage.googleapis.com/v1beta/openai"
).rstrip("/")
LLM_MODEL = os.getenv("LLM_MODEL", "gemini-2.5-flash")

MAX_HISTORY = 10

FALLBACK_REPLY = (
    "Thanks for reaching out! The live assistant isn't connected right now, but "
    f"Muhammed would genuinely love to hear from you — email him at {EMAIL} and "
    "he'll get back to you."
)


def is_configured() -> bool:
    return bool(LLM_API_KEY)


async def generate_reply(message: str, history: list[ChatMessage]) -> tuple[str, bool]:
    """Return (reply, live). `live` is False when the fallback was used."""
    if not LLM_API_KEY:
        return FALLBACK_REPLY, False

    messages: list[dict[str, str]] = [{"role": "system", "content": build_system_prompt()}]
    for item in history[-MAX_HISTORY:]:
        messages.append({"role": item.role, "content": item.content})
    messages.append({"role": "user", "content": message})

    payload = {
        "model": LLM_MODEL,
        "messages": messages,
        "temperature": 0.6,
        "max_tokens": 500,
    }
    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{LLM_BASE_URL}/chat/completions", json=payload, headers=headers
        )
        response.raise_for_status()
        data = response.json()

    reply = data["choices"][0]["message"]["content"].strip()
    return reply, True
