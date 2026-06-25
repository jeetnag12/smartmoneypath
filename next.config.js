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

compress: true,

async headers() {
return [
{
source: '/(.*)',
headers: [
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
{
key: 'Content-Security-Policy',
value:
"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https: https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net; connect-src 'self' https://*.google-analytics.com https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net; frame-src 'self' https://googleads.g.doubleclick.net https://*.google.com https://*.doubleclick.net https://*.googlesyndication.com;",
},
{
key: 'Cache-Control',
value: 'public, max-age=0, must-revalidate',
},
],
},
{
source: '/static/(.*)',
headers: [
{
key: 'Cache-Control',
value: 'public, max-age=31536000, immutable',
},
],
},
]
},

async redirects() {
return [
{
source: '/blog/:slug',
destination: '/articles/:slug',
permanent: true,
},
]
},

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
