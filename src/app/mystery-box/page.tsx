"use client";

import { MysteryBox } from "@/components/MysteryBox";
import { motion } from "framer-motion";
import { Gift, Zap, TrendingUp } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
      <div className="space-y-2 md:space-y-3">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">Rewards Hub</h2>
        <p className="text-zinc-400 font-medium text-base md:text-lg tracking-wide">
          Claim your daily rewards and unlock special bonuses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <MysteryBox />

        <div className="space-y-6">
          <div className="bg-[#111111]/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/10 flex items-center justify-center border border-orange-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Zap className="text-orange-400 w-8 h-8 drop-shadow-md" />
            </div>
            <div>
              <h4 className="font-bold text-xl text-zinc-100 tracking-tight">
                XP Multiplier
              </h4>
              <p className="text-zinc-400 text-sm font-medium mt-1">
                Activate a 2x boost for 1 hour.
              </p>
            </div>
            <button className="w-full py-3.5 bg-gradient-to-r from-orange-500/10 to-rose-500/10 hover:from-orange-500/20 hover:to-rose-500/20 text-orange-400 rounded-xl text-sm font-bold border border-orange-500/20 shadow-inner transition-all">
              Coming Soon
            </button>
          </div>

          <div className="bg-[#111111]/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-5 opacity-60 shadow-xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-white/5 shadow-inner">
              <Gift className="text-zinc-500 w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-xl text-zinc-300 tracking-tight">
                Streak Freeze
              </h4>
              <p className="text-zinc-500 text-sm font-medium mt-1">
                Protect your streak for 24 hours.
              </p>
            </div>
            <button className="w-full py-3.5 bg-zinc-900/50 cursor-not-allowed text-zinc-500 rounded-xl text-sm font-bold border border-white/5 transition-all">
              Locked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
