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
    
    api_key = settings.GROQ_API_KEY or ""
    
    if not api_key:
        bot_reply = "Welcome to Winteg Technologies! Our team is available to assist you with Web Development, AI Solutions, Mobile Apps, and Cloud Infrastructure. How can we help you today?"
        updated_messages = request.messages.copy()
        updated_messages.append({"role": "assistant", "content": bot_reply})
        save_chat_log(request.session_id, updated_messages)
        return {"reply": bot_reply}
        
    url = "https://api.groq.com/openai/v1/chat/completions"
    data = json.dumps({
        "messages": request.messages,
        "model": "llama-3.1-8b-instant",
        "temperature": 0.5,
        "max_tokens": 512,
    }).encode("utf-8")
    
    req = urllib.request.Request(url, data=data)
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", f"Bearer {api_key}")
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
        
        # Fallback graceful receptionist response if API key fails
        fallback_reply = "Thank you for reaching out to Winteg Technologies! We specialize in custom AI agents, web/mobile applications, and telemetrics. Please fill out our quote form or contact us directly so our engineering team can discuss your project!"
        return {"reply": fallback_reply}

@router.get("/logs")
async def get_logs(password: str):
    if password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"logs": get_all_chat_logs()}
