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
    
    if not api_key or api_key.startswith("gsk_your"):
        bot_reply = "Welcome to Winteg Technologies! Our team is available to assist you with Web Development, AI Solutions, Mobile Apps, and Cloud Infrastructure. How can we help you today?"
        updated_messages = request.messages.copy()
        updated_messages.append({"role": "assistant", "content": bot_reply})
        save_chat_log(request.session_id, updated_messages)
        return {"reply": bot_reply}
    
    # Step 1: Try to dynamically discover available models from the API
    discovered_models = []
    try:
        model_req = urllib.request.Request("https://api.groq.com/openai/v1/models")
        model_req.add_header("Authorization", f"Bearer {api_key}")
        model_req.add_header("User-Agent", "Mozilla/5.0")
        with urllib.request.urlopen(model_req, timeout=5) as resp:
            model_data = json.loads(resp.read().decode())
            for m in model_data.get("data", []):
                mid = m.get("id", "")
                # Only pick text chat models (skip whisper, tts, embedding, moderation, compound)
                if mid and "whisper" not in mid and "tts" not in mid and "embed" not in mid and "guard" not in mid and "compound" not in mid and "safeguard" not in mid:
                    discovered_models.append(mid)
        print(f"[AI Chat] Discovered {len(discovered_models)} models: {discovered_models[:5]}...")
    except Exception as e:
        print(f"[AI Chat] Model discovery failed: {e}")

    # Step 2: Fallback static list of current (2026) Groq models
    static_models = [
        "meta-llama/llama-4-scout-17b-16e-instruct",
        "openai/gpt-oss-20b",
        "qwen/qwen3.6-27b",
        "moonshotai/kimi-k2-instruct",
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
    ]

    models_to_try = discovered_models if discovered_models else static_models
    
    # Add Winteg system prompt to the messages
    system_msg = {
        "role": "system",
        "content": "You are the AI assistant for Winteg Technologies, a premium tech company specializing in Web Development, AI Solutions, Mobile Apps, Cloud Infrastructure, and Telemetrics. Be helpful, professional, and concise. Guide users to the contact form or quote request if they need custom project help."
    }
    chat_messages = [system_msg] + request.messages

    url = "https://api.groq.com/openai/v1/chat/completions"
    
    for model in models_to_try:
        data = json.dumps({
            "messages": chat_messages,
            "model": model,
            "temperature": 0.5,
            "max_tokens": 512,
        }).encode("utf-8")
        
        req = urllib.request.Request(url, data=data)
        req.add_header("Content-Type", "application/json")
        req.add_header("Authorization", f"Bearer {api_key}")
        req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                result = json.loads(response.read().decode())
                bot_reply = result.get("choices", [{}])[0].get("message", {}).get("content", "")
                if bot_reply:
                    print(f"[AI Chat] Success with model: {model}")
                    updated_messages = request.messages.copy()
                    updated_messages.append({"role": "assistant", "content": bot_reply})
                    save_chat_log(request.session_id, updated_messages)
                    return {"reply": bot_reply}
        except Exception as e:
            error_detail = str(e)
            if hasattr(e, 'read'):
                try:
                    error_detail = e.read().decode()
                except Exception:
                    pass
            print(f"[AI Chat] Model '{model}' failed: {error_detail[:120]}")
            continue

    # Graceful receptionist fallback — never show ugly errors to users
    fallback_reply = "Welcome to Winteg Technologies! We specialize in custom AI agents, web & mobile applications, telemetrics, and cloud infrastructure. How can our team help you with your project today? Feel free to use our contact form or request a free quote!"
    updated_messages = request.messages.copy()
    updated_messages.append({"role": "assistant", "content": fallback_reply})
    save_chat_log(request.session_id, updated_messages)
    return {"reply": fallback_reply}

@router.get("/logs")
async def get_logs(password: str):
    if password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"logs": get_all_chat_logs()}
