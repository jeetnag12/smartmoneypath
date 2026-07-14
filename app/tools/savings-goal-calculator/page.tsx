import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SavingsGoalClient from './SavingsGoalClient'
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { SITE_URL } from '@/lib/site'
import { ArrowLeft, PiggyBank } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator | Timeline & APY Estimator | SmartMoneyPath',
  description: 'Find out how long it will take to reach your savings target. Enter your goal amount, current savings, monthly deposits, and interest rates.',
  alternates: {
    canonical: `${SITE_URL}/tools/savings-goal-calculator`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/tools/savings-goal-calculator`,
    title: 'Savings Goal Calculator | SmartMoneyPath',
    description: 'Find out exactly how many months it will take to hit your savings milestone, and visualize your progress along the way.',
    images: [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: 'Savings Goal Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator | SmartMoneyPath',
    description: 'Find out exactly how many months it will take to hit your savings milestone, and visualize your progress along the way.',
    images: [`${SITE_URL}/og-image.svg`],
  }
}

const faqsData = [
  {
    question: 'How does the Savings Goal Calculator calculate months required?',
    answer: 'The calculator uses the compound interest future value equation solved for the number of periods (months). By inputting your current balance, monthly additions, and interest rate, it calculates the log ratio of your target accumulation over your current value.'
  },
  {
    question: 'How does APY compound in a savings account?',
    answer: 'APY (Annual Percentage Yield) represents the real rate of return earned on a savings account in one year, taking into account compounding. Most high-yield savings accounts calculate interest daily and compound it into your balance monthly.'
  },
  {
    question: 'What is a High-Yield Savings Account (HYSA)?',
    answer: 'A high-yield savings account is a savings account that offers an interest rate significantly higher than the national average (often 10x to 12x higher). It is an excellent place to store short-term goals or an emergency fund because it preserves capital while earning interest.'
  },
  {
    question: 'How do monthly deposits affect my savings timeline?',
    answer: 'Increasing your monthly deposit is the fastest way to shorten your timeline. Not only does the deposit add principal directly, but it starts compounding immediately, allowing you to reach your savings target faster.'
  }
]

export default function SavingsGoalPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Savings Goal Calculator', url: `${SITE_URL}/tools/savings-goal-calculator` },
  ]

  const pageUrl = `${SITE_URL}/tools/savings-goal-calculator`

  return (
    <main className="min-h-screen bg-white">
      {/* Schemas */}
      <WebPageSchema
        name="Savings Goal Calculator"
        description="Premium interactive savings goal calculator to determine timeline, monthly deposits, and interest returns."
        url={pageUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema questions={faqsData} />

      <Navbar />

      {/* Header section */}
      <section className="pt-32 pb-10 bg-secondary-50 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-secondary-500 hover:text-primary-750 transition-colors mb-6 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <PiggyBank className="h-5 w-5 text-primary-700" />
            </div>
            <span className="text-xs font-bold text-primary-800 bg-primary-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Saving Tools
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-4">
            Savings Goal Calculator
          </h1>
          <p className="text-lg text-secondary-655 max-w-3xl leading-relaxed">
            Specify a target goal, list your starting balance and monthly additions, and discover exactly how many months it will take to hit your savings milestone.
          </p>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SavingsGoalClient />
        </div>
      </section>

      {/* Educational section */}
      <section className="py-20 bg-secondary-50 border-y border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-secondary-900 mb-8 tracking-tight">
            How Your Savings Timeline is Calculated
          </h2>
          <div className="prose prose-secondary max-w-none space-y-8 text-secondary-700 leading-relaxed">
            <p>
              To determine how long it takes to reach a target savings amount, we solve the standard compounding interest future value equation for the number of months.
            </p>

            <h3 className="text-xl font-bold text-secondary-900 mt-8">The Timeline Formula</h3>
            <p>
              If your account earns interest compounding monthly, the time required <strong>n</strong> (in months) is solved using natural logarithms:
            </p>
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 text-center font-mono text-lg text-secondary-900 my-4">
              n = ln[ (A + PMT / r) / (P + PMT / r) ] / ln(1 + r)
            </div>
            <p className="text-sm text-secondary-550 pl-4 border-l-2 border-primary-500">
              Where:<br />
              <strong>A</strong> = target savings goal amount<br />
              <strong>P</strong> = starting balance (current savings)<br />
              <strong>PMT</strong> = monthly deposit amount<br />
              <strong>r</strong> = monthly interest rate (annual interest rate / 12 / 100)<br />
              <strong>ln</strong> = natural logarithm
            </p>

            <p>
              If the interest rate is 0%, the equation simplifies to a basic linear relationship:
            </p>
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 text-center font-mono text-lg text-secondary-900 my-4">
              n = (A - P) / PMT
            </div>

            <div className="h-px bg-secondary-200 my-8"></div>

            <h3 className="text-2xl font-black text-secondary-900 mb-4 tracking-tight">
              Worked Example
            </h3>
            <p>
              Let's walk through an example. Suppose you set the following goals:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Target Goal (A)</strong>: $20,000</li>
              <li><strong>Starting Balance (P)</strong>: $5,000</li>
              <li><strong>Monthly Deposit (PMT)</strong>: $500</li>
              <li><strong>Annual APY</strong>: 4.5%</li>
            </ul>

            <p className="font-bold text-secondary-900 mt-6">Step 1: Calculate the monthly interest rate (r)</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              r = 4.5% / 12 / 100 = 0.00375 (monthly rate as decimal)
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 2: Calculate PMT / r</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              PMT / r = 500 / 0.00375 = $133,333.33
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 3: Solve for n (Months Required)</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              n = ln[ (20,000 + 133,333.33) / (5,000 + 133,333.33) ] / ln(1 + 0.00375)<br />
              n = ln[ 153,333.33 / 138,333.33 ] / ln(1.00375)<br />
              n = ln(1.108434) / ln(1.00375)<br />
              n = 0.102948 / 0.003743 = 27.5 Months
            </p>
            <p>
              By rounding up, it will take you approximately <strong>28 months</strong> (about 2 years and 4 months) to save $20,000. During this period, you will have deposited <strong>$14,000</strong> on top of your initial $5,000, and earned <strong>$1,000</strong> in compound interest.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-secondary-900 mb-12 tracking-tight text-center">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-8">
            {faqsData.map((faq, i) => (
              <div key={i} className="p-8 bg-secondary-50 border border-secondary-150 rounded-3xl">
                <h3 className="text-lg font-bold text-secondary-955 mb-3">{faq.question}</h3>
                <p className="text-secondary-600 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
