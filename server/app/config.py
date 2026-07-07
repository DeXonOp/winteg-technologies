"""
Application settings loaded from environment variables.
Copy .env.example to .env and fill in your values.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # General
    APP_NAME: str = "Winteg Technologies API"
    APP_ENV: str = "development"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    # Admin Chat
    ADMIN_PASSWORD: str = "admin123"

    # SMTP (optional — for contact form emails)
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
