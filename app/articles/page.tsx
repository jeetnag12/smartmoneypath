import Link from 'next/link'
import { Metadata } from 'next'
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/site'
import { BreadcrumbSchema } from '@/components/seo/JsonLdSchemas'
import ArticleCard from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Financial Research Library | All SmartMoneyPath Guides',
  description: 'Access our complete database of data-driven personal finance articles. Expert analysis on saving, investing, budgeting, and building wealth.',
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
  openGraph: {
    title: 'Financial Research Library | SmartMoneyPath',
    description: 'Explore hundreds of researched guides with calculations, caveats, and primary sources.',
    url: `${SITE_URL}/articles`,
    siteName: 'SmartMoneyPath',
    type: 'website',
  },
}

export default async function ArticlesPage({ searchParams }: { searchParams?: { q?: string } }) {
  const allPosts = await getAllPosts()
  const query = searchParams?.q?.trim().toLowerCase() || ''

  const posts = query
    ? allPosts.filter((post) =>
        [post.title, post.excerpt, post.category, ...post.tags].join(' ').toLowerCase().includes(query)
      )
    : allPosts

  const breadcrumbItems = [
    { name: 'Home', url: SITE_URL },
    { name: 'Library', url: `${SITE_URL}/articles` },
  ]

  const categories = [...new Set(allPosts.map(p => p.category))]

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Header */}
      <section className="bg-secondary-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600 rounded-full blur-[160px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Research <span className="text-primary-400">Library</span>
          </h1>
          <p className="text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed">
            Data-driven guides built from primary sources, transparent examples, and clearly stated limitations.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="bg-white border-b border-secondary-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
              <Link
                href="/articles"
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  !query ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                All Research
              </Link>
              {categories.slice(0, 5).map(cat => (
                <Link
                  key={cat}
                  href={`/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full bg-secondary-50 text-secondary-600 text-sm font-bold whitespace-nowrap hover:bg-secondary-100 transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <form action="/articles" className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400 group-focus-within:text-primary-600 transition-colors" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search research database..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-secondary-200 bg-secondary-50 focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-600 transition-all outline-none font-medium text-sm"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-32 bg-secondary-50 rounded-[3rem] border-2 border-dashed border-secondary-200">
              <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary-400">
                <Search className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-black text-secondary-900 mb-2">No research found</h2>
              <p className="text-secondary-500 mb-8 max-w-sm mx-auto font-medium">We couldn\'t find any guides matching “{query}”. Try another keyword or browse our topics.</p>
              <Link href="/articles" className="inline-flex items-center gap-2 bg-primary-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-800 transition-all shadow-lg shadow-primary-700/20">
                Clear Search <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-primary-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Can\'t find what you\'re looking for?</h2>
          <p className="text-primary-100 text-lg mb-10 leading-relaxed">Our research team is constantly auditing new financial products and legislative changes. Suggest a topic for our next deep-dive.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary-900 px-10 py-4 rounded-2xl font-black hover:bg-primary-50 transition-all shadow-2xl"
          >
            Request Research <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-600 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-40"></div>
      </section>

      <Footer />
    </main>
  )
}
