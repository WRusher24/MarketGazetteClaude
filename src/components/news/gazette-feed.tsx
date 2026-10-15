"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";

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

export function GazetteFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Simplified implementation with mock data
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: "1",
        title: "Stock Market Reaches New Highs as Tech Stocks Rally",
        summary: "The S&P 500 index closed at a record high today, driven by strong performance in the technology sector. Apple, Microsoft, and NVIDIA all posted gains exceeding 2%.",
        source: "Bloomberg",
        date: "Oct 15, 2026",
        url: "#",
        image: "https://example.com/market-highs.jpg",
        tickers: ["AAPL", "MSFT", "NVDA"]
      },
      {
        id: "2",
        title: "Federal Reserve Signals Potential Rate Cut in December",
        summary: "Federal Reserve Chair Jerome Powell hinted at a possible interest rate reduction later this year, citing moderating inflation data and steady economic growth.",
        source: "Reuters",
        date: "Oct 14, 2026",
        url: "#",
        tickers: []
      },
      {
        id: "3",
        title: "Crude Oil Prices Surge on Middle East Tensions",
        summary: "Oil prices jumped 3% today as geopolitical tensions in the Middle East raised concerns about potential supply disruptions. Brent crude traded above $85 per barrel.",
        source: "CNBC",
        date: "Oct 13, 2026",
        url: "#",
        image: "https://example.com/oil-prices.jpg",
        tickers: []
      }
    ];
    
    setNews(mockNews);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <Newspaper className="h-4 w-4" />
        Gazette Feed
      </h2>
      <div className="space-y-3">
        {news.map((item) => (
          <Link key={item.id} href="/news/[id]" as={`/news/${item.id}`} className="bg-card/50 hover:bg-accent/5 rounded-lg p-4 border border-background/50 transition-all">
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
          </Link>
        ))}
      </div>
    </div>
  );
}
