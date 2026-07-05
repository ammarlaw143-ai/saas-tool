"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, Loader2 } from "lucide-react";

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOtpChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
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
          <h2 className="text-xl font-extrabold text-foreground">OTP Verification</h2>
          <p className="text-xs text-muted-foreground">Enter the 6-digit passcode token sent to verify your identity.</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          
          {/* OTP inputs */}
          <div className="flex gap-2 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                required
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                className="w-11 h-11 bg-muted/20 border border-border/60 focus:border-indigo-500 rounded-lg text-center font-bold text-sm text-foreground focus:outline-none transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4.5 h-4.5" />}
            <span>{loading ? "Verifying..." : "Confirm Verification"}</span>
          </button>

          <p className="text-[10px] text-muted-foreground">
            Didn't receive passcode? <button type="button" onClick={() => alert("OTP code resent!")} className="text-indigo-400 font-bold underline hover:text-indigo-300">Resend OTP</button>
          </p>
        </form>

      </div>
    </div>
  );
}
