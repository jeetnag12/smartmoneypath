'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  Wallet,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Calendar,
  DollarSign
} from 'lucide-react'

export default function BudgetPlannerPage() {
  const searchParams = useSearchParams()
  const autoPrint = searchParams.get('print') === 'true'

  // Form State
  const [income, setIncome] = useState(5000)
  const [housing, setHousing] = useState(1500)
  const [utilities, setUtilities] = useState(300)
  const [groceries, setGroceries] = useState(400)
  const [insurance, setInsurance] = useState(150)
  const [minDebt, setMinDebt] = useState(150)

  const [diningOut, setDiningOut] = useState(250)
  const [subscriptions, setSubscriptions] = useState(50)
  const [shopping, setShopping] = useState(200)
  const [travel, setTravel] = useState(150)

  const [savings, setSavings] = useState(500)
  const [extraDebt, setExtraDebt] = useState(350)

  // Calculations
  const totalNeeds = housing + utilities + groceries + insurance + minDebt
  const totalWants = diningOut + subscriptions + shopping + travel
  const totalSavings = savings + extraDebt
  const totalAllocated = totalNeeds + totalWants + totalSavings
  const remainingCash = income - totalAllocated

  const needsPercentage = Math.round((totalNeeds / income) * 100) || 0
  const wantsPercentage = Math.round((totalWants / income) * 100) || 0
  const savingsPercentage = Math.round((totalSavings / income) * 100) || 0

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

  return (
    <main className="min-h-screen bg-white">
      {/* Hide header and footer in print media via CSS */}
      <style jsx global>{`
        @media print {
          nav, footer, .no-print {
            display: none !important;
          }
          body {
            color: #000 !important;
            background: #fff !important;
            font-size: 12pt;
          }
          .print-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          .print-card {
            border: 1px solid #ccc !important;
            border-radius: 0 !important;
            padding: 15px !important;
            margin-bottom: 20px !important;
            page-break-inside: avoid;
          }
          input {
            border: none !important;
            border-bottom: 1px solid #000 !important;
            background: transparent !important;
            padding: 0 !important;
            width: 80px !important;
            font-weight: bold;
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

        {/* Intro Section */}
        <div className="border-b border-secondary-100 pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 no-print">
                  <Wallet className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-400 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">
                  Resource Template
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-2">
                50/30/20 Budget Worksheet
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
              <p>An interactive, printable workspace designed to split your net salary into clear structural targets: 50% for fixed needs, 30% for discretionary wants, and 20% for debt payoff and future savings.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Who should use it</h3>
              <p>Savers looking to diagnose high housing ratios, reduce discretionary spending leakages, and automate savings goals based on objective ratios rather than guesswork.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Methodology Standard</h3>
              <p>Built upon the budgeting rules popularized by the CFPB and Federal Trade Commission (FTC), adjusted to reflect volatile 2026 economic variables and housing costs.</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-primary-900 text-white p-8 rounded-[2rem] mb-12 shadow-xl relative overflow-hidden print-card">
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-primary-400" />
              Step-by-Step Budget Instructions
            </h2>
            <ol className="grid md:grid-cols-4 gap-6 text-sm">
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">1</span>
                <p className="text-primary-100 font-medium">Input your monthly post-tax take-home income. Do not include pretax 401(k) allocations.</p>
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">2</span>
                <p className="text-primary-100 font-medium">Fill in your monthly fixed expenses under the Needs category (housing, utilities, minimum debt payments).</p>
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">3</span>
                <p className="text-primary-100 font-medium">Audit discretionary Wants (dining out, subscriptions) and Savings (investments, extra debt payments).</p>
              </li>
              <li>
                <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">4</span>
                <p className="text-primary-100 font-medium">Compare your percentages in the summary table. Print or export this page as a PDF for your physical folder.</p>
              </li>
            </ol>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]"></div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 border-b border-secondary-100 pb-3 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-primary-600 rounded-full"></span>
                1. Monthly Net Income
              </h2>
              <div className="flex items-center gap-4 max-w-sm">
                <span className="text-secondary-400 font-black text-xl"><DollarSign className="h-5 w-5" /></span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full text-2xl font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-primary-600 outline-none pb-1"
                />
                <span className="text-xs font-black text-secondary-400 uppercase tracking-wider">Take-Home</span>
              </div>
            </div>

            {/* Needs Inputs */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <div className="flex justify-between items-center mb-6 border-b border-secondary-100 pb-3">
                <h2 className="text-xl font-black text-secondary-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-blue-600 rounded-full"></span>
                  2. Essential Needs (Target: 50%)
                </h2>
                <span className="text-sm font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                  Total: ${totalNeeds} ({needsPercentage}%)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Mortgage / Rent', val: housing, set: setHousing },
                  { label: 'Basic Utilities (Water, Electric, Net)', val: utilities, set: setUtilities },
                  { label: 'Essential Groceries', val: groceries, set: setGroceries },
                  { label: 'Insurance (Health, Car, Home)', val: insurance, set: setInsurance },
                  { label: 'Minimum Debt Payments', val: minDebt, set: setMinDebt },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center gap-4 border-b border-secondary-50 pb-2">
                    <span className="text-sm font-bold text-secondary-600">{item.label}</span>
                    <div className="flex items-center gap-1 font-black text-secondary-900">
                      <span>$</span>
                      <input
                        type="number"
                        value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className="w-20 text-right font-black outline-none border-b border-secondary-200 focus:border-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wants Inputs */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <div className="flex justify-between items-center mb-6 border-b border-secondary-100 pb-3">
                <h2 className="text-xl font-black text-secondary-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-pink-600 rounded-full"></span>
                  3. Discretionary Wants (Target: 30%)
                </h2>
                <span className="text-sm font-black text-pink-700 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
                  Total: ${totalWants} ({wantsPercentage}%)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Dining Out & Delivery', val: diningOut, set: setDiningOut },
                  { label: 'Streaming & Ghost Subscriptions', val: subscriptions, set: setSubscriptions },
                  { label: 'Discretionary Shopping & Hobbies', val: shopping, set: setShopping },
                  { label: 'Leisure Travel & Events', val: travel, set: setTravel },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center gap-4 border-b border-secondary-50 pb-2">
                    <span className="text-sm font-bold text-secondary-600">{item.label}</span>
                    <div className="flex items-center gap-1 font-black text-secondary-900">
                      <span>$</span>
                      <input
                        type="number"
                        value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className="w-20 text-right font-black outline-none border-b border-secondary-200 focus:border-pink-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Savings Inputs */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <div className="flex justify-between items-center mb-6 border-b border-secondary-100 pb-3">
                <h2 className="text-xl font-black text-secondary-900 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-green-600 rounded-full"></span>
                  4. Savings & Extra Debt Payoff (Target: 20%)
                </h2>
                <span className="text-sm font-black text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
                  Total: ${totalSavings} ({savingsPercentage}%)
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Emergency Savings / Investing', val: savings, set: setSavings },
                  { label: 'Extra Principal Payments (Debt Payoff)', val: extraDebt, set: setExtraDebt },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center gap-4 border-b border-secondary-50 pb-2">
                    <span className="text-sm font-bold text-secondary-600">{item.label}</span>
                    <div className="flex items-center gap-1 font-black text-secondary-900">
                      <span>$</span>
                      <input
                        type="number"
                        value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className="w-20 text-right font-black outline-none border-b border-secondary-200 focus:border-green-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ratios & Summary Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary-900 text-white rounded-3xl p-8 shadow-xl print-card">
              <h3 className="text-lg font-black mb-6 tracking-tight">Ratios Breakdown</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-black mb-2">
                    <span className="text-blue-300">Needs: {needsPercentage}%</span>
                    <span>Target: 50%</span>
                  </div>
                  <div className="w-full h-3.5 bg-secondary-800 rounded-full overflow-hidden border border-secondary-700">
                    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${Math.min(needsPercentage, 100)}%` }}></div>
                  </div>
                  {needsPercentage > 50 && (
                    <p className="text-blue-300 text-xs mt-2 flex items-start gap-1 font-semibold">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      Your needs exceed 50%. Review housing and debt lines.
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm font-black mb-2">
                    <span className="text-pink-300">Wants: {wantsPercentage}%</span>
                    <span>Target: 30%</span>
                  </div>
                  <div className="w-full h-3.5 bg-secondary-800 rounded-full overflow-hidden border border-secondary-700">
                    <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${Math.min(wantsPercentage, 100)}%` }}></div>
                  </div>
                  {wantsPercentage > 30 && (
                    <p className="text-pink-300 text-xs mt-2 flex items-start gap-1 font-semibold">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      Wants are above 30%. Consider running a subscriptions audit.
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between text-sm font-black mb-2">
                    <span className="text-green-300">Savings: {savingsPercentage}%</span>
                    <span>Target: 20%</span>
                  </div>
                  <div className="w-full h-3.5 bg-secondary-800 rounded-full overflow-hidden border border-secondary-700">
                    <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${Math.min(savingsPercentage, 100)}%` }}></div>
                  </div>
                  {savingsPercentage < 20 && (
                    <p className="text-green-300 text-xs mt-2 flex items-start gap-1 font-semibold">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      Savings rate is under the 20% target. Try to redirect lifestyle budget.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 border-t border-secondary-800 pt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-secondary-400 font-semibold">Remaining Cash:</span>
                  <span className={`font-black ${remainingCash < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    ${remainingCash}
                  </span>
                </div>
                {remainingCash < 0 && (
                  <p className="text-red-300 text-xs bg-red-950/40 p-3.5 rounded-xl border border-red-900/50 font-semibold leading-relaxed">
                    Warning: You have overallocated by ${Math.abs(remainingCash)}. Reduce discretionary spending to balance.
                  </p>
                )}
              </div>
            </div>

            {/* Related Guides */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm no-print">
              <h3 className="text-base font-black text-secondary-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-primary-600" />
                Related Educational Guides
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/articles/3"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    The 50/30/20 Budget: Test It Against Your Real Numbers
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Read our deep-dive analysis and real-life case studies on ratio tweaking.</p>
                </li>
                <li>
                  <Link
                    href="/articles/18"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    How to Save Your First $1,000: The Momentum Blueprint
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Build savings momentum using an incremental approach.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Printable Signature / Sign-Off Box */}
        <div className="hidden print:block border border-black p-6 mt-16 page-break-inside-avoid">
          <h3 className="text-base font-bold uppercase mb-4">Financial Commitment Signature</h3>
          <p className="text-xs leading-relaxed mb-6">
            I commit to tracking my spending patterns against these target structures. I will perform a 20-minute monthly audit to check variables and adjust my automated savings allocations.
          </p>
          <div className="grid grid-cols-2 gap-8 text-sm mt-8">
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Date</span>
            </div>
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Authorized Signature</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
