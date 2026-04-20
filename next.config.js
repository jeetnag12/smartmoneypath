/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false,
    optimizePackageImports: ['lucide-react'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Compression
  compress: true,

  // Security headers and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.google-analytics.com; frame-src https://googleads.g.doubleclick.net;",
          },
          // Cache control for HTML
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        // Cache static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/(.*\\.(jpg|jpeg|png|gif|webp|svg))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/(.*\\.(woff|woff2|ttf|otf|eot))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect trailing slashes
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
      // Redirect old URLs if needed
      {
        source: '/blog/:slug',
        destination: '/articles/:slug',
        permanent: true,
      },
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/robots',
      },
    ]
  },
}

module.exports = nextConfig
