import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostWithAds from '@/components/BlogPostWithAds'
import { getPostById, getAllPosts } from '@/lib/posts'

interface PageProps {
  params: { id: string }
}

export const dynamicParams = true

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Post Not Found | SmartMoneyPath',
    }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    if (!posts || posts.length === 0) {
      return []
    }
    return posts.map((post) => ({
      id: post.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ArticlePage({ params }: PageProps) {
  try {
    const post = await getPostById(params.id)

    if (!post) {
      return notFound()
    }

    return <BlogPostWithAds post={post} />
  } catch (error) {
    console.error('Error loading article:', error)
    return notFound()
  }
}
