import { blogPosts } from './blog-posts-data'

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
}

// Use the generated blog posts
const posts: Post[] = blogPosts.map(post => ({
  ...post,
  // Ensure slug exists (for backward compatibility)
  slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}))

export async function getAllPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts
}

export async function getPostById(id: string): Promise<Post | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.find((post) => post.id === parseInt(id)) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getRelatedPosts(
  currentId: number,
  category: string,
  limit: number = 3
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
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
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.find((post) => post.slug === slug) || null
}
