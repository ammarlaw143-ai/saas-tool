"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, BookOpen, Clock, Calendar, ArrowRight, 
  Sparkles, Filter, Newspaper, Bookmark
} from "lucide-react";

// Mock Blog Posts Database
const BLOG_POSTS = [
  {
    title: "How to Compress PDF Files Securely In-Browser Without Data Loss",
    slug: "secure-pdf-compression",
    desc: "Understand how client-side WebAssembly compilers modify and compress document vectors directly inside browser sandboxes, avoiding remote data exposure.",
    category: "PDF Guides",
    date: "July 01, 2026",
    readTime: "4 min read",
    author: "Dr. Karen Vance",
    gradient: "from-indigo-950 to-purple-950",
  },
  {
    title: "Making QR Codes Stand Out: Custom Gradients, Eye Structures, and Branding",
    slug: "designing-better-qr-codes",
    desc: "A comprehensive style layout guide on replacing default blocky QR codes with custom branding markers, rounded contours, and scalable SVG vectors.",
    category: "Design Systems",
    date: "June 25, 2026",
    readTime: "6 min read",
    author: "Marcus Aurelius",
    gradient: "from-purple-950 to-pink-950",
  },
  {
    title: "Understanding JSON Formats: Beautifiers, Parsers, and Syntax Validators",
    slug: "json-formatting-and-validation",
    desc: "Explore details of JSON schemas, parse try-catch error checks, and see how online beautifiers structure nested trees for maximum human readability.",
    category: "Developer Utilities",
    date: "June 18, 2026",
    readTime: "3 min read",
    author: "Elena Rostova",
    gradient: "from-pink-950 to-indigo-950",
  },
  {
    title: "AI Assets Generation: Building Functional Layouts with Natural Language",
    slug: "generative-ai-webdesign",
    desc: "How prompt-based AI code engines translate basic styling instructions into responsive utility CSS structures, saving hours of boilerplate development.",
    category: "AI Innovations",
    date: "June 10, 2026",
    readTime: "8 min read",
    author: "Linus Patterson",
    gradient: "from-indigo-950 to-slate-900",
  },
];

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "PDF Guides", "Design Systems", "Developer Utilities", "AI Innovations"];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-400 font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>SEO Articles & Tutorials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">The ToolVerse AI Blog</h1>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Discover comprehensive technical breakdowns, graphic configurations, and best developer workspace practices.
        </p>
      </div>

      {/* Toolbar Search & Categories */}
      <div className="glass-panel border border-border/40 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        
        {/* Search */}
        <div className="w-full md:max-w-xs relative">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none transition-all placeholder:text-muted-foreground/60 text-foreground"
          />
        </div>

        {/* Categories Tab list */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Ad Space Area */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-muted/20 border border-border/30 rounded-2xl p-4 text-center text-[10px] text-muted-foreground font-mono">
          Ad Space (Google AdSense Responsive Leaderboard)
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div 
              key={post.slug}
              className="glass-panel border border-border/40 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all flex flex-col group"
            >
              {/* Header illustration */}
              <div className={`h-48 bg-gradient-to-tr ${post.gradient} flex items-center justify-center p-6 relative`}>
                <Bookmark className="w-10 h-10 text-white/60 group-hover:scale-110 transition-all duration-300" />
                <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-wider font-mono text-indigo-300 bg-indigo-950/65 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  {post.category}
                </span>
              </div>

              {/* Text content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-4 items-center text-[10px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg text-foreground group-hover:text-indigo-400 transition-all leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                    {post.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/20 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground font-semibold">By {post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/10 border border-border/30 rounded-2xl">
          <p className="text-muted-foreground text-sm font-semibold">No blog articles match your query parameters.</p>
        </div>
      )}
    </div>
  );
}
