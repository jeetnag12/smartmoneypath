import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ADSENSE_CLIENT_ID, SITE_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1B5E20' },
    { media: '(prefers-color-scheme: dark)', color: '#0D3311' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SmartMoneyPath | Personal Finance Blog',
    template: '%s | SmartMoneyPath',
  },
  description:
    'SmartMoneyPath helps Americans make smart financial decisions. Expert tips on saving, investing, credit cards, and building wealth in 2026.',
  keywords: [
    'personal finance',
    'budgeting',
    'investing',
    'saving money',
    'financial independence',
    'credit cards',
    'retirement planning',
    'debt management',
    'financial tips',
    'money management',
    'wealth building',
    'USA finance',
    '2026',
  ],
  authors: [{ name: 'SmartMoneyPath Editorial Team', url: `${SITE_URL}/about` }],
  creator: 'SmartMoneyPath',
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
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'SmartMoneyPath',
    title: 'SmartMoneyPath | Personal Finance Blog',
    description:
      'SmartMoneyPath helps Americans make smart financial decisions. Expert tips on saving, investing, credit cards, and building wealth in 2026.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SmartMoneyPath - Personal Finance Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartMoneyPath | Personal Finance Blog',
    description:
      'SmartMoneyPath helps Americans make smart financial decisions. Expert tips on saving, investing, credit cards, and building wealth in 2026.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
    },
  },
  category: 'Finance',
  classification: 'Personal Finance',
  referrer: 'origin-when-cross-origin',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'SmartMoneyPath',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />

        {/* Favicon */}
        <link rel="icon" href="/og-image.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
