import Link from 'next/link'
import {
  PiggyBank,
  TrendingUp,
  Wallet,
  Target,
  CreditCard,
  Home,
  Car,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const categoryInfo = [
  {
    name: 'Budgeting',
    slug: 'budgeting',
    description: 'Track expenses and plan spending with proven budgeting methods.',
    icon: Wallet,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Saving',
    slug: 'saving',
    description: 'Build your nest egg with effective saving strategies.',
    icon: PiggyBank,
    color: 'bg-green-50 text-green-600',
  },
  {
    name: 'Investing',
    slug: 'investing',
    description: 'Grow your wealth through smart investing and portfolio management.',
    icon: TrendingUp,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    name: 'Debt Free',
    slug: 'debt',
    description: 'Pay off loans faster and achieve financial freedom.',
    icon: CreditCard,
    color: 'bg-red-50 text-red-600',
  },
  {
    name: 'Home Buying',
    slug: 'home-buying',
    description: 'Your complete guide to buying your first home.',
    icon: Home,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    name: 'Retirement',
    slug: 'retirement',
    description: 'Plan for the future with retirement savings strategies.',
    icon: Target,
    color: 'bg-teal-50 text-teal-600',
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'Smart college financing and education planning.',
    icon: GraduationCap,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    name: 'Auto',
    slug: 'auto',
    description: 'Car buying and auto loan guidance.',
    icon: Car,
    color: 'bg-rose-50 text-rose-600',
  },
]

export const metadata = {
  title: 'Categories | SmartMoneyPath',
  description: 'Browse all personal finance categories on SmartMoneyPath.',
}

export default async function CategoriesPage() {
  const posts = await getAllPosts()

  // Count articles per category
  const categoryCounts = posts.reduce((acc, post) => {
    const cat = post.category.toLowerCase()
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              All Categories
            </h1>
            <p className="text-lg text-secondary-600">
              Explore our content by topic. Find articles and guides tailored to your specific financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryInfo.map((category) => {
              const Icon = category.icon
              const count = categoryCounts[category.slug] || 0
              return (
                <Link
                  key={category.name}
                  href={`/categories/${category.slug}`}
                  className="group bg-white rounded-2xl p-6 border border-secondary-100 hover:shadow-lg transition-all hover:-translate-y-1"
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
                    {count} article{count !== 1 ? 's' : ''}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-secondary-600 mb-6">
            Browse all articles or get in touch with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              View All Articles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-secondary-700 border border-secondary-200 px-6 py-3 rounded-lg font-medium hover:bg-secondary-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
