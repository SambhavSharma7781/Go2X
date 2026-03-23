"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { EvolvingAvatar } from "@/components/EvolvingAvatar";
import { DiscussionFeed } from "@/components/DiscussionFeed";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  const { xp, streak, addXP, name } = useStore();

  const handleCompleteTask = () => {
    addXP(25);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight"
          >
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
              {name || "Dreamer"}
            </span>
          </motion.h2>
          <p className="text-sm md:text-base text-zinc-400 font-medium tracking-wide">
            Your personalized learning path and community discussions.
          </p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1.5">
            Daily Progress
          </p>
          <div className="flex items-center gap-3">
            <div className="w-32 md:w-40 h-2 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                animate={{ width: `${xp % 100}%` }}
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              />
            </div>
            <span className="text-xs font-semibold text-zinc-300">
              {xp % 100}/100 <span className="text-zinc-500">XP</span>
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-[#111111]/80 backdrop-blur-md p-8 rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <EvolvingAvatar />
          </div>

          <div className="bg-[#111111]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 space-y-4 shadow-xl">
            <h3 className="font-semibold text-lg text-zinc-100 tracking-tight">Quick Actions</h3>
            <button
              onClick={handleCompleteTask}
              className="w-full group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 hover:bg-orange-500/10 transition-all duration-300 border border-white/5 hover:border-orange-500/30"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
                </div>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100">
                  Complete Daily Quiz
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/30 transition-all duration-300 border border-white/5 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-zinc-800/50">
                  <Sparkles className="w-5 h-5 text-zinc-500" />
                </div>
                <span className="text-sm font-medium text-zinc-400">
                  Start Smart Session
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <DiscussionFeed />
        </div>
      </div>
    </div>
  );
}
