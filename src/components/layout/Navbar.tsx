"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sun, Moon, Sparkles, Bell, 
  User, LayoutDashboard, LogOut, FileText, 
  Settings, Key, CreditCard 
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Load state from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.style.colorScheme = "dark";
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setShowUserMenu(false);
    router.push("/");
  };

  const navLinks = [
    { name: "All Tools", href: "/tools" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-background/85 backdrop-blur-md border-border/60 shadow-lg shadow-black/10" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                ToolVerse<span className="text-indigo-500 font-extrabold text-sm ml-0.5">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive 
                      ? "text-indigo-400 bg-indigo-500/10" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full border border-border/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all relative cursor-pointer"
                  >
                    <Bell className="w-4.5 h-4.5" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  </button>
                  <AnimatePresence>
                    {showNotifications && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-80 rounded-xl glass-panel p-4 border border-border/60 shadow-2xl z-20"
                        >
                          <h3 className="font-semibold text-sm mb-2 border-b border-border/40 pb-2 flex justify-between items-center">
                            <span>Notifications</span>
                            <span className="text-xs text-indigo-400 font-normal">Mark all read</span>
                          </h3>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            <div className="text-xs hover:bg-muted/40 p-2 rounded-lg transition-all cursor-pointer">
                              <p className="font-medium text-foreground">👑 VIP Membership Activated</p>
                              <p className="text-muted-foreground mt-0.5">Welcome to ToolVerse Pro. Enjoy limitless conversions!</p>
                            </div>
                            <div className="text-xs hover:bg-muted/40 p-2 rounded-lg transition-all cursor-pointer">
                              <p className="font-medium text-foreground">📄 PDF Merge completed</p>
                              <p className="text-muted-foreground mt-0.5">Successfully merged 4 files (Saved 1.2MB).</p>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1 px-3 rounded-full border border-border/50 bg-muted/20 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      JD
                    </div>
                    <span className="text-xs font-medium text-foreground">John Doe</span>
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-xl glass-panel p-2 border border-border/60 shadow-2xl z-20"
                        >
                          <div className="px-3 py-2 border-b border-border/40 mb-1">
                            <p className="text-xs text-muted-foreground">Signed in as</p>
                            <p className="text-sm font-semibold text-foreground truncate">john.doe@example.com</p>
                          </div>
                          
                          <Link
                            href="/dashboard"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 p-2 rounded-lg transition-all"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>User Dashboard</span>
                          </Link>
                          
                          <Link
                            href="/dashboard?tab=subscription"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 p-2 rounded-lg transition-all"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>Billing & Pro</span>
                          </Link>

                          <Link
                            href="/dashboard?tab=profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 p-2 rounded-lg transition-all"
                          >
                            <User className="w-4 h-4" />
                            <span>Edit Profile</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all mt-1 cursor-pointer"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href="/dashboard"
                  className="bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-xs font-semibold px-4 py-2 rounded-full transition-all"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 px-4 py-2 rounded-full transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium text-sm px-5 py-2 rounded-full transition-all shadow-md shadow-black/10"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-border/40 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/10 text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-4 py-2.5 rounded-full border border-border/40 font-medium text-sm text-foreground hover:bg-muted/40 transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-center px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 font-medium text-sm text-white transition-all shadow-md shadow-indigo-600/15"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
