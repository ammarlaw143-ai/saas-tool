"use client";

import React, { useState } from "react";
import { Sparkles, Crown, Image as ImageIcon, Download, Cpu, Play } from "lucide-react";

export default function AiImageGeneratorTool() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("stable-diffusion-xl");
  const [style, setStyle] = useState("cinematic");
  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setResultImage(null);
    setProgress(0);

    // Simulate progress counting
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setResultImage(getMockedImage());
          setGenerating(false);
          return 100;
        }
        return p + 5;
      });
    }, 150);
  };

  const getMockedImage = () => {
    // Generate beautiful Unsplash images based on styling
    if (style === "cyberpunk") {
      return "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=600&q=80";
    }
    if (style === "anime") {
      return "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80";
    }
    return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Config Panel */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/30">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Cpu className="w-4.5 h-4.5 text-purple-400" />
              <span>AI Image Studio Options</span>
            </h3>
            <span className="flex items-center gap-0.5 text-[9px] text-purple-400 font-extrabold bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              <Crown className="w-2.5 h-2.5 fill-purple-400" />
              <span>PRO ACCESS</span>
            </span>
          </div>

          {/* Prompt */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Describe your image prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A futuristic neon cyberpunk cityscape with flying cars, cinematic lighting, 8k resolution..."
              className="w-full bg-muted/15 border border-border/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60 text-foreground min-h-24"
            />
          </div>

          {/* Model selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">AI Model</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-muted/30 border border-border/60 rounded-xl p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-semibold"
              >
                <option value="stable-diffusion-xl">Stable Diffusion XL</option>
                <option value="dall-e-3">DALL-E 3 (OpenAI)</option>
                <option value="midjourney-v6">Midjourney v6</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Artwork Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-muted/30 border border-border/60 rounded-xl p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-semibold"
              >
                <option value="cinematic">Cinematic</option>
                <option value="cyberpunk">Cyberpunk</option>
                <option value="anime">Anime / Manga</option>
                <option value="3d-render">3D Pixar Style</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/15 disabled:opacity-50 cursor-pointer"
        >
          <Play className="w-4 h-4" />
          <span>{generating ? `Rendering Image... (${progress}%)` : "Generate AI Art"}</span>
        </button>
      </div>

      {/* Output preview */}
      <div className="glass-panel border border-border/40 rounded-2xl p-5 flex flex-col justify-between items-center gap-4 min-h-80 relative overflow-hidden">
        <div className="w-full border-b border-border/30 pb-2 text-xs font-bold flex justify-between items-center">
          <span>AI Output Render Canvas</span>
          {generating && (
            <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full text-[9px] animate-pulse">
              Computing Vectors...
            </span>
          )}
        </div>

        <div className="relative flex-grow flex items-center justify-center bg-muted/10 border border-border/30 rounded-xl overflow-hidden w-full max-h-80 min-h-60 p-4">
          {resultImage ? (
            <img src={resultImage} alt="AI Generated" className="max-h-full max-w-full object-contain rounded-lg shadow-lg border border-border/30" />
          ) : generating ? (
            <div className="flex flex-col items-center gap-3">
              {/* Spinner */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">{progress}% loaded</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground/35">
              <ImageIcon className="w-12 h-12" />
              <span className="text-xs font-semibold">Enter a prompt and click generate</span>
            </div>
          )}
        </div>

        {resultImage && (
          <a
            href={resultImage}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Download className="w-4.5 h-4.5" />
            <span>Download Image Art</span>
          </a>
        )}
      </div>

    </div>
  );
}
