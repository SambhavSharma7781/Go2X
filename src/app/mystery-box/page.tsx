"use client";

import { MysteryBox } from "@/components/MysteryBox";
import { motion } from "framer-motion";
import { Gift, Zap, TrendingUp } from "lucide-react";

export default function RewardsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-semibold text-white">Rewards Hub</h2>
        <p className="text-gray-400 font-medium text-lg">
          Claim your daily rewards and unlock special bonuses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MysteryBox />

        <div className="space-y-6">
          <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center space-y-4 shadow-lg">
            <div className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Zap className="text-orange-500 w-8 h-8 fill-orange-500" />
            </div>
            <div>
              <h4 className="font-semibold text-xl text-white">
                XP Multiplier
              </h4>
              <p className="text-gray-400 text-sm font-medium">
                Activate a 2x boost for 1 hour.
              </p>
            </div>
            <button className="w-full py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 rounded-xl text-sm font-semibold border border-orange-500/20 transition-all">
              Coming Soon
            </button>
          </div>

          <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 flex flex-col items-center text-center space-y-4 opacity-50 shadow-lg">
            <div className="w-16 h-16 rounded-xl bg-gray-800/40 flex items-center justify-center border border-gray-700">
              <Gift className="text-blue-500 w-8 h-8" />
            </div>
            <div>
              <h4 className="font-semibold text-xl text-white">
                Streak Freeze
              </h4>
              <p className="text-gray-400 text-sm font-medium">
                Protect your streak for 24 hours.
              </p>
            </div>
            <button className="w-full py-3 bg-gray-800/20 cursor-not-allowed text-gray-400 rounded-xl text-sm font-semibold border border-gray-700 transition-all">
              Locked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
