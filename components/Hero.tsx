'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const searchPlaceholders = [
  'Find the best credit cards...',
  'Compare mortgage rates...',
  'Best high-yield savings...',
  'Personal loan rates...',
  'Find a financial advisor...',
]

export default function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-darkGreen pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
              <TrendingUp className="h-4 w-4 text-brightGreen" />
              <span>Trusted by 2M+ readers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Smart Financial Decisions{' '}
              <span className="text-brightGreen">Start With SmartMoneyPath</span>
            </h1>

            <p className="text-lg text-white/80 max-w-lg">
              Compare personalized offers for credit cards, loans, insurance, and more.
              Make confident money choices with our expert reviews and tools.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholders[placeholderIndex]}
                  className="w-full pl-14 pr-6 py-5 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-brightGreen/30 shadow-xl text-lg"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-darkGreen text-white px-6 py-3 rounded-full font-semibold hover:bg-brightGreen transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-brightGreen border-2 border-darkGreen flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span>Join 2M+ readers</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>100% free tools</span>
              <span className="hidden sm:inline">•</span>
              <span>Unbiased reviews</span>
            </div>
          </div>

          {/* Right Content - Happy Person Image */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px] w-full">
              <div className="absolute inset-0 bg-brightGreen/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&crop=face"
                  alt="Happy person managing finances"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Money Saved</p>
                      <p className="text-2xl font-bold text-darkGreen">$12,450</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-brightGreen" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brightGreen/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brightGreen/5 rounded-full blur-3xl pointer-events-none"></div>
    </section>
  )
}
