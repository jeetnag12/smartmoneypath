'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Printer,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  CheckCircle2,
  Info,
  ExternalLink,
  HelpCircle,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Percent,
  Coins,
  PiggyBank,
  Sparkles
} from 'lucide-react'
import AdSenseSlot from './AdSenseSlot'
import RelatedPosts from './RelatedPosts'
import TableOfContents from './TableOfContents'
import Footer from './Footer'
import Navbar from './Navbar'

interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  readTime: string
  publishedAt: string
  updatedAt: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  headings: { id: string; text: string; level: number }[]
  metaDescription?: string
  focusKeyword?: string
  imageUrl: string
  quickAnswer?: string
  keyTakeaways?: string[]
  references?: { title: string; url: string }[]
  faqs?: { question: string; answer: string }[]
  reviewedBy?: {
    name: string
    avatar: string
    bio: string
  }
  relatedKeywords?: string[]
  imageAlt?: string
}

interface BlogPostWithAdsProps {
  post: Post
  relatedPosts?: Post[]
}

function renderCalculatorCTA(postId: number) {
  const compoundInterestIds = [2, 29, 24, 21, 5]
  const loanEmiIds = [28, 27, 8, 4]
  const savingsGoalIds = [25, 23, 1, 14, 7, 3, 31]

  if (compoundInterestIds.includes(postId)) {
    return (
      <div className="my-12 p-8 bg-secondary-900 text-white rounded-3xl relative overflow-hidden shadow-xl border border-secondary-800 animate-in fade-in duration-300">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-950/40 px-3 py-1 rounded-full border border-primary-500/10">Interactive Tool</span>
          <h4 className="text-xl md:text-2xl font-black mt-4 mb-2 tracking-tight">Try our Compound Interest Calculator</h4>
          <p className="text-secondary-300 text-sm leading-relaxed mb-6 font-medium">
            Find out how fast your portfolio can grow. Project future balances, adjust compounding frequency, and simulate inflation impacts.
          </p>
          <Link href="/tools/compound-interest-calculator" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-700/20 transition-all group">
            Calculate Compound Interest <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800/25 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      </div>
    )
  }

  if (loanEmiIds.includes(postId)) {
    return (
      <div className="my-12 p-8 bg-secondary-900 text-white rounded-3xl relative overflow-hidden shadow-xl border border-secondary-800 animate-in fade-in duration-300">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-950/40 px-3 py-1 rounded-full border border-primary-500/10">Interactive Tool</span>
          <h4 className="text-xl md:text-2xl font-black mt-4 mb-2 tracking-tight">Calculate your Monthly Loan EMI</h4>
          <p className="text-secondary-300 text-sm leading-relaxed mb-6 font-medium">
            Estimate your monthly loan installments. View amortization tables and simulate early loan payoff savings.
          </p>
          <Link href="/tools/loan-emi-calculator" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-700/20 transition-all group">
            Calculate Your EMI <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800/25 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      </div>
    )
  }

  if (savingsGoalIds.includes(postId)) {
    return (
      <div className="my-12 p-8 bg-secondary-900 text-white rounded-3xl relative overflow-hidden shadow-xl border border-secondary-800 animate-in fade-in duration-300">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-950/40 px-3 py-1 rounded-full border border-primary-500/10">Interactive Tool</span>
          <h4 className="text-xl md:text-2xl font-black mt-4 mb-2 tracking-tight">Estimate your Savings Target Timeline</h4>
          <p className="text-secondary-300 text-sm leading-relaxed mb-6 font-medium">
            Find out exactly how long it takes to reach your milestone. Visualize goals, and get monthly deposit recommendations.
          </p>
          <Link href="/tools/savings-goal-calculator" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary-700/20 transition-all group">
            Estimate Savings Goal <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800/25 rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      </div>
    )
  }

  return null
}

