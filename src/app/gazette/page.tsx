import Link from "next/link";
import { GazetteFeed } from "@/components/news/gazette-feed";
import { WatchlistNews } from "@/components/watchlist/watchlist-news";
import { AISentimentRadar } from "@/components/ai-analyst/ai-sentiment-radar";
import { TopHeadlines } from "@/components/news/top-headlines";

export default function GazettePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">MarketGazette</h1>
        
        {/* Top Banner Ticker */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold mb-2">Market Ticker</h2>
          <div className="overflow-hidden h-8">
            <div className="flex items-center space-x-6 animate-ticker-scroll">
              <span className="text-sm font-medium">S&P 500: 5,432.18 (+0.45%)</span>
              <span className="text-sm font-medium">NASDAQ: 17,123.45 (+0.82%)</span>
              <span className="text-sm font-medium">Dow Jones: 40,234.56 (+0.23%)</span>
              <span className="text-sm font-medium">Bitcoin: $67,890.50 (+1.25%)</span>
              <span className="text-sm font-medium">Ethereum: $3,456.78 (+0.75%)</span>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <GazetteFeed />
            <TopHeadlines />
          </div>
          
          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-6">
            <WatchlistNews />
            <AISentimentRadar />
          </div>
        </div>
      </div>
    </div>
  );
}
