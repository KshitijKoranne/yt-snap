import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'YT Snap - YouTube Thumbnail Extractor',
  description: 'Extract YouTube thumbnails in various resolutions quickly and easily',
  metadataBase: new URL('https://yt-snap.in'),
  openGraph: {
    title: 'YT Snap - YouTube Thumbnail Extractor',
    description: 'Extract YouTube thumbnails in various resolutions quickly and easily',
    url: 'https://yt-snap.in',
    siteName: 'YT Snap',
    images: [
      {
        url: '/og-image.svg',
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
    description: 'Extract YouTube thumbnails in various resolutions quickly and easily',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2348061981942083"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}