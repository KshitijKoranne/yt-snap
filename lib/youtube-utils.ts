/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  // Regular expression to match various YouTube URL formats
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

/**
 * Validate if the provided URL is a YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
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
 */
import { ThumbnailType } from './types';

export function generateThumbnailData(videoId: string): ThumbnailType[] {
  return [
    {
      quality: 'maxres',
      name: 'Maximum Resolution',
      resolution: '1280×720 px',
      url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
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
      quality: 'sd',
      name: 'Standard Quality',
      resolution: '640×480 px',
      url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    },
    {
      quality: 'default',
      name: 'Default Thumbnail',
      resolution: '120×90 px',
      url: `https://img.youtube.com/vi/${videoId}/default.jpg`
    }
  ];
}