"use client";

import { useEffect, useState } from "react";
import ThumbnailCard from "./ThumbnailCard";
import { ThumbnailType } from "@/lib/types";
import { generateThumbnailData } from "@/lib/youtube-utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";

interface ThumbnailGalleryProps {
  videoId: string;
}

export default function ThumbnailGallery({ videoId }: ThumbnailGalleryProps) {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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