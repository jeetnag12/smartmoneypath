import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoanEmiClient from './LoanEmiClient'
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { SITE_URL } from '@/lib/site'
import { ArrowLeft, Coins, Calculator } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Loan EMI Calculator | Calculate Monthly Repayments | SmartMoneyPath',
  description: 'Calculate your Equated Monthly Installment (EMI), total interest, and complete amortization schedule for home, auto, or personal loans.',
  alternates: {
    canonical: `${SITE_URL}/tools/loan-emi-calculator`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/tools/loan-emi-calculator`,
    title: 'Loan EMI Calculator | SmartMoneyPath',
    description: 'Calculate your Equated Monthly Installment (EMI), total interest payable, and overall loan repayment schedule.',
    images: [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: 'Loan EMI Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan EMI Calculator | SmartMoneyPath',
    description: 'Calculate your Equated Monthly Installment (EMI), total interest payable, and overall loan repayment schedule.',
    images: [`${SITE_URL}/og-image.svg`],
  }
}

const faqsData = [
  {
    question: 'What is a Loan EMI?',
    answer: 'EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs consist of both principal and interest components, designed to retire the loan fully over a set number of years.'
  },
  {
    question: 'How is Loan EMI calculated?',
    answer: 'EMI is calculated using a standard formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1), where P is the principal amount, r is the monthly interest rate, and n is the total number of monthly payments.'
  },
  {
    question: 'What is an amortization schedule?',
    answer: 'An amortization schedule is a complete table showing the breakdown of each monthly payment, indicating how much goes toward interest, how much goes toward reducing the principal balance, and the remaining loan balance after each payment.'
  },
  {
    question: 'Can I pay off my loan early to save on interest?',
    answer: 'In most cases, yes. By making extra principal payments or prepaying the loan entirely, you reduce the outstanding principal balance. Since interest is calculated on the remaining balance, this can lead to substantial interest savings and shorten the loan term.'
  }
]

export default function LoanEmiPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Loan EMI Calculator', url: `${SITE_URL}/tools/loan-emi-calculator` },
  ]

  const pageUrl = `${SITE_URL}/tools/loan-emi-calculator`

  return (
    <main className="min-h-screen bg-white">
      {/* Schemas */}
      <WebPageSchema
        name="Loan EMI Calculator"
        description="Premium interactive loan EMI calculator to determine monthly repayments, interest, and total repayment schedules."
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
              <Coins className="h-5 w-5 text-primary-700" />
            </div>
            <span className="text-xs font-bold text-primary-800 bg-primary-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Loan & Debt Tools
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-4">
            Loan EMI Calculator
          </h1>
          <p className="text-lg text-secondary-655 max-w-3xl leading-relaxed">
            Estimate your monthly payments (EMI), visualize the ratio of principal to interest cost, and review your complete amortization schedule.
          </p>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoanEmiClient />
        </div>
      </section>

      {/* Educational section */}
      <section className="py-20 bg-secondary-50 border-y border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-secondary-900 mb-8 tracking-tight">
            Understanding the EMI Calculation Formula
          </h2>
          <div className="prose prose-secondary max-w-none space-y-8 text-secondary-700 leading-relaxed">
            <p>
              An Equated Monthly Installment (EMI) is a fixed payment amount that you make to a lender each month to pay off both the loan principal and interest accrued.
            </p>

            <h3 className="text-xl font-bold text-secondary-900 mt-8">The EMI Formula</h3>
            <p>
              The standard mathematical formula used to calculate EMI is:
            </p>
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 text-center font-mono text-lg text-secondary-900 my-4">
              EMI = P * r * (1 + r)^n / [(1 + r)^n - 1]
            </div>
            <p className="text-sm text-secondary-550 pl-4 border-l-2 border-primary-500">
              Where:<br />
              <strong>P</strong> = the loan principal amount (the amount borrowed)<br />
              <strong>r</strong> = the monthly interest rate (annual interest rate / 12 / 100)<br />
              <strong>n</strong> = the total number of monthly payments (years * 12)
            </p>

            <div className="h-px bg-secondary-200 my-8"></div>

            <h3 className="text-2xl font-black text-secondary-900 mb-4 tracking-tight">
              Worked Example
            </h3>
            <p>
              Let's walk through a concrete example. Suppose you take out a loan with the following terms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Loan Principal (P)</strong>: $300,000</li>
              <li><strong>Annual Interest Rate</strong>: 6.5%</li>
              <li><strong>Loan Term</strong>: 30 Years</li>
            </ul>

            <p className="font-bold text-secondary-900 mt-6">Step 1: Calculate the monthly interest rate (r) and term in months (n)</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              r = 6.5% / 12 / 100 = 0.0054167 (monthly rate as decimal)<br />
              n = 30 * 12 = 360 months
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 2: Calculate the EMI</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              EMI = 300,000 * 0.0054167 * (1 + 0.0054167)^360 / [(1 + 0.0054167)^360 - 1]<br />
              EMI = 300,000 * 0.0054167 * 7.001614 / [7.001614 - 1]<br />
              EMI = 11,377.62 / 6.001614<br />
              EMI = $1,896.20 per month
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 3: Calculate the Total Repayment and Interest</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              Total Repayment = EMI * n = $1,896.20 * 360 = $682,632.00<br />
              Total Interest Payable = Total Repayment - Principal = $682,632.00 - $300,000 = $382,632.00
            </p>
            <p>
              Over the course of 30 years, a <strong>$300,000</strong> loan at 6.5% interest results in monthly installments of <strong>$1,896.20</strong>. You will pay a total of <strong>$682,632.00</strong> over the life of the loan, of which <strong>$382,632.00</strong> is interest cost.
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
                <h3 className="text-lg font-bold text-secondary-950 mb-3">{faq.question}</h3>
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
