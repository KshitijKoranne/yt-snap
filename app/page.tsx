'use client'
import YouTubeExtractor from '@/components/YouTubeExtractor';
import { ModeToggle } from '@/components/mode-toggle';
// import { AdBanner } from '@/components/AdBanner'; // Temporarily disabled
import { SocialShare } from '@/components/SocialShare';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';

export default function Home() {
  // For reset button, we need to force remount YouTubeExtractor
  const [extractorKey, setExtractorKey] = useState(0);

  const handleReset = () => {
    setExtractorKey((k) => k + 1);
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* <AdBanner className="mb-8" position="top" /> */}
        
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 focus:outline-none group">
              <img
                src="/icon-64x64.png"
                alt="YT Snap Logo"
                className="w-10 h-10 md:w-12 md:h-12"
              />
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow font-cursive">
                YT Snap
              </span>
            </Link>
            <p className="text-muted-foreground text-sm hidden md:block">
              | YouTube Thumbnail Extractor
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SocialShare className="hidden md:flex" />
            <ModeToggle />
          </div>
        </header>

        {/* Add reset button above the extractor */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-muted text-foreground border hover:bg-primary/10 transition-colors text-sm font-medium"
            aria-label="Reset"
          >
            Reset
          </button>
        </div>
        <YouTubeExtractor key={extractorKey} />

        {/* <AdBanner className="my-8" position="bottom" /> */}
        
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:inline">•</span>
            <SocialShare className="md:hidden" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span>Made in</span>
              <span>INDIA</span>
            </div>
            <p>© 2025 KSK Labs • All rights reserved</p>
            {/* Buy Me a Coffee Button */}
            <div className="mt-2">
              <Script
                type="text/javascript"
                src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
                data-name="bmc-button"
                data-slug="kshitijkorz"
                data-color="#FF5F5F"
                data-emoji=""
                data-font="Cookie"
                data-text="Buy me a coffee"
                data-outline-color="#000000"
                data-font-color="#ffffff"
                data-coffee-color="#FFDD00"
                strategy="afterInteractive"
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div class="bmc-btn-container"><a href="https://www.buymeacoffee.com/kshitijkorz" target="_blank" class="bmc-btn" rel="noopener"><span class="bmc-btn-text">Buy me a coffee</span></a></div>`
                }}
              />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}