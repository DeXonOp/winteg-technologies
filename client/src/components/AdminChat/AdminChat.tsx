import { useState, useEffect, useRef } from 'react'
import './AdminChat.css'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface LogEntry {
  session_id: string
  chat_history: ChatMessage[]
  updated_at: string
}

export default function AdminChat() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'live' | 'logs'>('live')
  
  // Live Support State
  const [activeSessions, setActiveSessions] = useState<string[]>([])
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({})
  const [inputMsg, setInputMsg] = useState('')
  const wsRef = useRef<WebSocket | null>(null)
  const [error, setError] = useState('')

  // AI Logs State
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)

  // Check URL for direct session link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sid = params.get('session')
    if (sid) {
      setSelectedSession(sid)
    }
  }, [])

  const fetchLogs = async (pwd: string) => {
    try {
      const url = import.meta.env.DEV 
        ? `http://localhost:8000/api/chat/logs?password=${encodeURIComponent(pwd)}`
        : `/api/chat/logs?password=${encodeURIComponent(pwd)}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setLogs(data.logs)
      }
    } catch (e) {
      console.error("Failed to fetch logs", e)
    }
  }

  const connect = (e?: React.FormEvent) => {
    e?.preventDefault()
    setError('')
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = import.meta.env.DEV 
      ? `ws://localhost:8000/api/ws/chat/agent?password=${encodeURIComponent(password)}` 
      : `${protocol}//${window.location.host}/api/ws/chat/agent?password=${encodeURIComponent(password)}`
      
    const ws = new WebSocket(wsUrl)
    
    ws.onopen = () => {
      setIsAuthenticated(true)
      fetchLogs(password) // fetch logs on connect
    }
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        if (data.type === 'active_sessions') {
          setActiveSessions(data.sessions)
        } else if (data.type === 'session_update') {
          if (data.status === 'connected') {
            setActiveSessions(prev => Array.from(new Set([...prev, data.session_id])))
          } else if (data.status === 'disconnected') {
            setActiveSessions(prev => prev.filter(s => s !== data.session_id))
          }
        } else if (data.type === 'chat_message') {
          const { session_id, role, content } = data
          setMessages(prev => {
            const sessionMsgs = prev[session_id] || []
            return {
              ...prev,
              [session_id]: [...sessionMsgs, { role, content }]
            }
          })
        }
      } catch (err) {
        console.error('Failed to parse message', err)
      }
    }
    
    ws.onclose = (event) => {
      if (event.code === 1008) {
        setError('Invalid password')
      } else {
        setError('Connection closed')
      }
      setIsAuthenticated(false)
      wsRef.current = null
    }
    
    wsRef.current = ws
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMsg.trim() || !selectedSession || !wsRef.current) return
    
    wsRef.current.send(JSON.stringify({
      session_id: selectedSession,
      content: inputMsg
    }))
    
    setInputMsg('')
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-chat-login">
        <form onSubmit={connect} className="admin-chat-login-form">
          <h2>Admin Login</h2>
          {error && <div className="admin-chat-error">{error}</div>}
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-chat-dashboard">
      <div className="admin-chat-sidebar">
        <div className="admin-sidebar-tabs">
          <button 
            className={activeTab === 'live' ? 'active' : ''} 
            onClick={() => setActiveTab('live')}
          >
            Live Support
          </button>
          <button 
            className={activeTab === 'logs' ? 'active' : ''} 
            onClick={() => {
              setActiveTab('logs')
              fetchLogs(password) // refresh logs
            }}
          >
            AI Chat Logs
          </button>
        </div>
        
        {activeTab === 'live' ? (
          <div className="admin-tab-content">
            <h3>Active Sessions</h3>
            {activeSessions.length === 0 ? (
              <p className="admin-chat-empty">No active sessions</p>
            ) : (
              <ul className="admin-chat-session-list">
                {activeSessions.map(sid => (
                  <li 
                    key={sid} 
                    className={selectedSession === sid ? 'active' : ''}
                    onClick={() => setSelectedSession(sid)}
                  >
                    Session {sid.substring(0, 6)}...
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="admin-tab-content">
            <h3>Past Conversations</h3>
            {logs.length === 0 ? (
              <p className="admin-chat-empty">No logs found</p>
            ) : (
              <ul className="admin-chat-session-list">
                {logs.map(log => (
                  <li 
                    key={log.session_id} 
                    className={selectedLog?.session_id === log.session_id ? 'active' : ''}
                    onClick={() => setSelectedLog(log)}
                  >
                    <div>Session {log.session_id.substring(0, 6)}...</div>
                    <div className="log-date">{new Date(log.updated_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      
      <div className="admin-chat-main">
        {activeTab === 'live' ? (
          selectedSession ? (
            <>
              <div className="admin-chat-header">
                <h3>Chatting with: {selectedSession}</h3>
              </div>
              <div className="admin-chat-messages">
                {(messages[selectedSession] || []).length === 0 ? (
                  <p className="admin-chat-empty">Waiting for messages...</p>
                ) : (
                  (messages[selectedSession] || []).map((msg, idx) => (
                    <div key={idx} className={`admin-chat-msg ${msg.role === 'assistant' ? 'admin' : 'user'}`}>
                      <span className="admin-chat-sender">{msg.role === 'assistant' ? 'You' : 'User'}</span>
                      <p>{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={sendMessage} className="admin-chat-input-area">
                <input 
                  type="text" 
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  placeholder="Type your reply..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="admin-chat-placeholder">
              <p>Select a session to start chatting</p>
            </div>
          )
        ) : (
          selectedLog ? (
            <>
              <div className="admin-chat-header">
                <h3>Transcript for Session: {selectedLog.session_id}</h3>
                <span className="log-date-header">Last updated: {new Date(selectedLog.updated_at).toLocaleString()}</span>
              </div>
              <div className="admin-chat-messages">
                {selectedLog.chat_history.filter(m => m.role !== 'system').map((msg, idx) => (
                  <div key={idx} className={`admin-chat-msg ${msg.role === 'assistant' ? 'admin' : 'user'}`}>
                    <span className="admin-chat-sender">{msg.role === 'assistant' ? 'AI Bot' : 'User'}</span>
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="admin-chat-placeholder">
              <p>Select a log to view the transcript</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
