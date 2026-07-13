'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import {
  TrendingUp,
  Printer,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  DollarSign,
  Info
} from 'lucide-react'

export default function CreditScoreChecklistPage() {
  const searchParams = useSearchParams()
  const autoPrint = searchParams.get('print') === 'true'

  // Utilization calculation inputs
  const [balance, setBalance] = useState(1500)
  const [creditLimit, setCreditLimit] = useState(10000)

  // Calculations
  const utilizationRatio = Math.round((balance / creditLimit) * 100) || 0

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

        {/* Title */}
        <div className="border-b border-secondary-100 pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-pink-50 text-pink-700 border border-pink-100 no-print">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary-400 bg-secondary-50 border border-secondary-100 px-3 py-1 rounded-full">
                  Audit Workbook
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-2">
                Credit Score Optimization Checklist
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
              <p>A step-by-step workbook and audit tool designed to evaluate your Credit Utilization ratios and structure FICO-aligned behaviors across payment history, length, and credit mix.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Who should use it</h3>
              <p>Savers and borrowers preparing to apply for a major mortgage or auto financing loan within 6-12 months who need to polish their credit profile to secure elite tier rates.</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-secondary-900 mb-2">Authority Standard</h3>
              <p>Reflects guidelines defined by FICO and VantageScore modeling bureaus, including official credit dispute options supported by the Fair Credit Reporting Act (FCRA).</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-primary-900 text-white p-8 rounded-[2rem] mb-12 shadow-xl print-card">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-primary-400" />
            Checklist Instructions
          </h2>
          <ol className="grid md:grid-cols-4 gap-6 text-sm">
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">1</span>
              <p className="text-primary-100 font-medium">Use the calculator below to determine your credit utilization ratio. Keep this below 10% for the best scores.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">2</span>
              <p className="text-primary-100 font-medium">Verify your payment history and set up autopay on all active credit cards and loans.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">3</span>
              <p className="text-primary-100 font-medium">Check off each credit audit action item as you complete them throughout the month.</p>
            </li>
            <li>
              <span className="inline-block w-6 h-6 rounded-full bg-primary-700 text-white text-center text-xs leading-6 font-black mb-3">4</span>
              <p className="text-primary-100 font-medium">Print this workspace and keep it as your physical tracking checklist to verify your progress.</p>
            </li>
          </ol>
        </div>

        {/* Inputs & Checklist */}
        <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-8">
            {/* Calculator: Utilization */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-pink-600 rounded-full"></span>
                1. Credit Utilization Calculator
              </h2>
              <p className="text-sm text-secondary-500 mb-6 font-semibold">
                Amounts owed (utilization) accounts for 30% of your FICO score. Compute your current ratios below.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Total Credit Card Balances ($)</label>
                  <div className="flex items-center gap-2 border-b-2 border-secondary-200 focus-within:border-pink-600 pb-1">
                    <span className="text-secondary-400 font-black"><DollarSign className="h-4.5 w-4.5" /></span>
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(Number(e.target.value))}
                      className="w-full font-black text-secondary-900 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-secondary-400 block mb-2">Total Credit Limits ($)</label>
                  <div className="flex items-center gap-2 border-b-2 border-secondary-200 focus-within:border-pink-600 pb-1">
                    <span className="text-secondary-400 font-black"><DollarSign className="h-4.5 w-4.5" /></span>
                    <input
                      type="number"
                      value={creditLimit}
                      onChange={(e) => setCreditLimit(Number(e.target.value))}
                      className="w-full font-black text-secondary-900 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Steps */}
            <div className="bg-white border-2 border-secondary-100 rounded-3xl p-8 shadow-sm print-card">
              <h2 className="text-xl font-black text-secondary-900 mb-6 flex items-center gap-2 border-b border-secondary-100 pb-3">
                <span className="w-2.5 h-6 bg-pink-600 rounded-full"></span>
                2. Credit Audit Checklist
              </h2>
              
              <div className="space-y-6">
                {/* Bucket 1 */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-pink-600 mb-3">A. Payment History Audit (35% FICO Weight)</h4>
                  <div className="space-y-3 font-semibold text-sm">
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Log into all loan accounts and configure Autopay for at least the minimum amount.</span>
                    </label>
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Set calendar alerts for 3 days before payment dates as a fallback verification check.</span>
                    </label>
                  </div>
                </div>

                {/* Bucket 2 */}
                <div className="border-t border-secondary-50 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-pink-600 mb-3">B. Errors & Disputes Audit (FCRA Protections)</h4>
                  <div className="space-y-3 font-semibold text-sm">
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Download free official credit reports from AnnualCreditReport.com for all three bureaus (Equifax, Experian, TransUnion).</span>
                    </label>
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Audit name spellings, address logs, closed accounts, and hard inquiries for inaccuracies.</span>
                    </label>
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Submit dispute files online to relevant bureaus for any incorrect late marks found.</span>
                    </label>
                  </div>
                </div>

                {/* Bucket 3 */}
                <div className="border-t border-secondary-50 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-wider text-pink-600 mb-3">C. Credit Building & Maintenance</h4>
                  <div className="space-y-3 font-semibold text-sm">
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Keep oldest accounts active. Do not close zero-balance legacy credit cards.</span>
                    </label>
                    <label className="flex gap-3 items-start cursor-pointer hover:text-secondary-900">
                      <input type="checkbox" className="mt-1" />
                      <span>Avoid hard inquiries by limiting applications to once per 6 months.</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-8">
            <div className="bg-secondary-900 text-white rounded-3xl p-8 shadow-xl print-card">
              <h3 className="text-lg font-black mb-6 tracking-tight flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-400" />
                Your Audit Ratios
              </h3>
              
              <div className="space-y-6 text-sm">
                <div>
                  <span className="text-secondary-400 text-xs font-black uppercase tracking-wider block mb-1">Calculated Utilization:</span>
                  <span className="text-4xl font-black text-pink-400">{utilizationRatio}%</span>
                  <p className="text-secondary-400 text-xs mt-1">Recommended target: under 10% (under 30% baseline).</p>
                </div>

                <div className="w-full h-3 bg-secondary-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${utilizationRatio > 30 ? 'bg-red-500' : 'bg-pink-500'}`}
                    style={{ width: `${Math.min(utilizationRatio, 100)}%` }}
                  ></div>
                </div>
              </div>

              {utilizationRatio > 30 && (
                <div className="mt-6 bg-red-950/40 p-4 border border-red-900/50 rounded-2xl">
                  <p className="text-xs text-red-200 font-semibold leading-relaxed">
                    ⚠️ High Utilization Alert: Your credit utilization ratio ({utilizationRatio}%) is above the recommended 30% safety mark. This significantly drags down your score. Focus on paying down statement balances.
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
                    href="/articles/8"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    How to Read Your Credit Score and Fix Errors
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Check out our guide on finding credit report errors and disputing them.</p>
                </li>
                <li>
                  <Link
                    href="/categories/credit"
                    className="block text-sm font-black text-secondary-800 hover:text-primary-700 transition-colors underline decoration-secondary-200 underline-offset-4"
                  >
                    Credit Score Optimization Category Hub
                  </Link>
                  <p className="text-xs text-secondary-500 font-medium mt-1">Explore all of our credit research, dispute templates, and scoring guides.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commitment Box */}
        <div className="hidden print:block border border-black p-6 mt-16 page-break-inside-avoid">
          <h3 className="text-base font-bold uppercase mb-4">Financial Commitment Signature</h3>
          <p className="text-xs leading-relaxed mb-6">
            I verify that I have calculated my credit utilization ratio of <strong>{utilizationRatio}%</strong> and reviewed my credit history. I commit to auditing my official reports annually and setting up autopay on all active accounts.
          </p>
          <div className="grid grid-cols-2 gap-8 text-sm mt-8">
            <div className="border-t border-black pt-2">
              <span className="text-xs font-bold uppercase block text-secondary-400">Date Audit Completed</span>
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
