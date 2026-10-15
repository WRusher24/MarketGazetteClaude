import { GazetteFeed } from "@/components/news/gazette-feed";
import { WatchlistNews } from "@/components/watchlist/watchlist-news";
import { AISentimentRadar } from "@/components/ai-analyst/ai-sentiment-radar";
import { TopHeadlines } from "@/components/news/top-headlines";

export function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Top Banner Ticker */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
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

        {/* Main Content Grid */}
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
    </main>
  );
}
