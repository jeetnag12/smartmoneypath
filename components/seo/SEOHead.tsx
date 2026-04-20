import { Metadata } from 'next'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string[]
  author?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  canonicalUrl?: string
  noIndex?: boolean
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  author = 'SmartMoneyPath',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  canonicalUrl,
  noIndex = false,
}: SEOHeadProps): Metadata {
  const fullTitle = `${title} | SmartMoneyPath`

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: author }],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'SmartMoneyPath',
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@smartmoneypath',
      creator: '@smartmoneypath',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export function generateArticleMetadata(post: {
  title: string
  excerpt: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  author: { name: string }
  category: string
  id: number
  slug: string
}): Metadata {
  const canonicalUrl = `https://smartmoneypath-nu.vercel.app/articles/${post.id}`

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    author: post.author.name,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    canonicalUrl,
  })
}
