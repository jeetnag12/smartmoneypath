"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var blog_posts_data_1 = require("./lib/blog-posts-data");
var blog_posts_new_data_1 = require("./lib/blog-posts-new-data");
var allPosts = __spreadArray(__spreadArray([], blog_posts_data_1.blogPosts, true), blog_posts_new_data_1.newBlogPosts.map(function (p) { return (__assign(__assign({}, p), { slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })); }), true);
console.log("Total posts found:", allPosts.length);
var audits = allPosts.map(function (post) {
    var wordCount = post.content.split(/\s+/).length;
    var hasTable = post.content.includes('|') && post.content.includes('---');
    var hasExamples = post.content.toLowerCase().includes('example') || post.content.toLowerCase().includes('scenario');
    var hasReferences = Array.isArray(post.references) && post.references.length > 0;
    var hasKeyTakeaways = Array.isArray(post.keyTakeaways) && post.keyTakeaways.length > 0;
    var hasFaqs = Array.isArray(post.faqs) && post.faqs.length > 0;
    // Calculate a "weakness score" based on missing items
    var score = 0;
    if (wordCount < 600)
        score += 3;
    if (wordCount < 1000)
        score += 2;
    if (!hasTable)
        score += 2;
    if (!hasExamples)
        score += 2;
    if (!hasReferences)
        score += 2;
    if (!hasKeyTakeaways)
        score += 2;
    if (!hasFaqs)
        score += 1;
    return {
        id: post.id,
        title: post.title,
        wordCount: wordCount,
        hasTable: hasTable,
        hasExamples: hasExamples,
        hasReferences: hasReferences,
        hasKeyTakeaways: hasKeyTakeaways,
        hasFaqs: hasFaqs,
        score: score,
        category: post.category
    };
});
// Sort by score descending (highest score is weakest)
audits.sort(function (a, b) { return b.score - a.score || a.wordCount - b.wordCount; });
console.log("=== WEAKEST POSTS ===");
audits.slice(0, 15).forEach(function (audit, index) {
    console.log("".concat(index + 1, ". [ID: ").concat(audit.id, "] Score: ").concat(audit.score, " | Words: ").concat(audit.wordCount, " | Table: ").concat(audit.hasTable, " | Refs: ").concat(audit.hasReferences, " | Title: ").concat(audit.title));
});
