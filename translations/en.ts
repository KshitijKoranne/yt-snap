export const en = {
  // Header
  header: {
    title: "YT Snap",
    subtitle: "YouTube Thumbnail Extractor",
    reset: "Reset",
  },

  // Banner
  banner: {
    title: "Chrome Extension Available Now!",
    subtitle: "Extract thumbnails directly from your browser",
  },

  // YouTube Extractor
  extractor: {
    heading: "Extract YouTube Thumbnails",
    description: "Paste a YouTube link to download thumbnails in various resolutions",
    placeholder: "Paste YouTube URL here...",
    extractButton: "Extract",
    processing: "Processing...",
  },

  // Recent History
  history: {
    title: "Recent URLs",
    empty: "No recent URLs",
  },

  // Thumbnail Gallery
  gallery: {
    videoInfo: "Video Information",
    title: "Title",
    channel: "Channel",
    duration: "Duration",
    views: "Views",
    publishedAt: "Published",
    thumbnails: "Available Thumbnails",
    downloadAll: "Download All as ZIP",
    downloading: "Downloading...",
  },

  // Thumbnail Card
  card: {
    download: "Download",
    copyUrl: "Copy URL",
    urlCopied: "URL copied to clipboard!",
    downloadSuccess: "Downloaded successfully!",
    downloadError: "Failed to download image",
  },

  // Quality Labels
  quality: {
    default: "Default",
    medium: "Medium",
    high: "High",
    standard: "Standard",
    maxres: "Max Resolution",
  },

  // Error Messages
  errors: {
    emptyUrl: "Please enter a YouTube URL",
    invalidUrl: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)",
    extractionFailed: "Could not extract video ID. Please check if the URL is correct and try again.",
    unexpectedError: "An unexpected error occurred. Please try again.",
  },

  // Footer
  footer: {
    privacyPolicy: "Privacy Policy",
    madeIn: "Made in INDIA 🇮🇳",
    copyright: "© 2025 KJR Labs • All rights reserved",
  },

  // SEO / Metadata
  seo: {
    faq: {
      q1: "How do I download YouTube thumbnails?",
      a1: "Simply paste a YouTube video URL into YT Snap, and you'll be able to download thumbnails in multiple resolutions including HD quality.",
      q2: "Is YT Snap free to use?",
      a2: "Yes, YT Snap is completely free to use. You can extract and download as many YouTube thumbnails as you need without any cost.",
      q3: "What thumbnail resolutions are available?",
      a3: "YT Snap provides thumbnails in multiple resolutions: default (120x90), medium (320x180), high (480x360), standard (640x480), and maxres (1280x720) quality.",
      q4: "Do I need to install anything?",
      a4: "No installation required. YT Snap is a web-based tool that works directly in your browser. You can also install it as a Progressive Web App (PWA) for offline access.",
    },
  },

  // Language Selector
  language: {
    english: "English",
    hindi: "हिंदी",
  },
};

export type TranslationKeys = {
  header: {
    title: string;
    subtitle: string;
    reset: string;
  };
  banner: {
    title: string;
    subtitle: string;
  };
  extractor: {
    heading: string;
    description: string;
    placeholder: string;
    extractButton: string;
    processing: string;
  };
  history: {
    title: string;
    empty: string;
  };
  gallery: {
    videoInfo: string;
    title: string;
    channel: string;
    duration: string;
    views: string;
    publishedAt: string;
    thumbnails: string;
    downloadAll: string;
    downloading: string;
  };
  card: {
    download: string;
    copyUrl: string;
    urlCopied: string;
    downloadSuccess: string;
    downloadError: string;
  };
  quality: {
    default: string;
    medium: string;
    high: string;
    standard: string;
    maxres: string;
  };
  errors: {
    emptyUrl: string;
    invalidUrl: string;
    extractionFailed: string;
    unexpectedError: string;
  };
  footer: {
    privacyPolicy: string;
    madeIn: string;
    copyright: string;
  };
  seo: {
    faq: {
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
    };
  };
  language: {
    english: string;
    hindi: string;
  };
};

