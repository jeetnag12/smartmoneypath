import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostWithAds from '@/components/BlogPostWithAds'
import { getPostById, getAllPosts } from '@/lib/posts'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostById(params.id)

  if (!post) {
    return {
      title: 'Post Not Found | SmartMoneyPath',
    }
  }

  return {
    title: `${post.title} | SmartMoneyPath`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default async function ArticlePage({ params }: PageProps) {
  const post = await getPostById(params.id)

  if (!post) {
    notFound()
  }

  return <BlogPostWithAds post={post} />
}
