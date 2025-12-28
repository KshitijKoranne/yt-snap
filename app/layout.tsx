import './globals.css';
import type { Metadata } from 'next';
import { Inter, Dancing_Script } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { Toaster } from '@/components/ui/sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-dancing-script'
});

export const metadata: Metadata = {
  title: 'YT Snap - YouTube Thumbnail Extractor | Download HD Thumbnails',
  description: 'Extract and download high-quality YouTube thumbnails in multiple resolutions. Free, fast, and easy-to-use YouTube thumbnail downloader with video metadata display.',
  metadataBase: new URL('https://yt-snap.vercel.app'),
  keywords: ['youtube thumbnail', 'thumbnail extractor', 'thumbnail downloader', 'youtube thumbnail download', 'hd thumbnail', 'youtube image', 'video thumbnail'],
  authors: [{ name: 'KJR Labs' }],
  creator: 'KJR Labs',
  publisher: 'KJR Labs',
  manifest: '/manifest.json',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'YT Snap - YouTube Thumbnail Extractor',
    description: 'Extract and download high-quality YouTube thumbnails in multiple resolutions. Free, fast, and easy-to-use.',
    url: 'https://yt-snap.vercel.app',
    siteName: 'YT Snap',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YT Snap - YouTube Thumbnail Extractor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YT Snap - YouTube Thumbnail Extractor',
    description: 'Extract and download high-quality YouTube thumbnails in multiple resolutions',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'SVnmRmT0qiTcTfWu7HL0JQMqxBWt5aacRwRkIL5bMH4',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'YT Snap',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-64x64.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2348061981942083"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "YT Snap",
              "alternateName": "YouTube Thumbnail Extractor",
              "url": "https://yt-snap.vercel.app",
              "description": "Extract YouTube thumbnails in various resolutions quickly and easily. Download high-quality thumbnails from any YouTube video.",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Extract thumbnails in multiple resolutions",
                "Download all thumbnails as ZIP",
                "View video metadata",
                "Custom thumbnail sizes",
                "Progressive Web App support"
              ],
              "screenshot": "https://yt-snap.vercel.app/og-image.png",
              "author": {
                "@type": "Organization",
                "name": "KJR Labs"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}