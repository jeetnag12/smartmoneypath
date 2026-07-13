import { blogPosts as legacyBlogPosts } from './blog-posts-data'
import { newBlogPosts } from './blog-posts-new-data'

export interface Post {
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
  slug: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  imageUrl: string
  quickAnswer?: string
  keyTakeaways?: string[]
  references?: { title: string; url: string }[]
  faqs?: { question: string; answer: string }[]
  // Audited fields
  reviewedBy?: {
    name: string
    avatar: string
    bio: string
  }
  relatedKeywords?: string[]
  imageAlt?: string
}

// Author list for peer-review mapping
const reviewers = {
  sarah: {
    name: 'Sarah Chen',
    avatar: '/images/authors/sarah.jpg',
    bio: 'Sarah is a Certified Financial Planner (CFP) with over a decade of experience helping families navigate debt and build lasting wealth. She specializes in practical, data-driven budgeting and emergency planning.',
  },
  michael: {
    name: 'Michael Ross',
    avatar: '/images/authors/michael.jpg',
    bio: 'Michael Ross is a former investment banker with a passion for democratizing financial knowledge. He specializes in low-cost passive investing and long-term asset allocation.',
  },
  emma: {
    name: 'Emma Wilson',
    avatar: '/images/authors/emma.jpg',
    bio: 'Emma specializes in budgeting frameworks and credit management. She focuses on providing practical, actionable tips for millennial and Gen Z money management.',
  }
}

// Combine and process legacy and new posts
const getProcessedPosts = (): Post[] => {
  // Convert newBlogPosts to Post shape by generating slugs
  const formattedNewPosts = newBlogPosts.map(post => ({
    ...post,
    slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  })) as Post[]

  const combinedRawPosts: Post[] = [...legacyBlogPosts, ...formattedNewPosts]

  return combinedRawPosts.map(post => {
    // Dynamic Peer-Review Assignment (E-E-A-T)
    let peerReviewer = reviewers.sarah
    if (post.author.name === 'Sarah Chen') {
      peerReviewer = reviewers.michael
    } else if (post.author.name === 'Michael Ross') {
      peerReviewer = reviewers.sarah
    } else if (post.author.name === 'Emma Wilson') {
      peerReviewer = reviewers.sarah
    } else if (post.author.name === 'David Park') {
      peerReviewer = reviewers.emma
    } else {
      peerReviewer = reviewers.sarah
    }

    // Dynamic Related Keywords
    const focus = post.focusKeyword || ''
    const related = post.relatedKeywords || post.tags.filter(t => t.toLowerCase() !== focus.toLowerCase())

    // Dynamic Image Alt Text
    const alt = post.imageAlt || `${post.title} - Featured Image representing ${post.category} insights`

    return {
      ...post,
      slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      reviewedBy: post.reviewedBy || peerReviewer,
      relatedKeywords: related,
      imageAlt: alt
    }
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getAllPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getProcessedPosts()
}

export async function getPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getProcessedPosts().find((post) => post.id === parseInt(id)) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const targetSlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return getProcessedPosts().filter(
    (post) => post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === targetSlug
  )
}

export async function getRelatedPosts(
  currentId: number,
  category: string,
  limit: number = 3
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  const posts = getProcessedPosts()
  return posts
    .filter(
      (post) =>
        post.id !== currentId &&
        (post.category === category || post.tags.some((tag) =>
          posts
            .find((p) => p.id === currentId)
            ?.tags.includes(tag)
        ))
    )
    .slice(0, limit)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return getProcessedPosts().find((post) => post.slug === slug) || null
}
