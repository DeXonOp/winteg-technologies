from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query, HTTPException, status
from app.config import settings
import json
from app.database import save_chat_log, get_chat_log

router = APIRouter(prefix="/api/ws/chat", tags=["Chat"])

class ConnectionManager:
    def __init__(self):
        # Maps session_id to client websocket
        self.active_clients: dict[str, WebSocket] = {}
        # List of connected agent websockets
        self.active_agents: list[WebSocket] = []

    async def connect_client(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        self.active_clients[session_id] = websocket
        # Notify agents about the new client session
        await self.broadcast_to_agents({"type": "session_update", "session_id": session_id, "status": "connected"})

    def disconnect_client(self, session_id: str):
        if session_id in self.active_clients:
            del self.active_clients[session_id]

    async def connect_agent(self, websocket: WebSocket):
        await websocket.accept()
        self.active_agents.append(websocket)
        # Send current active sessions to the newly connected agent
        active_sessions = list(self.active_clients.keys())
        await websocket.send_json({"type": "active_sessions", "sessions": active_sessions})

    def disconnect_agent(self, websocket: WebSocket):
        if websocket in self.active_agents:
            self.active_agents.remove(websocket)

    async def send_to_client(self, session_id: str, message: dict):
        if session_id in self.active_clients:
            await self.active_clients[session_id].send_json(message)

    async def broadcast_to_agents(self, message: dict):
        for agent in self.active_agents:
            try:
                await agent.send_json(message)
            except Exception:
                pass


manager = ConnectionManager()


import smtplib
from email.message import EmailMessage

def notify_admin(session_id: str):
    base_url = "https://wintegtechnologies.com" if settings.APP_ENV == "production" else "http://localhost:5173"
    link = f"{base_url}/admin/chat?session={session_id}"
    body = f"A customer has requested a human handoff.\n\nSession ID: {session_id}\n\nClick here to chat: {link}"
    
    # 1. Email Notification
    if settings.SMTP_HOST and settings.SMTP_USER and settings.SMTP_PASSWORD:
        try:
            msg = EmailMessage()
            msg.set_content(body)
            msg['Subject'] = 'Winteg Support: Human Handoff Requested'
            msg['From'] = "Winteg Technologies <contact@wintegtechnologies.com>"
            msg['To'] = "contact@wintegtechnologies.com"
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
                server.starttls()
                server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
                server.send_message(msg)
            print("--- EMAIL NOTIFICATION SENT ---")
        except Exception as e:
            print(f"Failed to send email notification: {e}")
    else:
        print("--- EMAIL NOTIFICATION SKIPPED (No SMTP config found) ---")
            
    # 2. WhatsApp Notification Stub
    # Replace the following print statement with a webhook call to your WhatsApp provider (e.g., Twilio, UltraMsg)
    print("--- WHATSAPP NOTIFICATION TRIGGERED ---")
    print(body)
    print("---------------------------------------")

@router.websocket("/client/{session_id}")
async def websocket_client_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect_client(websocket, session_id)
    notified = False
    try:
        while True:
            data = await websocket.receive_text()
            
            # Check if this is the initial handoff trigger
            if not notified and "User requested handoff" in data:
                notify_admin(session_id)
                notified = True

            # The client sent a message. Route this to the agents.
            message = {
                "type": "chat_message",
                "session_id": session_id,
                "role": "user",
                "content": data
            }
            
            # Save live chat to DB
            history = get_chat_log(session_id)
            history.append({"role": "user", "content": data})
            save_chat_log(session_id, history)
            
            await manager.broadcast_to_agents(message)
    except WebSocketDisconnect:
        manager.disconnect_client(session_id)
        await manager.broadcast_to_agents({"type": "session_update", "session_id": session_id, "status": "disconnected"})


@router.websocket("/agent")
async def websocket_agent_endpoint(websocket: WebSocket, password: str = Query(...)):
    if password != settings.ADMIN_PASSWORD:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    await manager.connect_agent(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                payload = json.loads(data)
                # payload should contain 'session_id' and 'content'
                session_id = payload.get("session_id")
                content = payload.get("content")
                if session_id and content:
                    # Send message to specific client
                    await manager.send_to_client(session_id, {
                        "role": "assistant",
                        "content": content
                    })
                    
                    # Save live chat to DB
                    history = get_chat_log(session_id)
                    history.append({"role": "assistant", "content": content})
                    save_chat_log(session_id, history)
                    
                    # Also bounce it back to all agents to keep them in sync
                    await manager.broadcast_to_agents({
                        "type": "chat_message",
                        "session_id": session_id,
                        "role": "assistant",
                        "content": content
                    })
            except json.JSONDecodeError:
                pass
    except WebSocketDisconnect:
        manager.disconnect_agent(websocket)
