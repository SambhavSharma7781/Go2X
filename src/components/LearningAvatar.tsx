"use client";

import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Sparkles, Ghost, Zap } from "lucide-react";

export function LearningAvatar() {
  const { streak } = useStore();

  // Avatar states: 0-3 (beginner), 4-7 (growing), 8+ (advanced)
  let state = "beginner";
  let color = "from-blue-500 to-blue-600";
  let Icon = Ghost;

  if (streak > 7) {
    state = "advanced";
    color = "from-orange-500 to-orange-600";
    Icon = Sparkles;
  } else if (streak > 3) {
    state = "growing";
    color = "from-orange-400 to-orange-500";
    Icon = Zap;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={state}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center relative shadow-[0_0_30px_rgba(249,115,22,0.3)] group overflow-hidden border border-white/20 backdrop-blur-md`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="w-16 h-16 text-white drop-shadow-xl" />

        {/* Particle effect for advanced */}
        {state === "advanced" && (
          <>
            <motion.div
              animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            />
            <motion.div
              animate={{ y: [10, -10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute bottom-4 right-6 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"
            />
          </>
        )}
      </motion.div>
      <div className="text-center space-y-1">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">
          {state} entity
        </p>
        <p className="text-sm text-zinc-200 font-semibold">Your Learning Avatar</p>
      </div>
    </div>
  );
}
