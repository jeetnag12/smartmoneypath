import Link from 'next/link'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site'
import { BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLdSchemas'
import { ShieldCheck, UserCheck, Scale, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Editorial Policy | SmartMoneyPath Standards',
  description: 'Our commitment to editorial integrity, independence, and accurate financial reporting. Learn how we research and fact-check our content.',
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
  openGraph: {
    title: 'Editorial Policy | SmartMoneyPath Standards',
    description: 'Learn about our rigorous fact-checking process, editorial independence, and commitment to accuracy.',
    url: `${SITE_URL}/editorial-policy`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

const policies = [
  { icon: ShieldCheck, title: "Editorial Independence", text: "Advertisers and business partners have zero influence over our research, rankings, or reviews." },
  { icon: UserCheck, title: "Expert Vetting", text: "Every article is written or reviewed by a human expert with relevant financial credentials." },
  { icon: Scale, title: "Unbiased Math", text: "We prioritize objective models and calculations over subjective opinions or marketing hype." },
  { icon: FileText, title: "Primary Sourcing", text: "We derive information directly from government agencies, regulators, and legal disclosures." },
]

export default function EditorialPolicyPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Editorial Policy', url: `${SITE_URL}/editorial-policy` },
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
              <ShieldCheck className="h-4 w-4" />
              <span>Integrity First</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Editorial <span className="text-primary-500">Policy</span>
            </h1>
            <p className="text-xl text-secondary-300 leading-relaxed">
              Integrity, Independence, and Accuracy are the cornerstones of SmartMoneyPath. Learn how we maintain the highest standards in financial education.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Policy Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policies.map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-secondary-50 border border-secondary-100 hover:bg-white hover:shadow-2xl hover:shadow-secondary-900/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-secondary-100">
                  <item.icon className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="text-lg font-black text-secondary-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-sm text-secondary-600 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-secondary-100">
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-headings:font-black prose-headings:tracking-tight prose-p:text-secondary-700 prose-p:font-medium prose-p:leading-relaxed prose-a:text-primary-700 prose-a:font-bold hover:prose-a:underline">

              <h2 className="text-3xl mb-8">1. Our Editorial Mission</h2>
              <p>
                SmartMoneyPath was founded with a singular purpose: to provide clear, actionable, and meticulously researched financial education for the modern American household. In an era where "financial advice" is often delivered in 30-second soundbites or through biased marketing channels, we aim to be a beacon of clarity and depth.
              </p>
              <p>
                Our mission is to empower readers to make informed decisions about their money by breaking down complex concepts into understandable, data-driven guides. Every guide we publish is built on a foundation of primary sources, transparent calculations, and a clear statement of limitations.
              </p>

              <h2 className="text-3xl mt-16 mb-8">2. Independence from Advertisers</h2>
              <p>
                Editorial independence is the cornerstone of our trust with you. Our editorial team has full autonomy over the topics we cover, the products we review, and the conclusions we draw. We maintain a strict and impenetrable "firewall" between our editorial staff and our business development teams.
              </p>
              <p>
                Business partners, advertisers, and affiliate networks have zero influence over our content. They do not see articles before they are published, nor can they dictate the direction or "verdict" of our reporting. We do not accept "pay-to-play" arrangements where a company can pay for a positive review.
              </p>

              <h2 className="text-3xl mt-16 mb-8">3. Research & Fact-Checking</h2>
              <p>
                A single misplaced decimal point or an outdated tax limit can lead to significant real-world consequences. Our multi-stage research process ensures that every claim we make is supported by verifiable evidence:
              </p>
              <ul>
                <li><strong>Initial Research:</strong> Consulting the most recent federal regulations and economic white papers.</li>
                <li><strong>Math-First Approach:</strong> Every calculation is performed independently by the writer and then verified by an editor.</li>
                <li><strong>Technical Fact-Checking:</strong> A dedicated pass to verify every date, percentage, and dollar limit against current official government sources.</li>
              </ul>
            </div>

            <div className="mt-20 p-10 bg-primary-50 rounded-[2rem] border border-primary-100 flex flex-col md:flex-row items-center gap-8">
               <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center shrink-0">
                 <ShieldCheck className="h-10 w-10 text-primary-700" />
               </div>
               <div>
                 <h4 className="text-xl font-black text-primary-900 mb-2 tracking-tight leading-tight">Committed to Accuracy</h4>
                 <p className="text-primary-800 text-sm font-medium opacity-80 mb-0">If you believe we have made a factual error, please reach out. We investigate every correction request within 48 business hours.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
