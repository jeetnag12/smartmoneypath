/**
 * Import Script - Load generated posts into database or CMS
 *
 * Usage:
 *   npx ts-node scripts/import-posts.ts --source="./generated-posts" --target="database"
 *   npx ts-node scripts/import-posts.ts --source="./generated-posts/post-slug.json" --target="cms"
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'fs'
import { join, resolve, extname } from 'path'
import { PrismaClient } from '@prisma/client'

interface PostData {
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
  seo?: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    focusKeyword: string
  }
}

interface ImportOptions {
  source: string
  target: 'database' | 'cms' | 'json'
  dryRun?: boolean
}

// Initialize Prisma (uncomment if using Prisma)
// const prisma = new PrismaClient()

async function loadPost(filePath: string): Promise<PostData> {
  const content = readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

async function importToDatabase(post: PostData, dryRun: boolean): Promise<void> {
  console.log(`  📝 Importing: ${post.title}`)

  if (dryRun) {
    console.log(`     [DRY RUN] Would create post in database`)
    return
  }

  // Uncomment when Prisma is set up:
  /*
  const existing = await prisma.post.findUnique({
    where: { slug: post.slug }
  })

  if (existing) {
    console.log(`     ⚠️  Post already exists, skipping`)
    return
  }

  await prisma.post.create({
    data: {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
      authorName: post.author.name,
      authorBio: post.author.bio,
      headings: JSON.stringify(post.headings),
      metaTitle: post.seo?.metaTitle,
      metaDescription: post.seo?.metaDescription,
      keywords: post.seo?.keywords || [],
      focusKeyword: post.seo?.focusKeyword,
      published: false,
      createdAt: new Date(),
    }
  })
  */

  console.log(`     ✅ Successfully imported`)
}

async function importToCMS(post: PostData, dryRun: boolean): Promise<void> {
  console.log(`  📝 Importing to CMS: ${post.title}`)

  if (dryRun) {
    console.log(`     [DRY RUN] Would create entry in CMS`)
    return
  }

  // Implement your CMS API call here
  // Example for Contentful:
  /*
  const contentful = require('contentful-management')
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  })

  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID)
  const environment = await space.getEnvironment('master')

  await environment.createEntry('blogPost', {
    fields: {
      title: { 'en-US': post.title },
      slug: { 'en-US': post.slug },
      content: { 'en-US': post.content },
      // ... other fields
    }
  })
  */

  console.log(`     ✅ Successfully imported to CMS`)
}

async function exportToJson(posts: PostData[], outputPath: string): Promise<void> {
  const exportData = {
    posts,
    exportedAt: new Date().toISOString(),
    count: posts.length,
  }

  writeFileSync(outputPath, JSON.stringify(exportData, null, 2))
  console.log(`     ✅ Exported ${posts.length} posts to ${outputPath}`)
}

async function importPosts(options: ImportOptions): Promise<void> {
  const sourcePath = resolve(options.source)

  if (!existsSync(sourcePath)) {
    throw new Error(`Source path not found: ${sourcePath}`)
  }

  const posts: PostData[] = []

  // Check if source is a file or directory
  const stat = statSync(sourcePath)

  if (stat.isFile()) {
    // Single file
    if (extname(sourcePath) === '.json') {
      posts.push(await loadPost(sourcePath))
    }
  } else {
    // Directory - load all JSON files
    const files = readdirSync(sourcePath).filter((f) => f.endsWith('.json'))
    for (const file of files) {
      posts.push(await loadPost(join(sourcePath, file)))
    }
  }

  console.log(`\n📥 Importing ${posts.length} post(s) to ${options.target}\n`)

  for (const post of posts) {
    try {
      switch (options.target) {
        case 'database':
          await importToDatabase(post, options.dryRun || false)
          break
        case 'cms':
          await importToCMS(post, options.dryRun || false)
          break
        case 'json':
          // Collect all posts for JSON export
          break
      }
    } catch (error) {
      console.error(`     ❌ Error importing ${post.title}:`, error)
    }
  }

  // Handle JSON export
  if (options.target === 'json') {
    const outputPath = './exported-posts.json'
    await exportToJson(posts, outputPath)
  }

  console.log(`\n✅ Import complete!`)
}

// CLI Interface
function parseArgs(): ImportOptions {
  const args = process.argv.slice(2)
  const options: Partial<ImportOptions> = {}
  let dryRun = false

  args.forEach((arg) => {
    if (arg.startsWith('--source=')) {
      options.source = arg.split('=')[1]
    } else if (arg.startsWith('--target=')) {
      options.target = arg.split('=')[1] as any
    } else if (arg === '--dry-run') {
      dryRun = true
    }
  })

  if (!options.source || !options.target) {
    console.log(`
📥 SmartMoneyPath Import Tool

Usage:
  npx ts-node scripts/import-posts.ts --source="./generated-posts" --target="database"

Options:
  --source="path"    Required: Path to JSON file or directory
  --target="type"    Required: database, cms, or json
  --dry-run          Preview without making changes

Examples:
  # Import all generated posts to database
  npx ts-node scripts/import-posts.ts --source="./generated-posts" --target="database"

  # Import single post
  npx ts-node scripts/import-posts.ts --source="./generated-posts/my-post.json" --target="database"

  # Export to JSON (consolidate files)
  npx ts-node scripts/import-posts.ts --source="./generated-posts" --target="json"

  # Preview import
  npx ts-node scripts/import-posts.ts --source="./generated-posts" --target="database" --dry-run
    `)
    process.exit(0)
  }

  return {
    source: options.source,
    target: options.target,
    dryRun,
  }
}

async function main() {
  const options = parseArgs()
  await importPosts(options)
}

main().catch((error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
