export interface HistoryItem {
  url: string;
  videoId: string;
  title?: string;
  timestamp: number;
}

const HISTORY_KEY = 'yt-snap-history';
const MAX_HISTORY_ITEMS = 5;

export function addToHistory(url: string, videoId: string, title?: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getHistory();
    
    // Remove duplicate if exists
    const filteredHistory = history.filter(item => item.videoId !== videoId);
    
    // Add new item at the beginning
    const newItem: HistoryItem = {
      url,
      videoId,
      title,
      timestamp: Date.now(),
    };
    
    const updatedHistory = [newItem, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    
    const history = JSON.parse(stored) as HistoryItem[];
    return history.slice(0, MAX_HISTORY_ITEMS);
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
}
