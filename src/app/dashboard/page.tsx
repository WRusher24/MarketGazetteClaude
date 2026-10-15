import Link from "next/link";
import { GazetteFeed } from "@/components/news/gazette-feed";
import { WatchlistNews } from "@/components/watchlist/watchlist-news";
import { AISentimentRadar } from "@/components/ai-analyst/ai-sentiment-radar";
import { TopHeadlines } from "@/components/news/top-headlines";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Welcome Message */}
        <div className="bg-card/50 rounded-lg p-6 mb-6">
          <h2 className="font-semibold mb-2">Welcome to MarketGazette</h2>
          <p className="text-muted-foreground">
            Your personal stock newspaper and market analytics platform. 
            Get real-time news, interactive charts, and AI-powered insights.
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <Link href="/gazette" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
              Go to Gazette Feed
            </Link>
            <Link href="/watchlist" className="ml-3 px-4 py-2 bg-muted/50 text-muted-foreground hover:bg-accent/5 rounded-lg transition-colors">
              Manage Watchlist
            </Link>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card/50 rounded-lg p-4 text-center">
            <h3 className="font-medium">Market Status</h3>
            <p className="text-2xl font-bold text-success">OPEN</p>
            <p className="text-sm text-muted-foreground">NYSE & NASDAQ</p>
          </div>
          <div className="bg-card/50 rounded-lg p-4 text-center">
            <h3 className="font-medium">Watchlist Value</h3>
            <p className="text-2xl font-bold">$125,430.50</p>
            <p className="text-sm text-muted-foreground">+2.3% today</p>
          </div>
          <div className="bg-card/50 rounded-lg p-4 text-center">
            <h3 className="font-medium">News Alerts</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Breaking stories</p>
          </div>
          <div className="bg-card/50 rounded-lg p-4 text-center">
            <h3 className="font-medium">AI Signal</h3>
            <p className="text-2xl font-bold text-success">BULLISH</p>
            <p className="text-sm text-muted-foreground">Market Sentiment</p>
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
    </div>
  );
}
