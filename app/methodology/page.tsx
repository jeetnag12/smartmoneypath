import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { CheckCircle, Search, BarChart3, ShieldCheck, Database, RefreshCw, Zap, Scale, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Research Methodology | SmartMoneyPath Standards',
  description: 'A detailed look into our 16-step research and evaluation process. We use objective data and primary sources to build every financial guide.',
  alternates: {
    canonical: `${SITE_URL}/methodology`,
  },
  openGraph: {
    title: 'How We Review Financial Products | SmartMoneyPath Methodology',
    description: 'Our data-driven research process ensures accuracy, objectivity, and transparency in financial education.',
    url: `${SITE_URL}/methodology`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

const methodologyPoints = [
  { icon: Search, title: "Primary Verification", text: "We verify interest rates and terms directly from official legal disclosures, not press releases." },
  { icon: BarChart3, title: "Weighted Scoring", text: "Products are rated using consistent, math-driven formulas that eliminate human bias." },
  { icon: Database, title: "Authoritative Data", text: "We source regulatory data from FRED, the SEC, the CFPB, and the Federal Reserve." },
  { icon: ShieldCheck, title: "Safety First", text: "Every banking product we list is manually verified for federal deposit insurance coverage." },
  { icon: RefreshCw, title: "Trigger-Based Updates", text: "We perform weekly checks on rates and quarterly full audits of all evergreen content." },
  { icon: CheckCircle, title: "Human Review", text: "No AI-generated research. Every guide is drafted and fact-checked by human experts." },
]

export default function MethodologyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Methodology', url: `${SITE_URL}/methodology` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-secondary-900 pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-600/30 mb-8">
              <Scale className="h-4 w-4" />
              <span>Rigorous Objectivity</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Our Research <span className="text-primary-500">Methodology</span>
            </h1>
            <p className="text-xl text-secondary-300 leading-relaxed">
              Discover how SmartMoneyPath researches, evaluates, and verifies financial information to help you find the most reliable path for your money.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Key Principles Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-black text-secondary-900 mb-6 tracking-tight leading-tight">Our Core Research Pillars</h2>
              <p className="text-secondary-600 mb-8 leading-relaxed">
                We believe that financial clarity is impossible without a standardized, replicable process. Our methodology is built on three unbreakable pillars:
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                  <h3 className="font-black text-primary-900 mb-2">Math-First</h3>
                  <p className="text-sm text-primary-800 opacity-80 font-medium text-secondary-600">We build the model before we write the guide.</p>
                </div>
                <div className="p-6 bg-secondary-50 rounded-2xl border border-secondary-100">
                  <h3 className="font-black text-secondary-900 mb-2">Zero Hype</h3>
                  <p className="text-sm text-secondary-600 font-medium">No speculative assets or unproven financial trends.</p>
                </div>
                <div className="p-6 bg-secondary-50 rounded-2xl border border-secondary-100">
                  <h3 className="font-black text-secondary-900 mb-2">Primary Access</h3>
                  <p className="text-sm text-secondary-600 font-medium">We only use data from the source of authority.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {methodologyPoints.map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-secondary-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 bg-secondary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                    <item.icon className="h-7 w-7 text-primary-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-black text-secondary-900 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-secondary-600 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Detailed Content */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-secondary-100">
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-headings:font-black prose-headings:tracking-tight prose-p:text-secondary-700 prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary-700 prose-a:font-bold hover:prose-a:underline">
              <h2 className="text-3xl mb-8">1. Our Research Philosophy</h2>
              <p>
                At SmartMoneyPath, we approach personal finance with the rigor of a research institution and the empathy of a neighbor. Our philosophy is rooted in <strong>objectivity</strong>. We understand that behind every data point—an interest rate, a fee, or a tax limit—is a real person making a decision that impacts their future.
              </p>
              <p>
                We adhere to a "math-first" methodology. This means that before we write a single word of advice, we build a model. Whether we are comparing the long-term cost of a car loan or the compounding effect of a high-yield savings account, we start with the spreadsheets. By focusing on the numbers, we can filter out the marketing "noise" and focus on the "signal"—the actual value for the consumer.
              </p>

              <h2 className="text-3xl mt-16 mb-8">2. The 5-Step Evaluation Process</h2>
              <p>Every product or guide that appears on our site undergoes a multi-step evaluation process that takes between 10 and 40 hours of primary research:</p>
              <ol className="space-y-4">
                <li><strong>Market Scan:</strong> We identify products through consumer feedback, regulatory filings, and industry monitoring.</li>
                <li><strong>Data Collection:</strong> We extract raw data from the provider's official "Terms and Conditions" and "Truth in Savings" disclosures.</li>
                <li><strong>Verification:</strong> We cross-reference data against third-party databases and reach out to institutions to clarify ambiguous language.</li>
                <li><strong>Scoring:</strong> Data points are fed into our category-specific scoring models.</li>
                <li><strong>Editorial Analysis:</strong> A senior editor reviews the findings to ensure they provide a complete picture of risk and reward.</li>
              </ol>

              <h2 className="text-3xl mt-16 mb-8">3. Data Sources We Trust</h2>
              <p>We do not rely on "top 10" lists from other websites or unsourced "expert" claims. Our data comes from high-authority, primary sources:</p>
              <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
                <li className="bg-secondary-50 p-4 rounded-xl border border-secondary-100 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span className="font-bold text-sm">The Federal Reserve (FRED)</span>
                </li>
                <li className="bg-secondary-50 p-4 rounded-xl border border-secondary-100 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span className="font-bold text-sm">IRS.gov</span>
                </li>
                <li className="bg-secondary-50 p-4 rounded-xl border border-secondary-100 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span className="font-bold text-sm">CFPB.gov</span>
                </li>
                <li className="bg-secondary-50 p-4 rounded-xl border border-secondary-100 flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span className="font-bold text-sm">SEC.gov (EDGAR)</span>
                </li>
              </ul>
            </div>

            <div className="mt-20 pt-12 border-t border-secondary-100 text-center">
              <h2 className="text-2xl font-black text-secondary-900 mb-6 tracking-tight">Have questions about our math?</h2>
              <p className="text-secondary-600 mb-10 max-w-lg mx-auto font-medium">If you spot a discrepancy or have a question about a calculation in our guides, please contact our research team.</p>
              <Link
                href="/contact"
                className="inline-block bg-primary-700 text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-800 transition-all shadow-xl shadow-primary-700/20"
              >
                Contact Research Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
