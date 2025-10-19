"use client";

import { useEffect, useState } from "react";
import ThumbnailCard from "./ThumbnailCard";
import { ThumbnailType, VideoMetadata } from "@/lib/types";
import { generateThumbnailData } from "@/lib/youtube-utils";
import { Button } from "@/components/ui/button";
import { Download, Eye, ThumbsUp, Calendar, Clock, User } from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface ThumbnailGalleryProps {
  videoId: string;
  metadata?: VideoMetadata | null;
  isLoadingMetadata?: boolean;
}

export default function ThumbnailGallery({ videoId, metadata, isLoadingMetadata }: ThumbnailGalleryProps) {
  const [thumbnails, setThumbnails] = useState<ThumbnailType[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (videoId) {
      const thumbnailData = generateThumbnailData(videoId);
      setThumbnails(thumbnailData);
    }
  }, [videoId]);

  const downloadAllThumbnails = async () => {
    if (!thumbnails.length) return;
    
    setIsDownloading(true);
    
    try {
      // Create a zip file containing all thumbnails
      const zip = new JSZip();
      
      // Add each thumbnail to the zip
      for (const thumbnail of thumbnails) {
        const response = await fetch(thumbnail.url);
        const blob = await response.blob();
        zip.file(`${videoId}_${thumbnail.quality}.jpg`, blob);
      }
      
      // Generate and download the zip file
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `yt-snap_${videoId}_thumbnails.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("All thumbnails downloaded successfully!");
    } catch (error) {
      console.error("Error downloading thumbnails:", error);
      toast.error("Failed to download thumbnails. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!thumbnails.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {isLoadingMetadata && (
        <Card className="bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          </CardContent>
        </Card>
      )}
      {!isLoadingMetadata && metadata && (
        <Card className="bg-card/50 backdrop-blur">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{metadata.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{metadata.channelTitle}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {metadata.viewCount && (
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-muted-foreground text-xs">Views</div>
                      <div className="font-semibold">{metadata.viewCount}</div>
                    </div>
                  </div>
                )}

                {metadata.likeCount && (
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-muted-foreground text-xs">Likes</div>
                      <div className="font-semibold">{metadata.likeCount}</div>
                    </div>
                  </div>
                )}

                {metadata.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-muted-foreground text-xs">Duration</div>
                      <div className="font-semibold">{metadata.duration}</div>
                    </div>
                  </div>
                )}

                {metadata.publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="text-muted-foreground text-xs">Published</div>
                      <div className="font-semibold">
                        {format(new Date(metadata.publishedAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {metadata.description && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {metadata.description}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Available Thumbnails</h3>
        <Button
          onClick={downloadAllThumbnails}
          disabled={isDownloading}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          {isDownloading ? "Downloading..." : "Download All"}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {thumbnails.map((thumbnail, index) => (
          <ThumbnailCard
            key={thumbnail.quality}
            thumbnail={thumbnail}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}