import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatService, authService } from '../services'
import logo from '../assets/logo.svg'

const TMDB_IMG = 'https://image.tmdb.org/t/p/w200'

const SUGGESTIONS = [
  'Gợi ý phim đang hot 🔥',
  'Tìm phim hành động hay',
  'Hôm nay nên xem gì?',
  'Phim hài nhẹ nhàng cho cuối tuần',
]

/**
 * Parse AI response text to extract movie IDs marked as [MOVIE_ID:123]
 * and clean the text for display.
 */
const parseAiResponse = (text) => {
  if (!text) return { cleanText: '', movieIds: [] }

  const movieIdRegex = /\[MOVIE_ID:(\d+)\]/g
  const movieIds = []
  let match

  while ((match = movieIdRegex.exec(text)) !== null) {
    movieIds.push(parseInt(match[1], 10))
  }

  // Remove the [MOVIE_ID:xxx] markers from displayed text
  const cleanText = text.replace(/\s*\[MOVIE_ID:\d+\]/g, '').trim()

  return { cleanText, movieIds }
}

const AIChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const isLoggedIn = authService.isAuthenticated()

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Create session & show welcome when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'ai',
          text: 'Xin chào! 👋 Tôi là trợ lý AI của SBA Movies. Tôi có thể giúp bạn tìm kiếm phim, gợi ý phim theo thể loại, diễn viên, hay xu hướng. Bạn muốn xem gì hôm nay?',
          movieIds: [],
        },
      ])

      // Create a new chat session if logged in
      if (isLoggedIn && !sessionId) {
        chatService
          .createSession()
          .then((res) => {
            setSessionId(res.data.id)
          })
          .catch((err) => {
            console.error('Failed to create chat session:', err)
          })
      }
    }
  }, [isOpen, messages.length, isLoggedIn, sessionId])

  const handleSend = async (overrideText) => {
    const trimmed = (overrideText || inputValue).trim()
    if (!trimmed || isLoading) return

    if (!isLoggedIn) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: 'user', text: trimmed, movieIds: [] },
        {
          id: Date.now() + 1,
          type: 'ai',
          text: 'Vui lòng đăng nhập để sử dụng trợ lý AI! 🔐',
          movieIds: [],
        },
      ])
      setInputValue('')
      return
    }

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text: trimmed, movieIds: [] }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    try {
      // Ensure we have a session
      let currentSessionId = sessionId
      if (!currentSessionId) {
        const sessionRes = await chatService.createSession()
        currentSessionId = sessionRes.data.id
        setSessionId(currentSessionId)
      }

      // Send message to AI via backend
      const response = await chatService.sendMessage(currentSessionId, trimmed)
      const aiContent = response.data?.content || response.data?.text || ''

      const { cleanText, movieIds } = parseAiResponse(aiContent)

      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        text: cleanText || 'Xin lỗi, tôi không thể xử lý yêu cầu này. Hãy thử lại nhé! 🙏',
        movieIds,
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      console.error('AI Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'ai',
          text: 'Xin lỗi, đã có lỗi xảy ra. Hãy thử lại sau nhé! 🙏',
          movieIds: [],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSend(suggestion)
  }

  const handleWatchNow = (movieId) => {
    onClose()
    navigate(`/movie/${movieId}`)
  }

  // Reset session when panel is closed
  const handleClose = () => {
    setMessages([])
    setSessionId(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="ai-chat-panel">
      {/* Gradient border glow */}
      <div className="ai-chat-panel__glow" />

      <div className="ai-chat-panel__inner">
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header__left">
            <div className="ai-chat-header__logo">
              <img src={logo} alt="SBA" />
            </div>
            <span className="ai-chat-header__title">SBA Movies AI</span>
            <span className="ai-chat-header__badge">GPT-4o</span>
          </div>
          <button
            className="ai-chat-header__close"
            onClick={handleClose}
            type="button"
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="ai-chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-msg ${msg.type === 'user' ? 'ai-msg--user' : 'ai-msg--ai'}`}
            >
              {msg.type === 'ai' && (
                <div className="ai-msg__avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
              )}
              <div className="ai-msg__content">
                <p className="ai-msg__text">{msg.text}</p>

                {/* Movie ID Links - rendered as quick-access buttons */}
                {msg.movieIds && msg.movieIds.length > 0 && (
                  <div className="ai-movie-id-list">
                    {msg.movieIds.map((movieId) => (
                      <button
                        className="ai-movie-id-btn"
                        key={movieId}
                        type="button"
                        onClick={() => handleWatchNow(movieId)}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Xem phim #{movieId}
                      </button>
                    ))}
                  </div>
                )}

                {/* Suggestion chips (only on welcome) */}
                {msg.id === 'welcome' && (
                  <div className="ai-suggestions">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        className="ai-suggestion-chip"
                        type="button"
                        onClick={() => handleSuggestionClick(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="ai-msg ai-msg--ai">
              <div className="ai-msg__avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div className="ai-msg__content">
                <div className="ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="ai-chat-input-wrap">
          <input
            ref={inputRef}
            className="ai-chat-input"
            type="text"
            placeholder="Hỏi gì đó về phim..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="ai-chat-send"
            type="button"
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatbot
