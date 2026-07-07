"""
Contact form API endpoint.
Receives form submissions from the frontend contact section.
"""

from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, BackgroundTasks

from app.models.contact import ContactRequest, ContactResponse
from app.services.email_service import send_contact_email

router = APIRouter(prefix="/api", tags=["Contact"])


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactRequest, background_tasks: BackgroundTasks):
    """
    Handle contact form submission.
    Validates the data, logs it, and optionally sends an email notification.
    """
    try:
        # Log the submission (replace with database storage later)
        print(f"[{datetime.now(timezone.utc).isoformat()}] New contact submission:")
        print(f"  Name:    {data.name}")
        print(f"  Email:   {data.email}")
        print(f"  Phone:   {data.phone or 'N/A'}")
        print(f"  Service: {data.service}")
        print(f"  Budget:  {data.budget or 'N/A'}")
        print(f"  Message: {data.message[:100]}...")

        # Send email notification in the background (non-blocking, returns response instantly)
        background_tasks.add_task(send_contact_email, data)

        return ContactResponse(
            success=True,
            message="Thank you! Your message has been received. We'll get back to you within 24 hours.",
            data={"name": data.name, "email": data.email},
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process contact form: {str(e)}")
