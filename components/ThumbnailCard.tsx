"use client";

import { useState } from "react";
import { ThumbnailType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface ThumbnailCardProps {
  thumbnail: ThumbnailType;
  index: number;
}

export default function ThumbnailCard({ thumbnail, index }: ThumbnailCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(720);
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `yt-snap_${thumbnail.quality}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Thumbnail downloaded successfully!");
    } catch (error) {
      console.error("Error downloading thumbnail:", error);
      toast.error("Failed to download thumbnail. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCustomDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a canvas to resize the image
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = thumbnail.url;
      });
      
      const canvas = document.createElement("canvas");
      canvas.width = customWidth;
      canvas.height = customHeight;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");
      
      ctx.drawImage(img, 0, 0, customWidth, customHeight);
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to create image. Please try again.");
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `yt-snap_${thumbnail.quality}_${customWidth}x${customHeight}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("Custom thumbnail downloaded successfully!");
      }, "image/jpeg", 0.9);
    } catch (error) {
      console.error("Error downloading custom thumbnail:", error);
      toast.error("Failed to download custom thumbnail. Please try again.");
    } finally {
      setIsDownloading(false);
      setIsOpen(false);
    }
  };

  const handleWidthChange = (value: number) => {
    setCustomWidth(value);
    // Maintain aspect ratio
    const aspectRatio = 16 / 9; // YouTube thumbnail aspect ratio
    setCustomHeight(Math.round(value / aspectRatio));
  };

  const handleHeightChange = (value: number) => {
    setCustomHeight(value);
    // Maintain aspect ratio
    const aspectRatio = 16 / 9; // YouTube thumbnail aspect ratio
    setCustomWidth(Math.round(value * aspectRatio));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
      >
        <div className="aspect-video relative">
          {imageError ? (
            <div className="flex items-center justify-center h-full w-full bg-muted">
              <p className="text-muted-foreground">Image not available</p>
            </div>
          ) : (
            <img
              src={thumbnail.url}
              alt={`${thumbnail.name} thumbnail`}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col items-center justify-center gap-2 p-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(true)}
              className="gap-1 w-full max-w-[140px]"
            >
              <Maximize2 className="h-4 w-4" />
              Customize
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
              className="gap-1 w-full max-w-[140px]"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{thumbnail.name}</h3>
          <p className="text-sm text-muted-foreground">{thumbnail.resolution}</p>
          <div className="mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-1"
              onClick={() => window.open(thumbnail.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              View Original
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Thumbnail Size</DialogTitle>
            <DialogDescription>
              Adjust the dimensions of your thumbnail before downloading.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={customWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-24"
                  min={160}
                  max={3840}
                />
              </div>
              <Slider
                value={[customWidth]}
                onValueChange={(value) => handleWidthChange(value[0])}
                min={160}
                max={3840}
                step={10}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={customHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-24"
                  min={90}
                  max={2160}
                />
              </div>
              <Slider
                value={[customHeight]}
                onValueChange={(value) => handleHeightChange(value[0])}
                min={90}
                max={2160}
                step={10}
              />
            </div>
            <div className="flex items-center justify-center p-4 border rounded-md bg-muted/50">
              <img
                src={thumbnail.url}
                alt="Preview"
                className="max-w-full max-h-32 object-contain"
                style={{
                  width: `${Math.min(customWidth / 4, 200)}px`,
                  height: `${Math.min(customHeight / 4, 112.5)}px`
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCustomDownload} 
              disabled={isDownloading}
              className="gap-1"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}