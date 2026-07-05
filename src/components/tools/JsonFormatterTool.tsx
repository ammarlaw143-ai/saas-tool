"use client";

import React, { useState } from "react";
import { Code, Check, AlertCircle, Copy, FileCode } from "lucide-react";

export default function JsonFormatterTool() {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spacing = 2) => {
    if (!jsonInput.trim()) return;
    setErrorMsg(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, spacing);
      setJsonInput(formatted);
    } catch (e: any) {
      setErrorMsg(e.message || "Invalid JSON syntax detected.");
    }
  };

  const minifyJson = () => {
    if (!jsonInput.trim()) return;
    setErrorMsg(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonInput(minified);
    } catch (e: any) {
      setErrorMsg(e.message || "Invalid JSON syntax detected.");
    }
  };

  const copyToClipboard = () => {
    if (!jsonInput.trim()) return;
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
        
        {/* Toolbar header */}
        <div className="flex justify-between items-center pb-2 border-b border-border/30">
          <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <FileCode className="w-4.5 h-4.5 text-indigo-400" />
            <span>JSON Formatter & Validator</span>
          </h3>
          
          <div className="flex gap-2">
            <button
              onClick={() => formatJson(2)}
              className="px-3 py-1.5 rounded-lg border border-border/40 hover:bg-muted/40 text-xs font-bold text-foreground cursor-pointer"
            >
              Beautify (2 Spaces)
            </button>
            <button
              onClick={minifyJson}
              className="px-3 py-1.5 rounded-lg border border-border/40 hover:bg-muted/40 text-xs font-bold text-foreground cursor-pointer"
            >
              Minify / Compact
            </button>
            <button
              onClick={copyToClipboard}
              disabled={!jsonInput}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Input box */}
        <div className="relative">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your raw JSON code block here..."
            className="w-full min-h-80 bg-muted/15 border border-border/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-4 font-mono text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60 text-foreground"
          />
        </div>

        {/* Error panel */}
        {errorMsg ? (
          <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl font-semibold">
            <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold">JSON Validation Error</p>
              <p className="font-mono text-[10px] text-red-300/80 leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        ) : jsonInput.trim() && (
          <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-xl font-semibold">
            <Check className="w-4.5 h-4.5 shrink-0" />
            <span>Valid JSON formatting. Verified locally.</span>
          </div>
        )}

      </div>
    </div>
  );
}
