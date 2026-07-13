'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  PiggyBank,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  DollarSign,
  ShieldAlert,
  ChevronDown
} from 'lucide-react'

export default function EmergencyFundChecklistPage() {
  const searchParams = useSearchParams()
  const autoPrint = searchParams.get('print') === 'true'

  // Input States
  const [essentialExpenses, setEssentialExpenses] = useState(3000)
  
  // Risk checkboxes
  const [isSingleIncome, setIsSingleIncome] = useState(false)
  const [isFreelance, setIsFreelance] = useState(false)
  const [isCyclicalIndustry, setIsCyclicalIndustry] = useState(false)
  const [isDualIncomeIndependent, setIsDualIncomeIndependent] = useState(true)
  const [dependentsCount, setDependentsCount] = useState(0)

  // Deductibles
  const [largestDeductible, setLargestDeductible] = useState(1500)

  // Calculations
  let baseMonths = 3
  if (isSingleIncome) baseMonths += 2
  if (isFreelance) baseMonths += 3
  if (isCyclicalIndustry) baseMonths += 2
  if (isDualIncomeIndependent && !isSingleIncome && !isFreelance) baseMonths -= 1
  
  // Dependents modifier
  baseMonths += dependentsCount * 1

  // Ensure months are bounded logically (e.g., minimum 3, maximum 12)
  const finalMonths = Math.max(3, Math.min(baseMonths, 12))
  
  const targetFund = essentialExpenses * finalMonths
  const starterFund = Math.max(1000, largestDeductible)

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
                <div className="p-2.5 rounded-xl bg-green-50 text-green-700 border border-green-100 no-print">
                  <PiggyBank className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-400 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">
                  Interactive Checklist
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-2">
                Emergency Fund Checklist & Target Builder
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
              <p>A data-driven target calculator that uses monthly essential spending baseline, income stability modifiers, dependents, and deductibles to build a personalized cash protection framework.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Who should use it</h3>
              <p>Savers trying to identify exactly how much cash to keep liquid in a high-yield account, balancing the risk of financial hardship against the opportunity cost of investing.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Authority Standard</h3>
              <p>Reflects research from the FDIC on asset liquidity and consumer advisory statistics showing that 90% of emergencies are covered by an initial $1,000-$2,000 starter buffer.</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="bg-primary-900 text-white p-8 rounded-[2rem] mb-12 shadow-xl print-card">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary-400" />
            Checklist Instructions
          </h2>
          <ol className="grid md:grid-cols-4 gap-6 text-sm">
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">1</span>
              <p className="text-primary-100 font-medium">Input your monthly essential baseline costs (only needs—pause discretionary spending in a crisis).</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">2</span>
              <p className="text-primary-100 font-medium">Select your income risk profile checkboxes. Volatility and single earnings increase necessary coverage months.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">3</span>
              <p className="text-primary-100 font-medium">Enter your largest insurance deductible to set your immediate Starter Fund goal.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">4</span>
              <p className="text-primary-100 font-medium">Check off the steps below as you open HYSAs, set up autopay, and reach target savings thresholds.</p>
            </li>
          </ol>
        </div>

        {/* Layout grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Inputs Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Baseline */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-green-600 rounded-full"></span>
                Step 1: Essential Monthly Spending
              </h2>
              <p className="text-sm text-secondary-500 mb-6 font-semibold">
                What does it cost to keep shelter, utilities, food, auto commute, and minimum debt payments active for 30 days?
              </p>
              <div className="flex items-center gap-4 max-w-sm">
                <span className="text-secondary-400 font-black text-xl"><DollarSign className="h-5 w-5" /></span>
                <input
                  type="number"
                  value={essentialExpenses}
                  onChange={(e) => setEssentialExpenses(Number(e.target.value))}
                  className="w-full text-2xl font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-primary-600 outline-none pb-1"
                />
                <span className="text-xs font-black text-secondary-400 uppercase tracking-wider">Per Month</span>
              </div>
            </div>

            {/* Step 2: Risk Profile */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-green-600 rounded-full"></span>
                Step 2: Assess Income Volatility & Risks
              </h2>
              <p className="text-sm text-secondary-500 mb-6 font-semibold">
                Check all indicators that apply to your current career and household configuration.
              </p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer border border-secondary-100">
                  <input
                    type="checkbox"
                    checked={isSingleIncome}
                    onChange={(e) => setIsSingleIncome(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-black text-secondary-900 block">Single Income Household (+2 months)</span>
                    <span className="text-xs text-secondary-500 font-semibold">If you lose your main income line, your household has zero baseline cash flow.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer border border-secondary-100">
                  <input
                    type="checkbox"
                    checked={isFreelance}
                    onChange={(e) => setIsFreelance(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-black text-secondary-900 block">Freelancer / Self-Employed (+3 months)</span>
                    <span className="text-xs text-secondary-500 font-semibold">Your monthly earnings fluctuate significantly and you may lack state unemployment access.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer border border-secondary-100">
                  <input
                    type="checkbox"
                    checked={isCyclicalIndustry}
                    onChange={(e) => setIsCyclicalIndustry(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-black text-secondary-900 block">Cyclical/Volatile Industry - e.g. Tech, Construction (+2 months)</span>
                    <span className="text-xs text-secondary-500 font-semibold">Industry-wide layoffs can prolong job search times beyond the national average.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors cursor-pointer border border-secondary-100">
                  <input
                    type="checkbox"
                    checked={isDualIncomeIndependent}
                    disabled={isSingleIncome}
                    onChange={(e) => setIsDualIncomeIndependent(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <span className="text-sm font-black text-secondary-900 block">Dual Income in Independent Industries (-1 month)</span>
                    <span className="text-xs text-secondary-500 font-semibold">Low probability of both earners experiencing job loss simultaneously in distinct industries.</span>
                  </div>
                </label>

                <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-xl border border-secondary-100">
                  <div>
                    <span className="text-sm font-black text-secondary-900 block">Number of Dependents (+1 month per dependent)</span>
                    <span className="text-xs text-secondary-500 font-semibold">Children or relatives introduce fixed health, food, and education liabilities.</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    value={dependentsCount}
                    onChange={(e) => setDependentsCount(Math.max(0, Number(e.target.value)))}
                    className="w-16 p-1 border rounded font-black text-center"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Deductibles */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-green-600 rounded-full"></span>
                Step 3: Largest Insurance Deductible
              </h2>
              <p className="text-sm text-secondary-500 mb-6 font-semibold">
                Look at your health, home, and auto deductibles. Find the largest single out-of-pocket maximum.
              </p>
              <div className="flex items-center gap-4 max-w-sm">
                <span className="text-secondary-400 font-black text-xl"><DollarSign className="h-5 w-5" /></span>
                <input
                  type="number"
                  value={largestDeductible}
                  onChange={(e) => setLargestDeductible(Number(e.target.value))}
                  className="w-full text-2xl font-black text-secondary-900 border-b-2 border-secondary-200 focus:border-primary-600 outline-none pb-1"
                />
                <span className="text-xs font-black text-secondary-400 uppercase tracking-wider">Deductible Limit</span>
              </div>
            </div>

            {/* Physical Checklist Checkboxes */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-green-600 rounded-full"></span>
                4. Action Plan Checklist
              </h2>
              <div className="space-y-4 font-semibold text-sm">
                {[
                  'Open a dedicated High-Yield Savings Account (HYSA) at a separate FDIC-insured digital bank.',
                  'Set up an automatic recurring transfer for the day your paycheck hits.',
                  'Establish the Starter Fund target (largest deductible amount) to handle flat tires or broken sensors.',
                  'Audit auto-subscriptions and dining costs to redirect capital to emergency savings.',
                  'Recalculate your essential monthly baseline cost annually or after major lifestyle changes.',
                  'Reach the Full Shield milestone and redirect savings rate to retirement accounts.'
                ].map((item, i) => (
                  <label key={i} className="flex gap-3 items-start cursor-pointer hover:text-secondary-900 transition-colors">
                    <input type="checkbox" className="mt-1 text-primary-600 focus:ring-primary-500" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Sidebar */}
          <div className="space-y-8">
            <div className="bg-secondary-900 text-white rounded-3xl p-8 shadow-xl print-card">
              <h3 className="text-lg font-black mb-6 tracking-tight">Your Target Cushion</h3>
              <div className="space-y-6">
                <div>
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Recommended Duration:</span>
                  <span className="text-3xl font-black text-primary-400">{finalMonths} Months</span>
                </div>
                <div className="border-t border-secondary-800 pt-4">
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Starter Fund Goal:</span>
                  <span className="text-2xl font-black text-white">${starterFund}</span>
                  <p className="text-secondary-400 text-xs mt-1">Sized to cover your largest single deductible.</p>
                </div>
                <div className="border-t border-secondary-800 pt-4">
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Full Emergency Fund Target:</span>
                  <span className="text-4xl font-black text-green-400">${targetFund}</span>
                  <p className="text-secondary-400 text-xs mt-1">Recommended cash buffer in an online HYSA.</p>
                </div>
              </div>

              {finalMonths >= 8 && (
                <div className="mt-6 bg-primary-950/40 p-4 border border-primary-800 rounded-2xl flex items-start gap-2">
                  <ShieldAlert className="h-4 w-4 text-primary-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-primary-100 font-semibold leading-relaxed">
                    High Risk Profile: A {finalMonths}-month buffer is recommended. Keep your savings in a liquid HYSA, never locked in standard CDs.
                  </p>
                </div>
              )}
            </div>

            {/* Related guides */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm no-print">
              <h3 className="text-base font-black text-secondary-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-primary-600" />
                Related Guides
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/articles/1"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    How Much Emergency Fund Do You Need? A Data-Driven Guide
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Understand variables, risk matrices, and bank selection guides.</p>
                </li>
                <li>
                  <Link
                    href="/articles/23"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    The Ultimate Emergency Fund Guide: 2026 Edition
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Advanced strategies including CD ladders and tiered cash setups.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Print Sign-off */}
        <div className="hidden print:block border border-black p-6 mt-16 page-break-inside-avoid">
          <h3 className="text-base font-bold uppercase mb-4">Financial Commitment Signature</h3>
          <p className="text-xs leading-relaxed mb-6">
            I verify that I have calculated my risk-adjusted savings target. My initial milestone is to establish my starter buffer of <strong>${starterFund}</strong>, followed by monthly automatic deposits to reach the full target of <strong>${targetFund}</strong>.
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
