// JSON-LD Schema Components for SEO

interface ArticleSchemaProps {
  title: string
  description: string
  author: string
  publishedAt: string
  updatedAt: string
  url: string
  image?: string
}

export function ArticleSchema({
  title,
  description,
  author,
  publishedAt,
  updatedAt,
  url,
  image = 'https://smartmoneypath-nu.vercel.app/og-image.jpg',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SmartMoneyPath',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smartmoneypath-nu.vercel.app/logo.png',
      },
    },
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  sameAs?: string[]
}

export function OrganizationSchema({
  name = 'SmartMoneyPath',
  url = 'https://smartmoneypath-nu.vercel.app',
  logo = 'https://smartmoneypath-nu.vercel.app/logo.png',
  description = 'Helping Americans make smart financial decisions with expert tips on saving, investing, credit cards, and building wealth.',
  sameAs = [
    'https://twitter.com/smartmoneypath',
    'https://pinterest.com/smartmoneypath',
    'https://facebook.com/smartmoneypath',
  ],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: logo,
    },
    description,
    sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebSiteSchemaProps {
  name?: string
  url?: string
  searchUrl?: string
}

export function WebSiteSchema({
  name = 'SmartMoneyPath',
  url = 'https://smartmoneypath-nu.vercel.app',
  searchUrl = 'https://smartmoneypath-nu.vercel.app/articles?q=',
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function extractFAQsFromContent(content: string): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []

  // Match h3 questions followed by p answers
  const regex = /<h3[^\u003e]*\u003e([^]*?)\u003c\/h3\u003e\s*<p\u003e([^]*?)\u003c\/p\u003e/g
  let match

  while ((match = regex.exec(content)) !== null) {
    const question = match[1].replace(/\u003c[^\u003e]*\u003e/g, '').trim()
    const answer = match[2].replace(/\u003c[^\u003e]*\u003e/g, '').trim()

    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs.slice(0, 10) // Limit to 10 FAQs for schema
}
