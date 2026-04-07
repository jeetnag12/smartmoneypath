'use client'

import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getAllPosts } from '@/lib/posts'

interface RelatedPost {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
}

interface RelatedPostsProps {
  currentPostId: number
  category: string
}

export default function RelatedPosts({ currentPostId, category }: RelatedPostsProps) {
  const [posts, setPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const allPosts = await getAllPosts()
        // Filter out current post and get posts from same category or other posts
        const related = allPosts
          .filter((post) => post.id !== currentPostId)
          .sort((a, b) => {
            // Prioritize same category
            const aSameCategory = a.category === category ? 1 : 0
            const bSameCategory = b.category === category ? 1 : 0
            return bSameCategory - aSameCategory
          })
          .slice(0, 3)
        setPosts(related)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [currentPostId, category])

  if (loading) {
    return (
      <section className="bg-secondary-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-secondary-500">Loading related articles...</div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="bg-secondary-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-secondary-900">Continue Reading</h2>
            <p className="text-secondary-600 mt-1">More articles you might enjoy</p>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/articles/${post.id}`}
              className="group bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <article className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-secondary-500">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-secondary-600 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium">
                  Read article
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-primary-600 font-medium"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
