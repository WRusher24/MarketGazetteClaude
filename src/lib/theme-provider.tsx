"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "minimalist-light" | "sleek-dark" | "bloomberg-terminal";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme (only on client)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("marketgazette-theme") as Theme | null;
      if (savedTheme) return savedTheme;
      
      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "sleek-dark"
        : "minimalist-light";
    }
    return "minimalist-light";
  });

  const isDarkMode = theme === "sleek-dark" || theme === "bloomberg-terminal";

  useEffect(() => {
    // Save theme to localStorage (only on client)
    if (typeof window !== "undefined") {
      localStorage.setItem("marketgazette-theme", theme);
      
      // Apply theme class to html element
      const html = window.document.documentElement;
      html.classList.remove("minimalist-light", "sleek-dark", "bloomberg-terminal");
      html.classList.add(theme);
      
      // Apply bloomberg class if needed
      if (theme === "bloomberg-terminal") {
        html.classList.add("bloomberg");
      } else {
        html.classList.remove("bloomberg");
      }
      
      // Apply dark class for dark themes
      if (isDarkMode) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [theme, isDarkMode]);

  const toggleDarkMode = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "minimalist-light") return "sleek-dark";
      if (prevTheme === "sleek-dark") return "minimalist-light";
      // For bloomberg, toggle to minimalist
      return "minimalist-light";
    });
  };

  const value = {
    theme,
    setTheme,
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
