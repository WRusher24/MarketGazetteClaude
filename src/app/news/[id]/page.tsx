"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";
import { genAI } from "@/lib/gemini-client";
import { ArrowLeft, Clock, Dot, Bot, ExternalLink } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
  tickers: string[];
}

export default async function NewsPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, we'd fetch from database or API
  // For now, using mock data
  const mockArticle: NewsArticle = {
    id: params.id,
    title: "Sample Market News Article",
    content: "This is the full content of the market news article. It would contain detailed information about market movements, company announcements, economic indicators, or other financial news relevant to investors. The article would be sourced from a reputable financial news outlet and provide comprehensive coverage of the topic.",
    source: "Financial Times",
    publishedAt: "Oct 15, 2026",
    url: "https://example.com/article",
    imageUrl: "https://example.com/image.jpg",
    tickers: ["AAPL", "GOOGL"]
  };

  if (!mockArticle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-accent/20 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </button>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{mockArticle.publishedAt}</span>
          </div>
        </div>
        
        {mockArticle.imageUrl && (
          <div className="mb-6">
            <img
              src={mockArticle.imageUrl}
              alt={mockArticle.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-6 line-clamp-3">
          {mockArticle.title}
        </h1>
        
        <div className="flex items-center space-x-4 mb-6 px-3 py-2 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Dot className="h-2.5 w-2.5" />
            <span className="text-sm font-medium">{mockArticle.source}</span>
          </div>
          {mockArticle.tickers.map((ticker) => (
            <span key={ticker} className="bg-primary/20 text-primary text-xs rounded px-2 py-0.5">
              {ticker}
            </span>
          ))}
        </div>
        
        <div className="prose dark:prose-invert max-w-none mb-8">
          <p>{mockArticle.content}</p>
          {/* In a real app, this would have more detailed content with paragraphs, etc. */}
        </div>
        
        <div className="mt-8">
          <button
            onClick={async () => {
              // In a real app, this would call Gemini API to generate summary
              alert("AI Executive Summary would be generated here using Gemini API");
            }}
            className="w-full flex items-center justify-center px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
          >
            <Bot className="h-4 w-4 mr-2" />
            Generate AI Executive Summary
          </button>
        </div>
        
        <div className="mt-6">
          <a
            href={mockArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-muted/50 rounded-lg hover:bg-accent/5 transition-colors text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Read Original Article
          </a>
        </div>
      </div>
    </div>
  );
}
