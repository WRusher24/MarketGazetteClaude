"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  image?: string;
  tickers: string[];
}

export default function Newsroom() {
  const [query, setQuery] = useState<string>("");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchNews = () => {
    if (!query.trim()) {
      setNews([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    // Simplified implementation with mock data
    setTimeout(() => {
      const mockNews: NewsItem[] = [
        {
          id: "1",
          title: `${query.toUpperCase()} Announces Quarterly Results`,
          summary: `${query.toUpperCase()} reported earnings that exceeded analyst expectations, driven by strong performance in key segments.`,
          source: "Bloomberg",
          date: "Oct 14, 2026",
          url: "#",
          tickers: [query.toUpperCase()]
        },
        {
          id: "2",
          title: `Analyst Upgrades ${query.toUpperCase()} to Buy`,
          summary: `Major investment firm upgrades ${query.toUpperCase()} citing strong growth prospects and market position.`,
          source: "CNBC",
          date: "Oct 13, 2026",
          url: "#",
          tickers: [query.toUpperCase()]
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Newsroom</h1>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchNews()}
              placeholder="Search for news, stocks, or topics..."
              className="pl-10 pr-4 py-3 rounded-lg bg-muted/50 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
          <button
            onClick={searchNews}
            disabled={loading}
            className="mt-3 w-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
          >
            {loading ? "Searching..." : "Search News"}
          </button>
        </div>
        
        {error && <div className="p-4 bg-destructive/10 text-destructive rounded mb-4">{error}</div>}
        
        {loading && !news.length && <div className="text-center py-8">Searching news...</div>}
        
        {!loading && news.length === 0 && query && <div className="text-center py-8 text-muted-foreground">No news found for "{query}"</div>}
        
        {!loading && news.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Search Results for "{query}"</h2>
            <div className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="bg-card/50 hover:bg-accent/5 rounded-lg p-4 border border-background/50 transition-all">
                  <div className="flex items-start space-x-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {item.summary}
                      </p>
                      <div className="flex items-center space-x-2 mt-2 text-xs">
                        <span className="bg-muted/50 text-xs rounded px-2 py-0.5">
                          {item.source}
                        </span>
                        <span className="text-muted-foreground">
                          • {item.date}
                        </span>
                        {item.tickers.length > 0 && (
                          <span className="flex items-center space-x-1">
                            {item.tickers.slice(0, 3).map((ticker) => (
                              <span key={ticker} className="bg-primary/20 text-primary text-xs rounded px-1.5">
                                {ticker}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
