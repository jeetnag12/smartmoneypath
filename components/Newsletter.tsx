'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

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
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-600 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-300 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative px-6 py-16 lg:px-16 lg:py-20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary-500/50 text-primary-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Join 10,000+ subscribers</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Get Financial Wisdom Delivered
              </h2>

              <p className="text-primary-100 text-lg mb-8">
                Subscribe to our weekly newsletter and receive actionable money tips,
                exclusive insights, and the latest articles directly in your inbox.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-secondary-900 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-secondary-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-center gap-2 text-white bg-primary-500/50 py-4 px-8 rounded-xl max-w-md mx-auto">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Thanks for subscribing! Check your inbox.</span>
                </div>
              )}

              <p className="text-primary-200 text-sm mt-6">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
