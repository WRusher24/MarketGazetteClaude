"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { MainContent } from "@/components/layout/main-content";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex bg-background" data-theme={theme}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}
