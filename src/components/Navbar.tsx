"use client";

import { useStore } from "@/store/useStore";
import { Zap, Flame, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { xp, streak, level, notifications } = useStore();

  return (
    <div className="h-16 bg-[#111111] border-b border-gray-800 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1"></div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
          <Zap className="text-orange-500 w-4 h-4 fill-orange-500 animate-pulse" />
          <span className="text-sm font-medium text-white tracking-tight">
            {xp} XP
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 ">
          <Flame className="text-yellow-500 w-4 h-4 fill-yellow-500" />
          <span className="text-sm font-medium text-white tracking-tight">
            {streak} Day Streak
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/40 border border-gray-700">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            Level {level}
          </span>
        </div>
      </div>
    </div>
  );
}
