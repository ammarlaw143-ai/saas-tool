"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "react-spring"; // wait, we are using framer-motion! Let's import from "framer-motion"
import { 
  Search, Grid, List, Sparkles, Star, Crown, 
  ArrowUpDown, Flame, Clock, Heart, Award, ArrowRight,
  Sparkle
} from "lucide-react";

// List of all tools
const TOOLS_DATA = [
  // PDF
  { name: "Merge PDF", slug: "merge-pdf", desc: "Combine multiple PDF files into one clean document.", category: "PDF", isPremium: false, rating: 4.8, isTrending: true, isPopular: true, dateAdded: "2026-01-10" },
  { name: "Split PDF", slug: "split-pdf", desc: "Extract specific pages or split PDF into separate files.", category: "PDF", isPremium: false, rating: 4.6, isTrending: false, isPopular: true, dateAdded: "2026-02-15" },
  { name: "Compress PDF", slug: "compress-pdf", desc: "Shrink PDF file sizes while preserving visual quality.", category: "PDF", isPremium: false, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-03-01" },
  { name: "Protect PDF", slug: "protect-pdf", desc: "Add password encryption and lock PDF permissions.", category: "PDF", isPremium: false, rating: 4.7, isTrending: false, isPopular: false, dateAdded: "2026-04-18" },
  { name: "Unlock PDF", slug: "unlock-pdf", desc: "Remove encryption and passwords from protected PDFs.", category: "PDF", isPremium: false, rating: 4.5, isTrending: false, isPopular: false, dateAdded: "2026-05-20" },
  // Images
  { name: "Image Compressor", slug: "image-compressor", desc: "Compress JPEG, PNG, or WEBP photos client-side.", category: "Images", isPremium: false, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-01-20" },
  { name: "Resize & Crop", slug: "resize-crop", desc: "Modify pixels, dimensions, and clip image bounds.", category: "Images", isPremium: false, rating: 4.7, isTrending: false, isPopular: false, dateAdded: "2026-02-28" },
  { name: "Format Converter", slug: "format-converter", desc: "Convert files between WebP, PNG, JPG, HEIC, and AVIF.", category: "Images", isPremium: false, rating: 4.8, isTrending: true, isPopular: true, dateAdded: "2026-03-15" },
  // Text
  { name: "Case Converter", slug: "case-converter", desc: "Toggle case, sentence caps, snake-case, or slugs.", category: "Text", isPremium: false, rating: 4.4, isTrending: false, isPopular: false, dateAdded: "2026-01-05" },
  { name: "Text Compare", slug: "text-compare", desc: "Find structural differences between two text drafts.", category: "Text", isPremium: false, rating: 4.7, isTrending: false, isPopular: true, dateAdded: "2026-02-12" },
  { name: "JSON Formatter", slug: "json-formatter", desc: "Beautify, parse, validate, and tree-visualize JSON.", category: "Text", isPremium: false, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-04-01" },
  // Developer
  { name: "UUID Generator", slug: "uuid-generator", desc: "Instantly compile batches of secure v4 UUID strings.", category: "Developer", isPremium: false, rating: 4.8, isTrending: false, isPopular: false, dateAdded: "2026-01-25" },
  { name: "Password Generator", slug: "password-generator", desc: "Create high-entropy passwords with custom parameters.", category: "Developer", isPremium: false, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-02-02" },
  { name: "JWT Decoder", slug: "jwt-decoder", desc: "Parse header JSON, payload payload data and structure.", category: "Developer", isPremium: false, rating: 4.6, isTrending: false, isPopular: false, dateAdded: "2026-05-10" },
  // Calculators
  { name: "Age & BMI Calculator", slug: "age-bmi-calculator", desc: "Compute age spans and body mass indexes quickly.", category: "Calculators", isPremium: false, rating: 4.5, isTrending: false, isPopular: false, dateAdded: "2026-03-22" },
  { name: "Loan & EMI Calculator", slug: "loan-emi-calculator", desc: "Simulate amortization timelines, interests, and EMIs.", category: "Calculators", isPremium: false, rating: 4.8, isTrending: false, isPopular: false, dateAdded: "2026-04-30" },
  // Custom QR
  { name: "Premium QR Studio", slug: "qr-studio", desc: "Generate custom QR codes with logos, eye shapes, and frames.", category: "QR Studio", isPremium: true, rating: 5.0, isTrending: true, isPopular: true, dateAdded: "2026-05-01" },
  // AI
  { name: "AI Image Generator", slug: "ai-image", desc: "Generate gorgeous artwork from prompts client-side.", category: "AI Tools", isPremium: true, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-06-01" },
  { name: "AI Resume Builder", slug: "ai-resume", desc: "Autofill resume schemas and build professional CVs.", category: "AI Tools", isPremium: true, rating: 4.8, isTrending: true, isPopular: false, dateAdded: "2026-06-15" },
  { name: "AI Website Builder", slug: "ai-website", desc: "Describe components and generate functional HTML.", category: "AI Tools", isPremium: true, rating: 4.9, isTrending: true, isPopular: true, dateAdded: "2026-06-28" },
];

import { motion as FramerMotion } from "framer-motion";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "date">("rating");
  const [filterType, setFilterType] = useState<"all" | "trending" | "popular" | "recent" | "favorites">("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = ["All", "PDF", "Images", "Text", "Developer", "Calculators", "QR Studio", "AI Tools"];

  // Load favorites
  useEffect(() => {
    const savedFavs = localStorage.getItem("favorites");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {}
    }
  }, []);

  const toggleFavorite = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated;
    if (favorites.includes(slug)) {
      updated = favorites.filter((f) => f !== slug);
    } else {
      updated = [...favorites, slug];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const processedTools = useMemo(() => {
    let list = [...TOOLS_DATA];

    // Filter Category
    if (activeCategory !== "All") {
      list = list.filter((t) => t.category === activeCategory);
    }

    // Filter Type Tabs
    if (filterType === "trending") {
      list = list.filter((t) => t.isTrending);
    } else if (filterType === "popular") {
      list = list.filter((t) => t.isPopular);
    } else if (filterType === "recent") {
      list = list.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (filterType === "favorites") {
      list = list.filter((t) => favorites.includes(t.slug));
    }

    // Search Query
    if (searchQuery) {
      list = list.filter((t) => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort By
    if (sortBy === "rating") {
      list = list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      list = list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "date") {
      list = list.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return list;
  }, [activeCategory, filterType, searchQuery, sortBy, favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col space-y-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>40+ Modular Browser Tools</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Tools Workspace Directory</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Choose a developer, formatting, or graphic editor tool. Process client-side instantly with maximum privacy.
          </p>
        </div>
      </div>

      {/* Grid of Search, Filters, Sorters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Categories card */}
          <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Categories</h3>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-70 font-mono">
                    {cat === "All" 
                      ? TOOLS_DATA.length 
                      : TOOLS_DATA.filter((t) => t.category === cat).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Ad Space Area */}
          <div className="bg-muted/20 border border-border/30 rounded-2xl p-4 text-center text-[10px] text-muted-foreground font-mono">
            Ad Space (Adsterra Square Ad)
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Action Toolbar */}
          <div className="glass-panel border border-border/40 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            {/* Search */}
            <div className="w-full md:max-w-xs relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none transition-all placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                  filterType === "all" ? "bg-indigo-500/10 text-indigo-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <span>All</span>
              </button>
              <button
                onClick={() => setFilterType("trending")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                  filterType === "trending" ? "bg-indigo-500/10 text-indigo-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Trending</span>
              </button>
              <button
                onClick={() => setFilterType("popular")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                  filterType === "popular" ? "bg-indigo-500/10 text-indigo-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Popular</span>
              </button>
              <button
                onClick={() => setFilterType("recent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                  filterType === "recent" ? "bg-indigo-500/10 text-indigo-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Recent</span>
              </button>
              <button
                onClick={() => setFilterType("favorites")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ${
                  filterType === "favorites" ? "bg-indigo-500/10 text-indigo-400" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Favorites</span>
              </button>
            </div>

            {/* Sorter & View Switcher */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 border border-border/40 p-1 rounded-lg bg-muted/20">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md cursor-pointer ${viewMode === "grid" ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md cursor-pointer ${viewMode === "list" ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="relative flex items-center gap-1 text-xs text-muted-foreground border border-border/40 p-1.5 px-3 rounded-lg bg-muted/20 cursor-pointer">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-foreground font-bold focus:outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="date">Newest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Layout Cards */}
          {processedTools.length > 0 ? (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
            }>
              {processedTools.map((tool) => {
                const isFav = favorites.includes(tool.slug);
                return (
                  <Link
                    href={`/tools/${tool.slug}`}
                    key={tool.slug}
                    className={`glass-card rounded-2xl relative group overflow-hidden flex ${
                      viewMode === "grid" 
                        ? "flex-col justify-between p-6" 
                        : "flex-row items-center justify-between p-4 px-6"
                    }`}
                  >
                    {/* Top Row / Left part */}
                    <div className={viewMode === "grid" ? "space-y-4" : "flex items-center gap-4 flex-grow"}>
                      <div className="flex justify-between items-center">
                        {/* Badges */}
                        <div className="flex items-center gap-1.5">
                          {tool.isPremium ? (
                            <div className="flex items-center gap-1 text-[9px] text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                              <Crown className="w-3 h-3 text-purple-400 fill-purple-400" />
                              <span>Premium</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-[9px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                              <span>Free</span>
                            </div>
                          )}
                          
                          {tool.isTrending && (
                            <div className="text-[9px] text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Flame className="w-3 h-3 text-indigo-400 fill-current" />
                              <span>Trending</span>
                            </div>
                          )}
                        </div>

                        {/* Favorite button */}
                        {viewMode === "grid" && (
                          <button
                            onClick={(e) => toggleFavorite(tool.slug, e)}
                            className="p-1.5 rounded-full border border-border/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                          >
                            <Heart className={`w-3.5 h-3.5 transition-all ${isFav ? "fill-indigo-500 text-indigo-500" : ""}`} />
                          </button>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-bold text-base text-foreground group-hover:text-indigo-400 transition-all flex items-center gap-1.5">
                          <span>{tool.name}</span>
                          {tool.isPremium && <Crown className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />}
                        </h3>
                        <p className="text-muted-foreground text-[11px] leading-relaxed max-w-sm">
                          {tool.desc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row / Right part */}
                    <div className={viewMode === "grid" 
                      ? "mt-6 pt-4 border-t border-border/30 flex justify-between items-center" 
                      : "flex items-center gap-6 shrink-0"
                    }>
                      {/* Favorite in List mode */}
                      {viewMode === "list" && (
                        <button
                          onClick={(e) => toggleFavorite(tool.slug, e)}
                          className="p-1.5 rounded-full border border-border/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                        >
                          <Heart className={`w-3.5 h-3.5 transition-all ${isFav ? "fill-indigo-500 text-indigo-500" : ""}`} />
                        </button>
                      )}

                      <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold bg-yellow-500/5 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-yellow-500" />
                        <span>{tool.rating}</span>
                      </div>

                      <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider font-mono">
                        {tool.category}
                      </span>
                      
                      <div className="w-7 h-7 rounded-full bg-muted/40 group-hover:bg-indigo-600 flex items-center justify-center text-foreground group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/10 border border-border/30 rounded-2xl">
              <p className="text-muted-foreground text-sm font-semibold">No tools found matching your queries.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); setFilterType("all"); }}
                className="text-xs text-indigo-400 font-bold underline mt-2 hover:text-indigo-300 cursor-pointer"
              >
                Reset all criteria
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
