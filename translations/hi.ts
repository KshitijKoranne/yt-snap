import { TranslationKeys } from './en';

export const hi: TranslationKeys = {
  // Header
  header: {
    title: "YT Snap",
    subtitle: "YouTube Thumbnail निकालने का टूल",
    reset: "रीसेट करें",
  },

  // Banner
  banner: {
    title: "Chrome Extension अब उपलब्ध है!",
    subtitle: "अपने ब्राउज़र से सीधे thumbnails निकालें",
  },

  // YouTube Extractor
  extractor: {
    heading: "YouTube Thumbnails निकालें",
    description: "विभिन्न resolutions में thumbnails डाउनलोड करने के लिए YouTube link पेस्ट करें",
    placeholder: "YouTube URL यहाँ पेस्ट करें...",
    extractButton: "निकालें",
    processing: "प्रोसेस हो रहा है...",
  },

  // Recent History
  history: {
    title: "हाल के URLs",
    empty: "कोई हाल का URL नहीं",
  },

  // Thumbnail Gallery
  gallery: {
    videoInfo: "वीडियो की जानकारी",
    title: "शीर्षक",
    channel: "चैनल",
    duration: "अवधि",
    views: "व्यूज़",
    publishedAt: "प्रकाशित",
    thumbnails: "उपलब्ध Thumbnails",
    downloadAll: "सभी को ZIP में डाउनलोड करें",
    downloading: "डाउनलोड हो रहा है...",
  },

  // Thumbnail Card
  card: {
    download: "डाउनलोड करें",
    copyUrl: "URL कॉपी करें",
    urlCopied: "URL clipboard में कॉपी हो गया!",
    downloadSuccess: "सफलतापूर्वक डाउनलोड हो गया!",
    downloadError: "इमेज डाउनलोड करने में विफल",
  },

  // Quality Labels
  quality: {
    default: "डिफ़ॉल्ट",
    medium: "मध्यम",
    high: "उच्च",
    standard: "स्टैंडर्ड",
    maxres: "अधिकतम Resolution",
  },

  // Error Messages
  errors: {
    emptyUrl: "कृपया YouTube URL दर्ज करें",
    invalidUrl: "कृपया एक मान्य YouTube URL दर्ज करें (जैसे, https://www.youtube.com/watch?v=...)",
    extractionFailed: "वीडियो ID निकाला नहीं जा सका। कृपया जांचें कि URL सही है और फिर से प्रयास करें।",
    unexpectedError: "एक अप्रत्याशित त्रुटि हुई। कृपया फिर से प्रयास करें।",
  },

  // Footer
  footer: {
    privacyPolicy: "गोपनीयता नीति",
    madeIn: "भारत में बनाया गया 🇮🇳",
    copyright: "© 2025 KJR Labs • सर्वाधिकार सुरक्षित",
  },

  // SEO / Metadata
  seo: {
    faq: {
      q1: "मैं YouTube thumbnails कैसे डाउनलोड करूं?",
      a1: "बस YT Snap में YouTube वीडियो URL पेस्ट करें, और आप HD quality सहित कई resolutions में thumbnails डाउनलोड कर सकेंगे।",
      q2: "क्या YT Snap उपयोग करने के लिए मुफ्त है?",
      a2: "हां, YT Snap पूरी तरह से मुफ्त है। आप बिना किसी लागत के जितने चाहें उतने YouTube thumbnails निकाल और डाउनलोड कर सकते हैं।",
      q3: "कौन से thumbnail resolutions उपलब्ध हैं?",
      a3: "YT Snap कई resolutions में thumbnails प्रदान करता है: default (120x90), medium (320x180), high (480x360), standard (640x480), और maxres (1280x720) quality।",
      q4: "क्या मुझे कुछ इंस्टॉल करना होगा?",
      a4: "कोई इंस्टॉलेशन आवश्यक नहीं। YT Snap एक वेब-आधारित टूल है जो सीधे आपके ब्राउज़र में काम करता है। आप इसे offline access के लिए Progressive Web App (PWA) के रूप में भी इंस्टॉल कर सकते हैं।",
    },
  },

  // Language Selector
  language: {
    english: "English",
    hindi: "हिंदी",
  },
} as const;
