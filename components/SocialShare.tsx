"use client";

import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Link as LinkIcon,
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
}

export function SocialShare({ 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  title = 'YT Snap - YouTube Thumbnail Extractor',
  className = ''
}: SocialShareProps) {
  const shareData = {
    title,
    url,
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToTwitter}
        title="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={shareToFacebook}
        title="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={shareToLinkedIn}
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      

    </div>
  );
} 