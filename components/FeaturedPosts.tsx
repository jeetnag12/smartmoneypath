'use client'

import Link from 'next/link'
import { Clock, ArrowRight, User } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'

export default async function FeaturedPosts() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 6)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Investing': 'bg-indigo-100 text-indigo-700',
      'Budgeting': 'bg-blue-100 text-blue-700',
      'Career': 'bg-purple-100 text-purple-700',
      'Saving': 'bg-green-100 text-green-700',
      'Credit Cards': 'bg-cyan-100 text-cyan-700',
      'Banking': 'bg-sky-100 text-sky-700',
      'Mortgages': 'bg-amber-100 text-amber-700',
      'Insurance': 'bg-emerald-100 text-emerald-700',
      'Personal Finance': 'bg-teal-100 text-teal-700',
      'Small Business': 'bg-rose-100 text-rose-700',
      'Retirement': 'bg-violet-100 text-violet-700',
      'Debt': 'bg-orange-100 text-orange-700',
      'Home Buying': 'bg-yellow-100 text-yellow-700',
      'Education': 'bg-pink-100 text-pink-700',
      'Auto': 'bg-red-100 text-red-700',
    }
    return colors[category] || 'bg-gray-100 text-gray-700'
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600">
              Expert advice and insights to help you make smarter money decisions
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-darkGreen font-semibold hover:text-brightGreen transition-colors"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/articles/${post.id}`} className="group">
              <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-50">{post.category.charAt(0)}</span>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${getCategoryColor(post.category)} px-3 py-1.5 rounded-full text-xs font-semibold`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-darkGreen transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-darkGreen/10 flex items-center justify-center text-darkGreen font-semibold text-sm">
                      {post.author.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{post.author.bio.split('.')[0]}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
