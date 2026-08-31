import { useState, useEffect, useRef } from 'react'
import './Chatbot.css'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const STORAGE_KEY = 'winteg_chat_history'

const SYSTEM_PROMPT = `You are a friendly, concise, and professional receptionist for Winteg Technologies, a top-tier IT services company in India.
Your job is to greet visitors, quickly understand what service they are interested in (e.g., Web Development, AI Solutions, Software Engineering, Mobile Apps), and guide them to contact our team for a quote.
CRITICAL: Keep your answers very short, conversational, and directly to the point. Do not write long paragraphs, descriptions, or sound like an encyclopedia. Ask clarifying questions if needed, just like a real receptionist. Avoid markdown unless absolutely necessary.
IMPORTANT: If the user asks for a quote, requests a service (like building an app or website), asks something you cannot answer, or explicitly asks to speak to a human or connect to a person, you MUST reply with exactly this exact phrase and nothing else: [HANDOFF_REQUESTED]`

interface ChatbotProps {
  isOpen?: boolean
  onToggle?: (open: boolean) => void
}

export default function Chatbot({ isOpen: externalOpen, onToggle }: ChatbotProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen
  const setIsOpen = (v: boolean) => {
    if (onToggle) onToggle(v)
    else setInternalOpen(v)
  }
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isHumanChat, setIsHumanChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const sessionIdRef = useRef<string>('')

  // Load history on mount
  useEffect(() => {
    // Purge legacy persistent localStorage history so users get a clean experience
    localStorage.removeItem(STORAGE_KEY)

    let sid = sessionStorage.getItem('winteg_session_id')
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('winteg_session_id', sid)
    }
    sessionIdRef.current = sid

    if (sessionStorage.getItem('winteg_human_chat') === 'true') {
      setIsHumanChat(true)
      connectWebSocket(sid)
    }

    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.length > 0) setMessages(parsed)
      } catch (e) {
        console.error('Failed to parse chat history', e)
      }
    } else {
      // Initial clean greeting for every new visit
      setMessages([{ role: 'assistant', content: 'Hi! Welcome to Winteg Technologies. How can I help you today?' }])
    }
  }, [])

  const connectWebSocket = (sid: string) => {
    if (wsRef.current) return
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = import.meta.env.DEV ? `ws://localhost:8000/api/ws/chat/client/${sid}` : `${protocol}//${window.location.host}/api/ws/chat/client/${sid}`
    const ws = new WebSocket(wsUrl)
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.role === 'assistant' && data.content) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
        }
      } catch (e) {}
    }
    ws.onclose = () => {
      wsRef.current = null
    }
    wsRef.current = ws
  }

  // Save history for current session only
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: inputValue.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInputValue('')
    
    if (isHumanChat) {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(userMessage.content)
      } else {
        connectWebSocket(sessionIdRef.current)
        setTimeout(() => wsRef.current?.send(userMessage.content), 500)
      }
      return
    }

    setIsLoading(true)

    try {
      // Send to backend proxy
      const apiUrl = import.meta.env.DEV ? 'http://localhost:8000/api/chat/ask' : '/api/chat/ask'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages
          ]
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      const botReply = data.reply || 'Sorry, I could not process that.'
      
      if (botReply.includes('[HANDOFF_REQUESTED]')) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I am connecting you to a human agent now. Please hold on...' }])
        setIsHumanChat(true)
        sessionStorage.setItem('winteg_human_chat', 'true')
        connectWebSocket(sessionIdRef.current)
        setTimeout(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(`User requested handoff. Last message: ${userMessage.content}`)
          }
        }, 1000)
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: botReply }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered a network error. Please try again later.' }])
    } finally {
      setIsLoading(false)
    }
  }

  // const handleClearHistory = () => {
  //   localStorage.removeItem(STORAGE_KEY)
  //   sessionStorage.removeItem('winteg_human_chat')
  //   setIsHumanChat(false)
  //   if (wsRef.current) {
  //     wsRef.current.close()
  //   }
  //   setMessages([{ role: 'assistant', content: 'Hi! Welcome to Winteg Technologies. How can I help you today?' }])
  // }

  const handleClearChat = () => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([{ role: 'assistant', content: 'Hi! Welcome to Winteg Technologies. How can I help you today?' }])
  }

  return (
    <div className="chatbot__container">
      {/* Chat Window */}
      <div className={`chatbot__window ${isOpen ? 'chatbot__window--open' : ''}`}>
        <div className="chatbot__header">
          <div className="chatbot__header-info">
            <h3 className="chatbot__header-title">Winteg AI Support</h3>
            <div className="chatbot__header-status">
              <span className="chatbot__status-dot"></span>
              Online
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button 
              className="btn-ghost" 
              style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-secondary)' }}
              onClick={handleClearChat}
              title="Clear Chat History"
              aria-label="Clear Chat History"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button 
              className="btn-ghost" 
              style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clr-text-secondary)' }}
              onClick={() => setIsOpen(false)}
              title="Close Chat"
              aria-label="Close Chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="chatbot__messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot__message chatbot__message--${msg.role}`}>
              <p>{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="chatbot__loading">
              <span className="chatbot__loading-dot"></span>
              <span className="chatbot__loading-dot"></span>
              <span className="chatbot__loading-dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot__input-area" onSubmit={handleSend}>
          <input
            type="text"
            className="chatbot__input"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="chatbot__send-btn" disabled={!inputValue.trim() || isLoading} aria-label="Send message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>

      {/* Floating Button — hidden when ActionDock controls us */}
      {!onToggle && (
        <button 
          className={`chatbot__button ${isOpen ? 'chatbot__button--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          <svg className="chatbot__button--close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  )
}
