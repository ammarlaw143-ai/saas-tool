"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon, Download, Settings, RefreshCw, Check } from "lucide-react";

export default function ImageCompressorTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressing, setCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setOriginalSize(file.size);
    setPreviewUrl(URL.createObjectURL(file));
    setCompressedUrl(null);
    setCompressedSize(0);
  };

  const handleCompress = () => {
    if (!selectedFile) return;
    setCompressing(true);

    const img = new Image();
    img.src = previewUrl || "";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        // Canvas compression exports to webp or jpeg
        const format = selectedFile.type === "image/png" ? "image/jpeg" : selectedFile.type;
        const dataUrl = canvas.toDataURL(format, quality / 100);
        
        setCompressedUrl(dataUrl);
        
        // Approximate bytes from base64
        const stringLength = dataUrl.length - `data:${format};base64,`.length;
        const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334343842; // adjustment coefficient
        setCompressedSize(Math.floor(sizeInBytes));
      }
      setCompressing(false);
    };
  };

  const savedPercent = originalSize && compressedSize
    ? Math.max(0, Math.floor(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="space-y-6">
      {/* Selector */}
      {!selectedFile ? (
        <div className="border-2 border-dashed border-border/80 hover:border-indigo-500 rounded-3xl p-8 text-center transition-all bg-muted/10 relative">
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="space-y-3 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Click or Drag Image here</h3>
            <p className="text-[11px] text-muted-foreground">Supports PNG, JPEG, and WEBP. Up to 15MB.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Settings panel */}
          <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-border/40">
                <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <span>Compression Settings</span>
                </h3>
                <button 
                  onClick={() => { setSelectedFile(null); setPreviewUrl(null); setCompressedUrl(null); }}
                  className="text-[10px] text-red-400 font-bold hover:underline cursor-pointer"
                >
                  Remove File
                </button>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-muted/10 border border-border/30 rounded-xl p-3">
                  <span className="text-[10px] text-muted-foreground block uppercase font-sans font-bold">Original Size</span>
                  <span className="text-foreground font-semibold">{(originalSize / 1024).toFixed(1)} KB</span>
                </div>
                <div className="bg-muted/10 border border-border/30 rounded-xl p-3">
                  <span className="text-[10px] text-muted-foreground block uppercase font-sans font-bold">New Size</span>
                  <span className="text-foreground font-semibold">
                    {compressedSize ? `${(compressedSize / 1024).toFixed(1)} KB` : "Waiting..."}
                  </span>
                </div>
              </div>

              {/* Range slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Compression Quality</span>
                  <span className="text-indigo-400 font-mono">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <p className="text-[10px] text-muted-foreground">Lower quality yields higher compression and smaller file sizes.</p>
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={compressing}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {compressing ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              <span>{compressing ? "Compressing Image..." : "Compress Photo"}</span>
            </button>
          </div>

          {/* Visual Previews */}
          <div className="glass-panel border border-border/40 rounded-2xl p-5 flex flex-col justify-between items-center gap-4">
            <div className="w-full flex justify-between items-center border-b border-border/40 pb-2 text-xs font-bold">
              <span>Preview Panel</span>
              {savedPercent > 0 && (
                <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                  Saved {savedPercent}%
                </span>
              )}
            </div>

            <div className="relative flex-grow flex items-center justify-center bg-muted/10 border border-border/30 rounded-xl overflow-hidden min-h-60 max-h-80 w-full p-4">
              {compressedUrl ? (
                <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain rounded" />
              ) : previewUrl ? (
                <img src={previewUrl} alt="Original" className="max-h-full max-w-full object-contain rounded opacity-75" />
              ) : (
                <ImageIcon className="w-12 h-12 text-muted-foreground/35" />
              )}
            </div>

            {compressedUrl && (
              <a
                href={compressedUrl}
                download={`compressed_${selectedFile.name}`}
                className="w-full text-center bg-green-600 hover:bg-green-500 text-white font-bold text-xs p-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-green-600/15 cursor-pointer"
              >
                <Download className="w-4.5 h-4.5" />
                <span>Download compressed file</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
