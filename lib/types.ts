export interface ThumbnailType {
  quality: string;
  name: string;
  resolution: string;
  url: string;
}

export interface VideoMetadata {
  title: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  likeCount: string;
  description: string;
  tags?: string[];
  duration?: string;
}