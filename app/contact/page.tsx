'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL } from '@/lib/site'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Content correction')
  const [message, setMessage] = useState('')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const body = `Name: ${name}\nReply-to: ${email}\n\n${message}`
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return <main className="min-h-screen bg-white"><Navbar />
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-16"><div className="max-w-2xl mx-auto px-4 text-center"><h1 className="text-4xl font-bold mb-4">Contact the editorial team</h1><p className="text-secondary-600">Report a correction, a broken source, or a question about our methodology.</p></div></section>
    <section className="py-16"><div className="max-w-2xl mx-auto px-4">
      <div className="flex items-center gap-3 bg-secondary-50 p-4 rounded-xl mb-8"><Mail className="text-primary-700"/><div><p className="text-sm text-secondary-500">Direct email</p><a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary-700 hover:underline">{CONTACT_EMAIL}</a></div></div>
      <form onSubmit={submit} className="border rounded-2xl p-6 sm:p-8 space-y-5">
        <div><label htmlFor="name" className="block text-sm font-medium mb-2">Name</label><input id="name" required value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border" /></div>
        <div><label htmlFor="email" className="block text-sm font-medium mb-2">Your email</label><input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border" /></div>
        <div><label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label><select id="subject" value={subject} onChange={e=>setSubject(e.target.value)} className="w-full px-4 py-3 rounded-lg border"><option>Content correction</option><option>Broken source</option><option>Privacy request</option><option>General question</option></select></div>
        <div><label htmlFor="message" className="block text-sm font-medium mb-2">Message</label><textarea id="message" required rows={6} value={message} onChange={e=>setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border resize-y" /></div>
        <button type="submit" className="w-full bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"><Send className="h-5 w-5"/>Open in email app</button>
        <p className="text-xs text-secondary-500">This form opens your email application. The site does not store your message.</p>
      </form>
    </div></section><Footer /></main>
  }
