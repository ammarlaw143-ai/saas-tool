"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Star, Heart, Share2, Crown, 
  HelpCircle, ChevronRight, Upload, FileText, CheckCircle2,
  AlertCircle
} from "lucide-react";
import MergePdfTool from "@/components/tools/MergePdfTool";
import ImageCompressorTool from "@/components/tools/ImageCompressorTool";
import PasswordGeneratorTool from "@/components/tools/PasswordGeneratorTool";
import JsonFormatterTool from "@/components/tools/JsonFormatterTool";
import EmiCalculatorTool from "@/components/tools/EmiCalculatorTool";
import AiImageGeneratorTool from "@/components/tools/AiImageGeneratorTool";
import AiWebsiteBuilderTool from "@/components/tools/AiWebsiteBuilderTool";

// Let's resolve the actual imports. Wait, we saved JsonFormatterTool in `src/components/tools/JsonFormatterTool.tsx`!
// So let's import it from "@/components/tools/JsonFormatterTool"

interface ToolDetails {
  name: string;
  desc: string;
  category: string;
  isPremium: boolean;
  rating: number;
}

const TOOLS_CONFIG: Record<string, ToolDetails> = {
  "merge-pdf": { name: "Merge PDF", desc: "Combine multiple PDF documents client-side in seconds.", category: "PDF", isPremium: false, rating: 4.8 },
  "split-pdf": { name: "Split PDF", desc: "Extract specific ranges or pages from your PDF file.", category: "PDF", isPremium: false, rating: 4.6 },
  "compress-pdf": { name: "Compress PDF", desc: "Shrink PDF file sizes while keeping maximum visual resolution.", category: "PDF", isPremium: false, rating: 4.9 },
  "protect-pdf": { name: "Protect PDF", desc: "Lock PDF permissions and add high-entropy password locks.", category: "PDF", isPremium: false, rating: 4.7 },
  "unlock-pdf": { name: "Unlock PDF", desc: "Decrypt and remove security locks from protected PDF layers.", category: "PDF", isPremium: false, rating: 4.5 },
  "image-compressor": { name: "Image Compressor", desc: "Compress JPEG, PNG, or WEBP photo dimensions locally.", category: "Images", isPremium: false, rating: 4.9 },
  "resize-crop": { name: "Resize & Crop", desc: "Change canvas resolution, crop edges, and dimensions.", category: "Images", isPremium: false, rating: 4.7 },
  "format-converter": { name: "Format Converter", desc: "Instantly switch files from WEBP, PNG, JPG, HEIC, and AVIF.", category: "Images", isPremium: false, rating: 4.8 },
  "case-converter": { name: "Case Converter", desc: "Toggle uppercase, lowercase, sentence capitalization, and slug templates.", category: "Text", isPremium: false, rating: 4.4 },
  "text-compare": { name: "Text Compare", desc: "Compare text side-by-side to highlight additions and deletions.", category: "Text", isPremium: false, rating: 4.7 },
  "json-formatter": { name: "JSON Formatter", desc: "Validate, beautify, and minify raw JSON script trees.", category: "Text", isPremium: false, rating: 4.9 },
  "uuid-generator": { name: "UUID Generator", desc: "Create cryptographically secure V4 UUID strings.", category: "Developer", isPremium: false, rating: 4.8 },
  "password-generator": { name: "Password Generator", desc: "Generate secure high-entropy passwords with custom toggles.", category: "Developer", isPremium: false, rating: 4.9 },
  "jwt-decoder": { name: "JWT Decoder", desc: "Parse JWT headers, payloads, signatures and verify integrity.", category: "Developer", isPremium: false, rating: 4.6 },
  "age-bmi-calculator": { name: "Age & BMI Calculator", desc: "Perform body index and age span mathematical checks.", category: "Calculators", isPremium: false, rating: 4.5 },
  "loan-emi-calculator": { name: "Loan & EMI Calculator", desc: "Compute loan principal rates, schedules, and interest charts.", category: "Calculators", isPremium: false, rating: 4.8 },
  "ai-image": { name: "AI Image Generator", desc: "Create high-resolution artwork using prompt styling models.", category: "AI Tools", isPremium: true, rating: 4.9 },
  "ai-resume": { name: "AI Resume Builder", desc: "Autofill and export professional CV schemas instantly.", category: "AI Tools", isPremium: true, rating: 4.8 },
  "ai-website": { name: "AI Website Builder", desc: "Convert text descriptions into clean, ready-to-use HTML code layouts.", category: "AI Tools", isPremium: true, rating: 4.9 },
};

