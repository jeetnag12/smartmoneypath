import { blogPosts } from './lib/blog-posts-data';
import { newBlogPosts } from './lib/blog-posts-new-data';
import { Post } from './lib/posts';

const allPosts: Post[] = [
  ...blogPosts,
  ...newBlogPosts.map(p => ({
    ...p,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  })) as unknown as Post[]
];

console.log("Total posts found:", allPosts.length);

const audits = allPosts.map(post => {
  const wordCount = post.content.split(/\s+/).length;
  const hasTable = post.content.includes('|') && post.content.includes('---');
  const hasExamples = post.content.toLowerCase().includes('example') || post.content.toLowerCase().includes('scenario');
  const hasReferences = Array.isArray(post.references) && post.references.length > 0;
  const hasKeyTakeaways = Array.isArray(post.keyTakeaways) && post.keyTakeaways.length > 0;
  const hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0;
  
  // Calculate a "weakness score" based on missing items
  let score = 0;
  if (wordCount < 600) score += 3;
  if (wordCount < 1000) score += 2;
  if (!hasTable) score += 2;
  if (!hasExamples) score += 2;
  if (!hasReferences) score += 2;
  if (!hasKeyTakeaways) score += 2;
  if (!hasFaqs) score += 1;
  
  return {
    id: post.id,
    title: post.title,
    wordCount,
    hasTable,
    hasExamples,
    hasReferences,
    hasKeyTakeaways,
    hasFaqs,
    score,
    category: post.category
  };
});

// Sort by score descending (highest score is weakest)
audits.sort((a, b) => b.score - a.score || a.wordCount - b.wordCount);

console.log("=== WEAKEST POSTS ===");
audits.slice(0, 15).forEach((audit, index) => {
  console.log(`${index+1}. [ID: ${audit.id}] Score: ${audit.score} | Words: ${audit.wordCount} | Table: ${audit.hasTable} | Refs: ${audit.hasReferences} | Title: ${audit.title}`);
});
