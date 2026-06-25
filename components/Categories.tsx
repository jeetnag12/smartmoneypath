import Link from 'next/link'
import { PiggyBank, TrendingUp, Calculator, CreditCard, Landmark, GraduationCap, ArrowRight } from 'lucide-react'

const categories = [
  { name: 'Saving', description: 'Emergency funds and practical cash reserves', icon: PiggyBank, href: '/categories/saving' },
  { name: 'Budgeting', description: 'Cash-flow frameworks tested with real numbers', icon: Calculator, href: '/categories/budgeting' },
  { name: 'Investing', description: 'Fees, diversification, and investment risk', icon: TrendingUp, href: '/categories/investing' },
  { name: 'Debt', description: 'Credit-card payoff methods and consumer protections', icon: CreditCard, href: '/categories/debt' },
  { name: 'Education', description: 'Student-loan repayment and official resources', icon: GraduationCap, href: '/categories/education' },
  { name: 'Credit Cards', description: 'Maximizing rewards while avoiding interest debt', icon: CreditCard, href: '/categories/credit' },
]

export default function Categories() {
  return <section className="py-16 lg:py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12"><h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Explore the library</h2><p className="text-lg text-gray-600">One researched guide in each core topic—no empty category pages.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{categories.map(({ name, description, icon: Icon, href }) => <Link key={href} href={href} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100"><div className="flex items-start gap-4"><span className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center"><Icon className="h-6 w-6 text-darkGreen" /></span><div><h3 className="font-bold text-gray-900 flex items-center gap-2">{name}<ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100" /></h3><p className="text-gray-500 text-sm mt-1">{description}</p></div></div></Link>)}</div>
    </div>
  </section>
}
