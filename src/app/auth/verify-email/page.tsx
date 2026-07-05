"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/auth/verify-otp");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md bg-card/60 border border-border/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative text-center">
        
        {/* Title */}
        <div className="space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl tracking-tight text-foreground justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>ToolVerse<span className="text-indigo-500 font-extrabold text-sm ml-0.5">AI</span></span>
          </Link>
          <h2 className="text-xl font-extrabold text-foreground">Verify Your Email</h2>
          <p className="text-xs text-muted-foreground">We sent a verification link to your registered inbox.</p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-xs">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Mail className="w-5 h-5 animate-bounce" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Open your email and click the confirmation link, or enter the temporary security passcode sent to you.
            </p>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1 transition-all shadow-md cursor-pointer"
          >
            <span>Enter OTP Verification Passcode</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-muted-foreground">
            Didn't receive email? <button onClick={() => alert("Verification code resent!")} className="text-indigo-400 font-bold underline hover:text-indigo-300">Resend email</button>
          </p>
        </div>

      </div>
    </div>
  );
}
