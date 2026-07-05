"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, CheckCircle2, Globe, Heart } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [lang, setLang] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const footerLinks = [
    {
      title: "Popular Tools",
      links: [
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Image Compressor", href: "/tools/image-compressor" },
        { name: "Password Generator", href: "/tools/password-generator" },
        { name: "Premium QR Studio", href: "/tools/qr-studio" },
        { name: "AI Image Generator", href: "/tools/ai-image" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Tools Directory", href: "/tools" },
        { name: "Pricing Plans", href: "/pricing" },
        { name: "Developer APIs", href: "/dashboard?tab=api" },
        { name: "SEO Blog", href: "/blog" },
        { name: "Knowledge Base", href: "/contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/contact" },
        { name: "Careers", href: "/contact" },
        { name: "Privacy Policy", href: "/contact" },
        { name: "Terms of Service", href: "/contact" },
        { name: "SLA Commitments", href: "/pricing" },
      ],
    },
  ];

  const languages = ["English", "Español", "Français", "Deutsch", "Português", "日本語", "العربية"];

  return (
    <footer className="border-t border-border/40 bg-background/50 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-12 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>ToolVerse<span className="text-indigo-500 font-extrabold text-sm ml-0.5">AI</span></span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              The premier, privacy-focused tool ecosystem. Seamlessly convert files, encode code vectors, analyze statistics, and build AI assets entirely in your browser.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Subscribe to our Developer Newsletter</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-indigo-400 bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/25 max-w-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-medium">Successfully subscribed! Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter email to get updates..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-muted/30 hover:bg-muted/40 focus:bg-muted/50 border border-border/60 hover:border-border focus:border-indigo-500 rounded-full px-4 py-2 text-xs font-medium focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/95 p-2 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all text-xs font-bold shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links structure */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground tracking-wider">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-all hover:translate-x-0.5 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Lower Banner: Language & Copyrights */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} ToolVerse AI. Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span>globally. Fully secure.</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Ad Space Area Identifier */}
            <div className="text-[10px] text-muted-foreground bg-muted/40 border border-border/30 px-3 py-1 rounded-full font-mono">
              Ad Area (Google AdSense Slot)
            </div>

            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/40 p-1.5 px-3 rounded-full bg-muted/10 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang}</span>
              </button>
              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangDropdown(false)} />
                  <div className="absolute right-0 bottom-full mb-2 w-32 rounded-xl glass-panel p-1 border border-border/60 shadow-xl z-20">
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLang(l);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full text-left text-xs p-2 rounded-lg transition-all cursor-pointer ${
                          lang === l 
                            ? "bg-indigo-500/10 text-indigo-400 font-semibold" 
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
