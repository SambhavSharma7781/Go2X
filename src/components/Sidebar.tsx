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
    <div className="w-64 h-full bg-[#111111] border-r border-gray-800 flex flex-col p-6 hidden md:flex">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
          <InfinityIcon className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-semibold text-white">Go2X Learn</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-white",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-orange-500" : "text-gray-400",
                )}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
