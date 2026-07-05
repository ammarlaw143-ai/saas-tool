"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup & redirect to verify-email
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/verify-email");
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-card/60 border border-border/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative">
        {/* Title */}
        <div className="space-y-2 text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight text-foreground justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>ToolVerse<span className="text-indigo-500 font-extrabold text-sm ml-0.5">AI</span></span>
          </Link>
          <h2 className="text-xl font-extrabold text-foreground">Create Account</h2>
          <p className="text-xs text-muted-foreground">Start processing files securely today.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground/60" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-muted/20 border border-border/60 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-muted/20 border border-border/60 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all text-foreground"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-muted/20 border border-border/60 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none transition-all text-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/15 disabled:opacity-50 mt-6 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{loading ? "Registering..." : "Sign Up"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
          <span>Already have an account? </span>
          <Link href="/auth/login" className="text-indigo-400 font-bold hover:underline">
            Sign In instead
          </Link>
        </div>
      </div>
    </div>
  );
}
