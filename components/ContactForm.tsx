'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { CONTACT_EMAIL } from '@/lib/site'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('General Question')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const body = `Name: ${name}\nReply-to: ${email}\n\n${message}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-primary-50 border border-primary-100 rounded-3xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-8 w-8 text-primary-700" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Message Prepared</h2>
        <p className="text-secondary-600 mb-8 max-w-md mx-auto">
          Your email application should have opened with your message ready to send. If not, you can reach us directly at {CONTACT_EMAIL}.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary-700 font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-secondary-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-secondary-900/5 space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-secondary-900 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-secondary-900 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-secondary-900 mb-2">
          How can we help?
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none bg-white"
        >
          <option>General Question</option>
          <option>Content Correction</option>
          <option>Data / Broken Source Report</option>
          <option>Privacy Request</option>
          <option>Advertising / Business Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-secondary-900 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your question or feedback in detail..."
          className="w-full px-4 py-3 rounded-xl border border-secondary-200 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-700/20 active:scale-[0.98]"
      >
        <Send className="h-5 w-5" />
        Open in Email Application
      </button>

      <p className="text-center text-xs text-secondary-400">
        Note: This form prepares an email for your default mail client. We do not store your personal data on our servers during this process.
      </p>
    </form>
  )
}
