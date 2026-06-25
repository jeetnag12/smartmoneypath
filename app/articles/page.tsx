import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'All Articles | SmartMoneyPath',
  description: 'Browse all personal finance articles on SmartMoneyPath. Learn about budgeting, investing, saving, and building wealth.',
}

export default async function ArticlesPage({ searchParams }: { searchParams?: { q?: string } }) {
  const allPosts = await getAllPosts()
  const query = searchParams?.q?.trim().toLowerCase() || ''
  const posts = query
    ? allPosts.filter((post) => [post.title, post.excerpt, post.category, ...post.tags].join(' ').toLowerCase().includes(query))
    : allPosts

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
              All Articles
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Six focused guides built from primary sources, transparent examples, and clearly stated limitations.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary-500 text-lg">No articles match “{searchParams?.q}”.</p>
              <Link href="/articles" className="inline-block mt-4 text-primary-700 font-medium">Clear search</Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/articles/${post.id}`} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden border border-secondary-100 hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                      {/* Featured Image */}
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-sm text-secondary-500">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                          <span>•</span>
                          <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </time>
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
                          <span className="text-primary-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
