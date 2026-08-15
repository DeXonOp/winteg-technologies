"""
Email notification service.
Sends email notifications when a contact form is submitted.

In development mode (APP_ENV=development), emails are logged
to console instead of being sent via SMTP.
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.config import settings


def send_contact_email(data) -> bool:
    """
    Send an email notification for a new contact form submission.
    Returns True if sent successfully, False otherwise.

    In development mode, just logs the email content.
    """
    # In development mode, only skip sending if SMTP credentials are not configured
    if settings.APP_ENV == "development" and not (settings.SMTP_USER and settings.SMTP_PASSWORD):
        print(f"[Email Service] DEV MODE — skipping actual email send (no SMTP credentials configured)")
        print(f"  Would send notification about contact from {data.name} ({data.email})")
        return True

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print("[Email Service] SMTP credentials not configured, skipping email")
        return False

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

            # 1. Notification to you (with all form details)
            notify = MIMEMultipart()
            notify["From"] = "Winteg Technologies <wintegtechnologies@gmail.com>"
            notify["To"] = "wintegtechnologies@gmail.com"
            notify["Reply-To"] = data.email
            notify["Subject"] = f"New Contact: {data.name} ({data.email}) — {data.service}"
            notify.attach(MIMEText(f"""
NEW CONTACT FORM SUBMISSION
Reply-To is set to customer — hit Reply then DELETE QUOTED TEXT below your message before sending

Name:    {data.name}
Email:   {data.email}
Phone:   {data.phone or 'Not provided'}
Service: {data.service}
Budget:  {data.budget or 'Not specified'}

Message:
{data.message}
            """.strip(), "plain"))
            server.send_message(notify)

            # 2. Clean auto-reply to customer (no quoted submission details)
            reply = MIMEMultipart()
            reply["From"] = "Winteg Technologies <wintegtechnologies@gmail.com>"
            reply["To"] = data.email
            reply["Subject"] = f"Thank you for contacting Winteg Technologies, {data.name}!"
            reply.attach(MIMEText(f"""
Hello {data.name},

Thank you for reaching out to Winteg Technologies! We have received your
message and our team will review it shortly.

We typically respond within 24 hours. If your matter is urgent, feel free
to reply to this email or call us at +91 8100474669.

Here's what you requested:
Service: {data.service}
Budget:  {data.budget or 'Not specified'}

We look forward to working with you!

Best regards,
Aritra Dutta
Founder, Winteg Technologies
https://wintegtechnologies.com
            """.strip(), "plain"))
            server.send_message(reply)

        print(f"[Email Service] Notification + auto-reply sent for {data.name}")
        return True

    except Exception as e:
        print(f"[Email Service] Failed to send email: {e}")
        return False
