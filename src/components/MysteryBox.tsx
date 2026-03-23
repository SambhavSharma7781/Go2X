"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Boxes, Sparkles, Gift, Zap, TrendingUp } from "lucide-react";

const REWARDS = [
  {
    label: "+50 XP",
    icon: Zap,
    color: "text-orange-400",
    add: (s: any) => s.addXP(50),
  },
  {
    label: "Streak Freeze",
    icon: Gift,
    color: "text-blue-400",
    add: (s: any) => {},
  },
  {
    label: "Double XP Buff",
    icon: TrendingUp,
    color: "text-green-400",
    add: (s: any) => s.addXP(100),
  },
];

export function MysteryBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState<any>(null);
  const store = useStore();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
      setReward(randomReward);
      randomReward.add(store);
    }, 1500);
  };

  return (
    <div className="bg-[#111111]/80 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-8 relative overflow-hidden group shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none opacity-50" />

      <div className="text-center space-y-2 relative">
        <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">Daily Mystery Box</h3>
        <p className="text-zinc-400 font-medium text-sm md:text-lg tracking-wide">
          One box per day. What's inside?
        </p>
      </div>

      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!reward ? (
            <motion.button
              key="box"
              onClick={handleOpen}
              animate={
                isOpen
                  ? {
                      scale: [1, 1.2, 0.8, 1.5, 0],
                      rotate: [0, 10, -10, 20, 360],
                    }
                  : {
                      y: [0, -10, 0],
                    }
              }
              transition={
                isOpen
                  ? { duration: 1.5, ease: "easeInOut" }
                  : { repeat: Infinity, duration: 3 }
              }
              className={`p-10 rounded-3xl bg-gradient-to-br from-orange-400 to-rose-600 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.4)] relative z-10 border border-white/20 ${isOpen ? "" : "hover:scale-105 transition-transform hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]"}`}
            >
              <Boxes className="w-24 h-24 text-white drop-shadow-xl" />
              {isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 2 }}
                  className="absolute inset-0 bg-white rounded-full blur-3xl opacity-50"
                />
              )}
            </motion.button>
          ) : (
            <motion.div
              key="reward"
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              className="flex flex-col items-center gap-5 relative z-20"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500/10 to-rose-500/10 backdrop-blur-md border border-orange-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                <reward.icon className={`w-14 h-14 ${reward.color} drop-shadow-lg`} />
              </div>
              <div className="text-center space-y-1">
                <motion.p
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  className="text-3xl font-bold text-zinc-100 tracking-tight"
                >
                  {reward.label}
                </motion.p>
                <p className="text-xs font-bold text-orange-400 tracking-widest uppercase">
                  UNLOCKED
                </p>
              </div>
              <Sparkles className="absolute -top-10 -right-10 w-24 h-24 text-orange-400 opacity-30 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isOpen && (
        <p className="text-xs font-bold text-orange-400/80 animate-pulse uppercase tracking-widest">
          Tap to Unbox
        </p>
      )}
    </div>
  );
}
