'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  Bookmark,
  Printer,
  Target,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
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
}

interface BlogPostWithAdsProps {
  post: Post
}

// Parse content and insert ads between paragraphs
function parseContentWithAds(content: string): JSX.Element[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const children = Array.from(doc.body.children)

  const result: JSX.Element[] = []
  let adCounter = 0
  const adSlots = [
    { slot: 'in-article-1', format: 'in-article' as const },
    { slot: 'in-article-2', format: 'in-article' as const },
    { slot: 'in-article-3', format: 'rectangle' as const },
  ]

  children.forEach((child, index) => {
    // Add the original element
    result.push(
      <div
        key={`content-${index}`}
        dangerouslySetInnerHTML={{ __html: child.outerHTML }}
      />
    )

    // Insert ad after certain elements (h2, every 3-4 paragraphs)
    if (
      adCounter < adSlots.length &&
      (child.tagName === 'H2' || (child.tagName === 'P' && index % 4 === 3))
    ) {
      const adConfig = adSlots[adCounter]
      result.push(
        <AdSenseSlot
          key={`ad-${adCounter}`}
          slot={adConfig.slot}
          format={adConfig.format}
        />
      )
      adCounter++
    }
  })

  return result
}

export default function BlogPostWithAds({ post }: BlogPostWithAdsProps) {
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

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

  // Parse content with ads inserted
  const contentWithAds = useMemo(() => parseContentWithAds(post.content), [post.content])

  return (
    <article className="min-h-screen bg-white">
      {/* Header Ad Slot */}
      <div className="bg-secondary-50 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdSenseSlot slot="header-banner" format="header" />
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
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
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">{post.author.name}</p>
                  <p className="text-sm text-secondary-500">{post.author.bio}</p>
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
                  className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Bookmark"
                >
                  <Bookmark className="h-5 w-5" />
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

              {/* Sidebar Ad - Top */}
              <AdSenseSlot slot="sidebar-top" format="sidebar" className="mt-6" />
            </div>
          </aside>

          {/* Main Article Content */}
          <div className="flex-1 max-w-3xl">
            {/* Featured Image */}
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-6xl">💰</span>
            </div>

            {/* Top Article Ad */}
            <AdSenseSlot slot="article-top" format="leaderboard" />

            {/* Content with inline ads */}
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-headings:scroll-mt-24 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6">
              {contentWithAds}
            </div>

            {/* Bottom Article Ad */}
            <AdSenseSlot slot="article-bottom" format="responsive" />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-secondary-200">
              <h3 className="font-semibold text-secondary-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 bg-secondary-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-200 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-xl">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-secondary-900 text-lg mb-1">
                    Written by {post.author.name}
                  </p>
                  <p className="text-secondary-600">{post.author.bio}</p>
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
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5" />
                  <span className="font-semibold">Financial Goal Tracker</span>
                </div>
                <p className="text-primary-100 text-sm mb-4">
                  Track your progress towards financial independence with our free tools.
                </p>
                <button className="w-full bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                  Get Started Free
                </button>
              </div>

              {/* Sidebar Ad - Middle */}
              <AdSenseSlot slot="sidebar-middle" format="sidebar" />

              {/* Popular Topics */}
              <div className="bg-white rounded-2xl border border-secondary-200 p-6">
                <h3 className="font-bold text-secondary-900 mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {['Budgeting', 'Investing', 'Saving', 'Retirement', 'Debt'].map(
                    (topic) => (
                      <Link
                        key={topic}
                        href={`/${topic.toLowerCase()}`}
                        className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                      >
                        {topic}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Sidebar Ad - Bottom */}
              <AdSenseSlot slot="sidebar-bottom" format="rectangle" />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer Ad Slot */}
      <div className="bg-secondary-50 border-t border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdSenseSlot slot="footer-banner" format="footer" />
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts currentPostId={post.id} category={post.category} />
    </article>
  )
}
