'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  HelpCircle, 
  ArrowRight, 
  Download, 
  Info,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronDown,
  BookOpen,
  Scale
} from 'lucide-react'

// Article configuration
const relatedArticles = [
  { id: 2, title: 'Index Fund Investing for Beginners: A Complete $100 Guide', category: 'Investing', url: '/articles/2' },
  { id: 29, title: 'ETF vs. Mutual Funds: Which Is Better for Beginners in 2026?', category: 'Investing', url: '/articles/29' },
  { id: 24, title: 'Roth IRA vs. Traditional IRA: The Comprehensive 2026 Strategy Guide', category: 'Retirement', url: '/articles/24' }
]

export default function CompoundInterestClient() {
  // Inputs state
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200)
  const [annualRate, setAnnualRate] = useState<number>(8)
  const [years, setYears] = useState<number>(15)
  const [frequency, setFrequency] = useState<string>('monthly')
  const [adjustInflation, setAdjustInflation] = useState<boolean>(false)
  const [inflationRate, setInflationRate] = useState<number>(2.5)
  
  // Interactive chart state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Calculations
  const results = useMemo(() => {
    let balance = initialInvestment
    let totalContributed = initialInvestment
    let totalInterest = 0
    
    // Inflation discount helper
    const getInflationDiscount = (year: number) => {
      if (!adjustInflation) return 1
      return Math.pow(1 + inflationRate / 100, -year)
    }

    const r = annualRate / 100
    const yearlyDetails = []

    // Push initial year 0 state
    yearlyDetails.push({
      year: 0,
      contributions: initialInvestment,
      interest: 0,
      balance: initialInvestment,
      inflationAdjustedBalance: initialInvestment,
      yearInterest: 0,
      yearContributions: 0
    })

    for (let y = 1; y <= years; y++) {
      let yearInterest = 0
      let yearContributions = 0

      for (let m = 1; m <= 12; m++) {
        // Contribution at the end of the month
        balance += monthlyContribution
        yearContributions += monthlyContribution
        totalContributed += monthlyContribution

        let compoundThisMonth = false
        let periodRate = 0

        if (frequency === 'monthly') {
          compoundThisMonth = true
          periodRate = r / 12
        } else if (frequency === 'quarterly' && m % 3 === 0) {
          compoundThisMonth = true
          periodRate = r / 4
        } else if (frequency === 'semi-annually' && m % 6 === 0) {
          compoundThisMonth = true
          periodRate = r / 2
        } else if (frequency === 'annually' && m === 12) {
          compoundThisMonth = true
          periodRate = r / 1
        }

        if (compoundThisMonth) {
          const interest = balance * periodRate
          balance += interest
          yearInterest += interest
          totalInterest += interest
        }
      }

      const discount = getInflationDiscount(y)

      yearlyDetails.push({
        year: y,
        contributions: totalContributed,
        interest: totalInterest,
        balance: balance,
        inflationAdjustedBalance: balance * discount,
        yearInterest: yearInterest,
        yearContributions: yearContributions
      })
    }

    // Solve for Scenario B: Yearly deposit comparison (made at end of each year)
    // Deposit = monthlyContribution * 12
    let yearlyCompBalance = initialInvestment
    const yearlyDeposit = monthlyContribution * 12
    for (let y = 1; y <= years; y++) {
      // Compounding depending on selected frequency
      if (frequency === 'monthly') {
        // Compound monthly but deposit once at the end of the year
        for (let m = 1; m <= 12; m++) {
          yearlyCompBalance *= (1 + r / 12)
        }
        yearlyCompBalance += yearlyDeposit
      } else if (frequency === 'quarterly') {
        for (let q = 1; q <= 4; q++) {
          yearlyCompBalance *= (1 + r / 4)
        }
        yearlyCompBalance += yearlyDeposit
      } else if (frequency === 'semi-annually') {
        yearlyCompBalance *= (1 + r / 2)
        yearlyCompBalance *= (1 + r / 2)
        yearlyCompBalance += yearlyDeposit
      } else {
        yearlyCompBalance = yearlyCompBalance * (1 + r) + yearlyDeposit
      }
    }

    return {
      futureValue: balance,
      inflationAdjustedFutureValue: balance * getInflationDiscount(years),
      totalContributed,
      totalInterest,
      yearlyDetails,
      yearlyDepositFutureValue: yearlyCompBalance
    }
  }, [initialInvestment, monthlyContribution, annualRate, years, frequency, adjustInflation, inflationRate])

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  // Export year-by-year growth table to CSV
  const handleExportCSV = () => {
    const headers = ['Year', 'Total Deposits ($)', 'Total Interest ($)', 'Nominal Balance ($)', 'Real Buying Power (Inflation Adjusted) ($)']
    const csvContent = [
      headers.join(','),
      ...results.yearlyDetails.map(row => [
        row.year,
        Math.round(row.contributions),
        Math.round(row.interest),
        Math.round(row.balance),
        Math.round(row.inflationAdjustedBalance)
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `smartmoney_compound_interest_growth_${years}_years.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Custom SVG Responsive Line/Area Chart Calculations
  const chartHeight = 220
  const chartWidth = 500
  const paddingX = 40
  const paddingY = 20

  const chartPoints = useMemo(() => {
    const details = results.yearlyDetails
    const maxVal = Math.max(...details.map(d => adjustInflation ? d.inflationAdjustedBalance : d.balance), 1)
    
    return details.map((d, idx) => {
      const activeBalance = adjustInflation ? d.inflationAdjustedBalance : d.balance
      const x = paddingX + (idx / (details.length - 1)) * (chartWidth - paddingX * 2)
      const y = chartHeight - paddingY - (activeBalance / maxVal) * (chartHeight - paddingY * 2)
      const cy = chartHeight - paddingY - (d.contributions / maxVal) * (chartHeight - paddingY * 2)
      
      return { x, y, cy, ...d }
    })
  }, [results.yearlyDetails, adjustInflation, chartWidth, chartHeight])

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

  const depositAreaPath = useMemo(() => {
    if (chartPoints.length === 0) return ''
    let path = `M ${chartPoints[0].x} ${chartHeight - paddingY}`
    chartPoints.forEach(p => {
      path += ` L ${p.x} ${p.cy}`
    })
    path += ` L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - paddingY} Z`
    return path
  }, [chartPoints])

  const displayFutureValue = adjustInflation ? results.inflationAdjustedFutureValue : results.futureValue

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Inputs Form */}
      <div className="lg:col-span-5 space-y-8 bg-secondary-50 border border-secondary-200 rounded-3xl p-8 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-2">Calculator Inputs</h2>
          <p className="text-sm text-secondary-500">Fine-tune your compound growth parameters.</p>
        </div>

        {/* Initial Investment */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="initial-investment" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Initial Investment
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The initial sum of money you plan to invest.
                </span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
              <input
                id="initial-investment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-label="Initial Investment in Dollars"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Initial Investment Slider"
          />
        </div>

        {/* Monthly Contribution */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="monthly-contribution" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Monthly Contribution
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  How much you plan to add to the investment each month.
                </span>
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-550 font-bold text-sm">$</span>
              <input
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 pl-6 pr-2 py-1.5 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-label="Monthly Contribution in Dollars"
              />
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Monthly Contribution Slider"
          />
        </div>

        {/* Annual Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="annual-rate" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Annual Return Rate (%)
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  Your estimated annual rate of return (e.g. stock market average is ~8-10%).
                </span>
              </span>
            </label>
            <div className="relative">
              <input
                id="annual-rate"
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 px-3 py-1.5 rounded-xl text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-label="Annual rate of return percentage"
              />
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Annual Return Rate Slider"
          />
        </div>

        {/* Years to Grow */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label htmlFor="years" className="text-sm font-bold text-secondary-700 flex items-center gap-1.5">
              Years to Grow
              <span className="group relative">
                <HelpCircle className="h-4 w-4 text-secondary-400 cursor-pointer" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-secondary-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 font-medium">
                  The length of time in years that the investment will compound.
                </span>
              </span>
            </label>
            <div className="relative">
              <input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                className="w-32 bg-white border border-secondary-200 text-secondary-900 px-3 py-1.5 rounded-xl text-sm font-bold text-right focus:outline-none focus:ring-2 focus:ring-primary-600"
                aria-label="Years to Grow"
              />
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer accent-primary-600 focus:outline-none"
            aria-label="Years to Grow Slider"
          />
        </div>

        {/* Compounding Frequency */}
        <div className="space-y-3">
          <label htmlFor="compounding-frequency" className="text-sm font-bold text-secondary-700 block">
            Compounding Frequency
          </label>
          <div className="relative">
            <select
              id="compounding-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full bg-white border border-secondary-200 text-secondary-900 px-4 py-3 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="monthly">Monthly (12x / year)</option>
              <option value="quarterly">Quarterly (4x / year)</option>
              <option value="semi-annually">Semi-Annually (2x / year)</option>
              <option value="annually">Annually (1x / year)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-500 pointer-events-none" />
          </div>
        </div>

        {/* Inflation Adjustment */}
        <div className="pt-4 border-t border-secondary-200 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="inflation-toggle" className="text-sm font-bold text-secondary-750 flex items-center gap-2">
              Adjust for Inflation
            </label>
            <input
              id="inflation-toggle"
              type="checkbox"
              checked={adjustInflation}
              onChange={(e) => setAdjustInflation(e.target.checked)}
              className="w-5 h-5 accent-primary-600 cursor-pointer rounded"
              aria-label="Adjust calculation outputs for inflation toggle"
            />
          </div>

          {adjustInflation && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
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

      {/* Outputs Display */}
      <div className="lg:col-span-7 space-y-10">
        {/* Key Metrics */}
        <div className="bg-primary-900 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-primary-950/10">
          <div className="relative z-10">
            <span className="text-primary-200 text-xs font-black uppercase tracking-widest block mb-2">
              Estimated Future Value {adjustInflation ? '(Real Buying Power)' : '(Nominal)'}
            </span>
            <div className="text-4xl md:text-6xl font-black tracking-tight mb-8">
              {formatCurrency(displayFutureValue)}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Total Contributions</span>
                <span className="text-xl md:text-2xl font-black">{formatCurrency(results.totalContributed)}</span>
              </div>
              <div>
                <span className="text-primary-350 text-xs font-bold block mb-1">Estimated Interest Earned</span>
                <span className="text-xl md:text-2xl font-black text-primary-300">
                  {formatCurrency(Math.max(0, displayFutureValue - results.totalContributed))}
                </span>
              </div>
            </div>
          </div>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-650/40 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        </div>

        {/* Interactive Growth Chart */}
        <div className="space-y-4 bg-white border border-secondary-200 rounded-3xl p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-secondary-900 flex items-center gap-1.5">
              <TrendingUp className="h-5 w-5 text-primary-700" />
              Wealth Accumulation Growth Chart
            </h3>
            <span className="text-xs font-semibold text-secondary-400">Hover values to inspect</span>
          </div>

          <div className="relative w-full h-[220px]">
            {/* SVG custom graph */}
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-full overflow-visible"
              aria-label="Compound interest portfolio accumulation graph"
              role="img"
            >
              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1={paddingX} y1={(chartHeight - paddingY * 2) / 2 + paddingY} x2={chartWidth - paddingX} y2={(chartHeight - paddingY * 2) / 2 + paddingY} stroke="#e2e8f0" strokeDasharray="3,3" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Total Balance Area (includes interest) */}
              <path d={balanceAreaPath} fill="url(#balanceGrad)" opacity="0.15" />
              
              {/* Contributions Area */}
              <path d={depositAreaPath} fill="url(#depositGrad)" opacity="0.25" />

              {/* Line Paths */}
              <path d={balanceLinePath} fill="none" stroke="#1b5e20" strokeWidth="3" strokeLinecap="round" />
              <path d={chartPoints.map(p => `M ${p.x} ${p.cy} L ${p.x} ${p.cy}`).join(' ')} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="2,2" />

              {/* Gradients */}
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1b5e20" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="depositGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Hover interactions mapping */}
              {chartPoints.map((p, idx) => (
                <g key={idx}>
                  <rect
                    x={idx === 0 ? p.x : p.x - (chartWidth - paddingX * 2) / (chartPoints.length - 1) / 2}
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
                      {/* Vertical line indicator */}
                      <line x1={p.x} y1={paddingY} x2={p.x} y2={chartHeight - paddingY} stroke="#1b5e20" strokeWidth="1.5" strokeDasharray="3,3" />
                      {/* Highlight dots */}
                      <circle cx={p.x} cy={p.y} r="5" fill="#1b5e20" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={p.x} cy={p.cy} r="4" fill="#64748b" stroke="#ffffff" strokeWidth="1.5" />
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
                <p className="font-black border-b border-white/10 pb-1 flex justify-between gap-6">
                  <span>Year {chartPoints[hoveredIndex].year}</span>
                  <span className="text-primary-350">{adjustInflation ? 'Real Value' : 'Nominal'}</span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Balance:</span>
                  <span className="font-bold text-white">
                    {formatCurrency(adjustInflation ? chartPoints[hoveredIndex].inflationAdjustedBalance : chartPoints[hoveredIndex].balance)}
                  </span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Contributions:</span>
                  <span className="font-bold text-white">{formatCurrency(chartPoints[hoveredIndex].contributions)}</span>
                </p>
                <p className="flex justify-between gap-4 text-secondary-300">
                  <span>Total Interest:</span>
                  <span className="font-bold text-primary-300">{formatCurrency(chartPoints[hoveredIndex].interest)}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contributions Frequency Comparison (Monthly vs Yearly) */}
        <div className="bg-white border border-secondary-200 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-secondary-900 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary-700" />
            Compounding Impact: Monthly vs. Yearly Deposits
          </h3>
          <p className="text-xs text-secondary-500 leading-relaxed">
            Comparing saving <strong>{formatCurrency(monthlyContribution)}/month</strong> vs. depositing the full sum of <strong>{formatCurrency(monthlyContribution * 12)} once a year</strong> at the end of each year.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary-50/50 p-5 rounded-2xl border border-primary-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-primary-850 uppercase tracking-widest">Option A: Monthly Deposits</span>
                <span className="block text-2xl font-black text-secondary-900 mt-2">{formatCurrency(results.futureValue)}</span>
              </div>
              <p className="text-xs text-secondary-500 mt-3">Depositing monthly compounds interest 12x faster, maximizing portfolio yield.</p>
            </div>
            <div className="bg-secondary-50 p-5 rounded-2xl border border-secondary-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-secondary-500 uppercase tracking-widest">Option B: Annual Deposits</span>
                <span className="block text-2xl font-black text-secondary-900 mt-2">{formatCurrency(results.yearlyDepositFutureValue)}</span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-red-750">
                  Loss of {formatCurrency(Math.max(0, results.futureValue - results.yearlyDepositFutureValue))}
                </span>
                <p className="text-[10px] text-secondary-400 leading-tight mt-1">Due to money sitting idle rather than compounding monthly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions bar (Export and breakdown table) */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-600" />
            Amortization Projections
          </h3>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-secondary-900 hover:bg-secondary-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            aria-label="Export growth projection table as CSV file"
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
                <th className="py-3.5 px-6">Total Interest</th>
                <th className="py-3.5 px-6">{adjustInflation ? 'Nominal Bal.' : 'Total Balance'}</th>
                {adjustInflation && <th className="py-3.5 px-6">Real Buying Power</th>}
              </tr>
            </thead>
            <tbody>
              {results.yearlyDetails.map((detail) => (
                <tr key={detail.year} className="border-b border-secondary-100 hover:bg-secondary-50 transition-colors text-secondary-900">
                  <td className="py-3.5 px-6 font-bold">Year {detail.year}</td>
                  <td className="py-3.5 px-6 font-semibold">{formatCurrency(detail.contributions)}</td>
                  <td className="py-3.5 px-6 text-primary-750 font-semibold">+{formatCurrency(detail.interest)}</td>
                  <td className="py-3.5 px-6 font-bold text-secondary-800">{formatCurrency(detail.balance)}</td>
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
            Related Guides & Strategies
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
