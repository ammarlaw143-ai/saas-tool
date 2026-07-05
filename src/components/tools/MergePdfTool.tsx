"use client";

import React, { useState } from "react";
import { Upload, FileText, ArrowRight, X, ArrowUp, ArrowDown, Check, Loader2 } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function MergePdfTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: UploadedFile[] = Array.from(e.target.files).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      file: f,
      name: f.name,
      size: f.size,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setDownloadUrl(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setDownloadUrl(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === files.length - 1) return;
    
    const newFiles = [...files];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIdx];
    newFiles[targetIdx] = temp;
    setFiles(newFiles);
  };

  // Perform Merge using dynamically injected pdf-lib from CDN
  const mergePdfs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    setProgress(15);
    
    try {
      // Check if PDF-Lib is loaded, if not load it dynamically
      if (!(window as any).PDFLib) {
        setProgress(30);
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load PDF library"));
          document.head.appendChild(script);
        });
      }
      
      setProgress(50);
      const { PDFDocument } = (window as any).PDFLib;
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const fileBytes = await files[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page: any) => mergedPdf.addPage(page));
        setProgress(50 + Math.floor((i / files.length) * 40));
      }
      
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setProgress(100);
    } catch (e) {
      console.error(e);
      alert("Error occurred during PDF merging. Ensure files are valid PDFs.");
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-border/80 hover:border-indigo-500 rounded-3xl p-8 text-center transition-all bg-muted/10 relative">
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="space-y-3 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Click or Drag PDFs here</h3>
          <p className="text-[11px] text-muted-foreground">Select two or more PDF documents to merge.</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-foreground flex justify-between items-center">
            <span>Documents to Merge ({files.length})</span>
            <span className="text-[10px] text-muted-foreground">Reorder using arrows</span>
          </h4>
          
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {files.map((f, idx) => (
              <div key={f.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/40 text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <FileText className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-semibold text-foreground truncate max-w-sm">{f.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    disabled={idx === 0} 
                    onClick={() => moveFile(idx, "up")}
                    className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    disabled={idx === files.length - 1} 
                    onClick={() => moveFile(idx, "down")}
                    className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => removeFile(f.id)}
                    className="p-1 rounded text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-between items-center gap-4">
            <button
              onClick={() => setFiles([])}
              className="text-xs text-muted-foreground hover:text-foreground font-bold cursor-pointer"
            >
              Clear All
            </button>
            
            <button
              onClick={mergePdfs}
              disabled={files.length < 2 || merging}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-2.5 px-6 rounded-full flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/15 disabled:opacity-50 cursor-pointer"
            >
              {merging ? (
                <>
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                  <span>Merging PDF... ({progress}%)</span>
                </>
              ) : (
                <>
                  <span>Merge Documents</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Download Alert */}
      {downloadUrl && (
        <div className="glass-panel border-2 border-green-500/40 bg-green-500/5 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Merge completed!</h4>
              <p className="text-muted-foreground text-xs">Your merged file is ready for download. Processed locally.</p>
            </div>
          </div>
          <a
            href={downloadUrl}
            download="merged_document.pdf"
            className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-500 text-white font-bold text-xs p-2.5 px-6 rounded-full shadow-md shadow-green-600/20 shrink-0 transition-all cursor-pointer"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
