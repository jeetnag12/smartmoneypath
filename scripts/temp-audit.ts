import { blogPosts } from '../lib/blog-posts-data';
import { newBlogPosts } from '../lib/blog-posts-new-data';
import * as fs from 'fs';
import * as path from 'path';

const allPosts = [
  ...blogPosts.map(p => ({ ...p, source: 'legacy' })),
  ...newBlogPosts.map(p => ({ ...p, source: 'new' }))
];

let report = `Total posts found: ${allPosts.length}\n`;
report += `Legacy posts: ${blogPosts.length}\n`;
report += `New posts: ${newBlogPosts.length}\n\n`;

report += "--- ARTICLE AUDIT DETAILS ---\n";
allPosts.forEach((post, index) => {
  const words = post.content.split(/\s+/).filter(Boolean).length;
  const headingsCount = post.headings ? post.headings.length : 0;
  const referencesCount = post.references ? post.references.length : 0;
  const faqsCount = post.faqs ? post.faqs.length : 0;
  const hasKeyTakeaways = post.keyTakeaways && post.keyTakeaways.length > 0 ? 'Yes' : 'No';
  const hasQuickAnswer = post.quickAnswer ? 'Yes' : 'No';
  const hasTables = post.content.includes('|') && post.content.includes('---') ? 'Yes' : 'No';
  
  // Find links in markdown
  const links = post.content.match(/\[.*?\]\((.*?)\)/g) || [];
  const linksCount = links.length;
  const outboundLinksCount = links.filter(l => l.includes('http://') || l.includes('https://')).length;
  const internalLinksCount = linksCount - outboundLinksCount;

  report += `\n#${index + 1}: [ID: ${post.id}] "${post.title}" (${post.category})\n`;
  report += `  Source: ${post.source} | Words: ${words} | Headings: ${headingsCount}\n`;
  report += `  Quick Answer: ${hasQuickAnswer} | Key Takeaways: ${hasKeyTakeaways} | Tables: ${hasTables}\n`;
  report += `  References: ${referencesCount} | FAQs: ${faqsCount}\n`;
  report += `  Total Links: ${linksCount} (Internal: ${internalLinksCount}, Outbound: ${outboundLinksCount})\n`;
  
  // Look for weak elements
  const weaknesses: string[] = [];
  if (words < 1500) weaknesses.push(`Word count is thin (${words} words)`);
  if (headingsCount < 4) weaknesses.push(`Too few headings (${headingsCount})`);
  if (!post.references || post.references.length === 0) weaknesses.push('No references');
  if (!post.faqs || post.faqs.length === 0) weaknesses.push('No FAQs');
  if (!post.keyTakeaways || post.keyTakeaways.length === 0) weaknesses.push('No key takeaways');
  if (!post.quickAnswer) weaknesses.push('No quick answer');
  if (hasTables === 'No') weaknesses.push('No comparison table');
  if (internalLinksCount < 3) weaknesses.push(`Few internal links (${internalLinksCount})`);
  if (outboundLinksCount < 2) weaknesses.push(`Few outbound links (${outboundLinksCount})`);
  
  if (weaknesses.length > 0) {
    report += `  Weaknesses: ${weaknesses.join(', ')}\n`;
  } else {
    report += `  Weaknesses: None identified\n`;
  }
});

fs.writeFileSync(path.join(__dirname, 'audit_results.txt'), report, 'utf-8');
console.log("Audit complete. Results saved to scripts/audit_results.txt");
