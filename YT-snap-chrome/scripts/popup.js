/**
 * YT Snap - Popup Script
 * Main logic for the Chrome extension popup
 */

// DOM Elements
const urlInput = document.getElementById('urlInput');
const extractBtn = document.getElementById('extractBtn');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loadingState = document.getElementById('loadingState');
const thumbnailsSection = document.getElementById('thumbnailsSection');
const thumbnailsGrid = document.getElementById('thumbnailsGrid');
const downloadAllBtn = document.getElementById('downloadAllBtn');

// State
let currentVideoId = null;
let currentThumbnails = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  checkActiveTab();
});

/**
 * Setup event listeners
 */
function setupEventListeners() {
  extractBtn.addEventListener('click', handleExtract);
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleExtract();
    }
  });
  downloadAllBtn.addEventListener('click', handleDownloadAll);
}

/**
 * Check if current tab is a YouTube page and auto-fill URL
 */
async function checkActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && isValidYouTubeUrl(tab.url)) {
      urlInput.value = tab.url;
      urlInput.focus();
    }
  } catch (error) {
    console.error('Error checking active tab:', error);
  }
}

/**
 * Handle extract button click
 */
async function handleExtract() {
  const url = urlInput.value.trim();
  
  // Reset states
  hideError();
  hideThumbnails();
  
  // Validate input
  if (!url) {
    showError('Please enter a YouTube URL');
    return;
  }
  
  if (!isValidYouTubeUrl(url)) {
    showError('Please enter a valid YouTube URL');
    return;
  }
  
  // Extract video ID
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    showError('Could not extract video ID from URL');
    return;
  }
  
  // Show loading
  showLoading();
  
  // Generate thumbnails
  try {
    currentVideoId = videoId;
    currentThumbnails = generateThumbnailData(videoId);
    
    // Display thumbnails
    displayThumbnails();
    hideLoading();
  } catch (error) {
    console.error('Error extracting thumbnails:', error);
    showError('An error occurred while extracting thumbnails');
    hideLoading();
  }
}

/**
 * Display thumbnails in grid
 */
function displayThumbnails() {
  thumbnailsGrid.innerHTML = '';
  
  currentThumbnails.forEach((thumbnail, index) => {
    const card = createThumbnailCard(thumbnail, index);
    thumbnailsGrid.appendChild(card);
  });
  
  thumbnailsSection.style.display = 'block';
}

/**
 * Create thumbnail card element
 */
function createThumbnailCard(thumbnail, index) {
  const card = document.createElement('div');
  card.className = 'thumbnail-card';
  
  card.innerHTML = `
    <div class="thumbnail-image-wrapper">
      <img 
        src="${thumbnail.url}" 
        alt="${thumbnail.name}"
        class="thumbnail-image"
        loading="lazy"
      >
    </div>
    <div class="thumbnail-info">
      <div class="thumbnail-name">${thumbnail.name}</div>
      <div class="thumbnail-resolution">${thumbnail.resolution}</div>
    </div>
    <div class="thumbnail-actions">
      <button class="download-btn" data-url="${thumbnail.url}" data-quality="${thumbnail.quality}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Download
      </button>
    </div>
  `;
  
  // Add download event listener
  const downloadBtn = card.querySelector('.download-btn');
  downloadBtn.addEventListener('click', () => {
    handleDownloadSingle(thumbnail.url, thumbnail.quality);
  });
  
  return card;
}

/**
 * Download single thumbnail
 */
async function handleDownloadSingle(url, quality) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `yt-snap_${currentVideoId}_${quality}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    
    showSuccess('Thumbnail downloaded successfully!');
  } catch (error) {
    console.error('Error downloading thumbnail:', error);
    showError('Failed to download thumbnail');
  }
}

/**
 * Download all thumbnails as ZIP
 */
async function handleDownloadAll() {
  if (!currentThumbnails.length) return;
  
  downloadAllBtn.disabled = true;
  downloadAllBtn.innerHTML = `
    <div class="spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>
    <span>Downloading...</span>
  `;
  
  try {
    const zip = new JSZip();
    
    // Fetch all thumbnails
    for (const thumbnail of currentThumbnails) {
      try {
        const response = await fetch(thumbnail.url);
        const blob = await response.blob();
        zip.file(`${currentVideoId}_${thumbnail.quality}.jpg`, blob);
      } catch (error) {
        console.error(`Error fetching ${thumbnail.quality}:`, error);
      }
    }
    
    // Generate and download ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    const downloadUrl = URL.createObjectURL(content);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `yt-snap_${currentVideoId}_all_thumbnails.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    
    showSuccess('All thumbnails downloaded successfully!');
  } catch (error) {
    console.error('Error downloading all thumbnails:', error);
    showError('Failed to download thumbnails');
  } finally {
    downloadAllBtn.disabled = false;
    downloadAllBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <span>Download All</span>
    `;
  }
}



/**
 * Show error message
 */
function showError(message) {
  errorText.textContent = message;
  errorMessage.style.display = 'flex';
  setTimeout(() => {
    hideError();
  }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
  errorMessage.style.display = 'none';
}

/**
 * Show success message (reuse error styling with green)
 */
function showSuccess(message) {
  errorText.textContent = message;
  errorMessage.style.display = 'flex';
  errorMessage.style.background = 'rgba(16, 185, 129, 0.1)';
  errorMessage.style.borderColor = 'rgba(16, 185, 129, 0.3)';
  errorMessage.style.color = 'var(--success)';
  
  setTimeout(() => {
    hideError();
    // Reset to error styling
    errorMessage.style.background = 'rgba(239, 68, 68, 0.1)';
    errorMessage.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    errorMessage.style.color = 'var(--error)';
  }, 3000);
}

/**
 * Show loading state
 */
function showLoading() {
  loadingState.style.display = 'flex';
  extractBtn.disabled = true;
}

/**
 * Hide loading state
 */
function hideLoading() {
  loadingState.style.display = 'none';
  extractBtn.disabled = false;
}

/**
 * Hide thumbnails section
 */
function hideThumbnails() {
  thumbnailsSection.style.display = 'none';
  thumbnailsGrid.innerHTML = '';
}
