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
import { ThumbnailType, VideoMetadata } from './types';

export function generateThumbnailData(videoId: string): ThumbnailType[] {
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

/**
 * Fetch video metadata from YouTube Data API v3
 */
export async function fetchVideoMetadata(videoId: string): Promise<VideoMetadata | null> {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn('YouTube API key not configured. Video metadata will not be available.');
    return null;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const statistics = video.statistics;
    const contentDetails = video.contentDetails;

    // Parse ISO 8601 duration format (e.g., PT1H2M10S)
    const parseDuration = (duration: string): string => {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return '0:00';

      const hours = parseInt(match[1] || '0');
      const minutes = parseInt(match[2] || '0');
      const seconds = parseInt(match[3] || '0');

      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Format view count with commas
    const formatNumber = (num: string): string => {
      return parseInt(num).toLocaleString();
    };

    return {
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishedAt: snippet.publishedAt,
      viewCount: formatNumber(statistics.viewCount || '0'),
      likeCount: formatNumber(statistics.likeCount || '0'),
      description: snippet.description,
      tags: snippet.tags,
      duration: parseDuration(contentDetails.duration),
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return null;
  }
}