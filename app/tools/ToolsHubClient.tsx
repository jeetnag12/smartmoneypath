'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  ArrowRight, 
  Percent, 
  Coins, 
  PiggyBank, 
  Sparkles, 
  Lock,
  BookOpen,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react'

interface Tool {
  name: string
  slug: string
  description: string
  category: string
  featured: boolean
  href: string
  icon: 'percent' | 'coins' | 'piggy-bank'
}

interface ComingSoonTool {
  name: string
  description: string
  category: string
}

const toolCategories = [
  { id: 'all', name: 'All Categories' },
  { id: 'investment', name: 'Investment' },
  { id: 'saving', name: 'Saving' },
  { id: 'loan', name: 'Loans & Debt' },
  { id: 'retirement', name: 'Retirement' },
  { id: 'budget', name: 'Budgeting' },
]

const toolsList: Tool[] = [
  {
    name: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    description: 'Calculate the long-term compounding growth of your investments with regular monthly contributions and customizable compounding frequencies.',
    category: 'investment',
    featured: true,
    href: '/tools/compound-interest-calculator',
    icon: 'percent',
  },
  {
    name: 'Loan EMI Calculator',
    slug: 'loan-emi-calculator',
    description: 'Instantly compute your Equated Monthly Installment (EMI), total interest payable, and overall loan repayment schedule.',
    category: 'loan',
    featured: true,
    href: '/tools/loan-emi-calculator',
    icon: 'coins',
  },
  {
    name: 'Savings Goal Calculator',
    slug: 'savings-goal-calculator',
    description: 'Find out exactly how many months it will take to hit your savings milestone, and visualize your progress along the way.',
    category: 'saving',
    featured: true,
    href: '/tools/savings-goal-calculator',
    icon: 'piggy-bank',
  },
]

const comingSoonList: ComingSoonTool[] = [
  {
    name: 'Retirement Nest Egg Estimator',
    description: 'Assess if your retirement accounts will meet your lifestyle needs based on withdrawal rates, returns, and inflation.',
    category: 'retirement',
  },
  {
    name: '50/30/20 Budget Planner',
    description: 'Input your income and let our system segment your money into Needs, Wants, and Savings using standard budget recommendations.',
    category: 'budget',
  },
  {
    name: 'Debt Snowball & Avalanche Payoff',
    description: 'Rank your debts and build a customized, accelerated payment plan to optimize your interest savings.',
    category: 'loan',
  },
]

export default function ToolsHubClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredTools = toolsList.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const filteredComingSoon = comingSoonList.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'percent':
        return <Percent className="h-6 w-6 text-primary-600" />
      case 'coins':
        return <Coins className="h-6 w-6 text-primary-600" />
      case 'piggy-bank':
        return <PiggyBank className="h-6 w-6 text-primary-600" />
      default:
        return <Percent className="h-6 w-6 text-primary-600" />
    }
  }

  return (
    <div className="w-full">
      {/* Category Tabs & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-secondary-100">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 md:pb-0 scrollbar-thin scrollbar-thumb-secondary-200">
          {toolCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-800 text-white shadow-lg shadow-primary-900/10'
                  : 'bg-secondary-50 text-secondary-600 hover:text-primary-800 hover:bg-primary-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-400" />
          <input
            type="text"
            placeholder="Search financial tools..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-secondary-50 border border-secondary-200 text-secondary-900 pl-12 pr-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all placeholder:text-secondary-400 font-medium"
            aria-label="Search financial tools"
          />
        </div>
      </div>

      {/* Tools Section */}
      <div className="py-16">
        <h2 className="text-2xl md:text-3xl font-black text-secondary-900 tracking-tight mb-8">
          Available Calculators
        </h2>
        {filteredTools.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <Link 
                key={tool.slug} 
                href={tool.href}
                className="group flex flex-col justify-between p-8 bg-white border border-secondary-100 rounded-3xl hover:border-primary-600/50 hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {renderIcon(tool.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-800 transition-colors mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-secondary-500 leading-relaxed text-sm">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary-700 font-extrabold text-sm uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  Launch Calculator <ArrowRight className="h-4 w-4" />
                </div>
                {/* Visual gradient accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-primary-100/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary-50 rounded-3xl">
            <p className="text-secondary-500 font-medium">No matching active calculators found.</p>
          </div>
        )}
      </div>

      {/* Coming Soon Section */}
      <div className="py-16 border-t border-secondary-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-xl bg-secondary-100 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary-700" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-secondary-900 tracking-tight">
            Coming Soon Pipeline
          </h2>
        </div>
        {filteredComingSoon.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredComingSoon.map((tool, idx) => (
              <div 
                key={idx}
                className="p-8 bg-secondary-50/50 border border-secondary-100 rounded-3xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold text-primary-850 bg-primary-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
                      {tool.category}
                    </span>
                    <Lock className="h-4 w-4 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-800 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-secondary-400 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-8 text-xs font-semibold text-secondary-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-pulse"></span>
                  Currently in development
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary-50/50 rounded-3xl">
            <p className="text-secondary-400 font-medium">No matching pipeline tools found.</p>
          </div>
        )}
      </div>

      {/* Resource & Knowledge Hub Integration */}
      <div className="py-16 border-t border-secondary-100 bg-secondary-50/30 rounded-3xl p-8 md:p-12 mt-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-secondary-900 tracking-tight mb-4">
              Explore Our Financial Knowledge Hub
            </h2>
            <p className="text-secondary-600 leading-relaxed mb-8">
              We compile financial insights built on primary government sources, federal guidelines, and transparent mathematical models. Verify your calculations with our expert-vetted literature.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/articles"
                className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-900 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-md"
              >
                Read Expert Articles <BookOpen className="h-4 w-4" />
              </Link>
              <Link 
                href="/resources"
                className="inline-flex items-center gap-2 bg-white border border-secondary-200 hover:bg-secondary-50 text-secondary-800 px-6 py-3.5 rounded-2xl font-bold transition-all"
              >
                Resource Guides <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-secondary-100 shadow-xl shadow-secondary-900/5">
            <h3 className="text-lg font-bold text-secondary-950 flex items-center gap-2 pb-4 border-b border-secondary-100">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              Trending Financial Guides
            </h3>
            <div className="space-y-4">
              <Link href="/articles/2" className="block group">
                <span className="text-xs font-semibold text-primary-750 uppercase tracking-wider">Investing</span>
                <h4 className="font-bold text-secondary-800 group-hover:text-primary-800 transition-colors text-sm mt-1 flex items-center justify-between">
                  Index Fund Investing for Beginners <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </h4>
              </Link>
              <Link href="/articles/25" className="block group pt-4 border-t border-secondary-50">
                <span className="text-xs font-semibold text-primary-750 uppercase tracking-wider">Savings</span>
                <h4 className="font-bold text-secondary-800 group-hover:text-primary-800 transition-colors text-sm mt-1 flex items-center justify-between">
                  Emergency Fund Guide: How Much to Save <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </h4>
              </Link>
              <Link href="/articles/3" className="block group pt-4 border-t border-secondary-50">
                <span className="text-xs font-semibold text-primary-750 uppercase tracking-wider">Budgeting</span>
                <h4 className="font-bold text-secondary-800 group-hover:text-primary-800 transition-colors text-sm mt-1 flex items-center justify-between">
                  The 50/30/20 Budgeting Method <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
