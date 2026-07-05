"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ArrowRight, Sparkles, FileText, Image, Code, 
  Calculator, QrCode, Crown, CheckCircle2, Star, 
  HelpCircle, ChevronDown, BookOpen, Clock, Activity, Shield 
} from "lucide-react";

// List of all tools for search and routing
const ALL_TOOLS = [
  // PDF
  { name: "Merge PDF", slug: "merge-pdf", desc: "Combine multiple PDF files into one clean document.", category: "PDF", isPremium: false, rating: 4.8 },
  { name: "Split PDF", slug: "split-pdf", desc: "Extract specific pages or split PDF into separate files.", category: "PDF", isPremium: false, rating: 4.6 },
  { name: "Compress PDF", slug: "compress-pdf", desc: "Shrink PDF file sizes while preserving visual quality.", category: "PDF", isPremium: false, rating: 4.9 },
  { name: "Protect PDF", slug: "protect-pdf", desc: "Add password encryption and lock PDF permissions.", category: "PDF", isPremium: false, rating: 4.7 },
  { name: "Unlock PDF", slug: "unlock-pdf", desc: "Remove encryption and passwords from protected PDFs.", category: "PDF", isPremium: false, rating: 4.5 },
  // Images
  { name: "Image Compressor", slug: "image-compressor", desc: "Compress JPEG, PNG, or WEBP photos client-side.", category: "Images", isPremium: false, rating: 4.9 },
  { name: "Resize & Crop", slug: "resize-crop", desc: "Modify pixels, dimensions, and clip image bounds.", category: "Images", isPremium: false, rating: 4.7 },
  { name: "Format Converter", slug: "format-converter", desc: "Convert files between WebP, PNG, JPG, HEIC, and AVIF.", category: "Images", isPremium: false, rating: 4.8 },
  // Text
  { name: "Case Converter", slug: "case-converter", desc: "Toggle case, sentence caps, snake-case, or slugs.", category: "Text", isPremium: false, rating: 4.4 },
  { name: "Text Compare", slug: "text-compare", desc: "Find structural differences between two text drafts.", category: "Text", isPremium: false, rating: 4.7 },
  { name: "JSON Formatter", slug: "json-formatter", desc: "Beautify, parse, validate, and tree-visualize JSON.", category: "Text", isPremium: false, rating: 4.9 },
  // Developer
  { name: "UUID Generator", slug: "uuid-generator", desc: "Instantly compile batches of secure v4 UUID strings.", category: "Developer", isPremium: false, rating: 4.8 },
  { name: "Password Generator", slug: "password-generator", desc: "Create high-entropy passwords with custom parameters.", category: "Developer", isPremium: false, rating: 4.9 },
  { name: "JWT Decoder", slug: "jwt-decoder", desc: "Parse header JSON, payload payload data and structure.", category: "Developer", isPremium: false, rating: 4.6 },
  // Calculators
  { name: "Age & BMI Calculator", slug: "age-bmi-calculator", desc: "Compute age spans and body mass indexes quickly.", category: "Calculators", isPremium: false, rating: 4.5 },
  { name: "Loan & EMI Calculator", slug: "loan-emi-calculator", desc: "Simulate amortization timelines, interests, and EMIs.", category: "Calculators", isPremium: false, rating: 4.8 },
  // Custom QR
  { name: "Premium QR Studio", slug: "qr-studio", desc: "Generate custom QR codes with logos, eye shapes, and frames.", category: "QR Studio", isPremium: true, rating: 5.0 },
  // AI
  { name: "AI Image Generator", slug: "ai-image", desc: "Generate gorgeous artwork from prompts client-side.", category: "AI Tools", isPremium: true, rating: 4.9 },
  { name: "AI Resume Builder", slug: "ai-resume", desc: "Autofill resume schemas and build professional CVs.", category: "AI Tools", isPremium: true, rating: 4.8 },
  { name: "AI Website Builder", slug: "ai-website", desc: "Describe components and generate functional HTML.", category: "AI Tools", isPremium: true, rating: 4.9 },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = ["All", "PDF", "Images", "Text", "Developer", "Calculators", "QR Studio", "AI Tools"];

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const stats = [
    { label: "Uptime SLA", value: "99.99%", icon: Activity },
    { label: "Files Handled", value: "85M+", icon: FileText },
    { label: "Processing Speed", value: "<150ms", icon: Clock },
    { label: "Security Encryption", value: "SSL/WASM", icon: Shield },
  ];

  const faqs = [
    {
      q: "Are my files stored on your servers?",
      a: "No. The majority of our free utilities (PDF merging, image resizing, formats converting, UUIDs, formatters) operate completely client-side in your web browser. Files are processed locally inside WebAssembly modules or JavaScript runtimes. Your data never leaves your computer.",
    },
    {
      q: "How does the Premium QR Code Studio work?",
      a: "Our Premium QR Studio allows you to upload custom SVG logo files, tweak eye contours (rounded or squared), select gradient styles, and draw framing cards. You can export the resulting QR code as highly-scalable SVGs or print-ready PDFs.",
    },
    {
      q: "What is Stripe-ready billing?",
      a: "Our application is structured to support Stripe Subscriptions immediately. When you select a premium plan, it triggers a mock Stripe Checkout container which replicates actual subscription callbacks and webhooks, ready to receive live keys.",
    },
    {
      q: "Can I cancel my subscription at any time?",
      a: "Yes, you can manage your billing state directly in the User Dashboard under the Billing tab. Cancel, upgrade, or downgrade immediately with no hidden fees.",
    },
  ];

  const testimonials = [
    {
      text: "The client-side PDF compressor is lightning fast. I compressed a 45MB document down to 4MB in less than a second. Outstanding layout!",
      author: "Sarah Jenkins",
      role: "Digital Designer",
      rating: 5,
      avatar: "SJ",
    },
    {
      text: "We integrated ToolVerse QR API into our retail system. Our customers scan stylized QR codes that look identical to our brand. A must-have tool.",
      author: "Alex Rivera",
      role: "Lead Engineer, RetailCorp",
      rating: 5,
      avatar: "AR",
    },
    {
      text: "No loading delays, beautiful interface, and dark mode by default. ToolVerse AI has completely replaced my usage of clunky online converters.",
      author: "David Chen",
      role: "Fullstack Web Developer",
      rating: 5,
      avatar: "DC",
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Tag badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-400 font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Utilities Ecosystem</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight">
            The Premium Suite of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              AI & Client-Side Tools
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Convert, sign, and build vectors instantly. Free client-side tools run completely in-browser for complete privacy. Upgrade to Pro for AI suites and high-capacity workflows.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative mt-8">
            <div className="relative flex items-center bg-muted/30 border border-border/80 focus-within:border-indigo-500 rounded-full shadow-2xl backdrop-blur-md px-4 py-3 transition-all">
              <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search tools (e.g. Merge PDF, Password Generator, QR Studio...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/60 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted/60 transition-all cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Adsterra Placeholder Area */}
      <div className="max-w-4xl mx-auto my-6 px-4">
        <div className="bg-muted/20 border border-border/30 rounded-2xl p-4 text-center text-xs text-muted-foreground font-mono">
          Ad Space (Adsterra 728x90 Leaderboard Slot)
        </div>
      </div>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-y border-border/30 my-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center space-y-1">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Category Tabs & Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/30 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Utility Suites</h2>
              <p className="text-muted-foreground text-sm mt-1">Select a category below to explore secure tools.</p>
            </div>
            <Link 
              href="/tools" 
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-all group"
            >
              <span>Explore full directory</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Category Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "bg-muted/30 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid View of Tools */}
          {filteredTools.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredTools.slice(0, 9).map((tool) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={tool.slug}
                    className="glass-card rounded-2xl p-6 relative group flex flex-col justify-between"
                  >
                    {/* Corner rating and tags */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold bg-yellow-500/5 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                        <Star className="w-3.5 h-3.5 fill-yellow-500" />
                        <span>{tool.rating}</span>
                      </div>

                      {tool.isPremium ? (
                        <div className="flex items-center gap-1 text-[10px] text-purple-400 font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                          <Crown className="w-3 h-3 text-purple-400 fill-purple-400" />
                          <span>Premium</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                          Free
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-lg text-foreground group-hover:text-indigo-400 transition-all">
                        {tool.name}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider font-mono">
                        {tool.category}
                      </span>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="w-8 h-8 rounded-full bg-muted/40 group-hover:bg-indigo-600 flex items-center justify-center text-foreground group-hover:text-white transition-all shadow-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-muted/10 border border-border/30 rounded-2xl">
              <p className="text-muted-foreground text-sm font-semibold">No tools found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="text-xs text-indigo-400 font-bold underline mt-2 hover:text-indigo-300 cursor-pointer"
              >
                Reset search queries
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/15 border-y border-border/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Trusted by Over 50,000+ Creators</h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              See how developers, designers, and business operators automate tasks with our browser client modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-panel border border-border/50 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold font-mono">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{t.author}</h4>
                    <p className="text-[11px] text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">Transparent, Simple Pricing</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Choose the membership that fits your workflow. From zero-fee tools to powerful AI capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="glass-panel border border-border/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-foreground">Free Starter</h3>
                <p className="text-xs text-muted-foreground mt-1">Perfect for quick everyday file edits.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-xs text-muted-foreground ml-1">/ forever</span>
              </div>
              <ul className="space-y-3.5 text-xs text-muted-foreground pt-4 border-t border-border/40">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Access to 40+ client-side tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Max file size up to 15MB</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Secure local browser processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Standard QR Code Creator</span>
                </li>
              </ul>
            </div>
            <Link
              href="/auth/signup"
              className="mt-8 block text-center w-full bg-muted/40 hover:bg-muted/60 border border-border/50 text-foreground font-semibold text-xs py-3 rounded-full transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-panel border-2 border-indigo-500 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-indigo-950/20 shadow-2xl">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
              Popular
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-foreground flex items-center gap-1.5">
                  <span>ToolVerse Pro</span>
                  <Crown className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Unlock AI engines and high capacity.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold">$15</span>
                <span className="text-xs text-indigo-400 ml-1 font-semibold">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-muted-foreground pt-4 border-t border-border/40">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-foreground font-medium">Unlimited file conversions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-foreground font-medium">Max file size up to 1GB</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Custom QR Studio (SVGs/PDFs)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Unlock 10+ Premium AI Builders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Priority server queues</span>
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 block text-center w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs py-3 rounded-full transition-all shadow-md shadow-indigo-600/20"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Business Plan */}
          <div className="glass-panel border border-border/40 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-foreground">Enterprise</h3>
                <p className="text-xs text-muted-foreground mt-1">For development teams & enterprise APIs.</p>
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold">$49</span>
                <span className="text-xs text-muted-foreground ml-1">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-muted-foreground pt-4 border-t border-border/40">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Restful API endpoint integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Team Workspaces (up to 10 users)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>White-label QR & custom subdomains</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Dedicated Support Manager</span>
                </li>
              </ul>
            </div>
            <Link
              href="/pricing"
              className="mt-8 block text-center w-full bg-muted/40 hover:bg-muted/60 border border-border/50 text-foreground font-semibold text-xs py-3 rounded-full transition-all"
            >
              Get Business Plan
            </Link>
          </div>
        </div>
      </section>

      {/* SEO & Blogs Panel */}
      <section className="bg-muted/10 border-t border-border/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 border-b border-border/30 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>SEO & Digital Guides</span>
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">Step-by-step instructions on handling files and custom utilities.</p>
            </div>
            <Link 
              href="/blog" 
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Read all posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel border border-border/40 rounded-2xl overflow-hidden hover:border-indigo-500/35 transition-all">
              <div className="h-40 bg-gradient-to-r from-indigo-950 to-purple-950 flex items-center justify-center p-4">
                <FileText className="w-12 h-12 text-indigo-400/80" />
              </div>
              <div className="p-5 space-y-2.5">
                <span className="text-[9px] uppercase font-bold text-indigo-400 font-mono">PDF optimization</span>
                <h3 className="font-bold text-base hover:text-indigo-400 transition-all cursor-pointer">
                  How to compress PDF files securely in-browser without data loss
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Learn how WebAssembly client modules process PDFs on your local machine, optimizing bytes without cloud roundtrips.
                </p>
              </div>
            </div>
            <div className="glass-panel border border-border/40 rounded-2xl overflow-hidden hover:border-indigo-500/35 transition-all">
              <div className="h-40 bg-gradient-to-r from-purple-950 to-pink-950 flex items-center justify-center p-4">
                <QrCode className="w-12 h-12 text-purple-400/80" />
              </div>
              <div className="p-5 space-y-2.5">
                <span className="text-[9px] uppercase font-bold text-purple-400 font-mono">QR branding</span>
                <h3 className="font-bold text-base hover:text-indigo-400 transition-all cursor-pointer">
                  Making QR codes stand out: Dynamic shapes and gradient layouts
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Customize eye structures, shadow contours, and center vectors to match corporate branding patterns.
                </p>
              </div>
            </div>
            <div className="glass-panel border border-border/40 rounded-2xl overflow-hidden hover:border-indigo-500/35 transition-all">
              <div className="h-40 bg-gradient-to-r from-pink-950 to-indigo-950 flex items-center justify-center p-4">
                <Sparkles className="w-12 h-12 text-pink-400/80" />
              </div>
              <div className="p-5 space-y-2.5">
                <span className="text-[9px] uppercase font-bold text-pink-400 font-mono">AI assets</span>
                <h3 className="font-bold text-base hover:text-indigo-400 transition-all cursor-pointer">
                  Streamlining web designs with prompt-based client builders
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  Discover how generative AI writes, tests, and packs modular responsive HTML snippets using single keywords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            <span>Common Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about processing capabilities, browser environments, and security.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-panel border border-border/40 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-foreground focus:outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4.5 h-4.5 text-muted-foreground transition-all duration-300 ${openFaq === idx ? "rotate-180 text-indigo-400" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/20">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Live Chat Mock Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 px-5 rounded-full flex items-center gap-1.5 shadow-xl shadow-indigo-600/35 hover:scale-105 transition-all text-xs font-bold border border-indigo-400/35 cursor-pointer">
          <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
          <span>Need Help? Chat Live</span>
        </button>
      </div>
    </div>
  );
}
