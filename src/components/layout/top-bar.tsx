"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";
import { Search, Bell, User, MoreHorizontal, Menu } from "lucide-react";

export function TopBar() {
  const { theme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-4 border-b border-background/50 bg-background/50 backdrop-blur-sm z-40">
      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded hover:bg-accent/20 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
        
        <h1 className="text-xl font-bold hidden lg:block">
          MarketGazette
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search news, stocks..."
            className="pl-10 pr-4 py-2 rounded-lg bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded hover:bg-accent/20" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center bg-destructive/80 text-xs font-bold rounded-full">
            3
          </span>
        </button>

        {/* User */}
        <button className="p-2 rounded hover:bg-accent/20" aria-label="User menu">
          <User className="h-4 w-4" />
        </button>

        {/* More */}
        <button className="p-2 rounded hover:bg-accent/20" aria-label="More options">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
