'use client'

import { useState, useEffect } from 'react'
import { Search, TrendingUp, ArrowRight, ShieldCheck, PieChart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const searchPlaceholders = [
  'Find the best credit cards...',
  'Compare mortgage rates...',
  'Best high-yield savings...',
  'Debt payoff strategies...',
  'Index fund guide...',
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
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-full w-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-100 shadow-sm">
              <TrendingUp className="h-4 w-4" />
              <span>Trustworthy financial education</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-secondary-900 leading-[1.1] tracking-tight">
                Your Path to <span className="text-primary-700">Financial Freedom</span> Starts Here
              </h1>

              <p className="text-xl text-secondary-600 max-w-2xl leading-relaxed">
                Empowering American households with professional-grade research, transparent math, and objective guides to building lasting wealth.
              </p>
            </div>

            {/* Search Bar */}
            <form className="relative max-w-2xl group" onSubmit={handleSearch}>
              <div className="relative flex items-center">
                <div className="absolute left-6 text-secondary-400 group-focus-within:text-primary-600 transition-colors">
                  <Search className="h-6 w-6" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholders[placeholderIndex]}
                  className="w-full pl-16 pr-40 py-6 rounded-2xl text-secondary-900 placeholder-secondary-400 bg-white border-2 border-secondary-100 focus:border-primary-600 focus:ring-4 focus:ring-primary-500/10 transition-all text-lg shadow-xl shadow-secondary-900/5 outline-none"
                />
                <button className="absolute right-3 top-3 bottom-3 bg-primary-700 text-white px-8 rounded-xl font-bold hover:bg-primary-800 transition-all flex items-center gap-2 active:scale-[0.98] shadow-lg shadow-primary-900/20">
                  Search
                </button>
              </div>
            </form>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4">
              <div className="flex items-center gap-2 text-secondary-500 font-bold text-sm uppercase tracking-wide">
                <ShieldCheck className="h-5 w-5 text-primary-600" />
                <span>Primary Source Data</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-500 font-bold text-sm uppercase tracking-wide">
                <PieChart className="h-5 w-5 text-primary-600" />
                <span>Transparent Math</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visual highlight */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="relative z-20 bg-white rounded-[2.5rem] border border-secondary-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-10 overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-2">Featured Guide</p>
                    <h2 className="text-3xl font-extrabold text-secondary-900 leading-tight group-hover:text-primary-700 transition-colors">
                      The $10,000 Emergency Fund Blueprint
                    </h2>
                  </div>
                  <div className="bg-primary-50 p-3 rounded-2xl">
                    <ShieldCheck className="h-6 w-6 text-primary-700" />
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="p-5 bg-secondary-50 rounded-2xl border border-secondary-100 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary-500 font-medium">Monthly Essential Costs</span>
                      <span className="text-secondary-900 font-bold">$3,200</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-secondary-500 font-medium">Coverage Multiple</span>
                      <span className="text-secondary-900 font-bold">× 4 Months</span>
                    </div>
                    <div className="h-px bg-secondary-200"></div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-secondary-900 font-extrabold text-primary-700">Recommended Baseline</span>
                      <span className="text-primary-700 font-black">$12,800</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/articles/1"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-secondary-900 text-white rounded-2xl font-bold hover:bg-secondary-800 transition-all group/btn"
                >
                  Read Complete Guide
                  <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Decorative background cards */}
              <div className="absolute top-8 left-8 w-full h-full bg-primary-50 rounded-[2.5rem] -z-10 rotate-3 border border-primary-100"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-100 rounded-3xl blur-2xl opacity-60 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
