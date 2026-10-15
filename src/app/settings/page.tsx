"use client";

import { useTheme } from "@/lib/theme-provider";
import { useState } from "react";
import { Palette, SunMoon, Settings } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="bg-card/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary rounded-lg">
                    <Palette className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setTheme("minimalist-light")}
                    className={theme === "minimalist-light" ? "bg-primary/20 text-primary" : "hover:bg-accent/5"}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme("sleek-dark")}
                    className={theme === "sleek-dark" ? "bg-primary/20 text-primary" : "hover:bg-accent/5"}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme("bloomberg-terminal")}
                    className={theme === "bloomberg-terminal" ? "bg-primary/20 text-primary" : "hover:bg-accent/5"}
                  >
                    Terminal
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-primary/20 text-primary rounded-lg">
                  <SunMoon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Follow system setting or manual override</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
                >
                  {theme === "sleek-dark" || theme === "bloomberg-terminal" ? "Disable Dark Mode" : "Enable Dark Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            className="w-full flex items-center justify-center px-6 py-3 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
