"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  BookOpen,
  Settings,
  Zap,
  Boxes,
  InfinityIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/mystery-box", label: "Rewards", icon: Boxes },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 h-16 md:h-full bg-[#0B0B0B]/90 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col p-2 md:p-6 fixed bottom-0 md:relative z-50 justify-around md:justify-start shadow-[0_0_40px_rgba(0,0,0,0.5)] md:shadow-none">
      <div className="hidden md:flex items-center gap-3 mb-10 pl-2">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 border border-white/10">
          <InfinityIcon className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Go2X Learn</h1>
      </div>

      <nav className="flex-1 flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 justify-center w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 group flex-1 md:flex-none",
                isActive
                  ? "bg-gradient-to-r from-orange-500/10 to-rose-500/5 text-orange-400 border border-orange-500/20 shadow-inner"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:scale-110",
                  isActive ? "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" : "text-zinc-500 group-hover:text-zinc-300",
                )}
              />
              <span className="text-[10px] md:text-sm font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
