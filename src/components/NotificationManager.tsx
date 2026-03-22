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
            <div className="glass bg-black! backdrop-blur-none p-6 rounded-[2rem] border-white/20 shadow-2xl shadow-primary/20 flex gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20 glow">
                <Bell className="w-6 h-6 text-primary fill-primary/20" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white uppercase tracking-wider italic flex items-center gap-2">
                  System Alert
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                </h4>
                <p className="text-sm text-secondary-foreground font-medium italic leading-tight">
                  "{active}"
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
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
