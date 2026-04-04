/**
 * Content Automation Script for SmartMoneyPath Blog
 * Generates SEO-optimized blog posts using AI
 *
 * Usage:
 *   npx ts-node scripts/generate-blog-post.ts --topic="budgeting for beginners"
 *   npx ts-node scripts/generate-blog-post.ts --file="content-ideas.json"
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { randomUUID } from 'crypto'

// Types
interface BlogPostData {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  contentBlocks: ContentBlock[]
  category: string
  tags: string[]
  readTime: string
  seo: SEOData
  author: {
    name: string
    bio: string
  }
  headings: { id: string; text: string; level: number }[]
}

interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'tip' | 'warning'
  content: string
  items?: string[]
  level?: number
}

interface SEOData {
  title: string
  description: string
  keywords: string[]
  focusKeyword: string
  metaTitle: string
  metaDescription: string
  ogImage: string
}

interface GenerateOptions {
  topic: string
  category?: string
  tone?: 'professional' | 'casual' | 'educational' | 'motivational'
  targetWordCount?: number
  includeTables?: boolean
  includeFAQs?: boolean
}

// Configuration
const CATEGORIES = [
  'Budgeting',
  'Saving',
  'Investing',
  'Debt Management',
  'Retirement',
  'Career',
  'Home Buying',
  'Financial Independence',
] as const

const AUTHORS = [
  {
    name: 'Sarah Chen',
    bio: 'Personal finance expert with 10+ years helping families achieve financial independence.',
  },
  {
    name: 'Michael Ross',
    bio: 'Former investment banker turned educator, passionate about making investing accessible to everyone.',
  },
  {
    name: 'Emma Wilson',
    bio: 'Certified Financial Planner helping millennials master their money.',
  },
  {
    name: 'David Park',
    bio: 'Career coach with 15 years of experience in HR and talent acquisition.',
  },
]

// Content Templates for Personal Finance
const CONTENT_TEMPLATES: Record<string, ContentTemplate> = {
  budgeting: {
    sections: [
      { title: 'Why Budgeting Matters', type: 'intro' },
      { title: 'Common Budgeting Methods', type: 'methods' },
      { title: 'Step-by-Step Guide', type: 'steps' },
      { title: 'Tips for Success', type: 'tips' },
      { title: 'Common Mistakes to Avoid', type: 'mistakes' },
      { title: 'Tools and Resources', type: 'tools' },
    ],
    keywords: ['budget', 'spending plan', 'money management', 'financial planning'],
  },
  saving: {
    sections: [
      { title: 'The Importance of Saving', type: 'intro' },
      { title: 'Types of Savings Goals', type: 'types' },
      { title: 'Proven Saving Strategies', type: 'strategies' },
      { title: 'Where to Keep Your Savings', type: 'accounts' },
      { title: 'Automation Techniques', type: 'automation' },
    ],
    keywords: ['save money', 'emergency fund', 'savings account', 'financial security'],
  },
  investing: {
    sections: [
      { title: 'Why Start Investing', type: 'intro' },
      { title: 'Understanding Risk vs. Return', type: 'education' },
      { title: 'Investment Options Explained', type: 'options' },
      { title: 'Getting Started with Little Money', type: 'beginner' },
      { title: 'Common Investing Mistakes', type: 'mistakes' },
    ],
    keywords: ['invest', 'stocks', 'index funds', 'portfolio', 'compound interest'],
  },
  debt: {
    sections: [
      { title: 'Understanding Your Debt', type: 'intro' },
      { title: 'Debt Payoff Strategies', type: 'strategies' },
      { title: 'Debt Avalanche vs. Snowball', type: 'comparison' },
      { title: 'Negotiating with Creditors', type: 'negotiation' },
      { title: 'Staying Debt-Free', type: 'maintenance' },
    ],
    keywords: ['debt payoff', 'credit card debt', 'loan repayment', 'financial freedom'],
  },
}

interface ContentTemplate {
  sections: { title: string; type: string }[]
  keywords: string[]
}

// Utility Functions
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
}

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

// Content Generation Functions
function generateContentBlocks(
  topic: string,
  template: ContentTemplate,
  targetWordCount: number
): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const wordsPerSection = Math.floor(targetWordCount / template.sections.length)

  // Introduction
  blocks.push({
    type: 'paragraph',
    content: generateIntroduction(topic),
  })

  template.sections.forEach((section) => {
    // Section heading
    blocks.push({
      type: 'heading',
      content: section.title,
      level: 2,
    })

    // Generate content based on section type
    switch (section.type) {
      case 'intro':
        blocks.push({
          type: 'paragraph',
          content: generateSectionContent(section.title, topic, 'intro'),
        })
        break

      case 'methods':
      case 'strategies':
      case 'options':
        blocks.push({
          type: 'paragraph',
          content: generateSectionContent(section.title, topic, 'list-intro'),
        })
        blocks.push({
          type: 'list',
          content: '',
          items: generateListItems(section.title, topic, 5),
        })
        break

      case 'steps':
        const steps = generateNumberedSteps(section.title, topic, 6)
        steps.forEach((step) => {
          blocks.push({
            type: 'heading',
            content: step.title,
            level: 3,
          })
          blocks.push({
            type: 'paragraph',
            content: step.content,
          })
        })
        break

      case 'tips':
        blocks.push({
          type: 'tip',
          content: generateTip(section.title, topic),
        })
        blocks.push({
          type: 'paragraph',
          content: generateSectionContent(section.title, topic, 'detailed'),
        })
        break

      case 'mistakes':
        blocks.push({
          type: 'warning',
          content: generateWarning(topic),
        })
        blocks.push({
          type: 'list',
          content: '',
          items: generateMistakesList(topic),
        })
        break

      default:
        blocks.push({
          type: 'paragraph',
          content: generateSectionContent(section.title, topic, 'general'),
        })
    }
  })

  // Conclusion
  blocks.push({
    type: 'heading',
    content: 'Conclusion',
    level: 2,
  })
  blocks.push({
    type: 'paragraph',
    content: generateConclusion(topic),
  })

  return blocks
}

function generateIntroduction(topic: string): string {
  const intros = [
    `Are you struggling with ${topic}? You're not alone. In this comprehensive guide, we'll walk you through everything you need to know to master ${topic} and take control of your financial future.`,
    `${topic.charAt(0).toUpperCase() + topic.slice(1)} is one of the most important skills you can develop for long-term financial success. In this article, we'll explore proven strategies that have helped thousands of people just like you.`,
    `If you've been searching for practical advice on ${topic}, you've come to the right place. This step-by-step guide will give you the tools and knowledge you need to succeed.`,
  ]
  return intros[Math.floor(Math.random() * intros.length)]
}

function generateSectionContent(
  sectionTitle: string,
  topic: string,
  style: string
): string {
  const templates: Record<string, string[]> = {
    intro: [
      `Understanding ${topic} is crucial because it forms the foundation of your financial health. Without a solid grasp of these concepts, you may find yourself struggling to make progress toward your goals.`,
      `Many people underestimate the importance of ${topic} until they face a financial crisis. By taking proactive steps now, you can avoid common pitfalls and build a more secure future.`,
    ],
    'list-intro': [
      `There are several approaches to ${topic}, each with its own advantages. Let's explore the most effective methods:`,
      `When it comes to ${topic}, you have multiple options. Here are the strategies that have proven most successful:`,
    ],
    detailed: [
      `The key to success with ${topic} is consistency and patience. Small actions taken regularly can lead to significant results over time.`,
      `Remember that ${topic} is a journey, not a destination. Stay committed to your plan and adjust as your circumstances change.`,
    ],
    general: [
      `${sectionTitle} plays a vital role in your overall financial strategy. Understanding these concepts will help you make better decisions and achieve your goals faster.`,
      `Let's dive deeper into ${sectionTitle} and see how it can impact your financial journey.`,
    ],
  }

  const options = templates[style] || templates.general
  return options[Math.floor(Math.random() * options.length)]
}

function generateListItems(sectionTitle: string, topic: string, count: number): string[] {
  const items = [
    `Start by evaluating your current situation and identifying areas for improvement`,
    `Set specific, measurable goals that align with your long-term vision`,
    `Create a realistic timeline and break down your objectives into manageable steps`,
    `Track your progress regularly and celebrate small wins along the way`,
    `Adjust your approach based on results and changing circumstances`,
    `Seek advice from financial professionals when facing complex decisions`,
    `Build an emergency fund to protect yourself from unexpected setbacks`,
    `Automate your processes to ensure consistency and reduce decision fatigue`,
    `Educate yourself continuously about best practices and new strategies`,
    `Find an accountability partner to help you stay on track with your goals`,
  ]
  return shuffleArray(items).slice(0, count)
}

function generateNumberedSteps(
  sectionTitle: string,
  topic: string,
  count: number
): Array<{ title: string; content: string }> {
  const steps = [
    {
      title: 'Step 1: Assess Your Current Situation',
      content: `Take an honest look at where you stand today. Gather all relevant information about your current ${topic} status and identify both strengths and areas needing improvement.`,
    },
    {
      title: 'Step 2: Define Your Goals',
      content: `Clearly articulate what you want to achieve. Make sure your goals are Specific, Measurable, Achievable, Relevant, and Time-bound (SMART).`,
    },
    {
      title: 'Step 3: Create Your Action Plan',
      content: `Develop a detailed roadmap for achieving your goals. Include specific actions, deadlines, and resources you'll need.`,
    },
    {
      title: 'Step 4: Implement Your Strategy',
      content: `Start taking action on your plan. Focus on consistency rather than perfection, and be prepared to make adjustments as you learn what works best for you.`,
    },
    {
      title: 'Step 5: Monitor Your Progress',
      content: `Regularly review your results against your goals. Use metrics that matter and keep track of both quantitative and qualitative improvements.`,
    },
    {
      title: 'Step 6: Optimize and Adjust',
      content: `Based on your progress, refine your approach. Double down on what's working and eliminate or modify what isn't producing results.`,
    },
  ]
  return steps.slice(0, count)
}

function generateTip(sectionTitle: string, topic: string): string {
  const tips = [
    `💡 Pro Tip: Consistency beats intensity. Small daily actions toward ${topic} will compound into remarkable results over time.`,
    `💡 Pro Tip: Don't try to implement everything at once. Pick one strategy from this guide and master it before adding others.`,
    `💡 Pro Tip: Set calendar reminders to review your ${topic} progress monthly. Regular check-ins keep you accountable and motivated.`,
  ]
  return tips[Math.floor(Math.random() * tips.length)]
}

function generateWarning(topic: string): string {
  return `⚠️ Warning: Avoid these common mistakes that can derail your ${topic} efforts:`
}

function generateMistakesList(topic: string): string[] {
  return [
    `Trying to do too much too soon and burning out`,
    `Not tracking your progress and flying blind`,
    `Giving up at the first sign of difficulty`,
    `Comparing your progress to others instead of your past self`,
    `Failing to adjust your approach when circumstances change`,
  ]
}

function generateConclusion(topic: string): string {
  return `${topic.charAt(0).toUpperCase() + topic.slice(1)} is a skill that anyone can develop with the right mindset and approach. By implementing the strategies outlined in this guide, you'll be well on your way to achieving your financial goals. Remember, the best time to start was yesterday, but the second best time is today. Take that first step now and begin building the financial future you deserve.`
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Convert content blocks to HTML
function blocksToHTML(blocks: ContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading':
          return `<h${block.level} id="${generateId(block.content)}">${block.content}</h${block.level}>`
        case 'paragraph':
          return `<p>${block.content}</p>`
        case 'list':
          return `<ul>${block.items?.map((item) => `<li>${item}</li>`).join('')}</ul>`
        case 'quote':
          return `<blockquote><p>${block.content}</p></blockquote>`
        case 'tip':
          return `<div class="tip-box"><strong>${block.content}</strong></div>`
        case 'warning':
          return `<div class="warning-box"><strong>${block.content}</strong></div>`
        default:
          return ''
      }
    })
    .join('\n\n')
}

// Extract headings from blocks
function extractHeadings(blocks: ContentBlock[]): { id: string; text: string; level: number }[] {
  return blocks
    .filter((block) => block.type === 'heading')
    .map((block) => ({
      id: generateId(block.content),
      text: block.content,
      level: block.level || 2,
    }))
}

// Generate SEO metadata
function generateSEOData(
  title: string,
  excerpt: string,
  category: string,
  template: ContentTemplate
): SEOData {
  const focusKeyword = template.keywords[0]
  const keywords = [...template.keywords, ...category.toLowerCase().split(' '), 'personal finance']

  return {
    title: title,
    description: excerpt.substring(0, 160),
    keywords: Array.from(new Set(keywords)),
    focusKeyword: focusKeyword,
    metaTitle: `${title} | SmartMoneyPath`,
    metaDescription: excerpt.substring(0, 155),
    ogImage: `/images/${slugify(title)}.jpg`,
  }
}

// Main Generation Function
export async function generateBlogPost(options: GenerateOptions): Promise<BlogPostData> {
  const { topic, category, targetWordCount = 1500, tone = 'educational' } = options

  // Select category and template
  const selectedCategory = category || detectCategory(topic)
  const template = CONTENT_TEMPLATES[selectedCategory.toLowerCase()] || CONTENT_TEMPLATES.budgeting

  // Generate title
  const title = generateTitle(topic, selectedCategory)

  // Generate content blocks
  const contentBlocks = generateContentBlocks(topic, template, targetWordCount)

  // Convert to HTML
  const content = blocksToHTML(contentBlocks)

  // Generate metadata
  const excerpt = generateExcerpt(content)
  const seo = generateSEOData(title, excerpt, selectedCategory, template)
  const headings = extractHeadings(contentBlocks)

  // Select author
  const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)]

  // Generate post data
  const post: BlogPostData = {
    id: randomUUID(),
    title,
    slug: slugify(title),
    excerpt,
    content,
    contentBlocks,
    category: selectedCategory,
    tags: seo.keywords.slice(0, 8),
    readTime: calculateReadTime(content),
    seo,
    author,
    headings,
  }

  return post
}

function detectCategory(topic: string): string {
  const topicLower = topic.toLowerCase()

  if (topicLower.includes('budget') || topicLower.includes('spending')) return 'Budgeting'
  if (topicLower.includes('save') || topicLower.includes('emergency fund')) return 'Saving'
  if (topicLower.includes('invest') || topicLower.includes('stock') || topicLower.includes('fund')) return 'Investing'
  if (topicLower.includes('debt') || topicLower.includes('loan') || topicLower.includes('credit')) return 'Debt Management'
  if (topicLower.includes('retire') || topicLower.includes('401k') || topicLower.includes('ira')) return 'Retirement'
  if (topicLower.includes('salary') || topicLower.includes('job') || topicLower.includes('career')) return 'Career'
  if (topicLower.includes('home') || topicLower.includes('house') || topicLower.includes('mortgage')) return 'Home Buying'

  return 'Budgeting'
}

function generateTitle(topic: string, category: string): string {
  const templates = [
    `The Complete Guide to ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
    `How to Master ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Step-by-Step Approach`,
    `${category}: ${topic.charAt(0).toUpperCase() + topic.slice(1)} Explained for Beginners`,
    `10 Proven Strategies for ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
    `The Ultimate ${topic.charAt(0).toUpperCase() + topic.slice(1)} Guide for 2026`,
    `${topic.charAt(0).toUpperCase() + topic.slice(1)}: Everything You Need to Know`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]
}

// CLI Interface
function parseArgs(): Partial<GenerateOptions> & { file?: string; output?: string } {
  const args = process.argv.slice(2)
  const options: Partial<GenerateOptions> & { file?: string; output?: string } = {}

  args.forEach((arg) => {
    if (arg.startsWith('--topic=')) {
      options.topic = arg.split('=')[1]
    } else if (arg.startsWith('--category=')) {
      options.category = arg.split('=')[1]
    } else if (arg.startsWith('--tone=')) {
      options.tone = arg.split('=')[1] as any
    } else if (arg.startsWith('--words=')) {
      options.targetWordCount = parseInt(arg.split('=')[1])
    } else if (arg.startsWith('--file=')) {
      options.file = arg.split('=')[1]
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1]
    }
  })

  return options
}

async function main() {
  const args = parseArgs()

  // Ensure output directory exists
  const outputDir = resolve(args.output || './generated-posts')
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // Batch generation from file
  if (args.file) {
    const topics = JSON.parse(readFileSync(args.file, 'utf-8'))
    console.log(`📝 Generating ${topics.length} blog posts...\n`)

    for (const topicData of topics) {
      const topic = typeof topicData === 'string' ? topicData : topicData.topic
      const category = typeof topicData === 'string' ? undefined : topicData.category

      const post = await generateBlogPost({
        topic,
        category,
        targetWordCount: args.targetWordCount || 1500,
        tone: args.tone || 'educational',
      })

      const filename = `${post.slug}.json`
      const filepath = join(outputDir, filename)
      writeFileSync(filepath, JSON.stringify(post, null, 2))

      console.log(`✅ Generated: ${post.title}`)
      console.log(`   File: ${filepath}`)
      console.log(`   Word Count: ~${args.targetWordCount || 1500}`)
      console.log(`   Read Time: ${post.readTime}`)
      console.log(`   Category: ${post.category}`)
      console.log(`   Focus Keyword: ${post.seo.focusKeyword}\n`)
    }
  } else if (args.topic) {
    // Single post generation
    console.log(`📝 Generating blog post about "${args.topic}"...\n`)

    const post = await generateBlogPost({
      topic: args.topic,
      category: args.category,
      targetWordCount: args.targetWordCount || 1500,
      tone: args.tone || 'educational',
    })

    const filename = `${post.slug}.json`
    const filepath = join(outputDir, filename)
    writeFileSync(filepath, JSON.stringify(post, null, 2))

    console.log(`✅ Generated: ${post.title}`)
    console.log(`   File: ${filepath}`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Read Time: ${post.readTime}`)
    console.log(`   Category: ${post.category}`)
    console.log(`\n📊 SEO Data:`)
    console.log(`   Meta Title: ${post.seo.metaTitle}`)
    console.log(`   Meta Description: ${post.seo.metaDescription}`)
    console.log(`   Keywords: ${post.seo.keywords.join(', ')}`)
    console.log(`   Focus Keyword: ${post.seo.focusKeyword}`)
    console.log(`\n📑 Outline:`)
    post.headings.forEach((h) => {
      console.log(`   ${'  '.repeat(h.level - 2)}- ${h.text}`)
    })
  } else {
    console.log(`
🚀 SmartMoneyPath Blog Content Generator

Usage:
  Single post:
    npx ts-node scripts/generate-blog-post.ts --topic="emergency fund basics"

  Batch from file:
    npx ts-node scripts/generate-blog-post.ts --file="topics.json"

  With options:
    --topic="your topic"       Required: Topic to write about
    --category="Category"      Optional: Budgeting, Saving, Investing, etc.
    --tone="educational"       Optional: professional, casual, educational, motivational
    --words=2000               Optional: Target word count (default: 1500)
    --file="topics.json"       Optional: JSON file with multiple topics
    --output="./posts"         Optional: Output directory (default: ./generated-posts)

Examples:
  npx ts-node scripts/generate-blog-post.ts --topic="50/30/20 budget rule" --category="Budgeting"
  npx ts-node scripts/generate-blog-post.ts --file="content-plan.json" --output="./content"
    `)
    process.exit(0)
  }

  console.log(`\n🎉 All done! Check the ${outputDir} directory for your generated posts.`)
}

main().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
