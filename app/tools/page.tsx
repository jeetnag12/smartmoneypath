import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToolsHubClient from './ToolsHubClient'
import { BreadcrumbSchema, WebPageSchema } from '@/components/seo/JsonLdSchemas'
import { SITE_URL } from '@/lib/site'
import { Hammer } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Financial Calculators & Tools | SmartMoneyPath',
  description: 'Premium, interactive financial tools to help you make smarter money decisions. Calculate compound interest, loan EMIs, savings goals, and more.',
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
}

export default function ToolsHubPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
  ]

  const pageUrl = `${SITE_URL}/tools`

  return (
    <main className="min-h-screen bg-white">
      {/* SEO Structured Data */}
      <WebPageSchema
        name="SmartMoneyPath Financial Tools Hub"
        description="Premium, interactive financial tools and calculators for compound interest, savings goals, and loan repayments."
        url={pageUrl}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-secondary-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-primary-900/40 border border-primary-500/20 text-primary-350 text-xs font-bold uppercase tracking-widest mb-6">
            <Hammer className="h-3.5 w-3.5" /> SmartMoneyPath Toolbox
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Interactive Financial <span className="text-primary-400">Calculators</span>
          </h1>
          <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed">
            Run standard calculations, visualize savings projections, and optimize your path to wealth. Vetted by our team of financial professionals.
          </p>
        </div>

        {/* Background visual cues */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-800/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-900/20 rounded-full blur-[140px] pointer-events-none translate-y-1/2"></div>
      </section>

      {/* Tools Content Listing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ToolsHubClient />
        </div>
      </section>

      <Footer />
    </main>
  )
}
