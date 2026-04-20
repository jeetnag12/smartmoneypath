import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/private', '/draft'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/api'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://smartmoneypath-nu.vercel.app/sitemap.xml',
    host: 'https://smartmoneypath-nu.vercel.app',
  }
}
