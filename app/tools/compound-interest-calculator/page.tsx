import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CompoundInterestClient from './CompoundInterestClient'
import { BreadcrumbSchema, WebPageSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { SITE_URL } from '@/lib/site'
import { ArrowLeft, Landmark, Percent, BookOpen } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Grow Your Wealth | SmartMoneyPath',
  description: 'Calculate the future value of your savings with compound interest. Adjust initial investment, monthly additions, rate, and frequency.',
  alternates: {
    canonical: `${SITE_URL}/tools/compound-interest-calculator`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/tools/compound-interest-calculator`,
    title: 'Compound Interest Calculator | SmartMoneyPath',
    description: 'Calculate the compounding growth of your investments with regular monthly deposits and customized compounding frequencies.',
    images: [{ url: `${SITE_URL}/og-image.svg`, width: 1200, height: 630, alt: 'Compound Interest Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | SmartMoneyPath',
    description: 'Calculate the compounding growth of your investments with regular monthly deposits and customized compounding frequencies.',
    images: [`${SITE_URL}/og-image.svg`],
  }
}

const faqsData = [
  {
    question: 'What is compound interest?',
    answer: 'Compound interest is the interest you earn on interest. It is calculated on the initial principal amount plus all the accumulated interest from previous periods, allowing your savings or investment balance to grow at an accelerating rate over time.'
  },
  {
    question: 'How does compounding frequency affect my returns?',
    answer: 'The more frequently interest is compounded, the higher your future value will be. For instance, monthly compounding generates slightly higher returns than quarterly compounding, which in turn beats annual compounding, because your interest starts earning interest sooner.'
  },
  {
    question: 'What is the difference between simple and compound interest?',
    answer: 'Simple interest is calculated solely on the principal (original) investment amount. Compound interest calculations include both the principal and any previously accumulated interest. Over long time horizons, compound interest dwarfs simple interest.'
  },
  {
    question: 'How do regular contributions impact the growth?',
    answer: 'Regular contributions (like saving $200 every month) dramatically accelerate your wealth-building path. Not only do you add capital directly, but each contribution begins compounding immediately, adding a continuous stream of interest earnings.'
  }
]

export default function CompoundInterestPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Compound Interest Calculator', url: `${SITE_URL}/tools/compound-interest-calculator` },
  ]

  const pageUrl = `${SITE_URL}/tools/compound-interest-calculator`

  return (
    <main className="min-h-screen bg-white">
      {/* Schemas */}
      <WebPageSchema
        name="Compound Interest Calculator"
        description="Premium interactive compound interest calculator with initial investment, monthly additions, rate, and frequency."
        url={pageUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema questions={faqsData} />

      <Navbar />

      {/* Header and Back Link */}
      <section className="pt-32 pb-10 bg-secondary-50 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-secondary-500 hover:text-primary-750 transition-colors mb-6 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Tools
          </Link>
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <Percent className="h-5 w-5 text-primary-700" />
            </div>
            <span className="text-xs font-bold text-primary-800 bg-primary-100/50 px-3 py-1 rounded-full uppercase tracking-wider">
              Investment Tools
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight mb-4">
            Compound Interest Calculator
          </h1>
          <p className="text-lg text-secondary-655 max-w-3xl leading-relaxed">
            Project your portfolio value over time using various interest compounding frequencies (monthly, quarterly, semi-annually, annually) and regular monthly deposits.
          </p>
        </div>
      </section>

      {/* Calculator Body */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompoundInterestClient />
        </div>
      </section>

      {/* Educational Content & Calculations Details */}
      <section className="py-20 bg-secondary-50 border-y border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-secondary-900 mb-8 tracking-tight">
            How Compound Interest is Calculated
          </h2>
          <div className="prose prose-secondary max-w-none space-y-8 text-secondary-700 leading-relaxed">
            <p>
              Compound interest occurs when interest is added to the principal of an investment, so that from that moment on, the interest that has been added also earns interest. This addition of interest is known as <strong>compounding</strong>.
            </p>

            <h3 className="text-xl font-bold text-secondary-900 mt-8">The Compounding Formula</h3>
            <p>
              The basic formula for compounding interest over a set period is:
            </p>
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 text-center font-mono text-lg text-secondary-900 my-4">
              A = P (1 + r / n)^(nt)
            </div>
            <p className="text-sm text-secondary-550 pl-4 border-l-2 border-primary-500">
              Where:<br />
              <strong>A</strong> = the future value of the investment, including interest<br />
              <strong>P</strong> = the initial principal investment amount<br />
              <strong>r</strong> = the annual interest rate (decimal)<br />
              <strong>n</strong> = the compounding frequency per year (e.g. 12 for monthly)<br />
              <strong>t</strong> = the number of years the money is invested for
            </p>

            <h3 className="text-xl font-bold text-secondary-900 mt-8">Adding Regular Contributions</h3>
            <p>
              When you add monthly contributions (deposits), we also calculate the future value of an ordinary annuity (the regular monthly additions):
            </p>
            <div className="bg-white p-6 rounded-2xl border border-secondary-200 text-center font-mono text-lg text-secondary-900 my-4">
              A_annuity = PMT * [((1 + r / n)^(nt) - 1) / (r / n)]
            </div>
            <p>
              This formula assumes contributions are added at the end of each period. Our calculator adds deposits monthly and computes interest dynamically according to your chosen frequency, mirroring real-world bank and brokerage practices.
            </p>

            <div className="h-px bg-secondary-200 my-8"></div>

            <h3 className="text-2xl font-black text-secondary-900 mb-4 tracking-tight">
              Worked Example
            </h3>
            <p>
              Let's walk through a concrete example. Suppose you start with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Initial Principal (P)</strong>: $10,000</li>
              <li><strong>Monthly Addition (PMT)</strong>: $200</li>
              <li><strong>Annual Interest Rate (r)</strong>: 8% (0.08)</li>
              <li><strong>Growth Duration (t)</strong>: 5 Years</li>
              <li><strong>Compounding Frequency (n)</strong>: Monthly (12 times a year)</li>
            </ul>

            <p className="font-bold text-secondary-900 mt-6">Step 1: Future Value of the Initial $10,000</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              A_initial = 10,000 * (1 + 0.08 / 12)^(12 * 5)<br />
              A_initial = 10,000 * (1.006667)^60<br />
              A_initial = $14,898.46
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 2: Future Value of the $200 Monthly Additions</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              A_annuity = 200 * [((1 + 0.08 / 12)^60 - 1) / (0.08 / 12)]<br />
              A_annuity = 200 * [(1.489846 - 1) / 0.006667]<br />
              A_annuity = 200 * 73.476856<br />
              A_annuity = $14,695.37
            </p>

            <p className="font-bold text-secondary-900 mt-6">Step 3: Total Portfolio Future Value</p>
            <p className="font-mono bg-white p-4 rounded-xl border border-secondary-100 text-sm">
              Total Future Value = A_initial + A_annuity<br />
              Total Future Value = 14,898.46 + 14,695.37 = $29,593.83
            </p>
            <p>
              In this scenario, you deposited a total of <strong>$22,000</strong> ($10,000 initially + $200/month for 5 years) and earned <strong>$7,593.83</strong> in interest, yielding a total balance of <strong>$29,593.83</strong>.
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
