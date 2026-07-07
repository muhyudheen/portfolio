# Portfolio API

FastAPI backend for portfolio content. It currently serves static project and blog data so the frontend can consume a stable JSON contract before a database or CMS is added.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `GET /projects`
- `GET /projects/{slug}`
- `GET /blog`
- `GET /blog/{slug}`

Interactive docs are available at `http://localhost:8000/docs` when the API is running.
