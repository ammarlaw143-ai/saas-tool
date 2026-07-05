import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ToolVerse AI | Premium AI-Powered File & Developer Utility Suite",
  description: "The ultimate modern workspace for PDFs, images, developers, and AI-powered assets. Free client-side tools and advanced, customizable premium workflows.",
  keywords: ["pdf tools", "image converter", "developer utility", "custom qr codes", "ai tools", "image compression", "nextjs tools"],
  authors: [{ name: "ToolVerse AI Team" }],
  metadataBase: new URL("https://toolverse-ai.com"),
  openGraph: {
    title: "ToolVerse AI | Premium Utilities",
    description: "Convert, split, design, and automate instantly. All free utilities processed securely in-browser.",
    url: "https://toolverse-ai.com",
    siteName: "ToolVerse AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolVerse AI | Utilities Suite",
    description: "The ultimate modern workspace for PDFs, images, developers, and AI-powered assets.",
    creator: "@toolverse_ai",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} style={{ colorScheme: "dark" }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
