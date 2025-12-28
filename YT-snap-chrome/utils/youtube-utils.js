/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null if not found
 */
function extractYouTubeId(url) {
  // Regular expression to match various YouTube URL formats
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

/**
 * Validate if the provided URL is a YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid YouTube URL
 */
function isValidYouTubeUrl(url) {
  try {
    const urlObj = new URL(url);
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(.+)?$/;
    return youtubeRegex.test(urlObj.hostname + urlObj.pathname);
  } catch {
    return false;
  }
}

/**
 * Generate thumbnail data for a given YouTube video ID
 * @param {string} videoId - YouTube video ID
 * @returns {Array} - Array of thumbnail objects
 */
function generateThumbnailData(videoId) {
  return [
    {
      quality: 'maxres',
      name: 'Maximum Resolution',
      resolution: '1280×720 px',
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    },
    {
      quality: 'sd',
      name: 'Standard Definition',
      resolution: '640×480 px',
      url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    },
    {
      quality: 'hq',
      name: 'High Quality',
      resolution: '480×360 px',
      url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    },
    {
      quality: 'mq',
      name: 'Medium Quality',
      resolution: '320×180 px',
      url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    },
    {
      quality: 'default',
      name: 'Default Quality',
      resolution: '120×90 px',
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`
    },
    {
      quality: '1',
      name: 'Thumbnail 1',
      resolution: '120×90 px',
      url: `https://img.youtube.com/vi/${videoId}/1.jpg`
    },
    {
      quality: '2',
      name: 'Thumbnail 2',
      resolution: '120×90 px',
      url: `https://img.youtube.com/vi/${videoId}/2.jpg`
    },
    {
      quality: '3',
      name: 'Thumbnail 3',
      resolution: '120×90 px',
      url: `https://img.youtube.com/vi/${videoId}/3.jpg`
    },
    {
      quality: 'hq1',
      name: 'HQ Thumbnail 1',
      resolution: '480×360 px',
      url: `https://img.youtube.com/vi/${videoId}/hq1.jpg`
    },
    {
      quality: 'hq2',
      name: 'HQ Thumbnail 2',
      resolution: '480×360 px',
      url: `https://img.youtube.com/vi/${videoId}/hq2.jpg`
    },
    {
      quality: 'hq3',
      name: 'HQ Thumbnail 3',
      resolution: '480×360 px',
      url: `https://img.youtube.com/vi/${videoId}/hq3.jpg`
    },
    {
      quality: 'mq1',
      name: 'MQ Thumbnail 1',
      resolution: '320×180 px',
      url: `https://img.youtube.com/vi/${videoId}/mq1.jpg`
    },
    {
      quality: 'mq2',
      name: 'MQ Thumbnail 2',
      resolution: '320×180 px',
      url: `https://img.youtube.com/vi/${videoId}/mq2.jpg`
    },
    {
      quality: 'mq3',
      name: 'MQ Thumbnail 3',
      resolution: '320×180 px',
      url: `https://img.youtube.com/vi/${videoId}/mq3.jpg`
    }
  ];
}
