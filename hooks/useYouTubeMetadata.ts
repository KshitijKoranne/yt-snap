"use client";

import useSWR from 'swr';
import { VideoMetadata } from '@/lib/types';

/**
 * Fetcher function for SWR to fetch YouTube video metadata
 */
async function fetchVideoMetadata(videoId: string): Promise<VideoMetadata | null> {
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
    throw error;
  }
}

/**
 * Custom hook to fetch YouTube video metadata with SWR
 * Provides caching, revalidation, and automatic retries
 */
export function useYouTubeMetadata(videoId: string | null) {
  const { data, error, isLoading, isValidating } = useSWR(
    videoId ? `/api/youtube/${videoId}` : null,
    () => videoId ? fetchVideoMetadata(videoId) : null,
    {
      // Revalidate on window focus
      revalidateOnFocus: false,
      // Revalidate on reconnect
      revalidateOnReconnect: true,
      // Dedupe requests within 2 seconds
      dedupingInterval: 2000,
      // Cache data for 5 minutes
      focusThrottleInterval: 300000,
      // Retry on error
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      // Keep previous data while revalidating
      keepPreviousData: true,
      onSuccess: (data) => {
        console.log('Metadata fetched successfully:', data);
      },
      onError: (err) => {
        console.error('Metadata fetch error:', err);
      }
    }
  );

  console.log('useYouTubeMetadata - videoId:', videoId, 'data:', data, 'isLoading:', isLoading, 'error:', error);

  return {
    metadata: data,
    isLoading,
    isError: error,
    isValidating,
  };
}
