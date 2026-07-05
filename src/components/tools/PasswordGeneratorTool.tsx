"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, Check, RefreshCw } from "lucide-react";

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!charset) {
      setPassword("Select at least one option");
      return;
    }

    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIdx = Math.floor(Math.random() * charset.length);
      generated += charset[randomIdx];
    }
    setPassword(generated);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password || password.startsWith("Select")) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute password strength
  const getStrength = () => {
    if (password.startsWith("Select")) return { score: 0, label: "None", color: "bg-muted" };
    let score = 0;
    if (length >= 8) score += 1;
    if (length >= 14) score += 1;
    if (includeUppercase && includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score <= 2) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score === 3) return { score: 2, label: "Medium", color: "bg-yellow-500" };
    if (score === 4) return { score: 3, label: "Strong", color: "bg-green-500" };
    return { score: 4, label: "Very Strong", color: "bg-indigo-500" };
  };

  const strength = getStrength();

  return (
    <div className="glass-panel border border-border/40 rounded-2xl p-6 space-y-6">
      
      {/* Output Panel */}
      <div className="flex gap-2 items-center bg-muted/20 border border-border/40 p-4 rounded-xl relative overflow-hidden group">
        <Key className="w-5 h-5 text-indigo-400 shrink-0" />
        <span className="font-mono text-sm sm:text-base font-bold text-foreground break-all select-all flex-grow tracking-wider">
          {password}
        </span>
        
        <div className="flex gap-1 shrink-0">
          <button
            onClick={generatePassword}
            className="p-2 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Regenerate"
          >
            <RefreshCw className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Password Strength Gauge */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-muted-foreground">Password Strength</span>
          <span className="text-foreground">{strength.label}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5 h-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i <= strength.score ? strength.color : "bg-muted/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Adjusters */}
      <div className="space-y-4 border-t border-border/30 pt-5">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-muted-foreground">Password Length</span>
            <span className="text-indigo-400 font-mono">{length} chars</span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Checkbox configs */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <span>Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <span>Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <span>Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
            />
            <span>Special (!@#$)</span>
          </label>
        </div>
      </div>
      
    </div>
  );
}
