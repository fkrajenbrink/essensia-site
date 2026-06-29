'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const MAX_MESSAGES = 20

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const isMaxReached = messages.length >= MAX_MESSAGES

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading || isMaxReached) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) throw new Error('API error')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader')

      const decoder = new TextDecoder()
      let assistantText = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantText }
          return updated
        })
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Er ging iets mis. Probeer het opnieuw of gebruik het contactformulier hieronder.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="min-h-[320px] max-h-[480px] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-body/60 text-sm text-center pt-8">
            Stel uw vraag. Ik antwoord direct.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-body'
              }`}
            >
              {msg.content || (
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:0.1s]">.</span>
                  <span className="animate-bounce [animation-delay:0.2s]">.</span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {isMaxReached ? (
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 text-sm text-body/70 text-center">
          U heeft het maximum aantal vragen bereikt. Neem contact op via het formulier hieronder.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border-t border-gray-100 flex gap-2 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Wat wil u weten over loopbaancoaching, assessment of reïntegratie?"
            disabled={loading}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm text-body placeholder:text-body/40 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-primary text-white rounded-lg px-5 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            Stuur
          </button>
        </form>
      )}
    </div>
  )
}
