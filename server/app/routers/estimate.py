"""
Project cost estimation API.
Receives project configuration and returns an estimated price range.
Also stores the lead data for follow-up.
"""

from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from datetime import datetime, timezone

router = APIRouter(prefix="/api", tags=["Estimate"])


class EstimateRequest(BaseModel):
    name: str = ""
    email: str = ""
    project_type: str
    features: list[str] = []
    timeline: str
    

# Pricing matrix (INR)
PROJECT_BASE_COSTS = {
    "website": 8000,
    "webapp": 25000,
    "mobile": 30000,
    "software": 35000,
    "ai": 40000,
    "ecommerce": 20000,
    "erp": 50000,
    "iot": 45000,
}

FEATURE_COSTS = {
    "auth": 3000,
    "payment": 5000,
    "admin": 8000,
    "api": 4000,
    "realtime": 6000,
    "analytics": 5000,
    "notifications": 3000,
    "multilang": 4000,
    "seo": 3000,
    "chat": 5000,
}

TIMELINE_MULTIPLIERS = {
    "rush": 1.5,
    "normal": 1.0,
    "relaxed": 0.85,
    "flexible": 0.75,
}


@router.post("/estimate")
async def get_estimate(data: EstimateRequest):
    """Calculate project cost estimate based on configuration."""
    
    base = PROJECT_BASE_COSTS.get(data.project_type, 15000)
    
    feature_cost = sum(FEATURE_COSTS.get(f, 0) for f in data.features)
    total = base + feature_cost
    
    multiplier = TIMELINE_MULTIPLIERS.get(data.timeline, 1.0)
    total = round(total * multiplier)
    
    estimate = {
        "low": round(total * 0.8),
        "high": round(total * 1.2),
        "project_type": data.project_type,
        "features_count": len(data.features),
        "timeline": data.timeline,
    }
    
    # Log the lead
    print(f"[{datetime.now(timezone.utc).isoformat()}] New estimate request:")
    print(f"  Name:    {data.name or 'Anonymous'}")
    print(f"  Email:   {data.email or 'N/A'}")
    print(f"  Type:    {data.project_type}")
    print(f"  Features: {', '.join(data.features) if data.features else 'None'}")
    print(f"  Timeline: {data.timeline}")
    print(f"  Estimate: ₹{estimate['low']:,} — ₹{estimate['high']:,}")
    
    return {"success": True, "estimate": estimate}
