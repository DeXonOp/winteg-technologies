from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import urllib.request
import json
from app.database import save_chat_log, get_all_chat_logs
from app.config import settings

router = APIRouter(prefix="/api/chat", tags=["AI Chat"])

class ChatRequest(BaseModel):
    session_id: str
    messages: list[dict]

# The GROQ_API_KEY is now loaded from .env via settings
GROQ_API_KEY = settings.GROQ_API_KEY

@router.post("/ask")
async def ask_ai(request: ChatRequest):
    # Save the current history to DB
    save_chat_log(request.session_id, request.messages)
    
    url = "https://api.groq.com/openai/v1/chat/completions"
    data = json.dumps({
        "messages": request.messages,
        "model": "openai/gpt-oss-20b",
        "temperature": 0.5,
        "max_tokens": 512,
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=data)
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {GROQ_API_KEY}")
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            bot_reply = result.get("choices", [{}])[0].get("message", {}).get("content", "Sorry, I could not process that.")
            
            # Save the bot reply as well
            updated_messages = request.messages.copy()
            updated_messages.append({"role": "assistant", "content": bot_reply})
            save_chat_log(request.session_id, updated_messages)
            
            return {"reply": bot_reply}
    except Exception as e:
        import traceback
        traceback.print_exc()
        error_detail = str(e)
        if hasattr(e, 'read'):
            error_detail = e.read().decode()
        print("Groq API Error:", error_detail)
        raise HTTPException(status_code=500, detail=f"Error communicating with AI service: {error_detail}")

@router.get("/logs")
async def get_logs(password: str):
    if password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"logs": get_all_chat_logs()}
