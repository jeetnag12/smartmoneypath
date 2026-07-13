import Link from 'next/link'
import { Metadata } from 'next'
import { BookOpen, Calculator, ExternalLink, ShieldCheck, Target, Heart, Award, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

export const metadata: Metadata = {
  title: 'About SmartMoneyPath | Our Mission and Editorial Standards',
  description: 'Learn about SmartMoneyPath, our data-driven approach to personal finance education, and our commitment to transparency and accuracy.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About SmartMoneyPath | Financial Education for Americans',
    description: 'We help you navigate the complex world of personal finance with transparent calculations and primary source research.',
    url: `${SITE_URL}/about`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

const standards = [
  {
    icon: ExternalLink,
    title: 'Primary Sources First',
    text: 'We derive our data directly from official agencies including the CFPB, SEC, FDIC, IRS, and the Federal Reserve. We don\'t rely on hearsay.',
  },
  {
    icon: Calculator,
    title: 'Transparent Math',
    text: 'Every recommendation is backed by a model. we show you the formulas and the assumptions so you can verify the results for yourself.',
  },
  {
    icon: ShieldCheck,
    title: 'Independent Integrity',
    text: 'Our editorial team operates behind a strict firewall. Business partnerships never influence our rankings or reviews.',
  },
  {
    icon: BookOpen,
    title: 'Education, Not Advice',
    text: 'We empower you with knowledge. Our content explains the trade-offs of financial decisions without telling you what to do.',
  },
]

export default function AboutPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'About', url: `${SITE_URL}/about` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              A Financial Library Built for Clarity
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              SmartMoneyPath is an independent educational resource dedicated to helping Americans navigate the most important decisions of their financial lives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Mission</h2>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                Most financial advice is either too complex for the average person or too biased by marketing commissions. We founded SmartMoneyPath to bridge that gap.
              </p>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Our mission is to provide every US household with access to professional-grade financial research, presented in a clear, understandable, and 100% objective format. We believe that when you understand the math, you own your future.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Focused</h3>
                    <p className="text-sm text-secondary-500">One deep-dive guide per topic.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900">Empathetic</h3>
                    <p className="text-sm text-secondary-500">We understand the real-world stakes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Why SmartMoneyPath?</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <Award className="h-6 w-6 text-primary-400 flex-shrink-0" />
                    <p className="text-secondary-200"><strong>Data-Driven:</strong> Every guide starts in a spreadsheet, not a marketing meeting.</p>
                  </li>
                  <li className="flex gap-4">
                    <Users className="h-6 w-6 text-primary-400 flex-shrink-0" />
                    <p className="text-secondary-200"><strong>Human Verified:</strong> No AI-generated advice. Every word is written and edited by experts.</p>
                  </li>
                  <li className="flex gap-4">
                    <ShieldCheck className="h-6 w-6 text-primary-400 flex-shrink-0" />
                    <p className="text-secondary-200"><strong>Always Free:</strong> Our revenue comes from transparent partnerships, never our readers.</p>
                  </li>
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards Grid */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Professional Standards</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">We adhere to the same rigorous standards as the world\'s leading financial institutions and publishers.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {standards.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-secondary-100 hover:shadow-md transition-shadow">
                <Icon className="h-10 w-10 text-primary-600 mb-6" />
                <h3 className="text-xl font-bold text-secondary-900 mb-4">{title}</h3>
                <p className="text-secondary-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Pages Links */}
      <section className="py-20 border-t border-secondary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Our Commitment to Transparency</h2>
            <p className="text-secondary-700 mb-8 leading-relaxed">
              We believe trust is earned through transparency. We invite you to inspect our internal policies and review the standards we use to produce our content.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/editorial-policy" className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary-100 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-secondary-900">Editorial Policy</span>
                <ExternalLink className="h-4 w-4 text-primary-600" />
              </Link>
              <Link href="/methodology" className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary-100 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-secondary-900">Research Methodology</span>
                <ExternalLink className="h-4 w-4 text-primary-600" />
              </Link>
              <Link href="/how-we-make-money" className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary-100 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-secondary-900">How We Make Money</span>
                <ExternalLink className="h-4 w-4 text-primary-600" />
              </Link>
              <Link href="/authors" className="flex items-center justify-between p-4 bg-white rounded-xl border border-primary-100 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-secondary-900">Meet the Team</span>
                <ExternalLink className="h-4 w-4 text-primary-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Have a Question or Correction?</h2>
          <p className="text-lg text-secondary-600 mb-10">
            Rules, limits, and programs change. If you spot an error or a broken source, or if you have a question about our research, please reach out.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
          >
            Contact the Editorial Team
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
