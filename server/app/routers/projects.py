"""
Portfolio projects endpoint.
Returns a static list of projects (ready to be connected to a database).
"""

from fastapi import APIRouter
from app.models.contact import ProjectResponse

router = APIRouter(prefix="/api", tags=["Projects"])

# ── Static project data (replace with database queries later) ──
PROJECTS: list[dict] = [
    {
        "id": 1,
        "title": "E-Commerce Platform",
        "category": "Web Application",
        "description": "Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.",
        "tech_stack": ["React", "Node.js", "MongoDB", "Stripe"],
        "image_url": None,
        "live_url": None,
    },
    {
        "id": 2,
        "title": "AI Chatbot Assistant",
        "category": "AI Solution",
        "description": "Intelligent customer support chatbot powered by NLP, handling 80% of queries automatically.",
        "tech_stack": ["Python", "FastAPI", "OpenAI", "Redis"],
        "image_url": None,
        "live_url": None,
    },
    {
        "id": 3,
        "title": "Portfolio Website",
        "category": "Website",
        "description": "Modern, responsive portfolio website with smooth animations and optimized performance.",
        "tech_stack": ["React", "TypeScript", "Vite", "CSS"],
        "image_url": None,
        "live_url": None,
    },
    {
        "id": 4,
        "title": "Mobile Fitness App",
        "category": "Mobile App",
        "description": "Cross-platform fitness tracking app with workout plans, progress charts, and social features.",
        "tech_stack": ["React Native", "Firebase", "Node.js"],
        "image_url": None,
        "live_url": None,
    },
]


@router.get("/projects", response_model=list[ProjectResponse])
async def get_projects():
    """Return all portfolio projects."""
    return PROJECTS


@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int):
    """Return a single project by ID."""
    for project in PROJECTS:
        if project["id"] == project_id:
            return project
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Project not found")
