import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight, User } from 'lucide-react'

const featuredPosts = [
  {
    id: 1,
    title: 'The Ultimate Guide to Building an Emergency Fund',
    excerpt: 'Learn how to build a 6-month emergency fund that will give you peace of mind and financial security in uncertain times.',
    category: 'Saving',
    readTime: '8 min read',
    author: 'Sarah Chen',
    date: 'Mar 28, 2026',
    image: '/images/emergency-fund.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Index Fund Investing for Beginners',
    excerpt: 'Why index funds are the cornerstone of passive investing and how to get started with just $100.',
    category: 'Investing',
    readTime: '6 min read',
    author: 'Michael Ross',
    date: 'Mar 25, 2026',
    image: '/images/investing.jpg',
    featured: false,
  },
  {
    id: 3,
    title: '50/30/20 Budget Rule Explained',
    excerpt: 'A simple budgeting framework that helps you balance needs, wants, and savings without the stress.',
    category: 'Budgeting',
    readTime: '5 min read',
    author: 'Emma Wilson',
    date: 'Mar 22, 2026',
    image: '/images/budget.jpg',
    featured: false,
  },
  {
    id: 4,
    title: 'How to Negotiate a Higher Salary',
    excerpt: 'Proven strategies and scripts to help you confidently ask for the raise you deserve.',
    category: 'Career',
    readTime: '7 min read',
    author: 'David Park',
    date: 'Mar 20, 2026',
    image: '/images/salary.jpg',
    featured: false,
  },
]

export default function FeaturedPosts() {
  const mainPost = featuredPosts.find(post => post.featured)
  const otherPosts = featuredPosts.filter(post => !post.featured)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-primary-600 font-medium mb-2">Latest Articles</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900">Featured Posts</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {mainPost && (
            <Link href={`/articles/${mainPost.id}`} className="group">
              <article className="bg-secondary-50 rounded-2xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-primary-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-secondary-400">
                    <span className="text-6xl">💰</span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {mainPost.category}
                    </span>
                    <span className="text-secondary-500 text-sm">{mainPost.date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {mainPost.title}
                  </h3>

                  <p className="text-secondary-600 mb-6">
                    {mainPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-semibold">
                        {mainPost.author[0]}
                      </div>
                      <span className="font-medium text-secondary-900">{mainPost.author}</span>
                    </div>

                    <div className="flex items-center gap-1 text-secondary-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{mainPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          <div className="space-y-6">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/articles/${post.id}`} className="group">
                <article className="flex gap-4 p-4 rounded-xl hover:bg-secondary-50 transition-colors">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-secondary-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">
                      {post.category === 'Investing' && '📈'}
                      {post.category === 'Budgeting' && '📊'}
                      {post.category === 'Career' && '💼'}
                      {post.category === 'Saving' && '💵'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary-600 text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-secondary-400">•</span>
                      <span className="text-secondary-500 text-sm">{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-secondary-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary-600 font-medium"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
