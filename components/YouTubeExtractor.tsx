"use client";

import { useState, useEffect } from "react";
import { extractYouTubeId, isValidYouTubeUrl } from "@/lib/youtube-utils";
import { useYouTubeMetadata } from "@/hooks/useYouTubeMetadata";
import { useTranslation } from "@/hooks/useTranslation";
import ThumbnailGallery from "@/components/ThumbnailGallery";
import RecentHistory from "@/components/RecentHistory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Search, Info, Clipboard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { addToHistory } from "@/lib/history-utils";

export default function YouTubeExtractor() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use SWR hook for metadata fetching with caching
  const { metadata, isLoading: isLoadingMetadata, isError } = useYouTubeMetadata(videoId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError(t.errors.emptyUrl);
      setIsProcessing(false);
      return;
    }

    try {
      if (!isValidYouTubeUrl(trimmedUrl)) {
        setError(t.errors.invalidUrl);
        setIsProcessing(false);
        return;
      }

      const id = extractYouTubeId(trimmedUrl);
      if (!id) {
        setError(t.errors.extractionFailed);
        setIsProcessing(false);
        return;
      }

      setVideoId(id);
      // Add to history
      addToHistory(trimmedUrl, id);
    } catch (err) {
      setError(t.errors.unexpectedError);
      console.error("Error processing YouTube URL:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectFromHistory = (historyUrl: string) => {
    setUrl(historyUrl);
    // Trigger extraction automatically
    const id = extractYouTubeId(historyUrl);
    if (id) {
      setVideoId(id);
      setError(null);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      // Fallback or silent fail if permission denied
    }
  };

  // Update history with title when metadata loads
  useEffect(() => {
    if (videoId && metadata?.title) {
      addToHistory(url, videoId, metadata.title);
    }
  }, [metadata, videoId, url]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">{t.extractor.heading}</h2>
        <p className="text-muted-foreground">
          {t.extractor.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto mb-8">
        <RecentHistory onSelectUrl={handleSelectFromHistory} />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t.extractor.placeholder}
              className="pr-20"
              disabled={isProcessing}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2 text-muted-foreground hover:text-foreground"
              onClick={handlePaste}
              title="Paste from clipboard"
            >
              <Clipboard className="h-4 w-4 mr-1" />
              <span className="text-xs">Paste</span>
            </Button>
          </div>
          <Button type="submit" className="font-medium" disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                {t.extractor.processing}
              </div>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> {t.extractor.extractButton}
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
          <ThumbnailGallery videoId={videoId} metadata={metadata} isLoadingMetadata={isLoadingMetadata} />
        </motion.div>
      )}
    </div>
  );
}