"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { rssParser } from "@/lib/rss-parser";
import { LayoutDashboard } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  image?: string;
}

export function TopHeadlines() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  async function fetchTopHeadlines() {
    try {
      setLoading(true);
      
      // Fetch from multiple sources for top headlines
      const sources = [
        "https://feeds.finance.yahoo.com/rss/2.0/headline",
        "https://feeds.bloomberg.com/markets/news.rss",
        "http://feeds.reuters.com/reuters/businessNews"
      ];
      
      const promises = sources.map(async (url) => {
        try {
          const feed = await rssParser.parseURL(url);
          return feed.items.map((item: any) => ({
            id: item.guid || item.title.substring(0, 50),
            title: item.title,
            summary: item.contentSnippet || item.description?.substring(0, 200) || "",
            source: item.source || url.split('/')[2],
            date: new Date(item.pubDate || item.isoDate).toLocaleDateString(),
            url: item.link,
            image: item.enclosure?.url
          }));
        } catch (err) {
          console.warn(`Failed to parse feed from ${url}:`, err);
          return [];
        }
      });
      
      const results = await Promise.all(promises);
      const allItems = results.flat();
      
      // Sort by date (newest first) and take top 5
      const sortedItems = allItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      
      setNews(sortedItems);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching top headlines:", err);
      setError("Failed to load top headlines");
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-8">Loading top headlines...</div>;
  if (error) return <div className="text-center py-8 text-destructive">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <LayoutDashboard className="h-4 w-4" />
        Top Headlines
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
