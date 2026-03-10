'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Send, MessageCircle, HelpCircle, Loader2 } from 'lucide-react'

interface Comment {
  _id: string
  name: string
  message: string
  pinned: boolean
  createdAt: string
}

interface Question {
  _id: string
  name: string
  question: string
  answer?: string
  createdAt: string
}

function CommentForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      setError('Both fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (res.ok) {
        setSuccess(true)
        setName('')
        setMessage('')
        onSuccess()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Failed to post comment. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} style={{ color: 'var(--accent)' }} />
        <h3 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
          Leave a Comment
        </h3>
      </div>
      
      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className="w-full px-4 py-2.5 rounded-lg text-sm transition-all"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        />
        <textarea
          placeholder="What's on your mind? (max 500 chars)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg text-sm transition-all resize-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        />
      </div>

      {error && (
        <p className="text-xs mb-3" style={{ color: '#e63946' }}>{error}</p>
      )}
      {success && (
        <p className="text-xs mb-3" style={{ color: '#2a9d8f' }}>
          ✓ Comment posted! Thank you.
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {message.length}/500
        </span>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
          style={{
            background: 'var(--accent)',
            color: 'white',
            fontWeight: 500,
          }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Post
        </button>
      </div>
    </div>
  )
}

function CommentsList({ refresh }: { refresh: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/comments')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setComments(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [refresh])

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 size={20} className="animate-spin" style={{ color: 'var(--text-muted)' }} />
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-center py-6" style={{ color: 'var(--text-muted)' }}>
        Be the first to leave a comment ✦
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div
          key={c._id}
          className="p-4 rounded-xl"
          style={{
            background: 'var(--bg-secondary)',
            border: c.pinned ? '1px solid var(--accent)' : '1px solid var(--border)',
          }}
        >
          {c.pinned && (
            <span
              className="text-xs mb-1 block"
              style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
            >
              📌 Pinned
            </span>
          )}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {c.name}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {new Date(c.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>
            {c.message}
          </p>
        </div>
      ))}
    </div>
  )
}

function QuestionForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('')
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!name.trim() || !question.trim()) {
      setError('Both fields are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), question: question.trim() }),
      })
      if (res.ok) {
        setSuccess(true)
        setName('')
        setQuestion('')
        onSuccess()
        setTimeout(() => setSuccess(false), 4000)
      } else {
        setError('Failed to submit. Please try again.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} style={{ color: '#e76f51' }} />
        <h3 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
          Ask Me Anything
        </h3>
      </div>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>
        Curious about my work, experience, or anything else? I'll answer publicly when I can.
      </p>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className="w-full px-4 py-2.5 rounded-lg text-sm"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        />
        <textarea
          placeholder="Your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={1000}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg text-sm resize-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        />
      </div>

      {error && <p className="text-xs mb-3" style={{ color: '#e63946' }}>{error}</p>}
      {success && (
        <p className="text-xs mb-3" style={{ color: '#2a9d8f' }}>
          ✓ Question submitted! I'll answer when I can.
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all hover:scale-105 disabled:opacity-50"
          style={{ background: '#e76f51', color: 'white', fontWeight: 500 }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          Submit
        </button>
      </div>
    </div>
  )
}

function QAList({ refresh }: { refresh: number }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/questions')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setQuestions(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [refresh])

  if (loading || questions.length === 0) return null

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
        Q&A
      </h4>
      <div className="space-y-3">
        {questions.map((q) => (
          <div
            key={q._id}
            className="p-4 rounded-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Q: {q.question}
            </p>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              — {q.name}
            </p>
            {q.answer && (
              <p
                className="text-sm mt-2 pt-2"
                style={{
                  color: 'var(--text-secondary)',
                  borderTop: '1px solid var(--border)',
                  fontWeight: 300,
                }}
              >
                A: {q.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ConnectSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [commentRefresh, setCommentRefresh] = useState(0)
  const [questionRefresh, setQuestionRefresh] = useState(0)

  return (
    <section
      id="connect"
      className="relative py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                letterSpacing: '0.1em',
              }}
            >
              06 · CONNECT
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--border)' }} />
          </div>
          <h2
            className="text-4xl md:text-5xl font-display font-bold mt-4 mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Connect With Me
          </h2>
          <p
            className="text-base max-w-2xl"
            style={{ color: 'var(--text-muted)', fontWeight: 300, fontStyle: 'italic' }}
          >
            "I am always open to conversations about engineering, data, creativity, and growth. 
            If something here resonated with you, feel free to reach out."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Comments column */}
          <div>
            <CommentForm onSuccess={() => setCommentRefresh((r) => r + 1)} />
            <div className="mt-5">
              <h4
                className="text-xs mb-3"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
              >
                RECENT COMMENTS
              </h4>
              <CommentsList refresh={commentRefresh} />
            </div>
          </div>

          {/* Q&A column */}
          <div>
            <QuestionForm onSuccess={() => setQuestionRefresh((r) => r + 1)} />
            <QAList refresh={questionRefresh} />
          </div>
        </div>

        {/* Footer message */}
        <div
          className="mt-16 text-center py-12"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p
            className="text-sm"
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
            }}
          >
            Built with Next.js · Designed with care · Deployed on Vercel
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            从大连到硅谷 · From Dalian to Silicon Valley
          </p>
        </div>
      </div>
    </section>
  )
}
