"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { genAI } from "@/lib/gemini-client";
import { Bot } from "lucide-react";

export function AISentimentRadar() {
  const [sentiment, setSentiment] = useState<"bullish" | "bearish" | "neutral">("neutral");
  const [confidence, setConfidence] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  useEffect(() => {
    analyzeMarketSentiment();
  }, []);

  async function analyzeMarketSentiment() {
    try {
      setLoading(true);
      
      // In a real app, we'd fetch recent news and analyze with Gemini
      // For now, using mock data
      const mockAnalysis = {
        sentiment: "bullish" as const,
        confidence: 78,
        summary: "Market sentiment is cautiously optimistic based on strong earnings reports from tech giants and resilient consumer spending data.",
        keyFactors: [
          "Tech sector showing robust growth",
          "Inflation concerns moderating",
          "Labor market remains strong"
        ]
      };
      
      setSentiment(mockAnalysis.sentiment);
      setConfidence(mockAnalysis.confidence);
      setAnalysis(mockAnalysis.summary);
      setLoading(false);
    } catch (err) {
      console.error("Error analyzing market sentiment:", err);
      setError("Failed to analyze market sentiment");
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-12">Analyzing market sentiment...</div>;
  if (error) return <div className="text-center py-12 text-destructive">{error}</div>;

  const getSentimentColor = (sentiment: "bullish" | "bearish" | "neutral") => {
    switch (sentiment) {
      case "bullish": return "text-success";
      case "bearish": return "text-destructive";
      case "neutral": return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center space-x-2">
        <Bot className="h-4 w-4" />
        AI Sentiment Radar
      </h2>
      
      <div className="bg-card/50 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative h-12 w-12">
            <svg className="h-12 w-12" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 2L14.5 8.24L21.17 9.56L15 11.32L16.95 17.77L12 14.25L7.05 17.77L9 11.32L2.83 9.56L9.5 8.24Z" fill="none" strokeWidth={2} />
            </svg>
          </div>
          <div className="ml-4 text-left">
            <p className={`font-bold text-2xl ${getSentimentColor(sentiment)}`}>
              {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </p>
            <p className="text-sm text-muted-foreground">
              Confidence: {confidence}%
            </p>
          </div>
        </div>
        
        {analysis && (
          <div className="mt-4 text-left">
            <h3 className="font-medium mb-2">Analysis Summary</h3>
            <p className="text-sm line-clamp-3">{analysis}</p>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full bg-${sentiment === "bullish" ? "success" : sentiment === "bearish" ? "destructive" : "foreground"}/20`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
