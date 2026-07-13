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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.getPostsByCategory = getPostsByCategory;
exports.getRelatedPosts = getRelatedPosts;
exports.getPostBySlug = getPostBySlug;
var blog_posts_data_1 = require("./blog-posts-data");
var blog_posts_new_data_1 = require("./blog-posts-new-data");
// Author list for peer-review mapping
var reviewers = {
    sarah: {
        name: 'Sarah Chen',
        avatar: '/images/authors/sarah.jpg',
        bio: 'Sarah is a Certified Financial Planner (CFP) with over a decade of experience helping families navigate debt and build lasting wealth. She specializes in practical, data-driven budgeting and emergency planning.',
    },
    michael: {
        name: 'Michael Ross',
        avatar: '/images/authors/michael.jpg',
        bio: 'Michael Ross is a former investment banker with a passion for democratizing financial knowledge. He specializes in low-cost passive investing and long-term asset allocation.',
    },
    emma: {
        name: 'Emma Wilson',
        avatar: '/images/authors/emma.jpg',
        bio: 'Emma specializes in budgeting frameworks and credit management. She focuses on providing practical, actionable tips for millennial and Gen Z money management.',
    }
};
// Combine and process legacy and new posts
var getProcessedPosts = function () {
    // Convert newBlogPosts to Post shape by generating slugs
    var formattedNewPosts = blog_posts_new_data_1.newBlogPosts.map(function (post) { return (__assign(__assign({}, post), { slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })); });
    var combinedRawPosts = __spreadArray(__spreadArray([], blog_posts_data_1.blogPosts, true), formattedNewPosts, true);
    return combinedRawPosts.map(function (post) {
        // Dynamic Peer-Review Assignment (E-E-A-T)
        var peerReviewer = reviewers.sarah;
        if (post.author.name === 'Sarah Chen') {
            peerReviewer = reviewers.michael;
        }
        else if (post.author.name === 'Michael Ross') {
            peerReviewer = reviewers.sarah;
        }
        else if (post.author.name === 'Emma Wilson') {
            peerReviewer = reviewers.sarah;
        }
        else if (post.author.name === 'David Park') {
            peerReviewer = reviewers.emma;
        }
        else {
            peerReviewer = reviewers.sarah;
        }
        // Dynamic Related Keywords
        var focus = post.focusKeyword || '';
        var related = post.relatedKeywords || post.tags.filter(function (t) { return t.toLowerCase() !== focus.toLowerCase(); });
        // Dynamic Image Alt Text
        var alt = post.imageAlt || "".concat(post.title, " - Featured Image representing ").concat(post.category, " insights");
        return __assign(__assign({}, post), { slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), reviewedBy: post.reviewedBy || peerReviewer, relatedKeywords: related, imageAlt: alt });
    }).sort(function (a, b) { return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(); });
};
function getAllPosts() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Simulate API delay
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    // Simulate API delay
                    _a.sent();
                    return [2 /*return*/, getProcessedPosts()];
            }
        });
    });
}
function getPostById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getProcessedPosts().find(function (post) { return post.id === parseInt(id); }) || null];
            }
        });
    });
}
function getPostsByCategory(category) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getProcessedPosts().filter(function (post) { return post.category.toLowerCase() === category.toLowerCase(); })];
            }
        });
    });
}
function getRelatedPosts(currentId_1, category_1) {
    return __awaiter(this, arguments, void 0, function (currentId, category, limit) {
        var posts;
        if (limit === void 0) { limit = 3; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent();
                    posts = getProcessedPosts();
                    return [2 /*return*/, posts
                            .filter(function (post) {
                            return post.id !== currentId &&
                                (post.category === category || post.tags.some(function (tag) {
                                    var _a;
                                    return (_a = posts
                                        .find(function (p) { return p.id === currentId; })) === null || _a === void 0 ? void 0 : _a.tags.includes(tag);
                                }));
                        })
                            .slice(0, limit)];
            }
        });
    });
}
function getPostBySlug(slug) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getProcessedPosts().find(function (post) { return post.slug === slug; }) || null];
            }
        });
    });
}
