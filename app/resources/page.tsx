import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  CreditCard,
  Target,
  ArrowRight,
  Printer,
  Sparkles,
  Download,
  Info
} from 'lucide-react'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Financial Tools & Downloadable Resources | SmartMoneyPath',
  description: 'Access our premium personal finance library of interactive planners, worksheets, and checklists. Fully printable and optimized for PDF download.',
  alternates: {
    canonical: `${SITE_URL}/resources`,
  },
}

const resources = [
  {
    title: '50/30/20 Budget Planner',
    slug: 'budget-planner',
    description: 'An interactive budgeting tool to analyze your cash flow, split your spending into needs, wants, and savings, and generate a printable budget plan.',
    whoShouldUse: 'Anyone looking to take control of daily spending, find cash flow leaks, or establish their first balanced budget.',
    icon: Wallet,
    color: 'border-blue-100 bg-blue-50 text-blue-700',
    iconColor: 'text-blue-600',
    category: 'Budgeting',
  },
  {
    title: 'Emergency Fund Checklist',
    slug: 'emergency-fund-checklist',
    description: 'A comprehensive checklist to calculate your exact emergency fund target based on monthly fixed costs, personal risk modifiers, and deductibles.',
    whoShouldUse: 'Individuals seeking to build a robust cash buffer and determine their risk-adjusted emergency savings target.',
    icon: PiggyBank,
    color: 'border-green-100 bg-green-50 text-green-700',
    iconColor: 'text-green-600',
    category: 'Savings',
  },
  {
    title: 'Debt Payoff Planner (Snowball & Avalanche)',
    slug: 'debt-payoff-planner',
    description: 'Compare Debt Snowball and Debt Avalanche methods side-by-side with your actual numbers. Visualize your payoff date and interest savings.',
    whoShouldUse: 'Borrowers with credit cards, personal loans, or student loans who want a structured, math-backed debt-free roadmap.',
    icon: CreditCard,
    color: 'border-orange-100 bg-orange-50 text-orange-700',
    iconColor: 'text-orange-600',
    category: 'Debt Payoff',
  },
  {
    title: 'SMART Financial Goal Planner',
    slug: 'financial-goal-planner',
    description: 'A structured workspace to design Specific, Measurable, Achievable, Relevant, and Time-Bound financial goals with a built-in compound interest calculator.',
    whoShouldUse: 'Forward-looking planners trying to map out house down payments, travel funds, or long-term wealth milestones.',
    icon: Target,
    color: 'border-teal-100 bg-teal-50 text-teal-700',
    iconColor: 'text-teal-600',
    category: 'Investing',
  },
  {
    title: 'Credit Score Optimization Checklist',
    slug: 'credit-score-checklist',
    description: 'A step-by-step credit health workbook to audit your credit reports, resolve disputes, manage utilization ratios, and build elite credit.',
    whoShouldUse: 'Anyone aiming to apply for a mortgage, car loan, or premium credit card in the near future and needing to optimize their credit profile.',
    icon: TrendingUp,
    color: 'border-pink-100 bg-pink-50 text-pink-700',
    iconColor: 'text-pink-600',
    category: 'Credit',
  },
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-secondary-50 pt-32 pb-20 relative overflow-hidden border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-primary-100">
              <Sparkles className="h-4 w-4" />
              <span>Premium Toolkit</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-secondary-900 mb-6 tracking-tight">
              Actionable <span className="text-primary-700">Financial Planners</span>
            </h1>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Take our math-first frameworks off the page. Input your numbers, generate custom roadmaps, and download or print them for your physical financial planner.
            </p>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {resources.map((res) => {
              const IconComp = res.icon
              return (
                <div
                  key={res.slug}
                  className="bg-white border-2 border-secondary-100 rounded-[2rem] p-8 md:p-10 hover:border-primary-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className={`p-4 rounded-2xl ${res.color} border shadow-sm`}>
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="bg-secondary-50 text-secondary-500 border border-secondary-100 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {res.category}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-secondary-900 mb-4 tracking-tight group-hover:text-primary-700 transition-colors">
                      {res.title}
                    </h2>

                    <p className="text-secondary-600 font-medium leading-relaxed mb-6">
                      {res.description}
                    </p>

                    <div className="bg-secondary-50 rounded-2xl p-5 border border-secondary-100/60 mb-8">
                      <h4 className="text-xs font-black uppercase tracking-wider text-secondary-400 mb-2 flex items-center gap-1.5">
                        <Info className="h-3.5 w-3.5 text-secondary-400" />
                        Who this is for:
                      </h4>
                      <p className="text-sm text-secondary-700 font-semibold leading-relaxed">
                        {res.whoShouldUse}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <Link
                      href={`/resources/${res.slug}`}
                      className="inline-flex items-center justify-center gap-2 bg-primary-800 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/10 text-center"
                    >
                      Open Planner <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/resources/${res.slug}?print=true`}
                      className="inline-flex items-center justify-center gap-2 bg-secondary-50 border-2 border-secondary-100 text-secondary-700 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-secondary-100 hover:text-secondary-900 transition-colors text-center"
                    >
                      <Printer className="h-4 w-4" /> Print-Ready View
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trust & EEAT Banner */}
      <section className="py-16 bg-secondary-900 relative overflow-hidden text-center text-white border-t border-secondary-800">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Info className="h-10 w-10 text-primary-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Our Calculation Standards</h2>
          <p className="text-primary-100 text-lg leading-relaxed max-w-2xl mx-auto mb-0 font-medium">
            All worksheets, ratios, and formulas inside our tools reflect regulatory thresholds from the U.S. Federal Reserve, IRS guidelines, and recommendations from the Consumer Financial Protection Bureau (CFPB).
          </p>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-600 rounded-full blur-[120px] opacity-40"></div>
      </section>

      <Footer />
    </main>
  )
}
