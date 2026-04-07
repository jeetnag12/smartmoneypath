'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="py-16 lg:py-20 bg-brightGreen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get Financial Tips Delivered to Your Inbox
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 100,000+ subscribers receiving weekly money tips, exclusive insights,
            and personalized recommendations to help you make smarter financial decisions.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-darkGreen text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-white bg-darkGreen/30 py-4 px-8 rounded-xl max-w-lg mx-auto">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
            </div>
          )}

          <p className="text-white/70 text-sm mt-6">
            No spam, ever. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}