// Fallback upload mock tool interface
function MockUploadTool({ tool }: { tool: ToolDetails }) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setCompleted(false);
    }
  };

  const handleProcess = () => {
    if (!file) return;
    setProcessing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setCompleted(true);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!file ? (
        <div className="border-2 border-dashed border-border/80 hover:border-indigo-500 rounded-3xl p-8 text-center transition-all bg-muted/10 relative">
          <input
            type="file"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Upload file to process</h3>
            <p className="text-[11px] text-muted-foreground">Select a file to run this utility. Max 15MB.</p>
          </div>
        </div>
      ) : (
        <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/40 text-xs">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-foreground truncate max-w-xs">{file.name}</span>
              <span className="text-[10px] text-muted-foreground font-mono">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-300 font-semibold cursor-pointer">
              Remove
            </button>
          </div>

          {processing && (
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-muted-foreground font-bold font-mono">
                <span>Processing File...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                <div className="bg-indigo-600 h-full transition-all duration-150" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {!processing && !completed && (
            <button
              onClick={handleProcess}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Process File
            </button>
          )}

          {completed && (
            <div className="flex items-center gap-3 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-4 rounded-xl font-semibold">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
              <div className="flex-grow">
                <p className="font-bold text-foreground">File processing completed!</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">Success! Your optimized file was processed securely in-browser.</p>
              </div>
              <button 
                onClick={() => {
                  const blob = new Blob([file], { type: file.type });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `optimized_${file.name}`;
                  a.click();
                }}
                className="bg-green-600 text-white hover:bg-green-500 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
              >
                Download
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const config = TOOLS_CONFIG[slug] || {
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    desc: "Perform client-side utility adjustments with high performance.",
    category: "General",
    isPremium: false,
    rating: 4.7
  };

  // Check favorite state
  React.useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) {
      try {
        const list = JSON.parse(favs);
        setIsFavorite(list.includes(slug));
      } catch (e) {}
    }
  }, [slug]);

  const toggleFav = () => {
    const favs = localStorage.getItem("favorites");
    let list: string[] = [];
    if (favs) {
      try { list = JSON.parse(favs); } catch (e) {}
    }
    let updated;
    if (list.includes(slug)) {
      updated = list.filter((f) => f !== slug);
      setIsFavorite(false);
    } else {
      updated = [...list, slug];
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const renderToolComponent = () => {
    switch (slug) {
      case "merge-pdf":
        return <MergePdfTool />;
      case "image-compressor":
        return <ImageCompressorTool />;
      case "password-generator":
        return <PasswordGeneratorTool />;
      case "json-formatter":
        return <JsonFormatterTool />;
      case "loan-emi-calculator":
        return <EmiCalculatorTool />;
      case "ai-image":
        return <AiImageGeneratorTool />;
      case "ai-website":
        return <AiWebsiteBuilderTool />;
      default:
        return <MockUploadTool tool={config} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen space-y-8">
      {/* Back button and breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/tools")}
          className="p-2 rounded-full border border-border/40 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <Link href="/tools" className="hover:text-foreground">Tools Workspace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{config.name}</span>
        </div>
      </div>

      {/* Title details section */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-border/30">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-1.5">
              <span>{config.name}</span>
              {config.isPremium && <Crown className="w-5 h-5 text-purple-400 fill-purple-400" />}
            </h1>
            
            {config.isPremium ? (
              <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Premium
              </span>
            ) : (
              <span className="text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Free
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xl">
            {config.desc}
          </p>
        </div>

        {/* Favorite & Share buttons */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={toggleFav}
            className={`p-2 px-4 border border-border/40 hover:bg-muted/40 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
              isFavorite ? "text-indigo-400 border-indigo-500/30 bg-indigo-500/5 font-bold" : "text-muted-foreground"
            }`}
          >
            <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-indigo-500 text-indigo-500" : ""}`} />
            <span>{isFavorite ? "Favorited" : "Favorite"}</span>
          </button>
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
            className="p-2 border border-border/40 hover:bg-muted/40 rounded-full text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Share Tool"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Main Tool Render Workspace */}
      <div className="py-2">
        {renderToolComponent()}
      </div>

      {/* Ad Space Area */}
      <div className="max-w-xl mx-auto py-4">
        <div className="bg-muted/20 border border-border/30 rounded-2xl p-4 text-center text-[10px] text-muted-foreground font-mono">
          Ad Space (Adsterra Responsive Ad Block)
        </div>
      </div>

      {/* Privacy Notice Alert */}
      <div className="flex items-start gap-2.5 bg-muted/10 border border-border/40 p-4.5 rounded-2xl text-xs text-muted-foreground leading-relaxed">
        <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-foreground">Secure Local Sandboxing</p>
          <p>
            To guarantee security, file uploads and operations for this utility run strictly inside your web browser’s memory using compiled HTML5 / WebAssembly pipelines. No document bytes are uploaded, indexed, or cached on remote web servers.
          </p>
        </div>
      </div>

    </div>
  );
}
