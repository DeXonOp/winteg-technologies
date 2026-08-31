from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.review import ReviewCreate, ReviewResponse
from app.database import save_review, get_approved_reviews

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.post("", status_code=status.HTTP_201_CREATED)
async def create_review(review: ReviewCreate):
    try:
        review_id = save_review(
            name=review.name,
            email=review.email,
            text=review.text,
            rating=review.rating
        )
        return {"success": True, "message": "Review submitted successfully!", "id": review_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to save review")

@router.get("", response_model=List[ReviewResponse])
async def get_reviews():
    try:
        reviews = get_approved_reviews()
        return reviews
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")
