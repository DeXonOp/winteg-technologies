"""
Live visitor tracking via WebSocket.
Broadcasts current visitor count to all connected clients in real-time.
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from datetime import datetime, timezone
import json

router = APIRouter(prefix="/api/ws", tags=["Visitors"])

# In-memory set of connected clients
connected_clients: set[WebSocket] = set()


async def broadcast_count():
    """Send current visitor count to all connected clients."""
    count = len(connected_clients)
    message = json.dumps({"count": count, "timestamp": datetime.now(timezone.utc).isoformat()})
    disconnected = set()
    for client in connected_clients:
        try:
            await client.send_text(message)
        except Exception:
            disconnected.add(client)
    # Clean up disconnected clients
    for client in disconnected:
        connected_clients.discard(client)


@router.websocket("/visitors")
async def visitor_ws(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)

    # Broadcast updated count to everyone
    await broadcast_count()

    try:
        # Keep connection alive by waiting for messages (or disconnect)
        while True:
            # We don't expect messages from clients, but we need to keep the connection open
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        connected_clients.discard(websocket)
        await broadcast_count()
