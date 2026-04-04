'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Printer,
  ChevronRight,
  Target,
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

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  const [activeHeading, setActiveHeading] = useState('')

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
    if (typeof window === 'undefined') return
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

  return (
    <article className="min-h-screen bg-white">
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
              <span className="text-secondary-500 text-sm">
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-900 mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-secondary-600 mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-lg">
                  {post.author.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">{post.author.name}</p>
                  <div className="flex items-center gap-2 text-sm text-secondary-500">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="h-5 w-5" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={post.headings} activeHeading={activeHeading} />
            </div>
          </aside>

          <div className="flex-1 max-w-3xl">
            <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-6xl">💰</span>
            </div>

            <AdSenseSlot slot="article-top" format="leaderboard" />

            <div
              className="prose prose-lg max-w-none prose-headings:text-secondary-900 prose-p:text-secondary-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-code:text-primary-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <AdSenseSlot slot="article-middle" format="responsive" />

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

            <div className="mt-8 bg-secondary-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-200 flex-shrink-0 flex items-center justify-center text-primary-700 font-bold text-xl"
                >
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

            <AdSenseSlot slot="article-bottom" format="responsive" />
          </div>

          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
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

              <AdSenseSlot slot="sidebar" format="sidebar" />
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts currentPostId={post.id} category={post.category} />
    </article>
  )
}
