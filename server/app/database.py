import sqlite3
import json
import os
from datetime import datetime, timezone

# Ensure the DB is saved in the server root
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "chats.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS ai_chat_logs (
            session_id TEXT PRIMARY KEY,
            chat_history TEXT,
            updated_at TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            text TEXT,
            rating INTEGER,
            is_approved BOOLEAN DEFAULT 1,
            created_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize DB on module load
init_db()

def save_chat_log(session_id: str, chat_history: list):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    updated_at = datetime.now(timezone.utc).isoformat()
    history_json = json.dumps(chat_history)
    c.execute('''
        INSERT INTO ai_chat_logs (session_id, chat_history, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(session_id) DO UPDATE SET
            chat_history=excluded.chat_history,
            updated_at=excluded.updated_at
    ''', (session_id, history_json, updated_at))
    conn.commit()
    conn.close()

def get_chat_log(session_id: str) -> list:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT chat_history FROM ai_chat_logs WHERE session_id = ?', (session_id,))
    row = c.fetchone()
    conn.close()
    if row:
        return json.loads(row[0])
    return []

def get_all_chat_logs():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT session_id, chat_history, updated_at FROM ai_chat_logs ORDER BY updated_at DESC')
    rows = c.fetchall()
    conn.close()
    
    logs = []
    for row in rows:
        logs.append({
            "session_id": row[0],
            "chat_history": json.loads(row[1]),
            "updated_at": row[2]
        })
    return logs

def save_review(name: str, email: str, text: str, rating: int):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    created_at = datetime.now(timezone.utc).isoformat()
    # Default is_approved to 1 (True) so it shows up immediately
    c.execute('''
        INSERT INTO reviews (name, email, text, rating, is_approved, created_at)
        VALUES (?, ?, ?, ?, 1, ?)
    ''', (name, email, text, rating, created_at))
    review_id = c.lastrowid
    conn.commit()
    conn.close()
    return review_id

def get_approved_reviews():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # Only fetch name, text, and rating for public display (skip email)
    c.execute('''
        SELECT id, name, text, rating, created_at 
        FROM reviews 
        WHERE is_approved = 1 
        ORDER BY id DESC
    ''')
    rows = c.fetchall()
    conn.close()
    
    reviews = []
    for row in rows:
        reviews.append({
            "id": row[0],
            "name": row[1],
            "text": row[2],
            "rating": row[3],
            "created_at": row[4]
        })
    return reviews
