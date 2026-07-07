"""
Standard response helpers for consistent API responses.
"""

from typing import Any, Optional


def success_response(message: str, data: Optional[Any] = None) -> dict:
    """Return a standardized success response."""
    resp = {"success": True, "message": message}
    if data is not None:
        resp["data"] = data
    return resp


def error_response(message: str, details: Optional[Any] = None) -> dict:
    """Return a standardized error response."""
    resp = {"success": False, "message": message}
    if details is not None:
        resp["details"] = details
    return resp
