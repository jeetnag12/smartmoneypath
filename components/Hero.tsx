'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

const searchPlaceholders = [
  'Find the best credit cards...',
  'Compare mortgage rates...',
  'Best high-yield savings...',
  'Personal loan rates...',
  'Find a financial advisor...',
]

export default function Hero() {
  const router = useRouter()
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const query = searchQuery.trim()
    router.push(query ? `/articles?q=${encodeURIComponent(query)}` : '/articles')
  }

  return (
    <section className="bg-darkGreen pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-white/20">
              <TrendingUp className="h-4 w-4 text-brightGreen" />
              <span>Independent financial education</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Smart Financial Decisions{' '}
              <span className="text-brightGreen">Start With SmartMoneyPath</span>
            </h1>

            <p className="text-lg text-white/80 max-w-lg">
              Practical guides with transparent calculations and links to primary sources.
              Learn the tradeoffs before making your next money decision.
            </p>

            {/* Search Bar */}
            <form className="relative max-w-xl" onSubmit={handleSearch}>
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
            </form>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <span>Primary sources linked</span>
              <span className="hidden sm:inline">•</span>
              <span>Examples clearly labeled</span>
            </div>
          </div>

          {/* Right Content - transparent worked example */}
          <div className="relative hidden lg:block">
            <div className="relative h-[420px] w-full">
              <div className="absolute inset-0 bg-brightGreen/20 rounded-3xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-3xl border border-white/20 p-8 shadow-2xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Worked example</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">Emergency-fund baseline</h2>
                <div className="mt-8 space-y-5 text-gray-700">
                  <div className="flex justify-between border-b pb-3"><span>Essential monthly costs</span><strong>$3,200</strong></div>
                  <div className="flex justify-between border-b pb-3"><span>Coverage target</span><strong>4 months</strong></div>
                  <div className="flex justify-between text-lg"><span>Baseline target</span><strong className="text-primary-700">$12,800</strong></div>
                </div>
                <p className="mt-8 text-sm text-gray-500">$3,200 × 4 = $12,800. Adjust for your income stability, dependents, and insurance deductibles.</p>
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
