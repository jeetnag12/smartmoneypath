import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'

export default async function FeaturedPosts() {
  const posts = await getAllPosts()
  const latestPosts = posts.slice(0, 6)
  const mainPost = latestPosts[0]
  const otherPosts = latestPosts.slice(1, 6)

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      'Investing': '📈',
      'Budgeting': '📊',
      'Career': '💼',
      'Saving': '💵',
      'Credit Cards': '💳',
      'Banking': '🏦',
      'Mortgages': '🏠',
      'Insurance': '🛡️',
      'Personal Finance': '💰',
      'Small Business': '🏢',
      'Retirement': '🎯',
      'Debt': '💸',
      'Home Buying': '🏡',
      'Education': '🎓',
      'Auto': '🚗',
    }
    return emojis[category] || '💰'
  }

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
          {/* Main Featured Post */}
          {mainPost && (
            <Link href={`/articles/${mainPost.id}`} className="group">
              <article className="bg-secondary-50 rounded-2xl overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{getCategoryEmoji(mainPost.category)}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {mainPost.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-secondary-500 text-sm">
                      {new Date(mainPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-secondary-400">•</span>
                    <span className="text-secondary-500 text-sm flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {mainPost.readTime}
                    </span>
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
                        {mainPost.author.name[0]}
                      </div>
                      <span className="font-medium text-secondary-900">{mainPost.author.name}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/articles/${post.id}`} className="group">
                <article className="flex gap-4 p-4 rounded-xl hover:bg-secondary-50 transition-colors">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">{getCategoryEmoji(post.category)}</span>
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
