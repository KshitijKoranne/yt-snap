# YT Snap - Chrome Extension

Extract and download YouTube thumbnails in multiple resolutions with one click!

## 🚀 Features

- **Multiple Resolutions**: Download thumbnails in 14 different resolutions (from 120×90 to 1280×720)
- **Bulk Download**: Download all thumbnails as a ZIP file
- **Auto-Detection**: Automatically detects YouTube URLs from the current tab
- **Website Link**: Quick access to the full YT Snap website
- **Beautiful UI**: Dark theme with smooth animations and vibrant gradients
- **Fast & Lightweight**: No external dependencies except JSZip

## 📦 Installation

### Load Unpacked Extension (Development)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `YT-snap-chrome` folder
6. The extension icon should appear in your toolbar!

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

## 🎯 Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Paste a YouTube URL** or let it auto-detect from the current tab
3. **Click "Extract"** to generate thumbnails
4. **Download** individual thumbnails or all at once as a ZIP file

### Keyboard Shortcuts

- Press `Enter` in the URL input to extract thumbnails

## 🎨 UI Features

- **Dark Theme**: Easy on the eyes with a sophisticated dark color palette
- **Smooth Animations**: Subtle fade-in and scale animations for a polished feel
- **Gradient Accents**: Beautiful purple-to-indigo gradient for primary actions
- **Responsive Grid**: Thumbnails displayed in a clean 2-column grid
- **Hover Effects**: Interactive hover states on all clickable elements

## 📁 Project Structure

```
YT-snap-chrome/
├── manifest.json           # Extension configuration (Manifest V3)
├── popup.html             # Main popup interface
├── icons/                 # Extension icons
│   ├── icon-16x16.png
│   ├── icon-48x48.png
│   └── icon-128x128.png
├── styles/
│   └── popup.css          # Styling with animations
├── scripts/
│   └── popup.js           # Main popup logic
├── utils/
│   └── youtube-utils.js   # YouTube URL parsing & thumbnail generation
└── lib/
    └── jszip.min.js       # ZIP file creation library
```

## 🛠️ Technical Details

- **Manifest Version**: V3 (latest Chrome extension standard)
- **Permissions**: 
  - `activeTab` - For auto-detecting YouTube URLs
- **Host Permissions**: `https://img.youtube.com/*` - For downloading thumbnails
- **Dependencies**: JSZip (bundled)

## 🔧 Development

### Prerequisites

- Google Chrome (or Chromium-based browser)
- Basic knowledge of HTML, CSS, and JavaScript

### Making Changes

1. Edit the files in the `YT-snap-chrome` folder
2. Go to `chrome://extensions/`
3. Click the refresh icon on the YT Snap extension card
4. Test your changes by opening the popup

### Building for Production

The extension is ready to use as-is. For Chrome Web Store submission:

1. Ensure all files are in the `YT-snap-chrome` folder
2. Create a ZIP of the entire folder
3. Upload to Chrome Web Store Developer Dashboard

## 🎨 Color Palette

- **Background**: `#0f0f0f` (Deep black)
- **Secondary**: `#1a1a1a` (Dark grey)
- **Accent**: `#6366f1` → `#8b5cf6` (Purple-Indigo gradient)
- **Text**: `#ffffff` (White) / `#a0a0a0` (Grey)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)

## 📝 Supported YouTube URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`
- And more!

## 🐛 Troubleshooting

### Extension doesn't load
- Make sure Developer mode is enabled in `chrome://extensions/`
- Check that all files are in the correct folder structure
- Look for errors in the extension's console

### Thumbnails not downloading
- Check your browser's download settings
- Ensure pop-ups are not blocked for the extension
- Verify internet connection

### History not saving
- Check if Chrome storage permissions are granted
- Clear extension data and try again

## 🤝 Contributing

This extension is part of the YT Snap project. Contributions are welcome!

## 📄 License

© 2025 KJR Labs • All rights reserved

## 🌟 Credits

- Built with ❤️ by KJR Labs
- Inspired by the YT Snap web application
- Icons from the YT Snap website

## 🔗 Related Projects

- [YT Snap Website](https://yt-snap.vercel.app) - Web version of this tool

---

**Made in India 🇮🇳**
