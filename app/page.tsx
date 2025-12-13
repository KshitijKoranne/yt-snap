'use client'
import YouTubeExtractor from '@/components/YouTubeExtractor';
import { ModeToggle } from '@/components/mode-toggle';
// import { AdBanner } from '@/components/AdBanner'; // Temporarily disabled
import { SocialShare } from '@/components/SocialShare';
import { BuyMeCoffeeButton } from '@/components/BuyMeCoffeeButton';
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
    <>
      {/* FAQ Structured Data for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I download YouTube thumbnails?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply paste a YouTube video URL into YT Snap, and you'll be able to download thumbnails in multiple resolutions including HD quality."
                }
              },
              {
                "@type": "Question",
                "name": "Is YT Snap free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, YT Snap is completely free to use. You can extract and download as many YouTube thumbnails as you need without any cost."
                }
              },
              {
                "@type": "Question",
                "name": "What thumbnail resolutions are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "YT Snap provides thumbnails in multiple resolutions: default (120x90), medium (320x180), high (480x360), standard (640x480), and maxres (1280x720) quality."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to install anything?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No installation required. YT Snap is a web-based tool that works directly in your browser. You can also install it as a Progressive Web App (PWA) for offline access."
                }
              }
            ]
          })
        }}
        strategy="beforeInteractive"
      />

    <main className="min-h-screen p-4 md:p-6 lg:p-8 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        {/* <AdBanner className="mb-8" position="top" /> */}

        <header className="flex items-center justify-between mb-8 w-full">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 focus:outline-none group" aria-label="YT Snap Home">
              <img
                src="/icon-64x64.png"
                alt="YT Snap - YouTube Thumbnail Extractor Logo"
                className="w-10 h-10 md:w-12 md:h-12"
                width="48"
                height="48"
              />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-slow font-cursive">
                YT Snap
              </h1>
            </Link>
            <p className="text-muted-foreground text-sm hidden md:block">
              | YouTube Thumbnail Extractor
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <BuyMeCoffeeButton className="hidden sm:flex" />
            <SocialShare className="hidden md:flex" />
            <ModeToggle />
          </div>
        </header>

        {/* Chrome Extension Coming Soon Banner */}
        <div className="mb-6 p-4 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.894c-.553.553-1.447.553-2 0L12 11l-3.894 3.894c-.553.553-1.447.553-2 0s-.553-1.447 0-2L10 9l-3.894-3.894c-.553-.553-.553-1.447 0-2s1.447-.553 2 0L12 7l3.894-3.894c.553-.553 1.447-.553 2 0s.553 1.447 0 2L14 9l3.894 3.894c.553.553.553 1.447 0 2z"/>
              </svg>
              <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Chrome Extension Coming Soon!
              </span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Extract thumbnails directly from your browser
            </span>
          </div>
        </div>

        {/* Add reset button above the extractor */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-muted text-foreground border hover:bg-primary/10 transition-colors text-sm font-medium"
            aria-label="Reset YouTube Thumbnail Extractor"
          >
            Reset
          </button>
        </div>
        <article>
          <YouTubeExtractor key={extractorKey} />
        </article>

        {/* <AdBanner className="my-8" position="bottom" /> */}
        
        <footer className="mt-auto pt-12 pb-6 border-t text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <SocialShare className="md:hidden" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span>Made in INDIA 🇮🇳</span>
            </div>
            <p>© 2025 KJR Labs • All rights reserved</p>
          </div>
        </footer>
      </div>
    </main>
    </>
  );
}