export default function BlogPostWithAds({ post, relatedPosts }: BlogPostWithAdsProps) {
  const [activeHeading, setActiveHeading] = useState('')
  const [showCopied, setShowCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    const headings = document.querySelectorAll('h2[id], h3[id]')
    headings.forEach((heading) => observer.observe(heading))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const share = (platform: string) => {
    const url = window.location.href
    const text = post.title
    let shareUrl = ''

    switch (platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break
    }

    if (shareUrl) window.open(shareUrl, '_blank')
  }

  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT
  const bottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT

  return (
    <article className="min-h-screen bg-white">
      <Navbar />
      {/* Floating Header for Desktop */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-secondary-100 py-3 transition-all duration-300 transform ${scrolled ? 'translate-y-[64px]' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 truncate">
            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest hidden md:block">
              {post.category}
            </span>
            <h2 className="text-sm font-black text-secondary-900 truncate max-w-md">{post.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => share('twitter')} className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"><Twitter className="h-4 w-4" /></button>
            <button onClick={copyLink} className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"><LinkIcon className="h-4 w-4" /></button>
            <div className="h-4 w-px bg-secondary-200 mx-2"></div>
            <button onClick={() => window.print()} className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"><Printer className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Article Hero */}
      <header className="pt-32 pb-16 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-secondary-400 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/articles" className="hover:text-primary-600 transition-colors">Articles</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary-600 truncate">{post.category}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 border border-primary-100">
                <ShieldCheck className="h-4 w-4" />
                Vetted Research
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary-900 leading-[1.1] mb-8 tracking-tight">
                {post.title}
              </h1>

              <p className="text-xl text-secondary-600 leading-relaxed mb-10 font-medium italic border-l-4 border-primary-200 pl-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-8 pb-8 border-b border-secondary-100">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={post.author.avatar} alt={post.author.name} width={56} height={56} loading="lazy" className="w-14 h-14 rounded-2xl object-cover border-2 border-primary-50 shadow-md" />
                    <div className="absolute -bottom-1 -right-1 bg-primary-600 border-2 border-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-black text-secondary-900 leading-none mb-1.5 flex flex-wrap items-center gap-1">
                      By <Link href="/authors" className="hover:text-primary-600 transition-colors underline decoration-primary-200 underline-offset-4">{post.author.name}</Link>
                      {post.reviewedBy && (
                        <>
                          <span className="text-secondary-400 font-normal mx-1">•</span>
                          <span className="text-secondary-400 font-normal text-xs">Reviewed by <Link href="/authors" className="hover:text-primary-600 transition-colors underline decoration-primary-200 underline-offset-4">{post.reviewedBy.name}</Link></span>
                        </>
                      )}
                    </p>
                    <div className="flex items-center gap-3 text-secondary-400 text-[11px] font-bold uppercase tracking-wider">
                      <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1 bg-secondary-50 px-4 py-2 rounded-xl border border-secondary-100">
                     <span className="text-[10px] font-black text-secondary-400 uppercase mr-2 tracking-widest">Share</span>
                     <button onClick={() => share('twitter')} className="p-2 text-secondary-600 hover:text-[#1DA1F2] transition-colors"><Twitter className="h-4 w-4" /></button>
                     <button onClick={() => share('facebook')} className="p-2 text-secondary-600 hover:text-[#4267B2] transition-colors"><Facebook className="h-4 w-4" /></button>
                     <button onClick={() => share('linkedin')} className="p-2 text-secondary-600 hover:text-[#0077b5] transition-colors"><Linkedin className="h-4 w-4" /></button>
                     <button onClick={copyLink} className="p-2 text-secondary-600 hover:text-primary-600 transition-colors relative">
                        <LinkIcon className="h-4 w-4" />
                        {showCopied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary-900 text-white text-[10px] px-2 py-1 rounded-md animate-in fade-in zoom-in duration-200">Copied!</span>}
                     </button>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-secondary-100 rotate-2 bg-secondary-50 group hover:rotate-0 transition-transform duration-700">
                <img src={post.imageUrl} alt={post.imageAlt || post.title} width={800} height={600} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Background design */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Left Sidebar - Navigation & Quick Links */}
          <aside className="hidden lg:block lg:col-span-3 space-y-10">
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="text-[11px] font-black text-secondary-400 uppercase tracking-[0.2em] mb-6 border-b border-secondary-100 pb-2">Contents</h3>
                <TableOfContents headings={post.headings} activeHeading={activeHeading} />
              </div>

              <div className="bg-primary-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl group">
                 <div className="relative z-10">
                   <ShieldCheck className="h-8 w-8 text-primary-400 mb-4" />
                   <h4 className="text-lg font-black mb-2 tracking-tight leading-tight">Our Fact-Checking Standards</h4>
                   <p className="text-primary-100 text-xs leading-relaxed mb-6">Every guide is cross-referenced with official US regulatory databases before publication.</p>
                   <Link href="/methodology" className="text-xs font-black uppercase tracking-widest text-white border-b-2 border-primary-500 pb-1 hover:border-white transition-colors">How we research →</Link>
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-700 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              {topAdSlot && <AdSenseSlot slot={topAdSlot} format="sidebar" />}
            </div>
          </aside>

          {/* Main Article Content */}
          <div className="lg:col-span-6">
            {/* Quick Answer */}
            {post.quickAnswer && (
              <div className="bg-primary-50 border-2 border-primary-100 p-8 rounded-[2rem] mb-12 relative">
                <div className="absolute -top-4 -left-4 bg-primary-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  Direct Answer
                </div>
                <p className="text-lg text-secondary-900 leading-relaxed font-bold italic">
                  "{post.quickAnswer}"
                </p>
              </div>
            )}

            {/* Top Article Ad */}
            {topAdSlot && <div className="mb-12"><AdSenseSlot slot={topAdSlot} format="in-article" /></div>}

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-secondary-900 text-white p-10 rounded-[2.5rem] mb-16 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-500" />
                    Key Takeaways
                  </h2>
                  <ul className="space-y-6">
                    {post.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-lg bg-primary-500/20 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary-400" />
                        </div>
                        <p className="text-secondary-100 font-medium leading-relaxed">{takeaway}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-[100px]"></div>
              </div>
            )}

            {/* Content with premium typography */}
            <div className="prose prose-lg md:prose-xl max-w-none
              prose-headings:text-secondary-900 prose-headings:tracking-tight prose-headings:font-black
              prose-h2:text-3xl prose-h2:border-b prose-h2:border-secondary-100 prose-h2:pb-4 prose-h2:mt-16
              prose-p:text-secondary-700 prose-p:leading-relaxed prose-p:mb-8
              prose-strong:text-secondary-900 prose-strong:font-black
              prose-a:text-primary-700 prose-a:font-bold prose-a:no-underline hover:prose-a:underline decoration-primary-300 underline-offset-4
              prose-ul:list-none prose-ul:pl-0
              prose-li:text-secondary-700 prose-li:font-medium prose-li:pl-8 prose-li:relative
              prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-[0.8em] prose-li:before:w-2 prose-li:before:h-2 prose-li:before:bg-primary-600 prose-li:before:rounded-full">
              {(() => {
                const contentHtml = post.content.replace(/<Link\s+href="([^"]+)"\s*>([\s\S]*?)<\/Link>/g, '<a href="$1">$2</a>')
                const h2Parts = contentHtml.split('<h2>')
                if (h2Parts.length > 1) {
                  return (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: h2Parts[0] }} />
                      <div dangerouslySetInnerHTML={{ __html: '<h2>' + h2Parts[1] }} />
                      {renderCalculatorCTA(post.id)}
                      {h2Parts.length > 2 && h2Parts.slice(2).map((part, i) => (
                        <div key={i} dangerouslySetInnerHTML={{ __html: '<h2>' + part }} />
                      ))}
                    </>
                  )
                }
                return (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                    {renderCalculatorCTA(post.id)}
                  </>
                )
              })()}
            </div>

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-20 pt-12 border-t-2 border-secondary-50">
                <div className="flex items-center gap-4 mb-12">
                   <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                     <HelpCircle className="h-6 w-6 text-primary-700" />
                   </div>
                   <h2 className="text-3xl font-black text-secondary-900 tracking-tight leading-none m-0">Common Questions</h2>
                </div>
                <div className="space-y-6">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="group bg-white rounded-3xl border-2 border-secondary-50 p-8 hover:border-primary-100 transition-all duration-300 shadow-sm hover:shadow-xl">
                      <h3 className="text-xl font-black text-secondary-900 mb-4 tracking-tight group-hover:text-primary-700 transition-colors">{faq.question}</h3>
                      <p className="text-secondary-600 leading-relaxed font-medium mb-0">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References Section */}
            {post.references && post.references.length > 0 && (
              <div className="mt-20 p-10 bg-secondary-50 rounded-[2.5rem] border border-secondary-100">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary-400 mb-8">Data Sources & Verification</h3>
                <ul className="space-y-4">
                  {post.references.map((ref, i) => (
                    <li key={i}>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-secondary-600 hover:text-primary-700 transition-colors font-bold group">
                        <div className="w-8 h-8 rounded-lg bg-white border border-secondary-200 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary-200 transition-all">
                          <ExternalLink className="h-4 w-4" />
                        </div>
                        <span className="underline decoration-secondary-200 underline-offset-4">{ref.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Article Ad */}
            {bottomAdSlot && <div className="mt-16"><AdSenseSlot slot={bottomAdSlot} format="responsive" /></div>}

            {/* Final Professional Disclosure */}
            <div className="mt-20 p-8 rounded-3xl bg-secondary-900 text-white relative overflow-hidden">
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="max-w-md">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-3">Professional Disclosure</p>
                   <p className="text-sm text-secondary-300 leading-relaxed italic">
                     The information provided in this guide is for educational purposes only. We recommend consulting with a certified professional before making significant financial decisions.
                   </p>
                 </div>
                 <div className="shrink-0 text-center md:text-right">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary-400 mb-1">Last Fact-Checked</p>
                   <p className="text-lg font-black text-white">{new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Sidebar - Ad & Topics */}
          <aside className="hidden lg:block lg:col-span-3 space-y-10">
            <div className="sticky top-32 space-y-10">
              <div className="bg-white rounded-3xl border border-secondary-100 p-8 shadow-xl shadow-secondary-900/5">
                <h3 className="text-sm font-black text-secondary-900 uppercase tracking-widest mb-6">Popular Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Budgeting', 'Investing', 'Saving', 'Retirement', 'Debt'].map((topic) => (
                    <Link key={topic} href={`/categories/${topic.toLowerCase()}`} className="px-4 py-2 rounded-xl bg-secondary-50 text-secondary-600 text-xs font-bold hover:bg-primary-600 hover:text-white transition-all duration-300">
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-primary-50 to-blue-50 rounded-3xl border border-primary-100 relative overflow-hidden">
                <div className="relative z-10">
                   <Bookmark className="h-6 w-6 text-primary-600 mb-4" />
                   <h4 className="font-black text-secondary-900 mb-2">Save for Later?</h4>
                   <p className="text-xs text-secondary-500 mb-6 leading-relaxed">Bookmark this guide or download it as a PDF for your personal library.</p>
                   <button onClick={() => window.print()} className="w-full py-3 bg-white text-primary-700 rounded-xl text-xs font-black uppercase tracking-widest border border-primary-200 hover:bg-primary-700 hover:text-white transition-all shadow-sm">
                     Save PDF
                   </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts currentPostId={post.id} category={post.category} />
      <Footer />
    </article>
  )
}
