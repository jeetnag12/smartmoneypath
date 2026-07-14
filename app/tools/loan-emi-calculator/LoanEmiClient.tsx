'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Calendar,
  Download,
  Info,
  ChevronDown,
  Percent,
  Sparkles,
  DollarSign
} from 'lucide-react'

// Article configuration
const relatedArticles = [
  { id: 28, title: 'Best Personal Loans (2026): Compare Rates, Fees & Lenders', category: 'Loans', url: '/articles/28' },
  { id: 27, title: 'How Credit Scores Really Work: FICO, VantageScore & Optimization', category: 'Credit', url: '/articles/27' },
  { id: 4, title: 'Credit-Card Debt: Compare Snowball and Avalanche With Math', category: 'Debt', url: '/articles/4' }
]

export default function LoanEmiClient() {
  // Base inputs
  const [loanAmount, setLoanAmount] = useState<number>(300000)
  const [interestRate, setInterestRate] = useState<number>(6.5)
  const [termYears, setTermYears] = useState<number>(30)

  // Prepayment simulation inputs
  const [extraMonthly, setExtraMonthly] = useState<number>(0)
  const [oneTimePrepayment, setOneTimePrepayment] = useState<number>(0)
  const [prepaymentYear, setPrepaymentYear] = useState<number>(5)

  // Toggle state
  const [scheduleView, setScheduleView] = useState<'yearly' | 'monthly'>('yearly')
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)

  // Calculations
  const results = useMemo(() => {
    const P = loanAmount
    const annualR = interestRate / 100
    const baseN = termYears * 12
    const R = annualR / 12

    // 1. Calculate Baseline (No Extra Payments)
    let baseEmi = 0
    if (loanAmount > 0) {
      if (interestRate === 0) {
        baseEmi = P / baseN
      } else {
        baseEmi = P * R * Math.pow(1 + R, baseN) / (Math.pow(1 + R, baseN) - 1)
      }
    }

    // Baseline month-by-month simulation
    let baseBalance = P
    let baseTotalInterest = 0
    const baselineMonthlyDetails = []

    for (let m = 1; m <= baseN; m++) {
      const interestPayment = baseBalance * R
      const principalPayment = Math.min(baseBalance, baseEmi - interestPayment)
      baseTotalInterest += interestPayment
      baseBalance = Math.max(0, baseBalance - principalPayment)

      baselineMonthlyDetails.push({
        month: m,
        principalPaid: principalPayment,
        interestPaid: interestPayment,
        endingBalance: baseBalance
      })
    }

    // 2. Calculate Active Simulation (With Prepayments)
    let simBalance = P
    let simTotalInterest = 0
    let totalPrepayments = 0
    const activeMonthlyDetails = []
    let finalPayoffMonth = baseN

    for (let m = 1; m <= baseN; m++) {
      if (simBalance <= 0) {
        if (finalPayoffMonth === baseN) {
          finalPayoffMonth = m - 1
        }
        activeMonthlyDetails.push({
          month: m,
          principalPaid: 0,
          interestPaid: 0,
          extraPaid: 0,
          endingBalance: 0
        })
        continue
      }

      const interestPayment = simBalance * R
      const basePrincipal = Math.min(simBalance, baseEmi - interestPayment)
      
      // Determine extra prepayment for this month
      let extraPaidThisMonth = extraMonthly
      if (oneTimePrepayment > 0 && prepaymentYear * 12 === m) {
        extraPaidThisMonth += oneTimePrepayment
      }

      // Principal paid (cannot exceed outstanding balance)
      const principalPayment = Math.min(simBalance, basePrincipal + extraPaidThisMonth)
      const actualExtraPaid = Math.max(0, principalPayment - basePrincipal)
      
      simTotalInterest += interestPayment
      totalPrepayments += actualExtraPaid
      simBalance = Math.max(0, simBalance - principalPayment)

      activeMonthlyDetails.push({
        month: m,
        principalPaid: principalPayment - actualExtraPaid,
        interestPaid: interestPayment,
        extraPaid: actualExtraPaid,
        endingBalance: simBalance
      })
    }

    // Grouping into Yearly Schedules for UI rendering
    const yearlyDetails = []
    let balance = P
    
    for (let y = 1; y <= termYears; y++) {
      let principalPaidYear = 0
      let interestPaidYear = 0
      let extraPaidYear = 0

      for (let m = 1; m <= 12; m++) {
        const idx = (y - 1) * 12 + (m - 1)
        if (activeMonthlyDetails[idx]) {
          principalPaidYear += activeMonthlyDetails[idx].principalPaid
          interestPaidYear += activeMonthlyDetails[idx].interestPaid
          extraPaidYear += activeMonthlyDetails[idx].extraPaid
          balance = activeMonthlyDetails[idx].endingBalance
        }
      }

      yearlyDetails.push({
        year: y,
        principalPaid: principalPaidYear,
        interestPaid: interestPaidYear,
        extraPaid: extraPaidYear,
        endingBalance: balance
      })
    }

    const baselineTotalRepayment = P + baseTotalInterest
    const simTotalRepayment = P + simTotalInterest
    const interestSaved = Math.max(0, baseTotalInterest - simTotalInterest)
    const monthsSaved = Math.max(0, baseN - finalPayoffMonth)

    return {
      emi: baseEmi,
      baselineTotalInterest: baseTotalInterest,
      baselineTotalRepayment,
      simTotalInterest,
      simTotalRepayment,
      interestSaved,
      monthsSaved,
      yearsSaved: (monthsSaved / 12).toFixed(1),
      activeMonthlyDetails,
      yearlyDetails,
      totalPrepayments
    }
  }, [loanAmount, interestRate, termYears, extraMonthly, oneTimePrepayment, prepaymentYear])

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  // Export full monthly schedule to CSV
  const handleExportCSV = () => {
    const headers = ['Month', 'Base Principal Paid ($)', 'Interest Paid ($)', 'Extra Prepayments ($)', 'Remaining Principal ($)']
    const csvContent = [
      headers.join(','),
      ...results.activeMonthlyDetails
        .filter(row => row.endingBalance > 0 || row.principalPaid > 0 || row.interestPaid > 0)
        .map(row => [
          row.month,
          Math.round(row.principalPaid),
          Math.round(row.interestPaid),
          Math.round(row.extraPaid),
          Math.round(row.endingBalance)
        ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `smartmoney_loan_emi_schedule_${termYears}_years.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Custom SVG Repayment Chart
  const chartHeight = 220
  const chartWidth = 500
  const paddingX = 40
  const paddingY = 20

  const chartPoints = useMemo(() => {
    const details = results.yearlyDetails
    const maxVal = Math.max(...details.map(d => d.principalPaid + d.interestPaid + d.extraPaid), 1)

    return details.map((d, idx) => {
      const totalPaid = d.principalPaid + d.interestPaid + d.extraPaid
      const x = paddingX + (idx / (details.length - 1)) * (chartWidth - paddingX * 2)
      const yInterest = chartHeight - paddingY - (d.interestPaid / maxVal) * (chartHeight - paddingY * 2)
      const yPrincipal = chartHeight - paddingY - ((d.principalPaid + d.extraPaid) / maxVal) * (chartHeight - paddingY * 2)

      return { x, yInterest, yPrincipal, ...d }
    })
  }, [results.yearlyDetails, chartWidth, chartHeight])

  const interestLinePath = useMemo(() => {
    if (chartPoints.length === 0) return ''
    let path = `M ${chartPoints[0].x} ${chartPoints[0].yInterest}`
    chartPoints.forEach(p => {
      path += ` L ${p.x} ${p.yInterest}`
    })
    return path
  }, [chartPoints])

  const principalLinePath = useMemo(() => {
    if (chartPoints.length === 0) return ''
    let path = `M ${chartPoints[0].x} ${chartPoints[0].yPrincipal}`
    chartPoints.forEach(p => {
      path += ` L ${p.x} ${p.yPrincipal}`
    })
    return path
  }, [chartPoints])

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Inputs Column */}
      <div className="lg:col-span-5 space-y-8 bg-secondary-50 border border-secondary-200 rounded-3xl p-8 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-2">Loan EMI Inputs</h2>
          <p className="text-sm text-secondary-500">Configure your principal and base terms.</p>
        </div>

        {/* Loan Amount */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="loan-amount" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Loan Amount
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The total principal sum you plan to borrow.
                </span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
              <input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
          <input
            type="range"
            min="5000"
            max="1000000"
            step="5000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Loan Amount Slider"
          />
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="interest-rate" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Interest Rate (%)
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The annual interest rate charged on the loan.
                </span>
              </span>
            </label>
            <div className="relative">
              <input
                id="interest-rate"
                type="number"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 px-3 py-1.5 rounded-xl text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Interest Rate Slider"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="loan-term" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Loan Term (Years)
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The duration in years to repay the loan.
                </span>
              </span>
            </label>
            <div className="relative">
              <input
                id="loan-term"
                type="number"
                value={termYears}
                onChange={(e) => setTermYears(Math.max(1, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-905 px-3 py-1.5 rounded-xl text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Loan Term Slider"
          />
        </div>

        {/* Prepayments / Early Repayment Sub-Section */}
        <div className="pt-6 border-t border-secondary-200 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-700 animate-pulse" />
            <h3 className="text-sm font-black text-secondary-900 uppercase tracking-wider">Early Payoff Simulations</h3>
          </div>

          {/* Extra Monthly Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="extra-monthly" className="text-xs font-bold text-secondary-600">Extra Monthly Payment</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary-400 text-xs">$</span>
                <input
                  id="extra-monthly"
                  type="number"
                  value={extraMonthly}
                  onChange={(e) => setExtraMonthly(Math.max(0, Number(e.target.value)))}
                  className="w-24 bg-white border border-secondary-200 text-secondary-900 pl-5 pr-1 py-1 rounded-lg text-xs font-bold focus:outline-none"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(Number(e.target.value))}
              className="w-full h-1.5 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              aria-label="Extra Monthly Payment slider"
            />
          </div>

          {/* One-Time Prepayment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="one-time-pay" className="text-xs font-bold text-secondary-600">One-Time Prepay ($)</label>
              <input
                id="one-time-pay"
                type="number"
                value={oneTimePrepayment}
                onChange={(e) => setOneTimePrepayment(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white border border-secondary-200 text-secondary-900 px-2 py-1.5 rounded-lg text-xs font-bold"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="prepay-year" className="text-xs font-bold text-secondary-600">At Year</label>
              <select
                id="prepay-year"
                value={prepaymentYear}
                onChange={(e) => setPrepaymentYear(Number(e.target.value))}
                className="w-full bg-white border border-secondary-200 text-secondary-900 px-2 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
              >
                {Array.from({ length: termYears }, (_, i) => i + 1).map(y => (
                  <option key={y} value={y}>End of Year {y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Outputs Display */}
      <div className="lg:col-span-7 space-y-10">
        {/* Core EMI Display */}
        <div className="bg-primary-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary-950/10">
          <div className="relative z-10">
            <span className="text-primary-200 text-xs font-black uppercase tracking-widest block mb-2">Equated Monthly Installment (EMI)</span>
            <div className="text-4xl md:text-6xl font-black tracking-tight mb-8">
              {formatCurrency(results.emi)}
              <span className="text-lg md:text-2xl text-primary-200 font-medium"> / mo</span>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Total Savings Cost</span>
                <span className="text-xl md:text-2xl font-black text-primary-300">
                  {results.simTotalInterest === results.baselineTotalInterest 
                    ? formatCurrency(results.baselineTotalInterest) 
                    : formatCurrency(results.simTotalInterest)
                  }
                </span>
              </div>
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Prepayment Payoff</span>
                <span className="text-xl md:text-2xl font-black">
                  {results.monthsSaved > 0 ? `Saved ${results.yearsSaved} Years` : 'Baseline'}
                </span>
              </div>
            </div>
          </div>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-650/40 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        </div>

        {/* Payoff Simulation Benefits Alert */}
        {results.interestSaved > 0 && (
          <div className="p-6 bg-primary-50 border border-primary-100 rounded-3xl space-y-2 animate-in zoom-in-95 duration-300">
            <h4 className="font-black text-primary-900 text-sm flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-primary-700 animate-spin" />
              Prepayment Optimization Results
            </h4>
            <p className="text-xs text-secondary-700 leading-relaxed">
              By adding extra payments, you save <strong className="text-primary-800">{formatCurrency(results.interestSaved)}</strong> in total interest cost, and pay off your debt <strong className="text-primary-800">{results.yearsSaved} years sooner</strong>.
            </p>
          </div>
        )}

        {/* Amortization Ratio Chart (Interest vs Principal) */}
        <div className="bg-white border border-secondary-200 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary-700" />
              Yearly Principal vs Interest Repayments
            </h3>
            <span className="text-xs text-secondary-400">Hover years to inspect</span>
          </div>

          <div className="relative w-full h-[220px]">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
              aria-label="Amortization principal versus interest repayments chart"
              role="img"
            >
              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Area Lines */}
              <path d={interestLinePath} fill="none" stroke="#dc2626" strokeWidth="2.5" />
              <path d={principalLinePath} fill="none" stroke="#16a34a" strokeWidth="2.5" />

              {/* Hover segments */}
              {chartPoints.map((p, idx) => (
                <g key={idx}>
                  <rect
                    x={idx === 0 ? p.x : p.x - (chartWidth - paddingX * 2) / (chartPoints.length - 1) / 2}
                    y={paddingY}
                    width={(chartWidth - paddingX * 2) / (chartPoints.length - 1)}
                    height={chartHeight - paddingY * 2}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredYear(idx)}
                    onMouseLeave={() => setHoveredYear(null)}
                  />
                  {hoveredYear === idx && (
                    <>
                      <line x1={p.x} y1={paddingY} x2={p.x} y2={chartHeight - paddingY} stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
                      <circle cx={p.x} cy={p.yInterest} r="4.5" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx={p.x} cy={p.yPrincipal} r="4.5" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredYear !== null && chartPoints[hoveredYear] && (
              <div 
                className="absolute z-30 bg-secondary-900 text-white rounded-xl p-3 shadow-xl text-xs space-y-1 pointer-events-none border border-secondary-800"
                style={{ 
                  left: `${Math.min(chartWidth - 170, Math.max(10, chartPoints[hoveredYear].x - 70))}px`, 
                  top: '10px' 
                }}
              >
                <p className="font-black border-b border-white/10 pb-1">Year {chartPoints[hoveredYear].year}</p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-600"></span>Principal Paid:</span>
                  <span className="font-bold text-white">{formatCurrency(chartPoints[hoveredYear].principalPaid + chartPoints[hoveredYear].extraPaid)}</span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-650"></span>Interest Paid:</span>
                  <span className="font-bold text-white">{formatCurrency(chartPoints[hoveredYear].interestPaid)}</span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Balance:</span>
                  <span className="font-bold text-white">{formatCurrency(chartPoints[hoveredYear].endingBalance)}</span>
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-6 justify-center text-xs">
            <span className="flex items-center gap-2 font-semibold text-secondary-650">
              <span className="w-3.5 h-1.5 rounded-full bg-green-600"></span> Principal payments
            </span>
            <span className="flex items-center gap-2 font-semibold text-secondary-650">
              <span className="w-3.5 h-1.5 rounded-full bg-red-600"></span> Interest payments
            </span>
          </div>
        </div>

        {/* Schedule Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-secondary-50 border border-secondary-200 p-1.5 rounded-2xl">
            <button
              onClick={() => setScheduleView('yearly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${scheduleView === 'yearly' ? 'bg-white text-secondary-900 shadow-sm' : 'text-secondary-600'}`}
            >
              Yearly Schedule
            </button>
            <button
              onClick={() => setScheduleView('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${scheduleView === 'monthly' ? 'bg-white text-secondary-900 shadow-sm' : 'text-secondary-600'}`}
            >
              Monthly Schedule
            </button>
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            aria-label="Export amortization schedule as CSV file"
          >
            <Download className="h-3.5 w-3.5" /> Export Schedule
          </button>
        </div>

        {/* Schedule Table */}
        <div className="border border-secondary-200 rounded-3xl overflow-hidden bg-white max-h-[300px] overflow-y-auto scrollbar-thin">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-secondary-50 text-secondary-700 font-bold border-b border-secondary-200">
                <th className="py-3.5 px-6">{scheduleView === 'yearly' ? 'Year' : 'Month'}</th>
                <th className="py-3.5 px-6">Principal Repaid</th>
                <th className="py-3.5 px-6">Interest Paid</th>
                <th className="py-3.5 px-6">Extra prepayments</th>
                <th className="py-3.5 px-6">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {scheduleView === 'yearly' ? (
                results.yearlyDetails.map((detail) => (
                  <tr key={detail.year} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors text-secondary-900">
                    <td className="py-3.5 px-6 font-bold">Year {detail.year}</td>
                    <td className="py-3.5 px-6 font-semibold">{formatCurrency(detail.principalPaid)}</td>
                    <td className="py-3.5 px-6 font-semibold text-secondary-550">{formatCurrency(detail.interestPaid)}</td>
                    <td className="py-3.5 px-6 font-semibold text-primary-700">+{formatCurrency(detail.extraPaid)}</td>
                    <td className="py-3.5 px-6 font-bold text-secondary-950">{formatCurrency(detail.endingBalance)}</td>
                  </tr>
                ))
              ) : (
                results.activeMonthlyDetails
                  .filter(row => row.endingBalance > 0 || row.principalPaid > 0)
                  .map((row) => (
                    <tr key={row.month} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors text-secondary-900">
                      <td className="py-3.5 px-6 font-bold">Month {row.month}</td>
                      <td className="py-3.5 px-6 font-semibold">{formatCurrency(row.principalPaid)}</td>
                      <td className="py-3.5 px-6 font-semibold text-secondary-550">{formatCurrency(row.interestPaid)}</td>
                      <td className="py-3.5 px-6 font-semibold text-primary-700">+{formatCurrency(row.extraPaid)}</td>
                      <td className="py-3.5 px-6 font-bold text-secondary-950">{formatCurrency(row.endingBalance)}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Related Articles */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-[2rem] p-8 mt-12">
          <h3 className="text-lg font-bold text-secondary-955 flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary-750" />
            Related Debt & Credit Guides
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <Link 
                key={article.id} 
                href={article.url}
                className="block p-5 bg-white border border-secondary-200 hover:border-primary-600 rounded-2xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-[10px] font-bold text-primary-800 bg-primary-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
                <h4 className="font-extrabold text-secondary-800 group-hover:text-primary-900 transition-colors text-xs leading-snug mt-3 flex items-center justify-between">
                  {article.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
