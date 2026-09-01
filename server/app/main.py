"""
Winteg Technologies — FastAPI Application Entry Point
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import ORJSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.config import settings
from app.routers import contact, health, newsletter, projects, chat, ai_chat, visitors, estimate, reviews

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        return response


class CacheControlMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        if request.method == "GET":
            # Cache API GET requests for 60 seconds (adjust as needed for specific endpoints)
            response.headers["Cache-Control"] = "public, max-age=60"
        return response


# ── Create app ──────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    default_response_class=ORJSONResponse,
)

# ── Performance & Security Middlewares ─────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(CacheControlMiddleware)

# ── CORS ────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ── Routers ─────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(contact.router)
app.include_router(projects.router)
app.include_router(newsletter.router)
app.include_router(chat.router)
app.include_router(ai_chat.router)
app.include_router(visitors.router)
app.include_router(estimate.router)
app.include_router(reviews.router)


# ── Root redirect ───────────────────────────────────────────
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "docs": "/api/docs",
        "health": "/api/health",
    }


# ── 404 handler ─────────────────────────────────────────────
@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={"error": "Not Found", "path": str(request.url.path)},
    )
