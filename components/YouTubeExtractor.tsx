"use client";

import { useState } from "react";
import { extractYouTubeId, isValidYouTubeUrl } from "@/lib/youtube-utils";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoInfo {
  title: string;
  channel: string;
  views: string;
  publishedAt: string;
  description: string;
  thumbnail: string;
}

export default function YouTubeExtractor() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a YouTube URL");
      setIsLoading(false);
      return;
    }

    try {
      if (!isValidYouTubeUrl(trimmedUrl)) {
        setError("Please enter a valid YouTube URL (e.g., https://www.youtube.com/watch?v=...)");
        setIsLoading(false);
        return;
      }

      const id = extractYouTubeId(trimmedUrl);
      if (!id) {
        setError("Could not extract video ID. Please check if the URL is correct and try again.");
        setIsLoading(false);
        return;
      }

      setVideoId(id);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error processing YouTube URL:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Extract YouTube Thumbnails</h2>
        <p className="text-muted-foreground">
          Paste a YouTube link to download thumbnails in various resolutions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="pr-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="font-medium" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </div>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> Extract
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {videoId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ThumbnailGallery videoId={videoId} />
        </motion.div>
      )}
    </div>
  );
}