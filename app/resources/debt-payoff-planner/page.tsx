'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  CreditCard,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  DollarSign,
  TrendingDown,
  Trash2,
  Plus
} from 'lucide-react'

interface Debt {
  id: number
  name: string
  balance: number
  apr: number
  minPayment: number
}

export default function DebtPayoffPlannerPage() {
  const searchParams = useSearchParams()
  const autoPrint = searchParams.get('print') === 'true'

  // Debts State
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card A', balance: 1200, apr: 18, minPayment: 40 },
    { id: 2, name: 'Credit Card B', balance: 4800, apr: 27, minPayment: 145 },
    { id: 3, name: 'Student Loan', balance: 15000, apr: 5.5, minPayment: 160 },
  ])
  const [extraPayment, setExtraPayment] = useState(300)

  // Form input for new debt
  const [newName, setNewName] = useState('')
  const [newBalance, setNewBalance] = useState('')
  const [newApr, setNewApr] = useState('')
  const [newMinPayment, setNewMinPayment] = useState('')

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

  const addDebt = () => {
    if (!newName || !newBalance || !newApr || !newMinPayment) return
    const newDebt: Debt = {
      id: Date.now(),
      name: newName,
      balance: Math.max(0, Number(newBalance)),
      apr: Math.max(0, Number(newApr)),
      minPayment: Math.max(0, Number(newMinPayment)),
    }
    setDebts([...debts, newDebt])
    setNewName('')
    setNewBalance('')
    setNewApr('')
    setNewMinPayment('')
  }

  const removeDebt = (id: number) => {
    setDebts(debts.filter(d => d.id !== id))
  }

  // Calculate Payoff Schedule
  const simulatePayoff = (method: 'snowball' | 'avalanche') => {
    // Clone debts to avoid mutation
    let activeDebts = debts.map(d => ({ ...d }))
    if (activeDebts.length === 0) return { totalInterest: 0, totalMonths: 0, timeline: [] }

    // Sort active debts
    if (method === 'snowball') {
      activeDebts.sort((a, b) => a.balance - b.balance)
    } else {
      activeDebts.sort((a, b) => b.apr - a.apr)
    }

    let months = 0
    let totalInterest = 0
    const timeline = []
    
    // Simulate month by month
    while (activeDebts.some(d => d.balance > 0) && months < 360) {
      months++
      let monthlyBudget = activeDebts.reduce((sum, d) => sum + (d.balance > 0 ? d.minPayment : 0), 0) + extraPayment
      
      // Calculate monthly interest charges first
      activeDebts.forEach(d => {
        if (d.balance > 0) {
          const monthlyRate = (d.apr / 100) / 12
          const interest = d.balance * monthlyRate
          totalInterest += interest
          d.balance += interest
        }
      })

      // Pay minimums first
      activeDebts.forEach(d => {
        if (d.balance > 0) {
          const payment = Math.min(d.minPayment, d.balance)
          d.balance -= payment
          monthlyBudget -= payment
        }
      })

      // Apply extra money to primary target
      const target = activeDebts.find(d => d.balance > 0)
      if (target && monthlyBudget > 0) {
        const payment = Math.min(monthlyBudget, target.balance)
        target.balance -= payment
        monthlyBudget -= payment
      }

      // Record state
      timeline.push({
        month: months,
        remaining: activeDebts.reduce((sum, d) => sum + Math.round(d.balance), 0)
      })
    }

    return { totalInterest: Math.round(totalInterest), totalMonths: months, timeline }
  }

  const snowballResult = simulatePayoff('snowball')
  const avalancheResult = simulatePayoff('avalanche')

  const interestSaved = Math.max(0, snowballResult.totalInterest - avalancheResult.totalInterest)
  const timeSaved = Math.max(0, snowballResult.totalMonths - avalancheResult.totalMonths)

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

        {/* Header Title */}
        <div className="border-b border-secondary-100 pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-700 border border-orange-100 no-print">
                  <CreditCard className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-400 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">
                  Debt Payoff Simulator
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-2">
                Debt Payoff Planner (Snowball vs. Avalanche)
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
              <p>A math-first debt payoff calculator that compares the Debt Snowball (paying smallest balances first for behavior) against the Debt Avalanche (paying highest APR first to save interest) side-by-side.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Who should use it</h3>
              <p>Borrowers carrying credit card balances, student loans, or auto loans who want to see concrete numbers on months saved and interest optimized by applying extra principal payments.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Authority Standard</h3>
              <p>Aligned with debt repayment methodologies defined by the CFPB and Federal Trade Commission (FTC), focusing on preventing credit score impairment while paying down debt.</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-primary-900 text-white p-8 rounded-[2rem] mb-12 shadow-xl print-card">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary-400" />
            Step-by-Step Instructions
          </h2>
          <ol className="grid md:grid-cols-4 gap-6 text-sm">
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">1</span>
              <p className="text-primary-100 font-medium">Input your current debts. List their outstanding balance, interest rate (APR %), and minimum monthly payment.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">2</span>
              <p className="text-primary-100 font-medium">Input the extra monthly payment you can throw at your primary target in the "Extra Monthly Contribution" field.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">3</span>
              <p className="text-primary-100 font-medium">Compare total interest paid and payoff dates for the Behavior-focused Snowball and the Math-focused Avalanche.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">4</span>
              <p className="text-primary-100 font-medium">Print out the completed table and schedule as your physical roadmap. Cross off milestones as you pay off each card.</p>
            </li>
          </ol>
        </div>

        {/* Workspace */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Debts Table Left */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 flex items-center gap-2 border-b border-secondary-100 pb-3">
                <span className="w-2.5 h-6 bg-orange-600 rounded-full"></span>
                1. Your Debts List
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary-100 text-xs font-black uppercase text-secondary-400">
                      <th className="pb-3">Debt Name</th>
                      <th className="pb-3 text-right">Balance</th>
                      <th className="pb-3 text-right">APR (%)</th>
                      <th className="pb-3 text-right">Min Payment</th>
                      <th className="pb-3 text-right no-print">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-50 font-semibold text-sm">
                    {debts.map((d) => (
                      <tr key={d.id} className="text-secondary-800">
                        <td className="py-4 font-black">{d.name}</td>
                        <td className="py-4 text-right">${d.balance}</td>
                        <td className="py-4 text-right">{d.apr}%</td>
                        <td className="py-4 text-right">${d.minPayment}</td>
                        <td className="py-4 text-right no-print">
                          <button
                            onClick={() => removeDebt(d.id)}
                            className="p-1.5 text-secondary-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Debt Input Form */}
              <div className="mt-8 bg-secondary-50 p-6 rounded-2xl border border-secondary-100 no-print">
                <h4 className="text-xs font-black uppercase tracking-wider text-secondary-400 mb-4">Add a new debt line:</h4>
                <div className="grid sm:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-secondary-400 block mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Card A"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-white border border-secondary-200 px-3 py-2 rounded-xl text-sm font-semibold outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-secondary-400 block mb-1">Balance ($)</label>
                    <input
                      type="number"
                      placeholder="1200"
                      value={newBalance}
                      onChange={(e) => setNewBalance(e.target.value)}
                      className="w-full bg-white border border-secondary-200 px-3 py-2 rounded-xl text-sm font-semibold outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-secondary-400 block mb-1">APR (%)</label>
                    <input
                      type="number"
                      placeholder="18"
                      value={newApr}
                      onChange={(e) => setNewApr(e.target.value)}
                      className="w-full bg-white border border-secondary-200 px-3 py-2 rounded-xl text-sm font-semibold outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-secondary-400 block mb-1">Min ($)</label>
                    <input
                      type="number"
                      placeholder="40"
                      value={newMinPayment}
                      onChange={(e) => setNewMinPayment(e.target.value)}
                      className="w-full bg-white border border-secondary-200 px-3 py-2 rounded-xl text-sm font-semibold outline-none focus:border-orange-600"
                    />
                  </div>
                </div>
                <button
                  onClick={addDebt}
                  className="mt-4 inline-flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-orange-700 transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" /> Add Debt
                </button>
              </div>
            </div>

            {/* Extra Payment Section */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-orange-600 rounded-full"></span>
                2. Extra Monthly Contribution
              </h2>
              <p className="text-sm text-secondary-500 mb-6 font-semibold">
                How much extra cash can you throw at your debts monthly (in addition to the minimum payments)?
              </p>
              <div className="flex items-center gap-4 max-w-sm">
                <span className="text-secondary-400 font-black text-xl"><DollarSign className="h-5 w-5" /></span>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full text-2xl font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-orange-600 outline-none pb-1"
                />
                <span className="text-xs font-black text-secondary-400 uppercase tracking-wider">Per Month</span>
              </div>
            </div>
          </div>

          {/* Results Summary Sidebar */}
          <div className="space-y-8">
            {/* Compare Box */}
            <div className="bg-secondary-900 text-white rounded-3xl p-8 shadow-xl print-card">
              <h3 className="text-lg font-black mb-6 tracking-tight flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-orange-400" />
                Comparison Summary
              </h3>
              
              <div className="space-y-6 text-sm">
                {/* Avalanche */}
                <div className="bg-secondary-800/50 p-4 rounded-2xl border border-secondary-800">
                  <span className="text-xs font-black text-orange-400 uppercase tracking-wider block mb-1">Debt Avalanche (Math-First)</span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <span className="text-secondary-400 text-xs font-semibold block">Time to payoff:</span>
                      <span className="text-lg font-black text-white">{avalancheResult.totalMonths} months</span>
                    </div>
                    <div>
                      <span className="text-secondary-400 text-xs font-semibold block">Total Interest:</span>
                      <span className="text-lg font-black text-white">${avalancheResult.totalInterest}</span>
                    </div>
                  </div>
                </div>

                {/* Snowball */}
                <div className="bg-secondary-800/50 p-4 rounded-2xl border border-secondary-800">
                  <span className="text-xs font-black text-orange-400 uppercase tracking-wider block mb-1">Debt Snowball (Behavior-First)</span>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <span className="text-secondary-400 text-xs font-semibold block">Time to payoff:</span>
                      <span className="text-lg font-black text-white">{snowballResult.totalMonths} months</span>
                    </div>
                    <div>
                      <span className="text-secondary-400 text-xs font-semibold block">Total Interest:</span>
                      <span className="text-lg font-black text-white">${snowballResult.totalInterest}</span>
                    </div>
                  </div>
                </div>

                {interestSaved > 0 && (
                  <div className="mt-6 p-4 bg-orange-950/40 border border-orange-900/50 rounded-2xl">
                    <p className="text-xs text-orange-200 font-semibold leading-relaxed">
                      💡 Math analysis: Choosing the <strong>Avalanche method</strong> saves you <strong>${interestSaved}</strong> in interest charges and <strong>{timeSaved} months</strong> compared to the Snowball method.
                    </p>
                  </div>
                )}
              </div>
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
                    href="/articles/4"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    Credit-Card Debt: Compare Snowball and Avalanche With Math
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Read our mathematical comparison of snowball vs avalanche payoff structures.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commitment Box */}
        <div className="hidden print:block border border-black p-6 mt-16 page-break-inside-avoid">
          <h3 className="text-base font-bold uppercase mb-4">Financial Commitment Signature</h3>
          <p className="text-xs leading-relaxed mb-6">
            I commit to executing my structured debt-free plan by making all baseline minimum payments and routing my designated extra payment of <strong>${extraPayment}</strong> directly to my target debt monthly.
          </p>
          <div className="grid grid-cols-2 gap-8 text-sm mt-8">
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Date Completed</span>
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
