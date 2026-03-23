"use client";

import { useStore } from "@/store/useStore";
import { Zap, Flame, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { xp, streak, level, notifications } = useStore();

  return (
    <div className="h-16 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="flex items-center gap-4 flex-1"></div>

      <div className="flex items-center gap-3 md:gap-6 whitespace-nowrap">
        <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 shadow-inner">
          <Zap className="text-orange-500 w-3.5 h-3.5 md:w-4 md:h-4 fill-orange-500" />
          <span className="text-xs md:text-sm font-semibold text-orange-50 tracking-tight">
            {xp} <span className="hidden sm:inline">XP</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-inner">
          <Flame className="text-yellow-500 w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-500" />
          <span className="text-xs md:text-sm font-semibold text-yellow-50 tracking-tight">
            {streak} <span className="hidden sm:inline">Day</span><span className="hidden md:inline"> Streak</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
          <span className="text-[10px] md:text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Level {level}
          </span>
        </div>
      </div>
    </div>
  );
}
