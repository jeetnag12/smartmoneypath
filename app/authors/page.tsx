import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'
import { Mail, ShieldCheck, GraduationCap, Award, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Authors & Editorial Team | SmartMoneyPath',
  description: 'Meet the experts behind SmartMoneyPath. Our editorial team has decades of experience in personal finance, banking, and financial education.',
  alternates: {
    canonical: `${SITE_URL}/authors`,
  },
}

const authors = [
  {
    name: 'Sarah Chen',
    role: 'Senior Financial Educator',
    bio: 'Sarah has over 10 years of experience helping families achieve financial independence. She specializes in debt payoff strategies and early-stage wealth building. Her work has been featured in major financial publications.',
    qualifications: ['Certified Financial Planner (CFP)', 'M.S. in Personal Financial Planning'],
    contact: 'sarah@smartmoneypath.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    name: 'Michael Ross',
    role: 'Investment Strategy Lead',
    bio: 'Michael is a former investment banker turned educator. He is passionate about making complex investing concepts accessible to everyone through data-driven research and transparent calculations.',
    qualifications: ['Chartered Financial Analyst (CFA)', 'MBA in Finance'],
    contact: 'michael@smartmoneypath.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    name: 'Emma Wilson',
    role: 'Personal Finance Analyst',
    bio: 'Emma specializes in budgeting frameworks and credit management. She focuses on providing practical, actionable tips for millennial and Gen Z money management.',
    qualifications: ['Accredited Financial Counselor (AFC)', 'B.A. in Economics'],
    contact: 'emma@smartmoneypath.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    name: 'David Park',
    role: 'Career & Income Specialist',
    bio: 'David brings 15 years of experience in HR and talent acquisition. He writes about salary negotiation, side hustles, and maximizing lifetime earning potential.',
    qualifications: ['SHRM-SCP', 'M.A. in Organizational Psychology'],
    contact: 'david@smartmoneypath.com',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  },
]

export default function AuthorsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Authors', url: `${SITE_URL}/authors` },
  ]

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: authors.map((author, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          description: author.bio,
          image: author.image,
          url: `${SITE_URL}/authors`,
        },
      })),
    },
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
              Our Editorial Team
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Decades of combined experience in financial planning, investment banking, and career coaching—dedicated to your financial success.
            </p>
          </div>
        </div>
      </section>

      {/* Research Process Section */}
      <section className="py-16 border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary-900 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Our Financial Research Process</h2>
              <p className="text-secondary-100 text-lg leading-relaxed mb-6">
                Every article we publish undergoes a rigorous multi-stage review. We prioritize expertise, primary source data, and objective math-first analysis to ensure you receive the most accurate financial education possible.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">Primary Sources Only</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">Human Verified Math</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">Expert Authored</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-400" />
                  <span className="text-sm">No Bias Policy</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-px h-32 bg-white/10"></div>
            <div className="flex-shrink-0 text-center">
              <p className="text-4xl font-bold text-primary-400">100%</p>
              <p className="text-secondary-300 text-sm uppercase tracking-wider">Human Reviewed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {authors.map((author) => (
              <div key={author.name} className="flex flex-col sm:flex-row gap-6 p-8 bg-white rounded-3xl border border-secondary-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-primary-50"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-1">{author.name}</h3>
                  <p className="text-primary-600 font-semibold mb-3">{author.role}</p>
                  <p className="text-secondary-600 text-sm leading-relaxed mb-4">{author.bio}</p>

                  <div className="space-y-2 mb-4">
                    {author.qualifications.map((qual) => (
                      <div key={qual} className="flex items-center gap-2 text-xs text-secondary-500 bg-secondary-50 px-3 py-1 rounded-full w-fit">
                        <Award className="h-3 w-3 text-primary-500" />
                        {qual}
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:${author.contact}`}
                    className="inline-flex items-center gap-2 text-sm text-secondary-500 hover:text-primary-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact {author.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Mission Statement */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Reader-First Promise</h2>
          <p className="text-lg text-secondary-600 leading-relaxed mb-8">
            The SmartMoneyPath Editorial Team operates independently from our business and advertising partners. We never recommend a product solely because we receive a commission. Every guide is written with the sole intent of providing you with the clearest path to your financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/editorial-policy" className="text-primary-600 font-semibold underline underline-offset-4">Editorial Policy</Link>
            <span className="text-secondary-300">|</span>
            <Link href="/methodology" className="text-primary-600 font-semibold underline underline-offset-4">Methodology</Link>
            <span className="text-secondary-300">|</span>
            <Link href="/how-we-make-money" className="text-primary-600 font-semibold underline underline-offset-4">Transparency Disclosure</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
