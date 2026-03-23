"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Zap, Target, TrendingUp } from "lucide-react";
import { useStore } from "@/store/useStore";

const MESSAGES = [
  "You missed a day. Your clone is falling behind.",
  "Akshdeep just gained 50 XP. Don't let them win.",
  "Your learning streak is at risk. 4 hours left.",
  "An AI-curated resource is waiting for you.",
  "Dopamine hit ready: Open your Mystery Box!",
];

export function NotificationManager() {
  const [active, setActive] = useState<string | null>(null);
  const { streak } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7 && !active) {
        const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setActive(msg);
        setTimeout(() => setActive(null), 5000);
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] w-96 pointer-events-none">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <div className="bg-[#1A1A1A]/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-rose-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                <Bell className="w-6 h-6 text-orange-400 fill-orange-400/20 drop-shadow-md" />
              </div>
              <div className="space-y-1 relative z-10">
                <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-widest flex items-center gap-2">
                  System Alert
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                </h4>
                <p className="text-sm text-zinc-400 font-medium leading-tight">
                  "{active}"
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-200 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
