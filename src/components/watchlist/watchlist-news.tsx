"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { List } from "lucide-react";

interface WatchlistItem {
  id: string;
  ticker: string;
  companyName: string;
  currentPrice: number;
  changePercent: number;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  tickers: string[];
}

export function WatchlistNews() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWatchlist();
    fetchWatchlistNews();
  }, []);

  async function loadWatchlist() {
    try {
      // In a real app, this would fetch from Supabase
      // For now, using mock data
      const mockWatchlist: WatchlistItem[] = [
        { id: "1", ticker: "AAPL", companyName: "Apple Inc.", currentPrice: 198.50, changePercent: 1.25 },
        { id: "2", ticker: "GOOGL", companyName: "Alphabet Inc.", currentPrice: 136.75, changePercent: -0.45 },
        { id: "3", ticker: "MSFT", companyName: "Microsoft Corporation", currentPrice: 425.30, changePercent: 0.85 },
        { id: "4", ticker: "TSLA", companyName: "Tesla Inc.", currentPrice: 248.90, changePercent: -2.10 },
        { id: "5", ticker: "NVDA", companyName: "NVIDIA Corporation", currentPrice: 875.40, changePercent: 3.45 },
      ];
      setWatchlist(mockWatchlist);
    } catch (err) {
      console.error("Error loading watchlist:", err);
      setError("Failed to load watchlist");
    }
  }

  async function fetchWatchlistNews() {
    try {
      setLoading(true);
      
      // Get news for watchlist tickers
      const tickers = watchlist.map(item => item.ticker).join(",");
      if (!tickers) {
        setNews([]);
        setLoading(false);
        return;
      }
      
      // In a real app, we'd fetch from Finnhub or similar
      // For now, using mock data
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: "Apple Reports Strong Q4 Earnings Beat Expectations",
          summary: "Apple Inc. reported quarterly revenue of $119.6 billion, surpassing analyst forecasts of $117.9 billion.",
          source: "Bloomberg",
          date: "Oct 15, 2026",
          url: "#",
          tickers: ["AAPL"]
        },
        {
          id: "2",
          title: "Google Announces New AI Features for Search",
          summary: "Alphabet's Google unveiled new AI-powered search capabilities that could revolutionize how users find information online.",
          source: "TechCrunch",
          date: "Oct 14, 2026",
          url: "#",
          tickers: ["GOOGL"]
        },
        {
          id: "3",
          title: "Microsoft Cloud Growth Continues to Accelerate",
          summary: "Microsoft's Azure cloud platform reported 31% year-over-year growth, exceeding market expectations.",
          source: "Reuters",
          date: "Oct 13, 2026",
          url: "#",
          tickers: ["MSFT"]
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching watchlist news:", err);
      setError("Failed to load watchlist news");
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-8">Loading watchlist news...</div>;
  if (error) return <div className="text-center py-8 text-destructive">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <List className="h-4 w-4" />
        Watchlist News
      </h2>
      
      {/* Watchlist Stats */}
      <div className="bg-card/50 rounded-lg p-4 mb-4">
        <h3 className="font-medium mb-2">Your Watchlist</h3>
        <div className="space-y-2">
          {watchlist.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{item.ticker}</span>
                <span className="text-sm">{item.companyName}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium">
                <span className={item.changePercent >= 0 ? "text-success" : "text-destructive"}>
                  ${item.currentPrice.toFixed(2)}
                </span>
                <span className={item.changePercent >= 0 ? "text-success" : "text-destructive"}>
                  ({item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* News Section */}
      <div className="space-y-3">
        {news.map((item) => (
          <Link key={item.id} href="/news/[id]" as={`/news/${item.id}`} className="bg-card/50 hover:bg-accent/5 rounded-lg p-4 border border-background/50 transition-all">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {item.summary}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-xs">
                  <span className="bg-muted/50 text-xs rounded px-2 py-0.5">
                    {item.source}
                  </span>
                  <span className="text-muted-foreground">
                    • {item.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
