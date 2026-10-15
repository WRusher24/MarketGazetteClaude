import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";
import {
  Menu,
  LayoutDashboard,
  Newspaper,
  Search,
  List,
  BarChart3,
  Bot,
  Settings,
  ChevronRight,
  X,
} from "lucide-react";

export function Sidebar() {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card text-foreground border-r border-background/50 z-50 lg:block hidden">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-background/50">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">MarketGazette</h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-accent/20"
            aria-label="Toggle theme"
          >
            {theme === "sleek-dark" || theme === "bloomberg-terminal" ? (
              <Menu className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          <Link href="/" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link href="/gazette" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <Newspaper className="h-4 w-4" />
            <span>Gazette Feed</span>
          </Link>

          <Link href="/newsroom" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <Search className="h-4 w-4" />
            <span>Newsroom</span>
          </Link>

          <Link href="/watchlist" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <List className="h-4 w-4" />
            <span>Watchlist</span>
          </Link>

          <Link href="/ai-analyst" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <Bot className="h-4 w-4" />
            <span>AI Analyst</span>
          </Link>

          <Link href="/settings" className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/20">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Mobile menu button (hidden on desktop) */}
        <div className="flex h-16 items-center justify-between px-4 border-t border-background/50 lg:hidden">
          <button
            className="p-2 rounded hover:bg-accent/20"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-accent/20"
            aria-label="Toggle theme"
          >
            {theme === "sleek-dark" || theme === "bloomberg-terminal" ? (
              <Menu className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
