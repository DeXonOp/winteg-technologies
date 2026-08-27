import json
import urllib.request
import urllib.error
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

router = APIRouter(tags=["Chat"])

from app.config import settings

GROQ_API_KEY = settings.GROQ_API_KEY
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]
    model: str = "openai/gpt-oss-20b"
    temperature: float = 0.7
    max_tokens: int = 512

@router.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    data = request.model_dump() if hasattr(request, "model_dump") else request.dict()
    req = urllib.request.Request(
        GROQ_API_URL,
        data=json.dumps(data).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result
    except urllib.error.HTTPError as e:
        error_info = e.read().decode("utf-8")
        raise HTTPException(status_code=e.code, detail=f"Groq API Error: {error_info}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
