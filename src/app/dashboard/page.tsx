"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, Heart, Download, Activity, CreditCard, 
  Key, User, Bell, Shield, KeyRound, Copy, Check, Plus, 
  Trash2, FileText, ExternalLink, Sparkles, TrendingUp
} from "lucide-react";

// Mock usage list data
const RECENT_FILES = [
  { id: "1", name: "invoice_2026_q2.pdf", size: "2.4 MB", type: "PDF Merge", date: "July 04, 2026", status: "Success" },
  { id: "2", name: "hero_mockup_v1.png", size: "8.1 MB", type: "Image Compressor", date: "July 03, 2026", status: "Success" },
  { id: "3", name: "config_schema.json", size: "45 KB", type: "JSON Formatter", date: "July 01, 2026", status: "Success" },
];

export default function UserDashboard() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // States
  const [isPro, setIsPro] = useState(false);
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; key: string; created: string }>>([
    { id: "1", name: "Production API Key", key: "tv_live_49f8a3c...d88", created: "Jun 12, 2026" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  
  // Profile settings
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [company, setCompany] = useState("Linear Corp");
  const [isSaved, setIsSaved] = useState(false);

  // Sync tab from URL query if available
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      // Set logged in just so dashboard functions
      localStorage.setItem("isLoggedIn", "true");
    }
    setIsPro(localStorage.getItem("isPro") === "true");
  }, [searchParams]);

  // Create API Key
  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;
    const randomKey = `tv_${isPro ? "live" : "test"}_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    const newKey = {
      id: Math.random().toString(36).substring(2, 9),
      name: newKeyName,
      key: randomKey,
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setApiKeys((prev) => [...prev, newKey]);
    setNewKeyName("");
  };

  const deleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const copyKey = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  // Mock subscription upgrade
  const handleUpgrade = () => {
    localStorage.setItem("isPro", "true");
    setIsPro(true);
    alert("Pro Membership activated! Thanks for upgrading.");
  };

  const handleDowngrade = () => {
    localStorage.setItem("isPro", "false");
    setIsPro(false);
    alert("Subscription cancelled. You will revert to free plan next cycle.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
            
            {/* User Intro */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-md">
                {name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="truncate">
                <h4 className="font-bold text-sm text-foreground truncate">{name}</h4>
                <span className="text-[10px] text-muted-foreground block font-mono">{email}</span>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-1">
              {[
                { id: "overview", name: "Workspace Overview", icon: LayoutDashboard },
                { id: "usage", name: "Usage Analytics", icon: Activity },
                { id: "subscription", name: "Billing & Plans", icon: CreditCard },
                { id: "api", name: "Developer APIs", icon: Key },
                { id: "profile", name: "Profile Settings", icon: User },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeTab === item.id
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Overview Panel */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Promo Banner if not Pro */}
              {!isPro && (
                <div className="glass-panel border-2 border-indigo-500 bg-indigo-500/5 rounded-2xl p-6 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                  <div className="space-y-2 relative z-10">
                    <h3 className="font-bold text-base text-foreground flex items-center gap-1.5">
                      <span>Upgrade to Pro Membership</span>
                      <Crown className="w-4 h-4 text-indigo-400 fill-indigo-400" />
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                      Get limitless document processing volumes, larger file capacity bounds, customized QR codes, and advanced generative AI assets tools.
                    </p>
                  </div>
                  <button
                    onClick={handleUpgrade}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 px-6 rounded-full shadow-md shrink-0 cursor-pointer"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}

              {/* Stats Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Usage Quota</span>
                  <p className="text-3xl font-extrabold text-foreground">{isPro ? "Unlimited" : "12 / 50 files"}</p>
                  <span className="text-[10px] text-muted-foreground block">Resets on July 10, 2026</span>
                </div>
                <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Plan Billing</span>
                  <p className="text-3xl font-extrabold text-foreground">{isPro ? "Pro Plan" : "Free Trial"}</p>
                  <span className="text-[10px] text-muted-foreground block">{isPro ? "$15/month" : "Basic usage"}</span>
                </div>
                <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Active API Keys</span>
                  <p className="text-3xl font-extrabold text-foreground">{apiKeys.length}</p>
                  <span className="text-[10px] text-muted-foreground block">Authentication integrations</span>
                </div>
              </div>

              {/* Recent Files Table */}
              <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-4">
                <h3 className="text-xs font-bold text-foreground">Recent File Operations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border/30 text-muted-foreground font-semibold">
                        <th className="pb-3 pr-4">File Name</th>
                        <th className="pb-3 px-4">Utility Type</th>
                        <th className="pb-3 px-4">Size</th>
                        <th className="pb-3 px-4">Date Processed</th>
                        <th className="pb-3 pl-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_FILES.map((file) => (
                        <tr key={file.id} className="border-b border-border/20 text-muted-foreground hover:bg-muted/10 transition-all">
                          <td className="py-3 pr-4 font-semibold text-foreground">{file.name}</td>
                          <td className="py-3 px-4">{file.type}</td>
                          <td className="py-3 px-4 font-mono text-[11px]">{file.size}</td>
                          <td className="py-3 px-4">{file.date}</td>
                          <td className="py-3 pl-4">
                            <span className="text-[10px] bg-green-500/10 border border-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">
                              {file.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Usage Panel */}
          {activeTab === "usage" && (
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Activity className="w-4.5 h-4.5 text-indigo-400" />
                <span>Processing Volume Trends</span>
              </h3>

              {/* SVG Charts instead of bulky imports */}
              <div className="h-60 bg-muted/15 border border-border/30 rounded-xl p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                  <span>Weekly files converted</span>
                  <span className="text-indigo-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24% this week</span>
                  </span>
                </div>
                
                {/* Simulated Chart */}
                <div className="flex items-end justify-between h-40 pt-4 px-6 border-b border-border/30">
                  {[2, 5, 8, 4, 12, 9, 15].map((h, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 w-1/8">
                      <div 
                        className="bg-indigo-600/80 hover:bg-indigo-500 rounded-t w-6 transition-all" 
                        style={{ height: `${h * 8}px` }} 
                      />
                      <span className="text-[9px] font-semibold text-muted-foreground">Day {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <h3 className="text-sm font-bold text-foreground">Billing Settings</h3>
                <span className="text-xs bg-indigo-500/10 text-indigo-400 font-bold px-2 py-0.5 rounded">
                  Stripe Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/10 border border-border/30 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Current Membership</span>
                  <div className="flex items-baseline gap-1.5">
                    <h4 className="text-2xl font-extrabold text-foreground">{isPro ? "ToolVerse Pro" : "Free Tier"}</h4>
                    <span className="text-xs text-muted-foreground">{isPro ? "$15/month" : "$0"}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {isPro 
                      ? "Next bill generates August 04, 2026. Billed via visa credit card ending 4242."
                      : "Upgrade to pro plan for limitless actions and API vectors."
                    }
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-2">
                  {isPro ? (
                    <button
                      onClick={handleDowngrade}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold text-xs p-3 rounded-xl transition-all cursor-pointer"
                    >
                      Cancel Pro Subscription
                    </button>
                  ) : (
                    <button
                      onClick={handleUpgrade}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Upgrade to Pro Plan
                    </button>
                  )}
                  <button className="bg-muted/30 border border-border/40 hover:bg-muted/50 text-foreground font-bold text-xs p-3 rounded-xl transition-all cursor-pointer">
                    View Billing Invoices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API panel */}
          {activeTab === "api" && (
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <div>
                  <h3 className="text-sm font-bold text-foreground">API Credentials</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Generate client keys to authenticate programmatic REST pipelines.</p>
                </div>
              </div>

              {/* List */}
              <div className="space-y-3">
                {apiKeys.map((k) => (
                  <div key={k.id} className="flex justify-between items-center p-3 rounded-xl bg-muted/20 border border-border/40 text-xs font-semibold">
                    <div className="space-y-0.5">
                      <p className="text-foreground">{k.name}</p>
                      <p className="font-mono text-[10px] text-indigo-400">{k.key}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyKey(k.id, k.key)}
                        className="p-2 rounded bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {copiedKeyId === k.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => deleteKey(k.id)}
                        className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Create new Form */}
              <form onSubmit={handleCreateKey} className="flex gap-2 border-t border-border/30 pt-5">
                <input
                  type="text"
                  required
                  placeholder="Key name (e.g. Staging Server)..."
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-grow bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-2.5 text-xs font-semibold focus:outline-none transition-all text-foreground"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-2.5 px-4 rounded-xl flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Key</span>
                </button>
              </form>
            </div>
          )}

          {/* Profile settings */}
          {activeTab === "profile" && (
            <div className="glass-panel border border-border/40 rounded-2xl p-5 space-y-6">
              <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border/30">Profile Settings</h3>

              <div className="space-y-4 max-w-md">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-3 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-3 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-muted/30 border border-border/60 focus:border-indigo-500 rounded-xl p-3 text-xs text-foreground focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsSaved(true);
                      setTimeout(() => setIsSaved(false), 3000);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs p-3 px-6 rounded-full shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                  {isSaved && (
                    <span className="text-green-400 text-xs font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>Changes saved!</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
