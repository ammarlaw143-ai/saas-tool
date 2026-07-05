"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md bg-card/60 border border-border/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative">
        
        {/* Title */}
        <div className="space-y-2 text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight text-foreground justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>ToolVerse<span className="text-indigo-500 font-extrabold text-sm ml-0.5">AI</span></span>
          </Link>
          <h2 className="text-xl font-extrabold text-foreground">Recover Password</h2>
          <p className="text-xs text-muted-foreground">Receive a reset code token link in your mailbox.</p>
        </div>

        {submitted ? (
          <div className="space-y-6 text-center">
            <div className="flex flex-col items-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 p-5 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <p className="font-bold text-sm text-foreground">Recovery email sent!</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Check <strong>{email}</strong> for instructions to configure your new credentials.
              </p>
            </div>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Login</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl transition-all shadow-md mt-6 cursor-pointer"
            >
              Send Password Reset Link
            </button>

            <div className="text-center mt-6">
              <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground font-semibold inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
