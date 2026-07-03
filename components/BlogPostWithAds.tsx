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
} from 'lucide-react'
import AdSenseSlot from './AdSenseSlot'
import RelatedPosts from './RelatedPosts'
import TableOfContents from './TableOfContents'

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
}

interface BlogPostWithAdsProps {
  post: Post
  relatedPosts?: Post[]
}

export default function BlogPostWithAds({ post, relatedPosts }: BlogPostWithAdsProps) {
  const [activeHeading, setActiveHeading] = useState('')
  const [showCopied, setShowCopied] = useState(false)

  useEffect(() => {
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

    return () => observer.disconnect()
  }, [])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const topAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_TOP_SLOT
  const bottomAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_BOTTOM_SLOT

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-secondary-500 text-sm">{post.readTime}</span>
              <span className="text-secondary-400">•</span>
              <time
                dateTime={post.publishedAt}
                className="text-secondary-500 text-sm"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              {post.updatedAt !== post.publishedAt && (
                <>
                  <span className="text-secondary-400 text-sm">•</span>
                  <span className="text-secondary-500 text-sm">
                    Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-900 mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-secondary-600 mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                    {post.author.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-secondary-900">{post.author.name}</p>
                  <p className="text-sm text-secondary-500">
                    {post.author.bio ? post.author.bio.split('.')[0] : 'Expert Contributor'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={shareOnTwitter}
                  className="p-2 text-secondary-500 hover:text-[#1DA1F2] hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="p-2 text-secondary-500 hover:text-[#4267B2] hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 text-secondary-500 hover:text-[#0077b5] hover:bg-blue-50 rounded-lg transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button
                  onClick={copyLink}
                  className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors relative"
                  title="Copy Link"
                >
                  <LinkIcon className="h-5 w-5" />
                  {showCopied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary-800 text-white text-xs px-2 py-1 rounded">
                      Copied!
                    </span>
                  )}
                </button>
                <button
                  onClick={() => window.print()}
                  className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Print"
                >
                  <Printer className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={post.headings} activeHeading={activeHeading} />

            </div>
          </aside>

          {/* Main Article Content */}
          <div className="flex-1 max-w-3xl">
            {/* Featured Image */}
            <div className="aspect-video relative rounded-2xl mb-8 overflow-hidden border border-secondary-100 shadow-sm bg-secondary-50">
              <img
                src={post.imageUrl || 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200'}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200';
                }}
              />
            </div>

            {/* Top Article Ad */}
            {topAdSlot && <AdSenseSlot slot={topAdSlot} format="responsive" />}

            {/* Quick Answer */}
            {post.quickAnswer && (
              <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-2xl mb-8">
                <div className="flex items-center gap-2 text-primary-800 font-bold mb-2">
                  <Info className="h-5 w-5" />
                  Quick Answer
                </div>
                <p className="text-primary-900 leading-relaxed italic">
                  {post.quickAnswer}
                </p>
              </div>
            )}

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-secondary-900 text-white p-8 rounded-3xl mb-12 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 !mt-0">
                  <CheckCircle2 className="h-6 w-6 text-primary-400" />
                  Key Takeaways
                </h2>
                <ul className="grid gap-4 list-none !pl-0">
                  {post.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3 text-secondary-100 leading-relaxed !mb-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2.5 flex-shrink-0" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content with inline ads */}
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-headings:scroll-mt-24 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 pt-8 border-t border-secondary-100">
                <h2 className="text-3xl font-bold text-secondary-900 mb-8 flex items-center gap-3">
                  <HelpCircle className="h-7 w-7 text-primary-600" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="bg-secondary-50 p-6 rounded-2xl border border-secondary-100">
                      <h3 className="text-xl font-bold text-secondary-900 mb-3 mt-0">
                        {faq.question}
                      </h3>
                      <p className="text-secondary-700 mb-0 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References Section */}
            {post.references && post.references.length > 0 && (
              <div className="mt-12 pt-8 border-t border-secondary-100">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary-400 mb-4">
                  Sources & References
                </h3>
                <ul className="grid gap-3 !pl-0 list-none">
                  {post.references.map((ref, i) => (
                    <li key={i} className="!mb-0">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary-500 hover:text-primary-600 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="underline underline-offset-4 decoration-secondary-200 group-hover:decoration-primary-300">
                          {ref.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Article Ad */}
            {bottomAdSlot && <AdSenseSlot slot={bottomAdSlot} format="responsive" />}

            {/* Disclosure & Review Info */}
            <div className="mt-12 pt-8 border-t border-secondary-100 flex flex-col md:flex-row justify-between gap-8 items-start">
              <div className="flex-1">
                <p className="text-xs text-secondary-400 leading-relaxed italic">
                  <strong>Professional Disclosure:</strong> The information provided in this guide is for educational purposes only. It does not constitute individualized financial, legal, or tax advice. We recommend consulting with a certified professional before making significant financial decisions.
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-secondary-400">
                <p><strong>Last Fact-Checked:</strong> {new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                <p><strong>Editorial Integrity:</strong> <Link href="/editorial-policy" className="underline hover:text-primary-600">Editorial Policy</Link></p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 bg-secondary-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary-200 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-xl">
                    {post.author.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-secondary-900 text-lg mb-1">
                    Written by {post.author.name}
                  </p>
                  <p className="text-secondary-600 leading-relaxed">
                    {post.author.bio || 'The SmartMoneyPath Editorial Team provides objective, data-backed financial education.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Share Bar */}
            <div className="mt-8 bg-primary-50 rounded-xl p-4 flex items-center justify-between">
              <span className="font-medium text-secondary-700">Share this article:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareOnTwitter}
                  className="p-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da] transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="p-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#006396] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Popular Topics */}
              <div className="bg-white rounded-2xl border border-secondary-200 p-6">
                <h3 className="font-bold text-secondary-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {['Budgeting', 'Investing', 'Saving', 'Retirement', 'Debt'].map(
                    (topic) => (
                      <Link
                        key={topic}
                        href={`/categories/${topic.toLowerCase()}`}
                        className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                      >
                        {topic}
                      </Link>
                    )
                  )}
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts currentPostId={post.id} category={post.category} />
    </article>
  )
}
