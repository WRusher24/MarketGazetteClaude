"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { genAI } from "@/lib/gemini-client";

interface StockAnalysis {
  businessModel: string;
  strengths: string[];
  risks: string[];
  earningsPerformance: string;
  analystConsensus: string;
  sentimentScore: number; // -1 to 1
}

export default function AIAnalystPage() {
  const [ticker, setTicker] = useState<string>("");
  const [analysis, setAnalysis] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeStock = async () => {
    if (!ticker.trim()) {
      setError("Please enter a stock ticker");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // In a real app, we would:
      // 1. Fetch fundamental data from Supabase or financial APIs
      // 2. Use Gemini to analyze the data and generate insights
      
      // For now, using mock data based on ticker
      const mockAnalysis: StockAnalysis = {
        businessModel: `${ticker.toUpperCase()} is a leading technology company that designs, develops, and sells consumer electronics, computer software, and online services.`,
        strengths: [
          "Strong brand recognition and customer loyalty",
          "Robust ecosystem of products and services",
          "Consistent revenue growth and profitability",
          "Innovative product pipeline",
          "Strong financial position with significant cash reserves"
        ],
        risks: [
          "Intense competition in key markets",
          "Dependence on few key products for majority of revenue",
          "Regulatory scrutiny in various jurisdictions",
          "Supply chain disruptions",
          "Currency exchange rate fluctuations"
        ],
        earningsPerformance: "Recent quarterly earnings showed revenue growth of 8% year-over-year, exceeding analyst estimates. EPS increased by 12% compared to the same quarter last year, driven by strong services segment growth and continued iPhone demand.",
        analystConsensus: "Buy (18 analysts), Hold (7 analysts), Sell (2 analysts). Average price target: $220.00 (+10.8% upside)",
        sentimentScore: 0.65
      };
      
      setAnalysis(mockAnalysis);
      setLoading(false);
    } catch (err) {
      console.error("Error analyzing stock:", err);
      setError("Failed to analyze stock. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">AI Analyst</h1>
        
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && analyzeStock()}
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="flex-1 px-4 py-3 rounded-lg bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              onClick={analyzeStock}
              disabled={loading}
              className="px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
            >
              {loading ? "Analyzing..." : "Analyze Stock"}
            </button>
          </div>
        </div>
        
        {error && <div className="p-4 mb-6 bg-destructive/10 text-destructive rounded">{error}</div>}
        
        {loading && !analysis && <div className="text-center py-8">Analyzing stock with AI...</div>}
        
        {analysis && (
          <div className="space-y-6">
            <div className="bg-card/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Business Model & Revenue Drivers</h2>
              <p className="text-muted-foreground">{analysis.businessModel}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Strengths</h2>
                <ul className="space-y-2 list-disc list-inside">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="text-muted-foreground">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Key Risits</h2>
                <ul className="space-y-2 list-disc list-inside">
                  {analysis.risks.map((risk, index) => (
                    <li key={index} className="text-muted-foreground">{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-card/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Quarterly Earnings Performance</h2>
              <p className="text-muted-foreground">{analysis.earningsPerformance}</p>
            </div>
            
            <div className="bg-card/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Market Sentiment & Analyst Consensus</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" 
                       style={{ backgroundColor: analysis.sentimentScore >= 0 ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)' }}>
                  </div>
                  <span className="font-medium">
                    Sentiment: {analysis.sentimentScore >= 0 ? "Bullish" : "Bearish"} 
                    ({((analysis.sentimentScore + 1) * 50).toFixed(0)}%)
                  </span>
                </div>
                <p className="text-muted-foreground">{analysis.analystConsensus}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
