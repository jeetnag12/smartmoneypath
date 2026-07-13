import Link from 'next/link'
import { PiggyBank, TrendingUp, Calculator, CreditCard, Target, GraduationCap, ArrowRight, Wallet, Landmark, ShieldCheck } from 'lucide-react'

const categories = [
  {
    name: 'Saving',
    slug: 'saving',
    description: 'Emergency funds and practical cash reserves.',
    icon: PiggyBank,
    color: 'bg-green-50 text-green-700 border-green-100'
  },
  {
    name: 'Budgeting',
    slug: 'budgeting',
    description: 'Cash-flow frameworks tested with real numbers.',
    icon: Calculator,
    color: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  {
    name: 'Investing',
    slug: 'investing',
    description: 'Fees, diversification, and investment risk.',
    icon: TrendingUp,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-100'
  },
  {
    name: 'Debt',
    slug: 'debt',
    description: 'Payoff methods and consumer protections.',
    icon: CreditCard,
    color: 'bg-orange-50 text-orange-700 border-orange-100'
  },
  {
    name: 'Retirement',
    slug: 'retirement',
    description: '401(k), IRA, and long-term planning.',
    icon: Target,
    color: 'bg-teal-50 text-teal-700 border-teal-100'
  },
  {
    name: 'Credit',
    slug: 'credit',
    description: 'Maximizing rewards while avoiding debt.',
    icon: Wallet,
    color: 'bg-cyan-50 text-cyan-700 border-cyan-100'
  },
]

export default function Categories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-secondary-900 mb-4 tracking-tight">
              Explore by <span className="text-primary-700">Topic</span>
            </h2>
            <p className="text-xl text-secondary-600">
              Hand-crafted financial guides organized for your specific stage of the wealth-building journey.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-bold text-primary-700 hover:text-primary-800 transition-colors group"
          >
            All Categories
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className={`group p-8 rounded-[2rem] border transition-all duration-300 hover:shadow-2xl hover:shadow-secondary-900/5 hover:-translate-y-1 ${cat.color}`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                  <cat.icon className="h-8 w-8" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors">
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight">{cat.name}</h3>
              <p className="opacity-80 text-sm font-medium leading-relaxed">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Feature bar */}
        <div className="mt-16 p-8 bg-secondary-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1 tracking-tight">Professional-Grade Standards</h4>
              <p className="text-secondary-400 text-sm">Every guide is cross-referenced with primary government and regulatory data.</p>
            </div>
          </div>
          <div className="relative z-10 shrink-0">
            <Link
              href="/methodology"
              className="px-8 py-4 bg-white text-secondary-900 rounded-xl font-bold hover:bg-secondary-50 transition-all block text-center"
            >
              Our Methodology
            </Link>
          </div>
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </section>
  )
}
