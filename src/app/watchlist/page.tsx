"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTicker, setNewTicker] = useState<string>("");

  useEffect(() => {
    loadMockWatchlist();
  }, []);

  function loadMockWatchlist() {
    try {
      setLoading(true);
      
      // Mock data for now
      const mockWatchlist = ["AAPL", "GOOGL", "MSFT", "TSLA", "NVDA"];
      setWatchlist(mockWatchlist);
      setLoading(false);
    } catch (err) {
      console.error("Error loading watchlist:", err);
      setError("Failed to load watchlist");
      setLoading(false);
    }
  }

  function addToWatchlist() {
    const ticker = newTicker.trim().toUpperCase();
    if (!ticker) return;
    
    try {
      setWatchlist(prev => [...prev, ticker]);
      setNewTicker("");
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      setError("Failed to add ticker to watchlist");
    }
  }

  function removeFromWatchlist(ticker: string) {
    setWatchlist(prev => prev.filter(item => item !== ticker));
  }

  if (loading) return <div className="text-center py-12">Loading watchlist...</div>;
  if (error) return <div className="text-center py-12 text-destructive">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
        
        <div className="mb-6 flex items-center space-x-3">
          <input
            type="text"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addToWatchlist()}
            placeholder="Enter stock ticker (e.g., AAPL)"
            className="flex-1 px-4 py-3 rounded-lg bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            onClick={addToWatchlist}
            className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
          >
            Add Ticker
          </button>
        </div>
        
        {error && <div className="p-4 mb-6 bg-destructive/10 text-destructive rounded">{error}</div>}
        
        <div className="space-y-4">
          {watchlist.map((ticker) => (
            <div key={ticker} className="flex items-center justify-between px-4 py-3 bg-card/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{ticker}</span>
                <span className="text-sm">${100 + Math.random() * 100}</span>
              </div>
              <button
                onClick={() => removeFromWatchlist(ticker)}
                className="p-2 rounded hover:bg-destructive/20 text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          
          {watchlist.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Your watchlist is empty. Add some stocks to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
