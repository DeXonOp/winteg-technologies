"""
Pydantic schemas for request/response validation.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# ── Contact Form ────────────────────────────────────────────
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, examples=["Name"])
    email: str = Field(..., min_length=5, max_length=150, examples=["name@example.com"])
    phone: Optional[str] = Field(None, max_length=20, examples=["+91 98765 43210"])
    service: str = Field(..., examples=["web"])
    budget: Optional[str] = Field(None, examples=["10k-25k"])
    message: str = Field(..., min_length=10, max_length=2000, examples=["I need a website for my business."])


class ContactResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None


# ── Newsletter ──────────────────────────────────────────────
class NewsletterRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=150, examples=["name@example.com"])


class NewsletterResponse(BaseModel):
    success: bool
    message: str


# ── Project ─────────────────────────────────────────────────
class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    description: str
    tech_stack: list[str]
    image_url: Optional[str] = None
    live_url: Optional[str] = None
