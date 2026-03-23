"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { InfinityIcon, Zap } from "lucide-react";

export default function Home() {
  const { topics } = useStore();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (topics.length === 0) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [topics, router]);

  return (
    <div className="fixed inset-0 bg-[#0B0B0B] flex flex-col items-center justify-center space-y-8 z-[200]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_100%)] pointer-events-none" />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-rose-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.5)] border border-white/20 backdrop-blur-md">
          <InfinityIcon className="text-white w-14 h-14 drop-shadow-lg" />
        </div>
      </motion.div>
      <div className="text-center relative z-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 italic tracking-tighter uppercase drop-shadow-md">
          Don't settle for 1X
        </h1>
        <div className="mt-6 flex items-center gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
