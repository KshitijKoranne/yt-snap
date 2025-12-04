"use client";

import { useEffect, useState } from "react";
import { getHistory, clearHistory, HistoryItem } from "@/lib/history-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface RecentHistoryProps {
  onSelectUrl: (url: string) => void;
}

export default function RecentHistory({ onSelectUrl }: RecentHistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const items = getHistory();
    setHistory(items);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    toast.success("History cleared");
  };

  const handleSelectItem = (url: string) => {
    onSelectUrl(url);
    setIsExpanded(false);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-between"
        type="button"
      >
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Recent History ({history.length})</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="mt-2">
              <CardContent className="p-3">
                <div className="space-y-2">
                  {history.map((item) => (
                    <button
                      key={item.videoId}
                      onClick={() => handleSelectItem(item.url)}
                      className="w-full text-left p-2 rounded hover:bg-muted transition-colors group"
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate group-hover:text-primary">
                            {item.title || item.url}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearHistory}
                  className="w-full mt-3 gap-2"
                  type="button"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear History
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
