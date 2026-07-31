from pydantic_settings import BaseSettings, SettingsConfigDict

from .paths import base_dir


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=str(base_dir() / ".env"), env_file_encoding="utf-8", extra="ignore")

    # --- MSSQL (iBOS ERP / fin.tblAccountingJournalArc) ---
    MSSQL_SERVER: str = ""
    MSSQL_PORT: int = 1433
    MSSQL_DATABASE: str = ""
    MSSQL_USER: str = ""
    MSSQL_PASSWORD: str = ""
    MSSQL_DRIVER: str = "ODBC Driver 17 for SQL Server"

    # --- AI provider select: "grok" or "gemini" ---
    AI_PROVIDER: str = "grok"

    # --- xAI Grok (OpenAI-compatible chat completions) ---
    GROK_API_KEY: str = ""
    GROK_MODEL: str = "grok-4"
    GROK_BASE_URL: str = "https://api.x.ai/v1"

    # --- Google Gemini ---
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"
    GEMINI_BASE_URL: str = "https://generativelanguage.googleapis.com/v1beta"

    # --- SMTP (email report) ---
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM: str = ""
    SMTP_USE_TLS: bool = True


settings = Settings()
