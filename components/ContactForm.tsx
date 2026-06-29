'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', bericht: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Er ging iets mis.')
      setStatus('success')
      setForm({ naam: '', email: '', telefoon: '', bericht: '' })
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Er ging iets mis.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <p className="text-green-800 font-semibold">Bedankt!</p>
        <p className="text-green-700 text-sm mt-1">We nemen binnen 1 werkdag contact op.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-body mb-1" htmlFor="naam">
            Naam <span className="text-primary">*</span>
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            required
            value={form.naam}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-body mb-1" htmlFor="email">
            E-mail <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-body mb-1" htmlFor="telefoon">
          Telefoonnummer <span className="text-body/40 text-xs">(optioneel)</span>
        </label>
        <input
          id="telefoon"
          name="telefoon"
          type="tel"
          value={form.telefoon}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-body mb-1" htmlFor="bericht">
          Bericht <span className="text-primary">*</span>
        </label>
        <textarea
          id="bericht"
          name="bericht"
          required
          rows={5}
          value={form.bericht}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary text-white rounded-lg px-8 py-3 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Verzenden…' : 'Verstuur bericht'}
      </button>
    </form>
  )
}
