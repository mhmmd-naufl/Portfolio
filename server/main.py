"""Portfolio content API: single JSON document in SQLite.

Run from repo root (Python 3.10+):
    pip install -r server/requirements.txt
    uvicorn server.main:app --reload --port 8000 --env-file server/.env

Endpoints:
    GET  /api/health    -> {"status": "ok"}
    GET  /api/content   -> {"data": {...}, "updated_at": ...} (public)
    PUT  /api/content   -> {"ok": true} (needs X-Admin-Token header)
"""

from __future__ import annotations

import json
import os
import sqlite3
import time
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Any

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .seed import SEED

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "content.db"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")
ORIGINS = [
    o.strip()
    for o in os.environ.get("FRONTEND_ORIGIN", "http://localhost:5173").split(",")
    if o.strip()
]


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS content "
        "(id INTEGER PRIMARY KEY CHECK (id = 1), data TEXT NOT NULL, updated_at INTEGER NOT NULL)"
    )
    return conn


@asynccontextmanager
async def lifespan(app: FastAPI):
    del app
    conn = get_db()
    try:
        row = conn.execute("SELECT id FROM content WHERE id = 1").fetchone()
        if row is None:
            conn.execute(
                "INSERT INTO content (id, data, updated_at) VALUES (1, ?, ?)",
                (json.dumps(SEED), int(time.time())),
            )
            conn.commit()
    finally:
        conn.close()
    yield


app = FastAPI(title="Portfolio Content API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_methods=["GET", "PUT"],
    allow_headers=["*"],
)


class ContentIn(BaseModel):
    data: dict[str, Any]


@app.get("/")
def root() -> dict[str, str]:
    return {"ok": "portfolio content api — see /api/health"}


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/content")
def get_content() -> dict[str, Any]:
    conn = get_db()
    try:
        row = conn.execute("SELECT data, updated_at FROM content WHERE id = 1").fetchone()
    finally:
        conn.close()
    if row is None:
        raise HTTPException(status_code=404, detail="empty — restart server to seed")
    return {"data": json.loads(row[0]), "updated_at": row[1]}


@app.put("/api/content")
def put_content(
    payload: ContentIn, x_admin_token: str | None = Header(default=None)
) -> dict[str, Any]:
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="unauthorized")
    now = int(time.time())
    conn = get_db()
    try:
        conn.execute(
            "INSERT INTO content (id, data, updated_at) VALUES (1, ?, ?) "
            "ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at",
            (json.dumps(payload.data), now),
        )
        conn.commit()
    finally:
        conn.close()
    return {"ok": True, "updated_at": now}
