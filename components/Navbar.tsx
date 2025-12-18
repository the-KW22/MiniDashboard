"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettingStore } from "@/lib/settingStore";
import { Moon, Sun, Monitor } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const theme = useSettingStore((state) => state.theme);

  const isActive = (path: string) => pathname === path;

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Mini Dashboard
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/tasks" 
              className={`transition-colors ${
                isActive('/tasks') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Tasks
            </Link>
            <Link 
              href="/notes" 
              className={`transition-colors ${
                isActive('/notes') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Notes
            </Link>
            <Link 
              href="/settings" 
              className={`flex items-center gap-2 transition-colors ${
                isActive('/settings') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Settings
              <ThemeIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}