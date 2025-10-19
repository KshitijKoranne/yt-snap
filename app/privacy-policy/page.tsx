import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
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
          <ModeToggle />
        </header>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6">
          At YT Snap, accessible from <Link href="/" className="text-primary hover:underline">https://yt-snap.vercel.app</Link>,
          one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information
          that is collected and recorded by YT Snap and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What information we collect</h2>
        <p className="mb-4">
          YT Snap is designed with privacy in mind. We do NOT collect, store, or track any personal information. Specifically:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>We do not store YouTube URLs you enter</li>
          <li>We do not track your browsing activity</li>
          <li>We do not use cookies or similar tracking technologies</li>
          <li>We do not collect personal data such as names, emails, or IP addresses</li>
          <li>All thumbnail processing happens in your browser - no data is sent to our servers</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-party services</h2>
        <p className="mb-4">
          When you use YT Snap, your browser may directly communicate with:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li><strong>YouTube API:</strong> To fetch video metadata (title, views, etc.) - subject to Google's privacy policy</li>
          <li><strong>YouTube CDN:</strong> To download thumbnail images directly from YouTube's servers</li>
          <li><strong>Google Fonts:</strong> To load fonts for the website</li>
        </ul>
        <p className="mb-4">
          These services may collect data according to their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Local storage</h2>
        <p className="mb-4">
          We use browser's local storage only to remember your theme preference (light/dark mode).
          This data never leaves your device and can be cleared anytime by clearing your browser data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
        <p className="mb-4">
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
          information from anyone under the age of 13. If you are a parent or guardian and you are aware that your 
          child has provided us with Personal Data, please contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>By email: kjrlabs9@gmail.com</li>
        </ul>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-1 mb-2">
          <span>Made in INDIA 🇮🇳</span>
        </div>
        <p>© 2025 KJR Labs • All rights reserved</p>
      </footer>
    </div>
    </div>
  );
} 