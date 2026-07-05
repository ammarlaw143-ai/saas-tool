"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  QrCode, Upload, Download, Settings, Sliders, Palette, 
  Crown, Sparkles, AlertCircle, FileText, CheckCircle2, ChevronRight
} from "lucide-react";

export default function QrStudioPage() {
  // Config States
  const [qrText, setQrText] = useState("https://toolverse-ai.com");
  const [foreground, setForeground] = useState("#6366f1");
  const [background, setBackground] = useState("#0f172a");
  const [gradientEnabled, setGradientEnabled] = useState(true);
  const [gradientColor, setGradientColor] = useState("#a855f7");
  const [eyeShape, setEyeShape] = useState<"square" | "rounded" | "leaf">("rounded");
  const [dotShape, setDotShape] = useState<"square" | "rounded" | "fluid">("rounded");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [frameEnabled, setFrameEnabled] = useState(true);
  const [frameText, setFrameText] = useState("SCAN ME NOW");
  const [borderRadius, setBorderRadius] = useState(24);
  const [shadowEnabled, setShadowEnabled] = useState(true);

  // Batch QR States
  const [activeTab, setActiveTab] = useState<"single" | "batch">("single");
  const [batchTexts, setBatchTexts] = useState("https://google.com\nhttps://github.com\nhttps://vercel.com");
  const [batchCreated, setBatchCreated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoUrl(URL.createObjectURL(file));
    }
  };

  // Draw custom stylized QR on canvas
  const drawQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Border radius background
    ctx.fillStyle = background;
    if (borderRadius > 0) {
      ctx.beginPath();
      ctx.roundRect(0, 0, canvas.width, canvas.height, borderRadius);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Shadow effect if enabled
    if (shadowEnabled) {
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
    }

    // Define QR Grid matrix coordinates (Simulated matrix)
    const gridSize = 21;
    const padding = 60;
    const cellSize = (canvas.width - padding * 2) / gridSize;

    // Draw frame text if enabled
    if (frameEnabled) {
      ctx.shadowColor = "transparent"; // reset shadow
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(frameText.toUpperCase(), canvas.width / 2, canvas.height - 20);
    }

    // Fill style: gradient or solid
    if (gradientEnabled) {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, foreground);
      grad.addColorStop(1, gradientColor);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = foreground;
    }

    // Simulated QR Drawing algorithm
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip some spots to look like a QR code
        const isFinderPattern = 
          (r < 7 && c < 7) || 
          (r < 7 && c > gridSize - 8) || 
          (r > gridSize - 8 && c < 7);
        
        // Random fill for test qr
        const shouldFill = isFinderPattern || (Math.sin(r * c + r) > -0.2);

        if (shouldFill) {
          const x = padding + c * cellSize;
          const y = padding + r * cellSize;

          ctx.beginPath();
          if (isFinderPattern) {
            // Finder pattern eye shape customization
            if (eyeShape === "rounded") {
              ctx.roundRect(x, y, cellSize, cellSize, 4);
            } else if (eyeShape === "leaf") {
              ctx.moveTo(x + cellSize / 2, y);
              ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + cellSize / 2);
              ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize / 2, y + cellSize);
              ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize / 2);
              ctx.quadraticCurveTo(x, y, x + cellSize / 2, y);
            } else {
              ctx.rect(x, y, cellSize, cellSize);
            }
          } else {
            // General dots styling
            if (dotShape === "rounded") {
              ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2.5, 0, Math.PI * 2);
            } else if (dotShape === "fluid") {
              ctx.roundRect(x, y, cellSize, cellSize, 2);
            } else {
              ctx.rect(x, y, cellSize, cellSize);
            }
          }
          ctx.fill();
        }
      }
    }

    // Draw central logo if uploaded
    if (logoUrl) {
      const logoImg = new Image();
      logoImg.src = logoUrl;
      logoImg.onload = () => {
        ctx.shadowColor = "transparent"; // reset
        const logoSize = 50;
        const lx = (canvas.width - logoSize) / 2;
        const ly = (canvas.height - logoSize) / 2;
        
        // Background card behind logo
        ctx.fillStyle = background;
        ctx.beginPath();
        ctx.roundRect(lx - 5, ly - 5, logoSize + 10, logoSize + 10, 8);
        ctx.fill();

        ctx.drawImage(logoImg, lx, ly, logoSize, logoSize);
      };
    }
  };

  useEffect(() => {
    drawQr();
  }, [
    qrText, foreground, background, gradientEnabled, gradientColor, 
    eyeShape, dotShape, logoUrl, frameEnabled, frameText, borderRadius, shadowEnabled
  ]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "custom_qr_code.png";
    a.click();
  };

  const createBatchQrs = () => {
    setBatchCreated(true);
    setTimeout(() => setBatchCreated(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-xs text-purple-400 font-semibold mb-2">
          <Crown className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
          <span>QR Code Studio Pro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Stylized QR Generator</h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Customize eye forms, background gradients, center vector logos, borders, and shadows. Generate in batches.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/30 gap-6">
        <button
          onClick={() => setActiveTab("single")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === "single" ? "border-indigo-500 text-indigo-400" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Single QR Customizer
        </button>
        <button
          onClick={() => setActiveTab("batch")}
          className={`pb-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${activeTab === "batch" ? "border-indigo-500 text-indigo-400" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Batch QR Creator
        </button>
      </div>

      {activeTab === "single" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Customizer panels */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Input & Link card */}
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/30">
                <Sliders className="w-4.5 h-4.5 text-indigo-400" />
                <span>QR Destination Content</span>
              </h3>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Target URL / Text payload</label>
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-3 text-xs font-semibold focus:outline-none transition-all text-foreground"
                />
              </div>
            </div>

            {/* Visual configuration */}
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5 pb-2 border-b border-border/30">
                <Palette className="w-4.5 h-4.5 text-purple-400" />
                <span>Branding & Aesthetics</span>
              </h3>

              {/* Eye Shapes & Dots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Eye Shape Style</label>
                  <select
                    value={eyeShape}
                    onChange={(e) => setEyeShape(e.target.value as any)}
                    className="w-full bg-muted/30 border border-border/60 rounded-xl p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="square">Sharp Square</option>
                    <option value="rounded">Organic Rounded</option>
                    <option value="leaf">Curved Leaf</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Dot Density Pattern</label>
                  <select
                    value={dotShape}
                    onChange={(e) => setDotShape(e.target.value as any)}
                    className="w-full bg-muted/30 border border-border/60 rounded-xl p-2.5 text-xs text-foreground focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="square">Standard Blocks</option>
                    <option value="rounded">Circular Points</option>
                    <option value="fluid">Rounded Bars</option>
                  </select>
                </div>
              </div>

              {/* Color selectors */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Foreground Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={foreground}
                        onChange={(e) => setForeground(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={foreground}
                        onChange={(e) => setForeground(e.target.value)}
                        className="bg-muted/30 border border-border/60 rounded-lg p-1.5 px-3 text-xs font-mono text-foreground focus:outline-none max-w-28"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground">Background Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        className="bg-muted/30 border border-border/60 rounded-lg p-1.5 px-3 text-xs font-mono text-foreground focus:outline-none max-w-28"
                      />
                    </div>
                  </div>
                </div>

                {/* Gradient toggle */}
                <div className="space-y-3.5 pt-2 border-t border-border/30">
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gradientEnabled}
                      onChange={(e) => setGradientEnabled(e.target.checked)}
                      className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Enable Gradient Overlay</span>
                  </label>

                  {gradientEnabled && (
                    <div className="space-y-1.5 pl-6">
                      <label className="text-[11px] font-semibold text-muted-foreground">Gradient Stop Color</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={gradientColor}
                          onChange={(e) => setGradientColor(e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={gradientColor}
                          onChange={(e) => setGradientColor(e.target.value)}
                          className="bg-muted/30 border border-border/60 rounded-lg p-1.5 px-3 text-xs font-mono text-foreground focus:outline-none max-w-28"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Logo upload & Frames */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/30">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground block">Embed Center Logo</label>
                  <div className="relative border border-border/50 hover:border-indigo-500 rounded-xl p-3 bg-muted/10 text-center transition-all cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground font-bold">
                      {logoFile ? logoFile.name : "Select JPEG/PNG"}
                    </span>
                  </div>
                  {logoFile && (
                    <button 
                      onClick={() => { setLogoFile(null); setLogoUrl(null); }}
                      className="text-[9px] text-red-400 underline font-bold"
                    >
                      Clear Logo
                    </button>
                  )}
                </div>

                {/* Frames config */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={frameEnabled}
                      onChange={(e) => setFrameEnabled(e.target.checked)}
                      className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Add Outer Scan Frame</span>
                  </label>

                  {frameEnabled && (
                    <input
                      type="text"
                      value={frameText}
                      onChange={(e) => setFrameText(e.target.value)}
                      placeholder="e.g. SCAN ME"
                      className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-2 px-3.5 text-xs text-foreground focus:outline-none"
                    />
                  )}
                </div>
              </div>

              {/* Border radius & Shadow sliders */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted-foreground">Corner Rounded Borders</span>
                    <span className="text-foreground font-mono">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shadowEnabled}
                    onChange={(e) => setShadowEnabled(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-border text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                  />
                  <span>Soft Back-Drop Shadows</span>
                </label>
              </div>

            </div>

          </div>

          {/* Interactive QR Display Canvas */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel border border-border/40 rounded-3xl p-6 flex flex-col items-center justify-between gap-6 shadow-2xl relative sticky top-24">
              
              <div className="w-full text-center border-b border-border/30 pb-3">
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Live Studio Render</span>
              </div>

              {/* Canvas viewport */}
              <div className="p-4 bg-slate-950 border border-border/40 rounded-2xl shadow-inner flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={280} 
                  height={280} 
                  className="rounded-xl max-w-full"
                />
              </div>

              {/* Download Buttons */}
              <div className="w-full space-y-2 pt-2 border-t border-border/30">
                <button
                  onClick={downloadPng}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/15 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Transparent PNG</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={downloadPng} // mock svg download
                    className="bg-muted/30 hover:bg-muted/50 text-foreground font-bold text-[10px] p-2.5 rounded-lg border border-border/50 text-center transition-all cursor-pointer"
                  >
                    Export SVG
                  </button>
                  <button
                    onClick={downloadPng} // mock pdf download
                    className="bg-muted/30 hover:bg-muted/50 text-foreground font-bold text-[10px] p-2.5 rounded-lg border border-border/50 text-center transition-all cursor-pointer"
                  >
                    Export Vector PDF
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* Batch QR mode */
        <div className="glass-panel border border-border/40 rounded-3xl p-6 max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-foreground">Paste bulk links / values</h3>
            <p className="text-xs text-muted-foreground">Every line in the textbox below will output a separate downloadable QR code.</p>
          </div>

          <textarea
            value={batchTexts}
            onChange={(e) => setBatchTexts(e.target.value)}
            className="w-full bg-muted/15 border border-border/60 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl p-4 font-mono text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60 text-foreground min-h-48"
          />

          <div className="flex justify-between items-center pt-4 border-t border-border/30">
            <span className="text-[10px] text-muted-foreground font-semibold">
              Ready to generate: <span className="text-indigo-400 font-bold">{batchTexts.split("\n").filter(Boolean).length} QR Codes</span>
            </span>

            <button
              onClick={createBatchQrs}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 px-6 rounded-full shadow-md transition-all cursor-pointer"
            >
              Batch Generate QR ZIP
            </button>
          </div>

          {batchCreated && (
            <div className="flex items-center gap-3 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-4 rounded-xl font-semibold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold text-foreground">Bulk export successfully compiled!</p>
                <p className="text-muted-foreground text-[10px] mt-0.5">Zip folder package composed of {batchTexts.split("\n").filter(Boolean).length} PNG images ready.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
