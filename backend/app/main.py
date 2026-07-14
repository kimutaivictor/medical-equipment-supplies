"""TopZen Healthcare Limited — FastAPI backend + embedded frontend

Run with:
  uvicorn app.main:app --reload --port 8000

- API docs: http://localhost:8000/docs
- Website:  http://localhost:8000/

This server serves the static frontend in /topzen-website and exposes the
FastAPI API under /api/*.
"""

import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from . import models
from .database import engine, SessionLocal
from .seed_data import CATEGORIES, PRODUCTS
from .routers import categories, products, orders, contact, payments

logger = logging.getLogger("uvicorn.error")


# ---------------------------
# Startup: DB create/migrate + seed
# ---------------------------

def _seed_if_empty():
    db = SessionLocal()
    try:
        # Seed categories/products exactly once (idempotent by current table emptiness).
        # If your DB already has rows, we do nothing.
        if db.query(models.Category).count() == 0:
            db.bulk_insert_mappings(models.Category, CATEGORIES)
        if db.query(models.Product).count() == 0:
            db.bulk_insert_mappings(models.Product, PRODUCTS)
        db.commit()
    finally:
        db.close()


def _run_sqlite_schema_repairs():
    """Lightweight SQLite-only schema repair.

    This is intentionally small (no Alembic dependency). It prevents common
    "missing column" crashes when the DB file is older than the current
    model code.

    Note: This project currently does not define products.image_urls in
    models.py, but the frontend/backend may evolve over time. This keeps the
    same robustness pattern as your suggested code.
    """

    try:
        if str(getattr(engine.dialect, "name", "")).lower() != "sqlite":
            return

        # Ensure products.image_urls exists if older DBs were created without it.
        # If the column doesn't exist, ALTER TABLE will add it.
        try:
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE products ADD COLUMN image_urls TEXT"))
                conn.commit()
        except OperationalError as e:
            # Ignore if column already exists.
            msg = str(e).lower()
            if "duplicate column" not in msg and "already exists" not in msg:
                raise

    except Exception as e:
        # Don't block startup; seeding will surface persistent schema issues.
        logger.exception("SQLite schema migration/repair failed: %s", e)


def _init_db_and_seed():
    # 1) Create missing tables.
    try:
        models.Base.metadata.create_all(bind=engine)
    except Exception as e:
        logger.exception("Database table creation failed: %s", e)

    # 2) Targeted SQLite repairs.
    _run_sqlite_schema_repairs()

    # 3) Seed idempotently.
    try:
        _seed_if_empty()
    except Exception as e:
        logger.exception("Seeding products failed on startup: %s", e)
        # Attempt a second create_all to remediate schema mismatch.
        try:
            models.Base.metadata.create_all(bind=engine)
            _seed_if_empty()
        except Exception as e2:
            logger.exception("DB schema remediation (create_all + reseed) failed: %s", e2)


# ---------------------------
# FastAPI app
# ---------------------------
app = FastAPI(title="TopZen Healthcare API", version="1.0.0")

# Wide open for local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(contact.router)
app.include_router(payments.router)


# ---------------------------
# Embed/serve the frontend (topzen-website)
# ---------------------------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

# Frontend can be laid out either as:
# - <repo>/topzen-website/index.html
# - <repo>/topzen-website/topzen-website/index.html
FRONTEND_DIR_CANDIDATES = [
    os.path.join(BASE_DIR, "topzen-website"),
    os.path.join(BASE_DIR, "topzen-website", "topzen-website"),
]

FRONTEND_DIR = None
for candidate in FRONTEND_DIR_CANDIDATES:
    if os.path.isfile(os.path.join(candidate, "index.html")):
        FRONTEND_DIR = candidate
        break

if FRONTEND_DIR is None:
    raise RuntimeError(
        "Frontend index.html not found. Tried: "
        + ", ".join([os.path.join(c, "index.html") for c in FRONTEND_DIR_CANDIDATES])
    )

INDEX_HTML = os.path.join(FRONTEND_DIR, "index.html")
CART_HTML = os.path.join(FRONTEND_DIR, "cart.html")


# Mount common static assets (so relative links in HTML keep working)
assets_dir = os.path.join(FRONTEND_DIR, "assets")
css_dir = os.path.join(FRONTEND_DIR, "css")
js_dir = os.path.join(FRONTEND_DIR, "js")

if os.path.isdir(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
if os.path.isdir(css_dir):
    app.mount("/css", StaticFiles(directory=css_dir), name="css")
if os.path.isdir(js_dir):
    app.mount("/js", StaticFiles(directory=js_dir), name="js")


def _frontend_file(path: str) -> FileResponse:
    return FileResponse(path)


@app.get("/", tags=["frontend"])
def read_index():
    return _frontend_file(INDEX_HTML)


@app.get("/index.html", tags=["frontend"])
def read_root():
    return _frontend_file(INDEX_HTML)



@app.get("/cart.html", tags=["frontend"])
def read_cart():
    return _frontend_file(CART_HTML)


@app.get("/shop.html", tags=["frontend"])
def read_shop():
    return _frontend_file(os.path.join(FRONTEND_DIR, "shop.html"))


@app.get("/about.html", tags=["frontend"])
def read_about_html():
    return _frontend_file(os.path.join(FRONTEND_DIR, "about.html"))


@app.get("/contact.html", tags=["frontend"])
def read_contact_html():
    return _frontend_file(os.path.join(FRONTEND_DIR, "contact.html"))


@app.get("/shop.html", tags=["frontend"])
def read_shop_html():
    return _frontend_file(os.path.join(FRONTEND_DIR, "shop.html"))



@app.get("/product.html", tags=["frontend"])
def read_product():
    return _frontend_file(os.path.join(FRONTEND_DIR, "product.html"))


@app.get("/checkout.html", tags=["frontend"])
def read_checkout():
    return _frontend_file(os.path.join(FRONTEND_DIR, "checkout.html"))


@app.get("/about.html", tags=["frontend"])
def read_about():
    return _frontend_file(os.path.join(FRONTEND_DIR, "about.html"))



@app.get("/contact.html", tags=["frontend"])
def read_contact():
    return _frontend_file(os.path.join(FRONTEND_DIR, "contact.html"))



@app.get("/api/health", tags=["health"])
def health_check():
    return {"status": "ok", "service": "topzen-backend"}


@app.on_event("startup")
def on_startup():
    _init_db_and_seed()

