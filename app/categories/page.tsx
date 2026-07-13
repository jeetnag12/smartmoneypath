import Link from 'next/link'
import { Metadata } from 'next'
import {
  PiggyBank,
  TrendingUp,
  Wallet,
  Target,
  CreditCard,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Zap,
  Home,
  Car,
  Brain,
  Percent,
  FileText
} from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'

const categoryInfo = [
  {
    name: 'Budgeting',
    slug: 'budgeting',
    description: 'Track expenses and plan spending with proven budgeting methods tested against real household numbers.',
    icon: Wallet,
    color: 'bg-blue-50 text-blue-700 border-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    name: 'Saving',
    slug: 'saving',
    description: 'Build your emergency fund and cash reserves with data-backed saving strategies for every income level.',
    icon: PiggyBank,
    color: 'bg-green-50 text-green-700 border-green-100',
    iconColor: 'text-green-600',
  },
  {
    name: 'Investing',
    slug: 'investing',
    description: 'Grow your wealth through smart asset allocation. From index funds to retirement accounts, we simplify the math.',
    icon: TrendingUp,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    name: 'Debt Management',
    slug: 'debt',
    description: 'Pay off loans faster using the snowball or avalanche methods. Proven strategies to achieve financial freedom.',
    icon: CreditCard,
    color: 'bg-orange-50 text-orange-700 border-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    name: 'Retirement',
    slug: 'retirement',
    description: 'Plan for the future with 401(k), IRA, and pension strategies designed to maximize your long-term security.',
    icon: Target,
    color: 'bg-teal-50 text-teal-700 border-teal-100',
    iconColor: 'text-teal-600',
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'Smart college financing, student loan repayment, and education planning for the modern family.',
    icon: GraduationCap,
    color: 'bg-pink-50 text-pink-700 border-pink-100',
    iconColor: 'text-pink-600',
  },
  {
    name: 'Credit Score',
    slug: 'credit',
    description: 'Understand credit score models, monitor reports, resolve disputes, and optimize your credit health.',
    icon: CreditCard,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    name: 'Insurance',
    slug: 'insurance',
    description: 'Protect your family and assets with the right life, auto, home, and health insurance coverage rules.',
    icon: ShieldCheck,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    name: 'Home Buying',
    slug: 'home-buying',
    description: 'Step-by-step guidance on down payments, conventional and FHA mortgages, inspections, and home closing steps.',
    icon: Home,
    color: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    name: 'Auto Finance',
    slug: 'auto',
    description: 'Calculate the total cost of car ownership, including depreciation, insurance, and maintenance costs.',
    icon: Car,
    color: 'bg-red-50 text-red-700 border-red-100',
    iconColor: 'text-red-600',
  },
  {
    name: 'Financial Planning',
    slug: 'planning',
    description: 'Protect your legacy through Wills, Power of Attorney structures, and beneficiary configurations.',
    icon: ShieldCheck,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    name: 'Financial Mindset',
    slug: 'mindset',
    description: 'Examine loss aversion, status signaling, and emotional spending triggers to build wealthy habits.',
    icon: Brain,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    name: 'Banking',
    slug: 'banking',
    description: 'Compare online HYSAs vs traditional brick-and-mortar savings, direct deposits, and banking fees.',
    icon: Home,
    color: 'bg-sky-50 text-sky-700 border-sky-100',
    iconColor: 'text-sky-600',
  },
  {
    name: 'Loans',
    slug: 'loans',
    description: 'Compare personal loans, credit union rates, amortization terms, and total borrowing costs.',
    icon: Percent,
    color: 'bg-amber-50 text-amber-700 border-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    name: 'Taxes',
    slug: 'taxes',
    description: 'Optimize deductions, organize annual filings, compare software, and check self-employed write-offs.',
    icon: FileText,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    name: 'Credit Cards',
    slug: 'credit-cards',
    description: 'Maximize cash back category multipliers, redeem travel points, and use 0% APR balance transfers.',
    icon: CreditCard,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-100',
    iconColor: 'text-cyan-600',
  },
]

export const metadata: Metadata = {
  title: 'Financial Knowledge Center | SmartMoneyPath Topics',
  description: 'Explore our hand-crafted financial library by topic. Find objective guides on budgeting, saving, investing, and retirement.',
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: 'Financial Knowledge Center | SmartMoneyPath',
    description: 'Organized financial education for every stage of your money journey.',
    url: `${SITE_URL}/categories`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default async function CategoriesPage() {
  const posts = await getAllPosts()

  // Count articles per category
  const categoryCounts = posts.reduce((acc, post) => {
    const cat = post.category.toLowerCase().replace(/\s+/g, '-')
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Topics', url: `${SITE_URL}/categories` },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Header */}
      <section className="bg-secondary-50 pt-32 pb-24 relative overflow-hidden border-b border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white text-secondary-900 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-secondary-200 mb-6 shadow-sm">
              <Zap className="h-4 w-4 text-primary-600" />
              <span>Organized Education</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-secondary-900 mb-6 tracking-tight">
              Financial <span className="text-primary-700">Knowledge Center</span>
            </h1>
            <p className="text-xl text-secondary-600 leading-relaxed">
              Our library is structured around core financial pillars. Explore our content by topic to find the specific guidance you need for your goals.
            </p>
          </div>
        </div>
        {/* Background visual */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-100/20 blur-[120px] pointer-events-none rounded-full"></div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryInfo.map((category) => {
              const Icon = category.icon
              const count = categoryCounts[category.slug] || 0
              return (
                <Link
                  key={category.name}
                  href={`/categories/${category.slug}`}
                  className={`group p-10 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-900/10 hover:-translate-y-2 ${category.color}`}
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-[1.5rem] shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <Icon className={`h-10 w-10 ${category.iconColor}`} />
                    </div>
                    <div className="bg-white/40 backdrop-blur-sm px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-secondary-900">
                      {count} {count === 1 ? 'Guide' : 'Guides'}
                    </div>
                  </div>

                  <h3 className="text-3xl font-black text-secondary-900 mb-4 tracking-tight group-hover:text-primary-700 transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-secondary-700 text-lg mb-10 leading-relaxed font-medium opacity-80">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-3 text-primary-700 font-black uppercase tracking-widest text-xs">
                    Browse All Research <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-24 bg-secondary-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-primary-600/40">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight">Our Data Integrity Promise</h2>
              <p className="text-xl text-secondary-300 mb-10 leading-relaxed">
                Unlike many financial websites, we do not allow advertising partners to influence our research or rankings. Every guide is vetted for accuracy against primary sources.
              </p>
              <Link
                href="/methodology"
                className="inline-block bg-white text-secondary-900 px-10 py-4 rounded-2xl font-black hover:bg-secondary-50 transition-all shadow-xl"
              >
                Review Our Standards
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {[
                { label: 'Primary Sources', value: '100%' },
                { label: 'Human Vetted', value: '20-40 hrs', sub: 'per guide' },
                { label: 'Interest Rates', value: 'Updated Weekly' },
                { label: 'Trust Rating', value: '9.8 / 10' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center">
                  <p className="text-primary-400 text-3xl font-black mb-2">{stat.value}</p>
                  <p className="text-white font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
                  {stat.sub && <p className="text-secondary-500 text-[10px] mt-1 italic">{stat.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
          <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary-600 rounded-full blur-[160px]"></div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
