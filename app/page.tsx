import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { getAllPosts } from '@/lib/posts'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/JsonLdSchemas'
import { SITE_URL } from '@/lib/site'
import { ArrowRight, TrendingUp, Sparkles, Zap, ShieldCheck, CheckCircle2, Mail, BellRing } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SmartMoneyPath | Premium Personal Finance Research & Education',
  description: 'Independent, data-driven financial publication. Expert guides on investing, budgeting, saving, and debt management for American households.',
  alternates: {
    canonical: SITE_URL,
  },
}

export default async function Home() {
  const allPosts = await getAllPosts()

  // Segmentation for a high-authority publication feel
  const editorsPicks = allPosts.slice(0, 3)
  const latestGuides = allPosts.slice(3, 7)
  const trendingReads = allPosts.slice(7, 12)
  const popularReads = allPosts.slice(12, 16)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <WebSiteSchema />
      <OrganizationSchema />
      <Hero />

      {/* Editor's Picks - High Impact Featured Section */}
      <section className="py-24 bg-secondary-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-600/20">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-secondary-900 tracking-tight leading-tight">Editor's Picks</h2>
                <p className="text-xl text-secondary-500 font-medium">Foundational research for your financial legacy.</p>
              </div>
            </div>
            <Link href="/articles" className="hidden md:flex items-center gap-2 font-black text-primary-700 uppercase tracking-widest text-xs group">
              View All Research <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {editorsPicks.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-100/10 blur-[120px] pointer-events-none rounded-full"></div>
      </section>

      <Categories />

      {/* Main Publication Layout - Latest Research + Trending Sidebar */}
      <section className="py-24 bg-white border-y border-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* Left Content - Latest Guides */}
            <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center justify-between pb-8 border-b-2 border-secondary-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-900 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-secondary-900 tracking-tight">Latest Research</h2>
                </div>
              </div>

              <div className="space-y-10">
                {latestGuides.map((post) => (
                  <ArticleCard key={post.id} post={post} variant="horizontal" />
                ))}
              </div>

              <div className="pt-8">
                 <Link href="/articles" className="flex items-center justify-center gap-3 w-full py-6 bg-secondary-50 rounded-3xl text-secondary-900 font-black uppercase tracking-widest text-sm hover:bg-secondary-100 transition-all group">
                   Load More Research <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
            </div>

            {/* Right Sidebar - Trending Now */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-12">
                <div className="bg-secondary-50 rounded-[2.5rem] p-10 border border-secondary-100 shadow-sm relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b border-secondary-200">
                      <TrendingUp className="h-6 w-6 text-primary-600" />
                      <h3 className="text-2xl font-black text-secondary-900 tracking-tight">Trending Now</h3>
                    </div>

                    <div className="space-y-10">
                      {trendingReads.map((post, i) => (
                        <div key={post.id} className="flex gap-6 items-start group">
                          <span className="text-5xl font-black text-secondary-200/50 leading-none tabular-nums group-hover:text-primary-200 transition-colors">
                            {i + 1}
                          </span>
                          <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600">
                              {post.category}
                            </p>
                            <Link href={`/articles/${post.id}`} className="block">
                              <h4 className="text-lg font-black text-secondary-900 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                            </Link>
                            <div className="flex items-center gap-3 text-[10px] text-secondary-400 font-black uppercase tracking-widest">
                               <span>{post.readTime}</span>
                               <span className="w-1 h-1 rounded-full bg-secondary-200"></span>
                               <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-100 rounded-full blur-[100px] opacity-40"></div>
                </div>

                {/* Newsletter Box */}
                <div className="bg-primary-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl group">
                   <div className="relative z-10">
                     <div className="w-14 h-14 bg-primary-700 rounded-2xl flex items-center justify-center mb-8">
                       <BellRing className="h-7 w-7 text-white" />
                     </div>
                     <h4 className="text-3xl font-black mb-4 tracking-tight leading-tight">Join 45,000+ Smart Savers</h4>
                     <p className="text-primary-100 text-base mb-10 leading-relaxed font-medium">Get our best research, data-driven calculators, and market updates delivered once a week.</p>
                     <Link href="/contact" className="flex items-center justify-center gap-3 w-full py-5 bg-white text-primary-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-50 transition-all shadow-xl group/btn">
                       Subscribe Free <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                     </Link>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Section - Publication Grid */}
      <section className="py-24 bg-secondary-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Popular Reads</h2>
              <p className="text-xl text-secondary-400 font-medium leading-relaxed">Our most-impactful guides, revisited by thousands of readers monthly.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {popularReads.map((post) => (
              <ArticleCard key={post.id} post={post} variant="horizontal" />
            ))}
          </div>
        </div>
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      </section>

      {/* Trust Section - Professional Excellence */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-primary-100">
                <ShieldCheck className="h-4 w-4" />
                <span>Editorial Excellence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-secondary-900 mb-10 tracking-tight leading-[1.1]">
                Financial Clarity is a <span className="text-primary-700 underline decoration-primary-200 underline-offset-8">Right</span>.
              </h2>
              <p className="text-2xl text-secondary-600 mb-12 leading-relaxed font-medium">
                We eliminate the bias. SmartMoneyPath provides objective, math-first research derived from primary source authority.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: 'Primary Sourcing', text: '100% of data from regulatory agencies.' },
                  { title: 'Objective Math', text: 'Transparent models and calculations.' },
                  { title: 'Zero Conflicts', text: 'We never rank by commission rates.' },
                  { title: 'Expert Vetted', text: 'Human-reviewed by finance specialists.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-primary-700" />
                    </div>
                    <div>
                      <h4 className="font-black text-secondary-900 tracking-tight mb-1">{item.title}</h4>
                      <p className="text-sm text-secondary-500 font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative z-10 bg-secondary-900 rounded-[3rem] p-12 shadow-[0_64px_96px_-16px_rgba(0,0,0,0.2)]">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center">
                       <ShieldCheck className="h-6 w-6 text-white" />
                     </div>
                     <span className="text-white font-black tracking-widest text-xs uppercase">SMP Integrity Index</span>
                   </div>
                   <span className="text-primary-500 font-black text-3xl">9.8</span>
                </div>

                <div className="space-y-10">
                   <div className="space-y-4">
                     <div className="flex justify-between text-xs font-black text-secondary-400 uppercase tracking-widest">
                       <span>Data Reliability</span>
                       <span>99.2%</span>
                     </div>
                     <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[99.2%] h-full bg-primary-500"></div>
                     </div>
                   </div>
                   <div className="space-y-4">
                     <div className="flex justify-between text-xs font-black text-secondary-400 uppercase tracking-widest">
                       <span>Editorial Independence</span>
                       <span>100%</span>
                     </div>
                     <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[100%] h-full bg-primary-500 shadow-[0_0_20px_rgba(74,222,128,0.4)]"></div>
                     </div>
                   </div>
                </div>

                <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/5">
                   <p className="text-xl font-bold text-white italic leading-relaxed mb-4">"The most transparent debt payoff guides on the web. Period."</p>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-[10px] font-black text-white">MJ</div>
                      <span className="text-secondary-400 font-bold text-sm">— Mark J., Verified Reader</span>
                   </div>
                </div>
              </div>
              {/* Visual accents */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600/20 blur-[100px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
