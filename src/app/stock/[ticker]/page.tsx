"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StockPage({ params }: { params: { ticker: string } }) {
  // Handle case where params might be undefined during prerendering
  const ticker = params?.ticker ?? "";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Stock: {ticker.toUpperCase()}</h1>
        <p className="text-muted-foreground">
          Stock detail page for {ticker.toUpperCase()} would be displayed here.
          This would include interactive charts, financial metrics, news feed, and AI analysis.
        </p>
        <div className="mt-6">
          <Link href="/" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
