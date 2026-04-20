import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const BASE_URL = 'https://smartmoneypath-nu.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts
  const posts = await getAllPosts()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic article routes
  const articleRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/articles/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // Category routes
  const categories = [...new Set(posts.map((post) => post.category))]
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes]
}
