"""
Newsletter subscription endpoint.
"""

from datetime import datetime, timezone
from fastapi import APIRouter

from app.models.contact import NewsletterRequest, NewsletterResponse

router = APIRouter(prefix="/api", tags=["Newsletter"])

# In-memory store (replace with database in fututre)
subscribers: list[dict] = []


@router.post("/newsletter", response_model=NewsletterResponse)
async def subscribe_newsletter(data: NewsletterRequest):
    """Subscribe an email to the newsletter."""

    # Check for duplicate
    for sub in subscribers:
        if sub["email"] == data.email:
            return NewsletterResponse(
                success=True,
                message="You're already subscribed! Thank you.",
            )

    # Store subscription
    subscribers.append({
        "email": data.email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
    })

    print(f"[Newsletter] New subscriber: {data.email}")

    return NewsletterResponse(
        success=True,
        message="Successfully subscribed to the newsletter!",
    )
