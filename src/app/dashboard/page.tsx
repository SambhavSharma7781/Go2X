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
      <header className="flex items-end justify-between">
        <div className="space-y-1">
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-semibold text-white"
          >
            Welcome back,{" "}
            <span className="bg-linear-to-l from-yellow-500 to-orange-500 bg-clip-text text-transparent font-semibold">
              {name || "Dreamer"}
            </span>
          </motion.h2>
          <p className="text-gray-400 font-medium">
            Your personalized learning path and community discussions.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Daily Progress
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              <motion.div
                animate={{ width: `${xp % 100}%` }}
                className="h-full bg-orange-500 shadow-lg shadow-orange-500/40"
              />
            </div>
            <span className="text-xs font-medium text-white">
              {xp % 100}/100 XP
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-[#111111] p-8 rounded-2xl flex items-center justify-center border border-gray-800 shadow-lg relative overflow-hidden">
            <EvolvingAvatar />
          </div>

          <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 space-y-4 shadow-lg">
            <h3 className="font-semibold text-lg text-white">Quick Actions</h3>
            <button
              onClick={handleCompleteTask}
              className="w-full group flex items-center justify-between p-4 rounded-xl bg-gray-800/20 hover:bg-gray-800/40 transition-all border border-gray-700 hover:border-orange-500/40"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-white">
                  Complete Daily Quiz
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full group flex items-center justify-between p-4 rounded-xl bg-gray-800/20 hover:bg-gray-800/40 transition-all border border-gray-700 opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-white">
                  Start Smart Session
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
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
