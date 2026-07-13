'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Target,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  DollarSign,
  TrendingUp
} from 'lucide-react'

export default function FinancialGoalPlannerPage() {
  const searchParams = useSearchParams()
  const autoPrint = searchParams.get('print') === 'true'

  // Input states
  const [goalName, setGoalName] = useState('House Down Payment')
  const [targetAmount, setTargetAmount] = useState(50000)
  const [years, setYears] = useState(5)
  const [interestRate, setInterestRate] = useState(5) // Annual expected APY or return %
  const [initialSavings, setInitialSavings] = useState(5000)

  useEffect(() => {
    if (autoPrint) {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [autoPrint])

  const handlePrint = () => {
    window.print()
  }

  // Monthly contribution calculation based on Future Value formula with monthly compounding:
  // PMT = (FV - PV * (1 + r)^n) / [ ((1 + r)^n - 1) / r ]
  // where r = monthly rate, n = total months
  const calculatePMT = () => {
    const totalMonths = years * 12
    if (totalMonths <= 0) return 0
    
    const monthlyRate = (interestRate / 100) / 12

    if (monthlyRate === 0) {
      const remaining = targetAmount - initialSavings
      return Math.max(0, Math.round(remaining / totalMonths))
    }

    const compoundFactor = Math.pow(1 + monthlyRate, totalMonths)
    const pvGrowth = initialSavings * compoundFactor
    const remainingGoal = targetAmount - pvGrowth

    if (remainingGoal <= 0) return 0

    const annuityFactor = (compoundFactor - 1) / monthlyRate
    return Math.max(0, Math.round(remainingGoal / annuityFactor))
  }

  const monthlyContribution = calculatePMT()
  const totalInvested = initialSavings + (monthlyContribution * years * 12)
  const compoundInterestEarned = Math.max(0, targetAmount - totalInvested)

  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        @media print {
          nav, footer, .no-print {
            display: none !important;
          }
          body {
            color: #000 !important;
            background: #fff !important;
            font-size: 11pt;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .print-card {
            border: 1px solid #ccc !important;
            border-radius: 0 !important;
            padding: 15px !important;
            margin-bottom: 20px !important;
            page-break-inside: avoid;
          }
          input, select {
            border: none !important;
            border-bottom: 1px solid #000 !important;
            background: transparent !important;
          }
        }
      `}</style>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 print-container">
        {/* Back Link */}
        <div className="mb-8 no-print">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-secondary-500 hover:text-primary-700 transition-colors font-bold uppercase tracking-wider text-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Resources
          </Link>
        </div>

        {/* Title and Print Controls */}
        <div className="border-b border-secondary-100 pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 border border-teal-100 no-print">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-400 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">
                  Interactive Goal Workbook
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-2">
                SMART Financial Goal Planner
              </h1>
              <p className="text-secondary-500 font-semibold text-sm">
                Last Updated: July 2026 | Verified by CFP Sarah Chen
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-primary-800 text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/10 self-start md:self-center no-print"
            >
              <Printer className="h-4 w-4" /> Print or Save PDF
            </button>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-8 text-sm text-secondary-600 leading-relaxed font-semibold">
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Description</h3>
              <p>A goal-setting workbook that helps you structure Specific, Measurable, Actionable, Realistic, and Time-Bound financial objectives, backed by a compound interest growth engine.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Who should use it</h3>
              <p>Savers trying to identify exact monthly savings numbers required to hit home down payments, vacation allocations, or new asset funding milestones over 1-10 years.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Authority Standard</h3>
              <p>Applies standard annuities equations used by leading brokerage calculators to account for capital compound interest growth inside checking, savings, or investment brokerage vaults.</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-primary-900 text-white p-8 rounded-[2rem] mb-12 shadow-xl print-card">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary-400" />
            Step-by-Step Instructions
          </h2>
          <ol className="grid md:grid-cols-4 gap-6 text-sm">
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">1</span>
              <p className="text-primary-100 font-medium">Input your Goal Name and define your target monetary amount (e.g. $50,000 for a down payment).</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">2</span>
              <p className="text-primary-100 font-medium">Set your time horizon in years and your starting savings balance (initial principal offset).</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">3</span>
              <p className="text-primary-100 font-medium">Enter the expected interest rate (APY %). E.g. use 4% for HYSAs or 7-8% for index funds.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">4</span>
              <p className="text-primary-100 font-medium">Review the monthly cash flow requirement generated below. Print this worksheet and keep it as your tracking sheet.</p>
            </li>
          </ol>
        </div>

        {/* Inputs and Calculations Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 flex items-center gap-2 border-b border-secondary-100 pb-3">
                <span className="w-2.5 h-6 bg-teal-600 rounded-full"></span>
                1. Goal Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">What is the goal name?</label>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="w-full text-lg font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-teal-600 outline-none pb-1"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Target Amount ($)</label>
                    <div className="flex items-center gap-2 border-b-2 border-secondary-200 focus-within:border-teal-600 pb-1">
                      <span className="text-secondary-400 font-black"><DollarSign className="h-4.5 w-4.5" /></span>
                      <input
                        type="number"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(Number(e.target.value))}
                        className="w-full font-black text-secondary-900 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Time Horizon (Years)</label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-teal-600 outline-none pb-1"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Starting Balance ($)</label>
                    <div className="flex items-center gap-2 border-b-2 border-secondary-200 focus-within:border-teal-600 pb-1">
                      <span className="text-secondary-400 font-black"><DollarSign className="h-4.5 w-4.5" /></span>
                      <input
                        type="number"
                        value={initialSavings}
                        onChange={(e) => setInitialSavings(Number(e.target.value))}
                        className="w-full font-black text-secondary-900 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Expected Interest (APY %)</label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-teal-600 outline-none pb-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SMART Goal Outline section */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 flex items-center gap-2 border-b border-secondary-100 pb-3">
                <span className="w-2.5 h-6 bg-teal-600 rounded-full"></span>
                2. SMART Goal Breakdown Worksheet
              </h2>
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-black text-secondary-900 mb-1">Specific (What exactly do you want to accomplish?)</h4>
                  <p className="text-secondary-500 mb-2 font-semibold">e.g. "I want to save $50,000 for a 10% down payment on a $500,000 home."</p>
                  <textarea className="w-full p-4 border border-secondary-200 rounded-2xl outline-none focus:border-teal-600 font-semibold" rows={2} placeholder="Write your specific goal parameters here..."></textarea>
                </div>
                <div>
                  <h4 className="font-black text-secondary-900 mb-1">Measurable (How will you track your progress?)</h4>
                  <p className="text-secondary-500 mb-2 font-semibold">e.g. "I will track this monthly via my online HYSA portal, aiming for consistent monthly growth."</p>
                  <textarea className="w-full p-4 border border-secondary-200 rounded-2xl outline-none focus:border-teal-600 font-semibold" rows={2} placeholder="Write your measurement plan here..."></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Ratios Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary-900 text-white rounded-3xl p-8 shadow-xl print-card">
              <h3 className="text-lg font-black mb-6 tracking-tight flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-teal-400" />
                Calculation Results
              </h3>
              
              <div className="space-y-6 text-sm">
                <div>
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Monthly Contribution Needed:</span>
                  <span className="text-4xl font-black text-teal-400">${monthlyContribution}</span>
                  <p className="text-secondary-400 text-xs mt-1">Amount to transfer monthly to meet target.</p>
                </div>

                <div className="border-t border-secondary-800 pt-4">
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Total Principal Saved:</span>
                  <span className="text-xl font-black text-white">${totalInvested}</span>
                </div>

                <div className="border-t border-secondary-800 pt-4">
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Compound Growth Earnings:</span>
                  <span className="text-xl font-black text-green-400">${compoundInterestEarned}</span>
                  <p className="text-secondary-400 text-xs mt-1">Growth accrued via compound compounding.</p>
                </div>
              </div>

              {interestRate > 8 && (
                <div className="mt-6 bg-teal-950/40 p-4 border border-teal-900/50 rounded-2xl">
                  <p className="text-xs text-teal-200 font-semibold leading-relaxed">
                    ⚠️ Return Alert: An 8%+ annual return rate typically requires stock market exposure, which introduces capital volatility. Settle short-term goals (&lt; 3 years) in HYSAs instead.
                  </p>
                </div>
              )}
            </div>

            {/* Related educational guides */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm no-print">
              <h3 className="text-base font-black text-secondary-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-primary-600" />
                Related Guides
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/articles/2"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    Index Fund Investing for Beginners: A Complete $100 Guide
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Learn how to build wealth using passive index funds.</p>
                </li>
                <li>
                  <Link
                    href="/articles/11"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    Buying Your First Home: A Data-Backed 2026 Checklist
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Step-by-step housing planner for first-time buyers.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commitment Box */}
        <div className="hidden print:block border border-black p-6 mt-16 page-break-inside-avoid">
          <h3 className="text-base font-bold uppercase mb-4">Financial Commitment Signature</h3>
          <p className="text-xs leading-relaxed mb-6">
            I verify that I have configured my SMART savings plan. I commit to setting up a dedicated goal vault and transferring <strong>${monthlyContribution}</strong> monthly to hit my final target.
          </p>
          <div className="grid grid-cols-2 gap-8 text-sm mt-8">
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Date Established</span>
            </div>
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Signature</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
