/**
 * AI-Powered Content Generator
 * Uses Claude API or OpenAI API to generate high-quality blog posts
 *
 * Setup:
 *   1. Set ANTHROPIC_API_KEY or OPENAI_API_KEY in your .env file
 *   2. npm install @anthropic-ai/sdk openai
 *
 * Usage:
 *   npx ts-node scripts/generate-with-ai.ts --topic="emergency fund"
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import { randomUUID } from 'crypto'

// Use Anthropic SDK for Claude (recommended)
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface GenerateOptions {
  topic: string
  category?: string
  tone?: string
  targetWordCount?: number
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  readTime: string
  author: {
    name: string
    bio: string
  }
  headings: { id: string; text: string; level: number }[]
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    focusKeyword: string
  }
}

const AUTHORS = [
  {
    name: 'Sarah Chen',
    bio: 'Personal finance expert with 10+ years helping families achieve financial independence.',
  },
  {
    name: 'Michael Ross',
    bio: 'Former investment banker turned educator, passionate about making investing accessible.',
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60)
}

function buildPrompt(options: GenerateOptions): string {
  const { topic, category = 'Personal Finance', tone = 'educational', targetWordCount = 1500 } = options

  return `You are an expert personal finance content writer. Write a comprehensive, SEO-optimized blog post about "${topic}".

## Requirements:
- Word Count: Approximately ${targetWordCount} words
- Tone: ${tone} (engaging, helpful, authoritative but approachable)
- Category: ${category}

## Structure:
1. Compelling title (SEO-friendly, under 60 characters)
2. Engaging introduction that hooks the reader
3. Table of contents (outline the main sections)
4. Multiple H2 sections covering key aspects
5. H3 subsections for detailed breakdowns
6. Practical tips and actionable advice
7. Real examples or scenarios where appropriate
8. Common mistakes to avoid section
9. Tools/resources recommendations
10. Conclusion with clear next steps

## SEO Requirements:
- Include relevant keywords naturally throughout
- Focus keyword: ${topic.split(' ').slice(0, 3).join(' ')}
- Meta description: 155 characters max
- Use transition words
- Include internal linking opportunities (suggest where links could go)
- Add FAQ section at the end

## Formatting:
- Use markdown format
- Include bullet points and numbered lists
- Use bold for emphasis
- Include a "Key Takeaways" box
- Include a "Quick Action Steps" checklist

## Output Format:
Return a JSON object with this structure:
{
  "title": "Post Title",
  "slug": "post-slug",
  "excerpt": "Compelling 160-char excerpt",
  "content": "Full HTML/markdown content",
  "category": "Category",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "metaTitle": "SEO Title | SmartMoneyPath",
  "metaDescription": "Meta description",
  "focusKeyword": "main keyword",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "outline": [
    {"text": "Heading Text", "level": 2},
    {"text": "Subheading", "level": 3}
  ]
}

Make the content practical, actionable, and genuinely helpful for readers. Avoid fluff and generic advice. Include specific numbers, percentages, and concrete examples where possible.`
}

async function generateWithAI(options: GenerateOptions): Promise<BlogPost> {
  console.log('🤖 Generating content with AI...\n')

  const prompt = buildPrompt(options)

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Parse the response
    const responseText = message.content[0].text

    // Extract JSON from response (handle cases where AI includes markdown code blocks)
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
                     responseText.match(/```\n([\s\S]*?)\n```/) ||
                     responseText.match(/(\{[\s\S]*\})/)

    if (!jsonMatch) {
      throw new Error('Could not parse AI response as JSON')
    }

    const aiData = JSON.parse(jsonMatch[1] || jsonMatch[0])

    // Select random author
    const author = AUTHORS[Math.floor(Math.random() * AUTHORS.length)]

    // Calculate read time
    const wordCount = aiData.content.split(/\s+/).length
    const readTime = `${Math.ceil(wordCount / 200)} min read`

    // Build final post object
    const post: BlogPost = {
      id: randomUUID(),
      title: aiData.title,
      slug: aiData.slug || slugify(aiData.title),
      excerpt: aiData.excerpt,
      content: aiData.content,
      category: aiData.category || options.category || 'Personal Finance',
      tags: aiData.tags || aiData.keywords?.slice(0, 8) || [],
      readTime,
      author,
      headings: aiData.outline || [],
      seo: {
        metaTitle: aiData.metaTitle || `${aiData.title} | SmartMoneyPath`,
        metaDescription: aiData.metaDescription || aiData.excerpt.slice(0, 155),
        keywords: aiData.keywords || [],
        focusKeyword: aiData.focusKeyword || options.topic.split(' ')[0],
      },
    }

    return post
  } catch (error) {
    console.error('AI Generation Error:', error)
    throw error
  }
}

// CLI Interface
function parseArgs(): GenerateOptions {
  const args = process.argv.slice(2)
  const options: Partial<GenerateOptions> = {}

  args.forEach((arg) => {
    if (arg.startsWith('--topic=')) {
      options.topic = arg.split('=')[1]
    } else if (arg.startsWith('--category=')) {
      options.category = arg.split('=')[1]
    } else if (arg.startsWith('--tone=')) {
      options.tone = arg.split('=')[1]
    } else if (arg.startsWith('--words=')) {
      options.targetWordCount = parseInt(arg.split('=')[1])
    }
  })

  if (!options.topic) {
    console.log(`
🤖 SmartMoneyPath AI Content Generator

Usage:
  npx ts-node scripts/generate-with-ai.ts --topic="your topic here"

Options:
  --topic="..."       Required: The blog post topic
  --category="..."    Optional: Category (Budgeting, Saving, Investing, etc.)
  --tone="..."        Optional: Tone (educational, professional, casual)
  --words=2000        Optional: Target word count (default: 1500)

Examples:
  npx ts-node scripts/generate-with-ai.ts --topic="emergency fund basics"
  npx ts-node scripts/generate-with-ai.ts --topic="index fund investing" --category="Investing" --words=2500

Note: Set ANTHROPIC_API_KEY in your .env file
    `)
    process.exit(0)
  }

  return options as GenerateOptions
}

async function main() {
  const options = parseArgs()

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY not set in environment variables')
    console.log('\nPlease create a .env file with:')
    console.log('ANTHROPIC_API_KEY=your_api_key_here')
    process.exit(1)
  }

  console.log(`📝 Generating AI-powered blog post...`)
  console.log(`   Topic: ${options.topic}`)
  console.log(`   Category: ${options.category || 'Auto-detect'}`)
  console.log(`   Tone: ${options.tone || 'educational'}`)
  console.log(`   Target Words: ${options.targetWordCount || 1500}\n`)

  const post = await generateWithAI(options)

  // Save to file
  const outputDir = resolve('./generated-posts')
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const filename = `${post.slug}.json`
  const filepath = join(outputDir, filename)
  writeFileSync(filepath, JSON.stringify(post, null, 2))

  console.log(`\n✅ Post Generated Successfully!`)
  console.log(`\n📄 Details:`)
  console.log(`   Title: ${post.title}`)
  console.log(`   Slug: ${post.slug}`)
  console.log(`   Category: ${post.category}`)
  console.log(`   Read Time: ${post.readTime}`)
  console.log(`   File: ${filepath}`)

  console.log(`\n📊 SEO Information:`)
  console.log(`   Meta Title: ${post.seo.metaTitle}`)
  console.log(`   Meta Description: ${post.seo.metaDescription}`)
  console.log(`   Focus Keyword: ${post.seo.focusKeyword}`)
  console.log(`   Keywords: ${post.seo.keywords.join(', ')}`)

  console.log(`\n🏷️  Tags: ${post.tags.join(', ')}`)

  console.log(`\n📑 Content Outline:`)
  post.headings.forEach((heading) => {
    const indent = '  '.repeat(heading.level - 2)
    console.log(`   ${indent}→ ${heading.text}`)
  })

  console.log(`\n🎉 Done! Check ${filepath} for the full post.`)
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message)
  process.exit(1)
})
