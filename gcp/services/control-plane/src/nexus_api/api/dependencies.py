"""FastAPI dependency adapters."""

from fastapi import Request

from nexus_api.core.config import Settings
from nexus_api.infrastructure.database import DatabaseGateway


def get_settings(request: Request) -> Settings:
    """Return immutable application settings."""
    settings: Settings = request.app.state.settings
    return settings


def get_database(request: Request) -> DatabaseGateway:
    """Return the application database gateway."""
    database: DatabaseGateway = request.app.state.database
    return database
