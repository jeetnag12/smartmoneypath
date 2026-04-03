import Link from 'next/link'
import {
  PiggyBank,
  TrendingUp,
  Wallet,
  Target,
  CreditCard,
  Home,
  Car,
  GraduationCap
} from 'lucide-react'

const categories = [
  {
    name: 'Budgeting',
    description: 'Track expenses and plan spending',
    icon: Wallet,
    color: 'bg-blue-50 text-blue-600',
    href: '/budgeting',
    articleCount: 24,
  },
  {
    name: 'Saving',
    description: 'Build your nest egg',
    icon: PiggyBank,
    color: 'bg-green-50 text-green-600',
    href: '/saving',
    articleCount: 18,
  },
  {
    name: 'Investing',
    description: 'Grow your wealth',
    icon: TrendingUp,
    color: 'bg-purple-50 text-purple-600',
    href: '/investing',
    articleCount: 32,
  },
  {
    name: 'Debt Free',
    description: 'Pay off loans faster',
    icon: CreditCard,
    color: 'bg-red-50 text-red-600',
    href: '/debt',
    articleCount: 15,
  },
  {
    name: 'Home Buying',
    description: 'Your first home guide',
    icon: Home,
    color: 'bg-amber-50 text-amber-600',
    href: '/home-buying',
    articleCount: 12,
  },
  {
    name: 'Retirement',
    description: 'Plan for the future',
    icon: Target,
    color: 'bg-teal-50 text-teal-600',
    href: '/retirement',
    articleCount: 21,
  },
  {
    name: 'Education',
    description: 'Smart college financing',
    icon: GraduationCap,
    color: 'bg-indigo-50 text-indigo-600',
    href: '/education',
    articleCount: 9,
  },
  {
    name: 'Auto',
    description: 'Car buying & loans',
    icon: Car,
    color: 'bg-rose-50 text-rose-600',
    href: '/auto',
    articleCount: 8,
  },
]

export default function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary-600 font-medium mb-2">Browse by Topic</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Find articles and guides tailored to your specific financial goals and interests
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>

                <p className="text-secondary-500 text-sm mb-3">
                  {category.description}
                </p>

                <span className="text-xs font-medium text-secondary-400">
                  {category.articleCount} articles
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
