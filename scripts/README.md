# SmartMoneyPath Content Automation Scripts

This directory contains scripts for automating content generation for the SmartMoneyPath blog.

## Scripts Overview

### 1. `generate-blog-post.ts` - Template-Based Generator

Generates blog posts using pre-defined templates and content structures. Fast and free - no API costs.

**Features:**
- Template-based content generation
- SEO-optimized structure
- Batch generation from JSON file
- Automatic categorization
- Word count targeting

**Usage:**

```bash
# Single post
npx ts-node scripts/generate-blog-post.ts --topic="emergency fund basics"

# Batch generation
npx ts-node scripts/generate-blog-post.ts --file="scripts/topics-sample.json"

# With options
npx ts-node scripts/generate-blog-post.ts --topic="50/30/20 budget" --category="Budgeting" --words=2000 --tone="educational"
```

**Options:**
- `--topic`: Topic to write about (required for single mode)
- `--file`: JSON file with multiple topics for batch mode
- `--category`: Category override (Budgeting, Saving, Investing, etc.)
- `--tone`: Writing tone (professional, casual, educational, motivational)
- `--words`: Target word count (default: 1500)
- `--output`: Output directory (default: ./generated-posts)

---

### 2. `generate-with-ai.ts` - AI-Powered Generator

Uses Claude AI to generate high-quality, human-like content. Requires API key.

**Features:**
- AI-generated content with natural flow
- SEO optimization built-in
- FAQ sections
- Key takeaways and action steps
- Higher quality than templates

**Setup:**

```bash
# Install dependencies
npm install @anthropic-ai/sdk

# Create .env file
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

**Usage:**

```bash
npx ts-node scripts/generate-with-ai.ts --topic="emergency fund"
npx ts-node scripts/generate-with-ai.ts --topic="index funds" --category="Investing" --words=2500
```

---

### 3. `auto-publish.ts` - Auto-Scheduler (Optional)

Schedules and publishes posts automatically to your CMS or database.

**Features:**
- Schedule posts for future dates
- Auto-publish to CMS
- Content calendar management
- Bulk import to database

---

## Content Structure

Generated posts include:

1. **SEO Meta Data**
   - Title tag
   - Meta description
   - Keywords
   - Open Graph tags

2. **Article Structure**
   - Introduction with hook
   - Table of contents
   - Multiple H2 sections
   - H3 subsections
   - Bullet lists and numbered steps
   - Practical examples
   - Common mistakes section
   - Conclusion with CTA

3. **Additional Elements**
   - Author information
   - Tags
   - Reading time
   - Word count

---

## Sample Topics File

Create `topics.json` for batch generation:

```json
[
  {
    "topic": "emergency fund basics",
    "category": "Saving"
  },
  {
    "topic": "50/30/20 budget rule",
    "category": "Budgeting"
  },
  {
    "topic": "index fund investing",
    "category": "Investing"
  }
]
```

Then run:
```bash
npx ts-node scripts/generate-blog-post.ts --file="topics.json"
```

---

## Importing to CMS

After generating posts, import them to your CMS:

### Direct Import to Database

```typescript
import { PrismaClient } from '@prisma/client'
import posts from './generated-posts/*.json'

const prisma = new PrismaClient()

async function importPosts() {
  for (const post of posts) {
    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        published: true,
      }
    })
  }
}
```

### Headless CMS (Contentful, Sanity, etc.)

Use the CMS API to programmatically create entries from the generated JSON files.

---

## Workflow Recommendations

### Weekly Content Creation

```bash
# 1. Create content plan
echo '["topic1", "topic2", "topic3"]' > weekly-topics.json

# 2. Generate posts
npx ts-node scripts/generate-blog-post.ts --file="weekly-topics.json"

# 3. Review and edit generated files

# 4. Import to CMS
npx ts-node scripts/import-to-cms.ts

# 5. Schedule for publishing
```

### Monthly Bulk Generation

Use for creating content calendar 3 months ahead:

```bash
# Generate 12 posts at once
npx ts-node scripts/generate-blog-post.ts --file="quarterly-plan.json" --output="./content-queue"
```

---

## Customization

### Adding New Templates

Edit `generate-blog-post.ts` and add to `CONTENT_TEMPLATES`:

```typescript
const CONTENT_TEMPLATES: Record<string, ContentTemplate> = {
  'your-category': {
    sections: [
      { title: 'Introduction', type: 'intro' },
      { title: 'Key Concepts', type: 'concepts' },
      // ...
    ],
    keywords: ['keyword1', 'keyword2', 'keyword3'],
  },
}
```

### Customizing Tone

Modify the AI prompt in `generate-with-ai.ts` to match your brand voice.

---

## Best Practices

1. **Always review AI-generated content** before publishing
2. **Add real examples and data** to enhance credibility
3. **Update outdated information** (tax rates, limits, etc.)
4. **Include internal links** to related posts
5. **Add featured images** with proper SEO alt text
6. **Test reading flow** - ensure it sounds natural

---

## Troubleshooting

### API Rate Limits

If hitting Claude API limits:
- Use template generator for drafts
- Batch AI generation with delays
- Implement exponential backoff

### Content Quality

If content seems generic:
- Add more specific prompts
- Include examples in the topic
- Use the AI generator instead of templates
- Post-process to add personal touches

---

## Future Enhancements

- [ ] Image generation with DALL-E
- [ ] Automatic internal linking
- [ ] SEO scoring and suggestions
- [ ] Content freshness checker
- [ ] A/B testing title variants
