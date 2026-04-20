import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostWithAds from '@/components/BlogPostWithAds'
import { getPostById, getAllPosts, getRelatedPosts } from '@/lib/posts'
import {
  ArticleSchema,
  FAQSchema,
  BreadcrumbSchema,
  extractFAQsFromContent,
} from '@/components/seo/JsonLdSchemas'

interface PageProps {
  params: { id: string }
}

export const dynamicParams = true
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://smartmoneypath-nu.vercel.app'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await getPostById(params.id)

    if (!post) {
      return {
        title: 'Post Not Found | SmartMoneyPath',
        robots: { index: false, follow: false },
      }
    }

    const canonicalUrl = `${BASE_URL}/articles/${post.id}`
    const ogImage = `${BASE_URL}/og-image.jpg`

    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
      authors: [{ name: post.author.name }],
      creator: post.author.name,
      publisher: 'SmartMoneyPath',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        title: post.metaTitle || `${post.title} | SmartMoneyPath`,
        description: post.metaDescription || post.excerpt,
        type: 'article',
        locale: 'en_US',
        url: canonicalUrl,
        siteName: 'SmartMoneyPath',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author.name],
        section: post.category,
        tags: post.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@smartmoneypath',
        creator: '@smartmoneypath',
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: [ogImage],
      },
      alternates: {
        canonical: canonicalUrl,
      },
      other: {
        'article:published_time': post.publishedAt,
        'article:modified_time': post.updatedAt,
        'article:author': post.author.name,
        'article:section': post.category,
        'article:tag': post.tags.join(','),
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

    // Get related posts
    const relatedPosts = await getRelatedPosts(post.id, post.category, 3)

    // Extract FAQs from content for schema
    const faqs = extractFAQsFromContent(post.content)

    // Breadcrumb items
    const breadcrumbItems = [
      { name: 'Home', url: BASE_URL },
      { name: 'Articles', url: `${BASE_URL}/articles` },
      { name: post.title, url: `${BASE_URL}/articles/${post.id}` },
    ]

    // Article URL
    const articleUrl = `${BASE_URL}/articles/${post.id}`

    return (
      <>
        {/* Schema Markup */}
        <ArticleSchema
          title={post.title}
          description={post.excerpt}
          author={post.author.name}
          publishedAt={post.publishedAt}
          updatedAt={post.updatedAt}
          url={articleUrl}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {faqs.length > 0 && <FAQSchema questions={faqs} />}

        {/* Main Article Component */}
        <BlogPostWithAds post={post} relatedPosts={relatedPosts} />
      </>
    )
  } catch (error) {
    console.error('Error loading article:', error)
    return notFound()
  }
}
