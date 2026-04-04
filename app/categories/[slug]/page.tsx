import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getAllPosts, getPostsByCategory } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
  budgeting: {
    title: 'Budgeting',
    description: 'Master the art of budgeting with proven strategies to track expenses, reduce spending, and take control of your finances.',
    icon: '📊',
  },
  saving: {
    title: 'Saving Money',
    description: 'Learn effective saving strategies to build your emergency fund, save for big purchases, and achieve your financial goals.',
    icon: '💵',
  },
  investing: {
    title: 'Investing',
    description: 'Discover how to grow your wealth through smart investing. From index funds to retirement accounts, start building your portfolio.',
    icon: '📈',
  },
  debt: {
    title: 'Debt Management',
    description: 'Get out of debt faster with proven strategies. Learn how to pay off loans, manage credit cards, and achieve financial freedom.',
    icon: '💳',
  },
  'home-buying': {
    title: 'Home Buying',
    description: 'Your complete guide to buying your first home. From saving for a down payment to understanding mortgages.',
    icon: '🏠',
  },
  retirement: {
    title: 'Retirement Planning',
    description: 'Plan for a secure retirement with our comprehensive guides on 401(k)s, IRAs, and long-term financial planning.',
    icon: '🎯',
  },
  education: {
    title: 'Education Financing',
    description: 'Navigate college costs with confidence. Learn about scholarships, student loans, and smart education funding strategies.',
    icon: '🎓',
  },
  auto: {
    title: 'Auto Finance',
    description: 'Make smart decisions about car buying and auto loans. Learn how to save money on your next vehicle purchase.',
    icon: '🚗',
  },
}

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = [...new Set(posts.map((post) => post.category.toLowerCase()))]
  return categories.map((category) => ({
    slug: category,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const info = categoryInfo[params.slug.toLowerCase()]
  if (!info) {
    return { title: 'Category Not Found' }
  }
  return {
    title: `${info.title} Articles | SmartMoneyPath`,
    description: info.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const info = categoryInfo[params.slug.toLowerCase()]

  if (!info) {
    notFound()
  }

  const posts = await getPostsByCategory(params.slug)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{info.icon}</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              {info.title}
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {info.description}
            </p>
            <div className="mt-6">
              <span className="bg-white text-secondary-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                {posts.length} article{posts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary-500 text-lg mb-4">No articles in this category yet.</p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/articles/${post.id}`} className="group">
                  <article className="bg-white rounded-2xl overflow-hidden border border-secondary-100 hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden flex items-center justify-center">
                      <span className="text-5xl">{info.icon}</span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3 text-sm text-secondary-500">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-secondary-600 text-sm line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-semibold text-sm">
                            {post.author.name[0]}
                          </div>
                          <span className="text-sm font-medium text-secondary-700">
                            {post.author.name}
                          </span>
                        </div>
                        <span className="text-primary-600 text-sm font-medium">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
