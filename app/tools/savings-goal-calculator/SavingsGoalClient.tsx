'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Calendar,
  Download,
  CheckCircle,
  PiggyBank,
  TrendingUp,
  Scale,
  Sparkles,
  Info
} from 'lucide-react'

// Article configuration
const relatedArticles = [
  { id: 25, title: 'Emergency Fund Guide: How Much Cash Should You Actually Save?', category: 'Savings', url: '/articles/25' },
  { id: 14, title: 'Best High-Yield Savings Accounts (2026): Compare APYs, Fees & Features', category: 'HYSA', url: '/articles/14' },
  { id: 3, title: 'The 50/30/20 Budget: Test It Against Your Real Numbers', category: 'Budgeting', url: '/articles/3' }
]

export default function SavingsGoalClient() {
  // Mode toggle: 'timeline' (calculate months) vs 'required_savings' (calculate monthly deposit needed)
  const [calculationMode, setCalculationMode] = useState<'timeline' | 'required_savings'>('timeline')

  // Shared inputs
  const [goalAmount, setGoalAmount] = useState<number>(20000)
  const [currentSavings, setCurrentSavings] = useState<number>(5000)
  const [interestRate, setInterestRate] = useState<number>(4.5)

  // Timeline mode input
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500)

  // Required savings mode input
  const [targetYears, setTargetYears] = useState<number>(3)

  // Inflation adjustments
  const [adjustInflation, setAdjustInflation] = useState<boolean>(false)
  const [inflationRate, setInflationRate] = useState<number>(2.5)

  // Interactive chart hover
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Calculation logic
  const results = useMemo(() => {
    const P = currentSavings
    const A = goalAmount
    const annualR = interestRate / 100
    const r = annualR / 12
    const yearlyDetails = []

    // Inflation discount helper
    const getInflationDiscount = (year: number) => {
      if (!adjustInflation) return 1
      return Math.pow(1 + inflationRate / 100, -year)
    }

    if (P >= A) {
      return {
        months: 0,
        monthlyRequired: 0,
        totalDeposited: 0,
        totalInterest: 0,
        yearlyDetails: [],
        completionDate: 'Already Reached'
      }
    }

    let calculatedMonths = 0
    let calculatedMonthlyRequired = monthlyDeposit
    let balance = P
    let totalDeposited = 0
    let totalInterest = 0

    if (calculationMode === 'timeline') {
      // MODE A: Find months required
      if (monthlyDeposit === 0 && interestRate === 0) {
        return {
          months: 999,
          monthlyRequired: 0,
          totalDeposited: 0,
          totalInterest: 0,
          yearlyDetails: [],
          completionDate: 'Never'
        }
      }

      // Simulation loop
      while (balance < A && calculatedMonths < 600) {
        calculatedMonths++
        balance += monthlyDeposit
        totalDeposited += monthlyDeposit

        let interest = 0
        if (r > 0) {
          interest = balance * r
          balance += interest
          totalInterest += interest
        }

        const discount = getInflationDiscount(calculatedMonths / 12)

        if (calculatedMonths % 12 === 0 || balance >= A) {
          yearlyDetails.push({
            year: Math.ceil(calculatedMonths / 12),
            totalDeposits: totalDeposited,
            totalInterestEarned: totalInterest,
            endingBalance: balance,
            inflationAdjustedBalance: balance * discount
          })
        }
      }
    } else {
      // MODE B: Find required monthly savings to hit target in targetYears
      const n = targetYears * 12
      calculatedMonths = n

      if (r === 0) {
        calculatedMonthlyRequired = (A - P) / n
      } else {
        calculatedMonthlyRequired = (A - P * Math.pow(1 + r, n)) / ((Math.pow(1 + r, n) - 1) / r)
      }
      calculatedMonthlyRequired = Math.max(0, calculatedMonthlyRequired)

      // Run simulation to compile details
      for (let m = 1; m <= n; m++) {
        balance += calculatedMonthlyRequired
        totalDeposited += calculatedMonthlyRequired

        let interest = 0
        if (r > 0) {
          interest = balance * r
          balance += interest
          totalInterest += interest
        }

        const discount = getInflationDiscount(m / 12)

        if (m % 12 === 0 || m === n) {
          yearlyDetails.push({
            year: Math.ceil(m / 12),
            totalDeposits: totalDeposited,
            totalInterestEarned: totalInterest,
            endingBalance: balance,
            inflationAdjustedBalance: balance * discount
          })
        }
      }
    }

    // Completion date projection
    const date = new Date()
    date.setMonth(date.getMonth() + calculatedMonths)
    const completionDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return {
      months: calculatedMonths,
      monthlyRequired: calculatedMonthlyRequired,
      totalDeposited,
      totalInterest,
      yearlyDetails,
      completionDate
    }
  }, [calculationMode, goalAmount, currentSavings, interestRate, monthlyDeposit, targetYears, adjustInflation, inflationRate])

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  // Export year-by-year schedule to CSV
  const handleExportCSV = () => {
    const headers = ['Year', 'Total Deposits ($)', 'Total Interest ($)', 'Nominal Balance ($)', 'Real Buying Power ($)']
    const csvContent = [
      headers.join(','),
      ...results.yearlyDetails.map(row => [
        row.year,
        Math.round(row.totalDeposits),
        Math.round(row.totalInterestEarned),
        Math.round(row.endingBalance),
        Math.round(row.inflationAdjustedBalance)
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `smartmoney_savings_projections_${results.months}_months.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Custom SVG Progress Line Chart Calculations
  const chartHeight = 220
  const chartWidth = 500
  const paddingX = 40
  const paddingY = 20

  const chartPoints = useMemo(() => {
    const details = results.yearlyDetails
    const maxVal = Math.max(goalAmount, ...details.map(d => adjustInflation ? d.inflationAdjustedBalance : d.endingBalance), 1)

    // Add Year 0 initial state
    const points = [
      {
        x: paddingX,
        y: chartHeight - paddingY - (currentSavings / maxVal) * (chartHeight - paddingY * 2),
        cy: chartHeight - paddingY - (currentSavings / maxVal) * (chartHeight - paddingY * 2),
        year: 0,
        totalDeposits: 0,
        totalInterestEarned: 0,
        endingBalance: currentSavings,
        inflationAdjustedBalance: currentSavings
      },
      ...details.map((d, idx) => {
        const activeBalance = adjustInflation ? d.inflationAdjustedBalance : d.endingBalance
        const x = paddingX + ((idx + 1) / details.length) * (chartWidth - paddingX * 2)
        const y = chartHeight - paddingY - (activeBalance / maxVal) * (chartHeight - paddingY * 2)
        const cy = chartHeight - paddingY - ((currentSavings + d.totalDeposits) / maxVal) * (chartHeight - paddingY * 2)

        return { x, y, cy, ...d }
      })
    ]

    return points
  }, [results.yearlyDetails, goalAmount, currentSavings, adjustInflation, chartWidth, chartHeight])

  const balanceAreaPath = useMemo(() => {
    if (chartPoints.length === 0) return ''
    let path = `M ${chartPoints[0].x} ${chartHeight - paddingY}`
    chartPoints.forEach(p => {
      path += ` L ${p.x} ${p.y}`
    })
    path += ` L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - paddingY} Z`
    return path
  }, [chartPoints])

  const balanceLinePath = useMemo(() => {
    if (chartPoints.length === 0) return ''
    let path = `M ${chartPoints[0].x} ${chartPoints[0].y}`
    chartPoints.forEach(p => {
      path += ` L ${p.x} ${p.y}`
    })
    return path
  }, [chartPoints])

  const targetLineY = useMemo(() => {
    const details = results.yearlyDetails
    const maxVal = Math.max(goalAmount, ...details.map(d => adjustInflation ? d.inflationAdjustedBalance : d.endingBalance), 1)
    return chartHeight - paddingY - (goalAmount / maxVal) * (chartHeight - paddingY * 2)
  }, [results.yearlyDetails, goalAmount, adjustInflation])

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Inputs Column */}
      <div className="lg:col-span-5 space-y-8 bg-secondary-50 border border-secondary-200 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-secondary-900 mb-2">Savings Inputs</h2>
            <p className="text-sm text-secondary-500">Configure your target objectives.</p>
          </div>
          {/* Mode Switcher */}
          <div className="flex bg-secondary-200/50 p-1 rounded-2xl border border-secondary-200">
            <button
              onClick={() => setCalculationMode('timeline')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${calculationMode === 'timeline' ? 'bg-white text-secondary-900 shadow-sm' : 'text-secondary-655'}`}
            >
              Time to Reach Goal
            </button>
            <button
              onClick={() => setCalculationMode('required_savings')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${calculationMode === 'required_savings' ? 'bg-white text-secondary-900 shadow-sm' : 'text-secondary-655'}`}
            >
              Deposit Needed
            </button>
          </div>
        </div>

        {/* Goal Amount */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="goal-amount" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Goal Amount
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The target sum you want to save.
                </span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
              <input
                id="goal-amount"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(Math.max(1, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Goal Amount Slider"
          />
        </div>

        {/* Current Savings */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="current-savings" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Current Savings
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  How much you already have saved toward this goal.
                </span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
              <input
                id="current-savings"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Math.min(goalAmount, Number(e.target.value)))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Current Savings Slider"
          />
        </div>

        {/* Mode-Specific Input: Monthly Deposit OR Target Timeline */}
        {calculationMode === 'timeline' ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="monthly-deposit" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
                Monthly Deposit
                <span className="group relative">
                  <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                    The amount you plan to deposit each month.
                  </span>
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
                <input
                  id="monthly-deposit"
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Math.max(0, Number(e.target.value)))}
                  className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
              aria-label="Monthly Deposit Slider"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="target-years" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
                Target Timeline (Years)
                <span className="group relative">
                  <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                    The total number of years you want to reach your goal in.
                  </span>
                </span>
              </label>
              <div className="relative">
                <input
                  id="target-years"
                  type="number"
                  value={targetYears}
                  onChange={(e) => setTargetYears(Math.max(1, Number(e.target.value)))}
                  className="w-32 bg-white border border-secondary-200 text-secondary-900 px-3 py-1.5 rounded-xl text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={targetYears}
              onChange={(e) => setTargetYears(Number(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
              aria-label="Target Timeline Slider"
            />
          </div>
        )}

        {/* APY Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="interest-rate" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Annual Interest Rate / APY (%)
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The annual percentage yield (APY) of your savings account.
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
            min="0"
            max="8"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Interest Rate Slider"
          />
        </div>

        {/* Inflation Adjustment */}
        <div className="pt-4 border-t border-secondary-200 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="inflation-toggle" className="text-sm font-bold text-secondary-750">Adjust for Inflation</label>
            <input
              id="inflation-toggle"
              type="checkbox"
              checked={adjustInflation}
              onChange={(e) => setAdjustInflation(e.target.checked)}
              className="w-5 h-5 accent-primary-600 cursor-pointer rounded"
            />
          </div>

          {adjustInflation && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <label htmlFor="inflation-rate" className="text-xs font-bold text-secondary-550">Annual Inflation Rate (%)</label>
                <input
                  id="inflation-rate"
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
                  className="w-20 bg-white border border-secondary-200 text-secondary-900 px-2 py-1 rounded-lg text-xs font-bold text-right"
                />
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full h-1 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                aria-label="Annual Inflation Rate slider"
              />
            </div>
          )}
        </div>
      </div>

      {/* Outputs Column */}
      <div className="lg:col-span-7 space-y-10">
        {/* Core Timelines & Metric Cards */}
        <div className="bg-primary-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary-950/10">
          <div className="relative z-10">
            {calculationMode === 'timeline' ? (
              <>
                <span className="text-primary-200 text-xs font-black uppercase tracking-widest block mb-2">Time Required to Reach Goal</span>
                <div className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                  {results.months === 600 ? '50+ Years' : `${results.months} Months`}
                </div>
              </>
            ) : (
              <>
                <span className="text-primary-200 text-xs font-black uppercase tracking-widest block mb-2">Monthly Savings Needed</span>
                <div className="text-4xl md:text-6xl font-black tracking-tight mb-8">
                  {formatCurrency(results.monthlyRequired)}
                  <span className="text-lg md:text-2xl text-primary-200 font-medium"> / mo</span>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Target Completion Date</span>
                <span className="text-xl md:text-2xl font-black text-primary-300">{results.completionDate}</span>
              </div>
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Total Interest Earned</span>
                <span className="text-xl md:text-2xl font-black">{formatCurrency(results.totalInterest)}</span>
              </div>
            </div>
          </div>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-650/40 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        </div>

        {/* Monthly savings recommendations */}
        {calculationMode === 'timeline' && results.months > 0 && (
          <div className="bg-primary-50 border border-primary-100 p-6 rounded-3xl space-y-2">
            <h4 className="font-black text-primary-900 text-sm flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-primary-750" />
              SmartMoneyPath Recommendation
            </h4>
            <p className="text-xs text-secondary-700 leading-relaxed">
              If you want to accelerate and reach your <strong>{formatCurrency(goalAmount)}</strong> goal within <strong>24 months</strong>, you should increase your monthly savings deposit to <strong>{formatCurrency(((goalAmount - currentSavings * Math.pow(1 + interestRate/100/12, 24)) / ((Math.pow(1 + interestRate/100/12, 24) - 1) / (interestRate/100/12))))}</strong>.
            </p>
          </div>
        )}

        {/* SVG Progress Graph */}
        <div className="bg-white border border-secondary-200 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-750" />
              Goal Target Projections Chart
            </h3>
            <span className="text-xs text-secondary-400">Hover elements to inspect</span>
          </div>

          <div className="relative w-full h-[220px]">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
              aria-label="Savings goal growth projection graph"
              role="img"
            >
              {/* Target Line */}
              <line x1={paddingX} y1={targetLineY} x2={chartWidth - paddingX} y2={targetLineY} stroke="#1b5e20" strokeWidth="1.5" strokeDasharray="4,4" />
              <text x={chartWidth - paddingX - 70} y={targetLineY - 6} fill="#1b5e20" className="text-[10px] font-bold">Goal Target</text>

              {/* Grid Lines */}
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Area path */}
              <path d={balanceAreaPath} fill="url(#balanceGrad)" opacity="0.15" />
              <path d={balanceLinePath} fill="none" stroke="#1b5e20" strokeWidth="3" />

              {/* Gradients */}
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b5e20" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Hover segments */}
              {chartPoints.map((p, idx) => (
                <g key={idx}>
                  <rect
                    x={idx === 0 ? p.x : p.x - (chartWidth - paddingX * 2) / chartPoints.length / 2}
                    y={paddingY}
                    width={(chartWidth - paddingX * 2) / (chartPoints.length - 1)}
                    height={chartHeight - paddingY * 2}
                    fill="transparent"
                    className="cursor-crosshair"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  {hoveredIndex === idx && (
                    <>
                      <line x1={p.x} y1={paddingY} x2={p.x} y2={chartHeight - paddingY} stroke="#1b5e20" strokeWidth="1.5" strokeDasharray="3,3" />
                      <circle cx={p.x} cy={p.y} r="5" fill="#1b5e20" stroke="#ffffff" strokeWidth="2" />
                    </>
                  )}
                </g>
              ))}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredIndex !== null && chartPoints[hoveredIndex] && (
              <div 
                className="absolute z-30 bg-secondary-900 text-white rounded-xl p-3 shadow-xl text-xs space-y-1 pointer-events-none border border-secondary-800"
                style={{ 
                  left: `${Math.min(chartWidth - 170, Math.max(10, chartPoints[hoveredIndex].x - 70))}px`, 
                  top: '10px' 
                }}
              >
                <p className="font-black border-b border-white/10 pb-1">
                  {chartPoints[hoveredIndex].year === 0 ? 'Starting state' : `Year ${chartPoints[hoveredIndex].year}`}
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Balance:</span>
                  <span className="font-bold text-white">
                    {formatCurrency(adjustInflation ? chartPoints[hoveredIndex].inflationAdjustedBalance : chartPoints[hoveredIndex].endingBalance)}
                  </span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Deposits:</span>
                  <span className="font-bold text-white">{formatCurrency(chartPoints[hoveredIndex].totalDeposits)}</span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Interest:</span>
                  <span className="font-bold text-primary-300">{formatCurrency(chartPoints[hoveredIndex].totalInterestEarned)}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button & Year breakdowns */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-600" />
            Amortization Projections
          </h3>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            aria-label="Export savings schedule to CSV file"
          >
            <Download className="h-3.5 w-3.5" /> Export Projections
          </button>
        </div>

        <div className="border border-secondary-200 rounded-3xl overflow-hidden bg-white max-h-[300px] overflow-y-auto scrollbar-thin">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-secondary-50 text-secondary-700 font-bold border-b border-secondary-200">
                <th className="py-3.5 px-6">Year</th>
                <th className="py-3.5 px-6">Total Deposits</th>
                <th className="py-3.5 px-6">Interest Accumulated</th>
                <th className="py-3.5 px-6">Nominal Balance</th>
                {adjustInflation && <th className="py-3.5 px-6">Real Buying Power</th>}
              </tr>
            </thead>
            <tbody>
              {results.yearlyDetails.map((detail) => (
                <tr key={detail.year} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors text-secondary-900">
                  <td className="py-3.5 px-6 font-bold">Year {detail.year}</td>
                  <td className="py-3.5 px-6 font-semibold">{formatCurrency(detail.totalDeposits)}</td>
                  <td className="py-3.5 px-6 text-primary-750 font-semibold">+{formatCurrency(detail.totalInterestEarned)}</td>
                  <td className="py-3.5 px-6 font-bold text-secondary-800">{formatCurrency(detail.endingBalance)}</td>
                  {adjustInflation && (
                    <td className="py-3.5 px-6 font-bold text-primary-800 bg-primary-50/20">{formatCurrency(detail.inflationAdjustedBalance)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Related Articles */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-[2rem] p-8 mt-12">
          <h3 className="text-lg font-bold text-secondary-955 flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary-750" />
            Related Savings & Budgeting Guides
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
