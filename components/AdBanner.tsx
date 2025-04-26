"use client";

import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
  position: "top" | "bottom";
}

export function AdBanner({ className, position }: AdBannerProps) {
  return (
    <div className={cn(
      "min-h-[90px] bg-muted rounded-lg overflow-hidden",
      position === "bottom" && "sticky bottom-4",
      className
    )}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot={position === "top" ? "TOP_AD_SLOT" : "BOTTOM_AD_SLOT"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}