import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'
import { Mail, ShieldCheck, GraduationCap, Award, Search, Linkedin, Twitter, Globe, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Authors & Editorial Team | SmartMoneyPath Experts',
  description: 'Meet the experts behind SmartMoneyPath. Our editorial team has decades of experience in personal finance, banking, and financial education.',
  alternates: {
    canonical: `${SITE_URL}/authors`,
  },
  openGraph: {
    title: 'Meet Our Editorial Team | SmartMoneyPath Experts',
    description: 'Our team of financial educators, analysts, and specialists dedicated to providing objective financial education.',
    url: `${SITE_URL}/authors`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

const authors = [
  {
    name: 'Sarah Chen',
    role: 'Senior Financial Educator',
    bio: 'Sarah has over 10 years of experience helping families achieve financial independence. She specializes in debt payoff strategies and early-stage wealth building. Her work has been featured in major financial publications.',
    qualifications: ['Certified Financial Planner (CFP)', 'M.S. in Personal Financial Planning'],
    contact: 'sarah@smartmoneypath.com',
    image: '/images/authors/sarah.jpg',
  },
  {
    name: 'Michael Ross',
    role: 'Investment Strategy Lead',
    bio: 'Michael is a former investment banker turned educator. He is passionate about making complex investing concepts accessible to everyone through data-driven research and transparent calculations.',
    qualifications: ['Chartered Financial Analyst (CFA)', 'MBA in Finance'],
    contact: 'michael@smartmoneypath.com',
    image: '/images/authors/michael.jpg',
  },
  {
    name: 'Emma Wilson',
    role: 'Personal Finance Analyst',
    bio: 'Emma specializes in budgeting frameworks and credit management. She focuses on providing practical, actionable tips for millennial and Gen Z money management.',
    qualifications: ['Accredited Financial Counselor (AFC)', 'B.A. in Economics'],
    contact: 'emma@smartmoneypath.com',
    image: '/images/authors/emma.jpg',
  },
  {
    name: 'David Park',
    role: 'Career & Income Specialist',
    bio: 'David brings 15 years of experience in HR and talent acquisition. He writes about salary negotiation, side hustles, and maximizing lifetime earning potential.',
    qualifications: ['SHRM-SCP', 'M.A. in Organizational Psychology'],
    contact: 'david@smartmoneypath.com',
    image: '/images/authors/david.jpg',
  },
]

export default function AuthorsPage() {
  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Editorial Team', url: `${SITE_URL}/authors` },
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
          image: `${SITE_URL}${author.image}`,
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
      <section className="bg-secondary-900 pt-32 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-600/30 mb-8">
              <Users className="h-4 w-4" />
              <span>Expert Voices</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Meet Our <span className="text-primary-500">Editorial Team</span>
            </h1>
            <p className="text-xl text-secondary-300 leading-relaxed">
              Decades of combined experience in financial planning, investment banking, and career coaching—dedicated to your financial success.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-24 bg-white border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary-50 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-secondary-900 mb-6 tracking-tight">Our Verification Standards</h2>
              <p className="text-secondary-600 text-lg leading-relaxed mb-10 font-medium">
                Every article we publish undergoes a rigorous multi-stage review. We prioritize expertise, primary source data, and objective math-first analysis to ensure you receive the most accurate financial education possible.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Search, label: "Primary Sources Only" },
                  { icon: ShieldCheck, label: "Human Verified Math" },
                  { icon: GraduationCap, label: "Expert Authored" },
                  { icon: Award, label: "Zero Bias Policy" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-secondary-200 shadow-sm">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary-700" />
                    </div>
                    <span className="font-bold text-secondary-800 text-sm tracking-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-center bg-secondary-900 p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-primary-400 text-6xl font-black mb-2 group-hover:scale-110 transition-transform duration-500">100%</p>
                <p className="text-white font-black uppercase tracking-[0.2em] text-xs">Human Vetted</p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-600 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {authors.map((author) => (
              <div key={author.name} className="flex flex-col sm:flex-row gap-10 p-10 bg-white rounded-[3rem] border border-secondary-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="shrink-0">
                  <div className="relative">
                    <img
                      src={author.image}
                      alt={author.name}
                      width={140}
                      height={140}
                      className="w-32 h-32 rounded-[2rem] object-cover border-4 border-primary-50 shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary-600 border-4 border-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-secondary-900 tracking-tight mb-1">{author.name}</h3>
                      <p className="text-primary-700 font-black uppercase tracking-widest text-[10px]">{author.role}</p>
                    </div>
                    <div className="flex gap-2">
                       <a href="#" className="w-8 h-8 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
                       <a href="#" className="w-8 h-8 rounded-lg bg-secondary-50 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
                    </div>
                  </div>

                  <p className="text-secondary-600 text-sm leading-relaxed mb-6 font-medium">{author.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {author.qualifications.map((qual) => (
                      <div key={qual} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary-500 bg-secondary-50 px-3 py-1.5 rounded-lg border border-secondary-100">
                        <Award className="h-3 w-3 text-primary-600" />
                        {qual}
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:${author.contact}`}
                    className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-secondary-900 hover:text-primary-700 transition-colors group"
                  >
                    <Mail className="h-4 w-4 text-primary-600 group-hover:scale-110 transition-transform" />
                    Contact {author.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Promise */}
      <section className="py-24 bg-secondary-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">Our Reader-First Promise</h2>
          <p className="text-xl text-secondary-300 leading-relaxed mb-12 font-medium">
            The SmartMoneyPath Editorial Team operates independently from our business and advertising partners. We never recommend a product solely because we receive a commission. Every guide is written with the sole intent of providing you with the clearest path to your financial goals.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/editorial-policy" className="px-8 py-3 bg-white text-secondary-900 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-secondary-50 transition-all">Editorial Policy</Link>
            <Link href="/methodology" className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Research Methodology</Link>
          </div>
        </div>
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
      </section>

      <Footer />
    </main>
  )
}
