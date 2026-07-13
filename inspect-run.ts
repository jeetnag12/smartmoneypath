import { blogPosts } from './lib/blog-posts-data';
import { newBlogPosts } from './lib/blog-posts-new-data';

console.log("=== LEGACY POSTS ===");
blogPosts.forEach((p: any) => {
  console.log(`ID: ${p.id} | Title: ${p.title} | Category: ${p.category} | Slug: ${p.slug}`);
});

console.log("\n=== NEW POSTS ===");
newBlogPosts.forEach((p: any) => {
  console.log(`ID: ${p.id} | Title: ${p.title} | Category: ${p.category}`);
});
