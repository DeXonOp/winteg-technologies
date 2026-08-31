from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ReviewCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, examples=["Name / Company Name "])
    email: str = Field(..., examples=["company-name@example.com / name@example.com"])
    text: str = Field(..., min_length=10, max_length=1000, examples=["Great service!"])
    rating: int = Field(5, ge=1, le=5, examples=[5])

class ReviewResponse(BaseModel):
    id: int
    name: str
    text: str
    rating: int
    created_at: str
