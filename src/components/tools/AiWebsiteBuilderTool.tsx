"use client";

import React, { useState } from "react";
import { Sparkles, Crown, Terminal, Copy, Check, Play, Globe } from "lucide-react";

export default function AiWebsiteBuilderTool() {
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState("html-tailwind");
  const [generating, setGenerating] = useState(false);
  const [codeResult, setCodeResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState("");

  const handleBuild = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setCodeResult("");
    setProgress("Analyzing prompt...");

    const steps = [
      { t: "Analyzing prompt...", d: 500 },
      { t: "Scaffolding DOM elements...", d: 800 },
      { t: "Injecting utility Tailwind styles...", d: 600 },
      { t: "Hooking up micro-interactions...", d: 700 },
      { t: "Compiling code block...", d: 500 },
    ];

    let currentStep = 0;

    const runStep = () => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].t);
        setTimeout(() => {
          currentStep++;
          runStep();
        }, steps[currentStep].d);
      } else {
        setCodeResult(getMockedCode());
        setGenerating(false);
      }
    };

    runStep();
  };

  const getMockedCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ToolVerse AI Generated</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white min-h-screen flex items-center justify-center p-8">
  <!-- Glowing Glassmorphic Card -->
  <div class="max-w-md w-full bg-slate-800/60 backdrop-blur-md border border-slate-700/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
    <div class="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
    
    <div class="relative space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold">Generated Component</h2>
      <p class="text-slate-400 text-sm leading-relaxed">
        This is a fully customizable component layout dynamically rendered using Tailwind classes.
      </p>
      <button class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all">
        Interact Now
      </button>
    </div>
  </div>
</body>
</html>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Configuration Panel */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/30">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Globe className="w-4.5 h-4.5 text-pink-400" />
              <span>AI Page Architect</span>
            </h3>
            <span className="flex items-center gap-0.5 text-[9px] text-pink-400 font-extrabold bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
              <Crown className="w-2.5 h-2.5 fill-pink-400" />
              <span>PRO ACCESS</span>
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Describe your layout requirements</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A gorgeous glassmorphic pricing card with standard headers, pricing buttons, lists, and hover gradients..."
              className="w-full bg-muted/15 border border-border/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60 text-foreground min-h-24"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Target Scaffold</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full bg-muted/30 border border-border/60 rounded-xl p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="html-tailwind">HTML5 + Tailwind CDN</option>
              <option value="react-jsx">React components (JSX)</option>
              <option value="vue-sfc">Vue Single File Component (SFC)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleBuild}
          disabled={generating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md disabled:opacity-50 cursor-pointer"
        >
          <Play className="w-4 h-4" />
          <span>{generating ? "Building Layout..." : "Build Component"}</span>
        </button>
      </div>

      {/* Code Editor Panel */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 flex flex-col justify-between gap-4 relative min-h-80 overflow-hidden">
        <div className="w-full border-b border-border/30 pb-2 text-xs font-bold flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Output Editor Code</span>
          </span>
          {codeResult && (
            <button
              onClick={copyCode}
              className="p-1 px-2 border border-border/40 hover:bg-muted/50 rounded text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="relative flex-grow bg-muted/10 border border-border/30 rounded-xl overflow-y-auto max-h-80 min-h-60 w-full p-4 font-mono text-[10px] leading-relaxed text-indigo-200">
          {codeResult ? (
            <pre className="whitespace-pre-wrap">{codeResult}</pre>
          ) : generating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/40 backdrop-blur-xs">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              </div>
              <span className="text-[10px] text-muted-foreground animate-pulse">{progress}</span>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/35">
              <Terminal className="w-10 h-10" />
              <span className="text-[11px] font-semibold font-sans">Awaiting layout parameters</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
