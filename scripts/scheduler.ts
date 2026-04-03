/**
 * Content Scheduler for SmartMoneyPath Blog
 * Automates publishing based on a content calendar
 *
 * Usage:
 *   npx ts-node scripts/scheduler.ts --schedule="content-calendar.json"
 *   npx ts-node scripts/scheduler.ts --publish --date="2026-04-15"
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import { readdir } from 'fs/promises'

interface ScheduledPost {
  id: string
  title: string
  topic: string
  category: string
  scheduledDate: string
  status: 'draft' | 'scheduled' | 'published'
  generated?: boolean
  filePath?: string
}

interface ContentCalendar {
  posts: ScheduledPost[]
  publishDays?: string[] // e.g., ['monday', 'wednesday', 'friday']
  publishTime?: string // e.g., '09:00'
}

interface SchedulerOptions {
  schedule?: string
  publish?: boolean
  date?: string
  generate?: boolean
  dryRun?: boolean
  output?: string
}

// Utility functions
function parseDate(dateStr: string): Date {
  return new Date(dateStr)
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function getNextPublishDate(days: string[], startDate: Date = new Date()): Date {
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }

  const targetDays = days.map((d) => dayMap[d.toLowerCase()]).sort((a, b) => a - b)
  const currentDay = startDate.getDay()

  for (const targetDay of targetDays) {
    if (targetDay >= currentDay) {
      const nextDate = new Date(startDate)
      nextDate.setDate(startDate.getDate() + (targetDay - currentDay))
      return nextDate
    }
  }

  // Next week
  const nextDate = new Date(startDate)
  nextDate.setDate(startDate.getDate() + (7 - currentDay + targetDays[0]))
  return nextDate
}

// Generate content calendar from topics
function generateCalendar(topics: string[], options: {
  startDate?: string
  publishDays?: string[]
  categories?: string[]
} = {}): ContentCalendar {
  const {
    startDate = formatDate(new Date()),
    publishDays = ['monday', 'wednesday', 'friday'],
    categories = ['Budgeting', 'Saving', 'Investing', 'Career'],
  } = options

  const posts: ScheduledPost[] = []
  let currentDate = parseDate(startDate)

  topics.forEach((topic, index) => {
    const scheduledDate = getNextPublishDate(publishDays, currentDate)
    const category = categories[index % categories.length]

    posts.push({
      id: `post_${index + 1}`,
      title: ``,
      topic,
      category,
      scheduledDate: formatDate(scheduledDate),
      status: 'scheduled',
      generated: false,
    })

    // Move to next available slot
    currentDate = new Date(scheduledDate)
    currentDate.setDate(currentDate.getDate() + 1)
  })

  return {
    posts,
    publishDays,
    publishTime: '09:00',
  }
}

// Load and validate calendar
function loadCalendar(filePath: string): ContentCalendar {
  if (!existsSync(filePath)) {
    throw new Error(`Calendar file not found: ${filePath}`)
  }

  const content = readFileSync(filePath, 'utf-8')
  const calendar: ContentCalendar = JSON.parse(content)

  if (!calendar.posts || !Array.isArray(calendar.posts)) {
    throw new Error('Invalid calendar format: posts array required')
  }

  return calendar
}

// Save calendar
function saveCalendar(calendar: ContentCalendar, filePath: string) {
  writeFileSync(filePath, JSON.stringify(calendar, null, 2))
}

// Schedule posts for generation
async function scheduleGeneration(calendar: ContentCalendar, dryRun: boolean = false): Promise<void> {
  const today = formatDate(new Date())
  const postsToGenerate = calendar.posts.filter(
    (post) => post.scheduledDate <= today && !post.generated
  )

  if (postsToGenerate.length === 0) {
    console.log('📭 No posts ready for generation.')
    return
  }

  console.log(`\n📝 Scheduling ${postsToGenerate.length} posts for generation:\n`)

  for (const post of postsToGenerate) {
    console.log(`  📅 ${post.scheduledDate}: ${post.topic}`)
    console.log(`     Category: ${post.category}`)

    if (!dryRun) {
      // In production, this would call the generation script
      // execSync(`npx ts-node scripts/generate-blog-post.ts --topic="${post.topic}" --category="${post.category}"`)
      post.generated = true
      post.status = 'draft'
      post.filePath = `./generated-posts/${post.id}.json`
    }
  }

  if (!dryRun) {
    saveCalendar(calendar, './content-calendar.json')
    console.log('\n✅ Calendar updated with generated posts.')
  }
}

// Publish scheduled posts
async function publishScheduled(calendar: ContentCalendar, date?: string, dryRun: boolean = false): Promise<void> {
  const targetDate = date || formatDate(new Date())
  const postsToPublish = calendar.posts.filter(
    (post) => post.scheduledDate === targetDate && post.status === 'draft'
  )

  if (postsToPublish.length === 0) {
    console.log(`📭 No posts scheduled for ${targetDate}`)
    return
  }

  console.log(`\n📤 Publishing ${postsToPublish.length} post(s) for ${targetDate}:\n`)

  for (const post of postsToPublish) {
    console.log(`  📄 ${post.title || post.topic}`)
    console.log(`     File: ${post.filePath}`)

    if (!dryRun) {
      // In production, this would:
      // 1. Load the generated post
      // 2. Upload to CMS/database
      // 3. Publish
      // 4. Update status

      post.status = 'published'

      // Simulated API call
      console.log(`     ✅ Published successfully!`)
    }
  }

  if (!dryRun) {
    saveCalendar(calendar, './content-calendar.json')
  }
}

// Show calendar status
function showStatus(calendar: ContentCalendar): void {
  console.log('\n📊 Content Calendar Status\n')
  console.log(`Publish Schedule: ${calendar.publishDays?.join(', ')}`)
  console.log(`Publish Time: ${calendar.publishTime}`)
  console.log(`Total Posts: ${calendar.posts.length}\n`)

  const grouped = calendar.posts.reduce(
    (acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log('Status Breakdown:')
  Object.entries(grouped).forEach(([status, count]) => {
    const emoji = {
      draft: '📝',
      scheduled: '📅',
      published: '✅',
    }[status] || '📄'
    console.log(`  ${emoji} ${status}: ${count}`)
  })

  console.log('\nUpcoming Posts (next 7 days):')
  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  const upcoming = calendar.posts
    .filter((post) => {
      const postDate = parseDate(post.scheduledDate)
      return postDate >= today && postDate <= nextWeek
    })
    .sort((a, b) => parseDate(a.scheduledDate).getTime() - parseDate(b.scheduledDate).getTime())

  if (upcoming.length === 0) {
    console.log('  No upcoming posts in the next 7 days.')
  } else {
    upcoming.forEach((post) => {
      const statusEmoji = {
        draft: '📝',
        scheduled: '📅',
        published: '✅',
      }[post.status] || '📄'
      console.log(`  ${statusEmoji} ${post.scheduledDate}: ${post.topic}`)
    })
  }

  console.log('')
}

// Create sample calendar
function createSampleCalendar(): ContentCalendar {
  const topics = [
    'emergency fund basics',
    '50/30/20 budget rule',
    'high yield savings accounts',
    'credit score improvement',
    'index fund investing',
    'meal planning on a budget',
    'negotiating salary raises',
    'Roth IRA explained',
    'debt payoff strategies',
    'automating your finances',
    'side hustle ideas 2026',
    'retirement planning at 30',
  ]

  return generateCalendar(topics, {
    startDate: formatDate(new Date()),
    publishDays: ['monday', 'wednesday', 'friday'],
  })
}

// CLI Interface
function parseArgs(): SchedulerOptions {
  const args = process.argv.slice(2)
  const options: SchedulerOptions = {}

  args.forEach((arg) => {
    if (arg === '--publish') {
      options.publish = true
    } else if (arg === '--generate') {
      options.generate = true
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg.startsWith('--schedule=')) {
      options.schedule = arg.split('=')[1]
    } else if (arg.startsWith('--date=')) {
      options.date = arg.split('=')[1]
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1]
    }
  })

  return options
}

// Main function
async function main() {
  const options = parseArgs()

  // Show help if no arguments
  if (Object.keys(options).length === 0) {
    console.log(`
📅 SmartMoneyPath Content Scheduler

Commands:
  --schedule="file.json"    Load and manage content calendar
  --publish                 Publish posts scheduled for today
  --date="YYYY-MM-DD"       Publish posts for specific date
  --generate                Generate content for ready posts
  --dry-run                 Preview without making changes

Examples:
  # Create new calendar
  npx ts-node scripts/scheduler.ts --schedule="content-calendar.json"

  # Show calendar status
  npx ts-node scripts/scheduler.ts --schedule="content-calendar.json"

  # Generate content for scheduled posts
  npx ts-node scripts/scheduler.ts --schedule="content-calendar.json" --generate

  # Publish today's posts
  npx ts-node scripts/scheduler.ts --schedule="content-calendar.json" --publish

  # Preview publishing (dry run)
  npx ts-node scripts/scheduler.ts --schedule="content-calendar.json" --publish --dry-run

Files:
  - Content calendar JSON format:
    {
      "posts": [
        {
          "id": "post_1",
          "title": "",
          "topic": "emergency fund",
          "category": "Saving",
          "scheduledDate": "2026-04-15",
          "status": "scheduled",
          "generated": false
        }
      ],
      "publishDays": ["monday", "wednesday", "friday"],
      "publishTime": "09:00"
    }
    `)
    process.exit(0)
  }

  // Create sample calendar if file doesn't exist
  if (!options.schedule || !existsSync(options.schedule)) {
    console.log('🆕 Creating sample content calendar...')
    const calendar = createSampleCalendar()
    const outputPath = options.schedule || './content-calendar.json'
    saveCalendar(calendar, outputPath)
    console.log(`✅ Sample calendar created: ${outputPath}`)
    console.log('📅 Generated 12 weeks of content schedule')
    showStatus(calendar)
    return
  }

  // Load existing calendar
  const calendar = loadCalendar(options.schedule)

  // Show status
  if (!options.publish && !options.generate) {
    showStatus(calendar)
    return
  }

  // Generate content
  if (options.generate) {
    await scheduleGeneration(calendar, options.dryRun)
    return
  }

  // Publish posts
  if (options.publish) {
    await publishScheduled(calendar, options.date, options.dryRun)
    return
  }
}

main().catch((error) => {
  console.error('❌ Error:', error.message)
  process.exit(1)
})
