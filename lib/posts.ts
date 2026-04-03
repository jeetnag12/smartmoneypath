export interface Post {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  readTime: string
  publishedAt: string
  updatedAt: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  headings: { id: string; text: string; level: number }[]
  slug: string
}

// Mock database of posts
const posts: Post[] = [
  {
    id: 1,
    title: 'The Ultimate Guide to Building an Emergency Fund',
    excerpt:
      'Learn how to build a 6-month emergency fund that will give you peace of mind and financial security in uncertain times.',
    category: 'Saving',
    tags: ['Emergency Fund', 'Saving Money', 'Financial Security', 'Budgeting', 'Money Tips'],
    readTime: '8 min read',
    publishedAt: '2026-03-28T10:00:00Z',
    updatedAt: '2026-03-28T10:00:00Z',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      bio: 'Personal finance expert with 10+ years helping families achieve financial independence.',
    },
    slug: 'emergency-fund-guide',
    headings: [
      { id: 'what-is-emergency-fund', text: 'What is an Emergency Fund?', level: 2 },
      { id: 'why-you-need-one', text: 'Why You Need an Emergency Fund', level: 2 },
      { id: 'how-much-to-save', text: 'How Much Should You Save?', level: 2 },
      { id: 'three-month-rule', text: 'The 3-Month Rule', level: 3 },
      { id: 'six-month-rule', text: 'The 6-Month Standard', level: 3 },
      { id: 'where-to-keep', text: 'Where to Keep Your Emergency Fund', level: 2 },
      { id: 'building-strategies', text: 'Strategies for Building Your Fund', level: 2 },
      { id: 'when-to-use', text: 'When to Use Your Emergency Fund', level: 2 },
    ],
    content: `
      <h2 id="what-is-emergency-fund">What is an Emergency Fund?</h2>
      <p>An emergency fund is a financial safety net designed to cover unexpected expenses or financial emergencies. This could include anything from sudden medical bills and car repairs to job loss or urgent home maintenance.</p>
      <p>Unlike your regular savings, an emergency fund should be easily accessible and kept separate from your day-to-day spending accounts. Think of it as insurance for your financial life – you hope you never need it, but you'll be grateful it's there when you do.</p>

      <h2 id="why-you-need-one">Why You Need an Emergency Fund</h2>
      <p>Life is unpredictable. Even the most careful financial planning can't prevent unexpected events from occurring. Here's why having an emergency fund is crucial:</p>
      <ul>
        <li><strong>Prevents debt accumulation:</strong> Without savings, unexpected expenses often end up on credit cards.</li>
        <li><strong>Reduces financial stress:</strong> Knowing you have a safety net provides peace of mind.</li>
        <li><strong>Maintains lifestyle:</strong> Helps you maintain your standard of living during tough times.</li>
        <li><strong>Provides flexibility:</strong> Gives you options when facing difficult decisions.</li>
      </ul>

      <h2 id="how-much-to-save">How Much Should You Save?</h2>
      <p>The amount you need in your emergency fund depends on your personal circumstances, including your monthly expenses, job stability, and family situation.</p>

      <h3 id="three-month-rule">The 3-Month Rule</h3>
      <p>For single earners with stable jobs and no dependents, a 3-month emergency fund might be sufficient. This covers basic expenses while you look for new employment or recover from a financial setback.</p>

      <h3 id="six-month-rule">The 6-Month Standard</h3>
      <p>Most financial experts recommend saving 3-6 months of essential expenses. If you have a family, variable income, or work in an unstable industry, aim for the higher end of this range or even more.</p>

      <h2 id="where-to-keep">Where to Keep Your Emergency Fund</h2>
      <p>Your emergency fund should be:</p>
      <ul>
        <li><strong>Accessible:</strong> You need to be able to withdraw funds quickly, typically within 24-48 hours.</li>
        <li><strong>Safe:</strong> Avoid investments that could lose value.</li>
        <li><strong>Earning interest:</strong> Even a small return is better than nothing.</li>
      </ul>
      <p>Consider high-yield savings accounts, money market accounts, or short-term CDs for your emergency fund.</p>

      <h2 id="building-strategies">Strategies for Building Your Fund</h2>
      <p>Building a 6-month emergency fund might seem daunting, but these strategies can help:</p>
      <ul>
        <li><strong>Start small:</strong> Aim for $1,000 first, then build from there.</li>
        <li><strong>Automate savings:</strong> Set up automatic transfers on payday.</li>
        <li><strong>Use windfalls:</strong> Put tax refunds, bonuses, and gifts toward your fund.</li>
        <li><strong>Cut expenses:</strong> Temporarily reduce discretionary spending.</li>
        <li><strong>Side hustle:</strong> Consider extra work to accelerate your savings.</li>
      </ul>

      <h2 id="when-to-use">When to Use Your Emergency Fund</h2>
      <p>Reserve your emergency fund for true emergencies only:</p>
      <ul>
        <li>Job loss or reduced income</li>
        <li>Medical emergencies</li>
        <li>Urgent home or car repairs</li>
        <li>Unexpected necessary travel</li>
      </ul>
      <p>Remember: Sales, vacations, and holiday shopping are not emergencies. Keep your fund sacred for situations that truly threaten your financial stability.</p>
    `,
  },
  {
    id: 2,
    title: 'Index Fund Investing for Beginners',
    excerpt:
      'Why index funds are the cornerstone of passive investing and how to get started with just $100.',
    category: 'Investing',
    tags: ['Index Funds', 'Investing', 'Passive Investing', 'ETFs', 'Stock Market'],
    readTime: '6 min read',
    publishedAt: '2026-03-25T10:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z',
    author: {
      name: 'Michael Ross',
      avatar: '/avatars/michael.jpg',
      bio: 'Former investment banker turned educator, passionate about making investing accessible to everyone.',
    },
    slug: 'index-fund-investing-beginners',
    headings: [
      { id: 'what-are-index-funds', text: 'What Are Index Funds?', level: 2 },
      { id: 'why-index-funds', text: 'Why Choose Index Funds?', level: 2 },
      { id: 'types-of-index-funds', text: 'Types of Index Funds', level: 2 },
      { id: 'getting-started', text: 'Getting Started with $100', level: 2 },
    ],
    content: '<p>Article content here...</p>',
  },
  {
    id: 3,
    title: '50/30/20 Budget Rule Explained',
    excerpt:
      'A simple budgeting framework that helps you balance needs, wants, and savings without the stress.',
    category: 'Budgeting',
    tags: ['Budgeting', '50/30/20 Rule', 'Money Management', 'Financial Planning'],
    readTime: '5 min read',
    publishedAt: '2026-03-22T10:00:00Z',
    updatedAt: '2026-03-22T10:00:00Z',
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/emma.jpg',
      bio: 'Certified Financial Planner helping millennials master their money.',
    },
    slug: '50-30-20-budget-rule',
    headings: [
      { id: 'what-is-rule', text: 'What is the 50/30/20 Rule?', level: 2 },
      { id: 'the-50-percent', text: '50%: Needs', level: 2 },
      { id: 'the-30-percent', text: '30%: Wants', level: 2 },
      { id: 'the-20-percent', text: '20%: Savings and Debt', level: 2 },
    ],
    content: '<p>Article content here...</p>',
  },
  {
    id: 4,
    title: 'How to Negotiate a Higher Salary',
    excerpt: 'Proven strategies and scripts to help you confidently ask for the raise you deserve.',
    category: 'Career',
    tags: ['Salary Negotiation', 'Career Growth', 'Professional Development', 'Income Growth'],
    readTime: '7 min read',
    publishedAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-20T10:00:00Z',
    author: {
      name: 'David Park',
      avatar: '/avatars/david.jpg',
      bio: 'Career coach with 15 years of experience in HR and talent acquisition.',
    },
    slug: 'negotiate-higher-salary',
    headings: [
      { id: 'research-phase', text: 'The Research Phase', level: 2 },
      { id: 'timing-is-key', text: 'Timing is Everything', level: 2 },
      { id: 'the-ask', text: 'Making the Ask', level: 2 },
      { id: 'handling-objections', text: 'Handling Objections', level: 2 },
    ],
    content: '<p>Article content here...</p>',
  },
]

export async function getAllPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts
}

export async function getPostById(id: string): Promise<Post | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.find((post) => post.id === parseInt(id)) || null
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export async function getRelatedPosts(
  currentId: number,
  category: string,
  limit: number = 3
): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts
    .filter(
      (post) =>
        post.id !== currentId &&
        (post.category === category || post.tags.some((tag) =>
          posts
            .find((p) => p.id === currentId)
            ?.tags.includes(tag)
        ))
    )
    .slice(0, limit)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return posts.find((post) => post.slug === slug) || null
}
