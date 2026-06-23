'use client'
import YouTubeExtractor from '@/components/YouTubeExtractor';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageSelector } from '@/components/LanguageSelector';
// import { AdBanner } from '@/components/AdBanner'; // Temporarily disabled
import { SocialShare } from '@/components/SocialShare';
import { BuyMeCoffeeButton } from '@/components/BuyMeCoffeeButton';
import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const CHROME_EXTENSION_URL = 'https://chromewebstore.google.com/detail/dgkjmjkiobomdkcohebpjhlpobkigcck?utm_source=item-share-cb';

export default function Home() {
  const { t } = useTranslation();
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
                "name": t.seo.faq.q1,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t.seo.faq.a1
                }
              },
              {
                "@type": "Question",
                "name": t.seo.faq.q2,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t.seo.faq.a2
                }
              },
              {
                "@type": "Question",
                "name": t.seo.faq.q3,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t.seo.faq.a3
                }
              },
              {
                "@type": "Question",
                "name": t.seo.faq.q4,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": t.seo.faq.a4
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
                {t.header.title}
              </h1>
            </Link>
            <p className="text-muted-foreground text-sm hidden md:block">
              | {t.header.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <BuyMeCoffeeButton className="hidden sm:flex" />
            <SocialShare className="hidden md:flex" />
            <LanguageSelector />
            <ModeToggle />
          </div>
        </header>

        {/* Chrome Extension Banner */}
        <div className="mb-6 p-4 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t.banner.title}
            </span>
            <span className="text-xs md:text-sm text-muted-foreground">
              {t.banner.subtitle}
            </span>
            <a
              href={CHROME_EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-background"
              aria-label="Install the YT Snap Chrome extension from the Chrome Web Store"
            >
              Add to Chrome
            </a>
          </div>
        </div>

        {/* Add reset button above the extractor */}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded bg-muted text-foreground border hover:bg-primary/10 transition-colors text-sm font-medium"
            aria-label="Reset YouTube Thumbnail Extractor"
          >
            {t.header.reset}
          </button>
        </div>
        <article>
          <YouTubeExtractor key={extractorKey} />
        </article>

        {/* <AdBanner className="my-8" position="bottom" /> */}
        
        <footer className="mt-auto pt-12 pb-6 border-t text-center text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <SocialShare className="md:hidden" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <span>{t.footer.madeIn}</span>
            </div>
            <p>{t.footer.copyright}</p>
          </div>
        </footer>
      </div>
    </main>
    </>
  );
}