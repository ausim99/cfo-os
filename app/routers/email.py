import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from ..config import settings

router = APIRouter()


class EmailIn(BaseModel):
    to: EmailStr
    subject: str
    html: str


@router.post("/api/email")
def send_email(body: EmailIn):
    if not settings.SMTP_HOST:
        raise HTTPException(status_code=503, detail="SMTP_HOST not configured")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = body.subject
    msg["From"] = settings.SMTP_FROM or settings.SMTP_USER
    msg["To"] = body.to
    msg.attach(MIMEText(body.html, "html"))

    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=30) as s:
            if settings.SMTP_USE_TLS:
                s.starttls()
            if settings.SMTP_USER:
                s.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            s.sendmail(msg["From"], [body.to], msg.as_string())
    except (smtplib.SMTPException, OSError) as e:
        raise HTTPException(status_code=502, detail=f"email send failed: {e}")

    return {"sent": True}
