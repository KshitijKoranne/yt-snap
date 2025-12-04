"use client";

import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

interface BuyMeCoffeeButtonProps {
  className?: string;
}

export function BuyMeCoffeeButton({ className = '' }: BuyMeCoffeeButtonProps) {
  const handleClick = () => {
    window.open('https://www.buymeacoffee.com/kshitijkorz', '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleClick}
      className={`gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
      size="default"
    >
      <Coffee className="h-4 w-4" />
      <span className="hidden sm:inline">Buy me a coffee</span>
      <span className="sm:hidden">Support</span>
    </Button>
  );
}
