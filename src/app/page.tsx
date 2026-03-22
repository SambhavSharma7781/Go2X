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
    <div className="fixed inset-0 bg-[#0B0B0B] flex flex-col items-center justify-center space-y-6 z-200">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-20 h-20 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/40">
          <InfinityIcon className="text-white w-12 h-12" />
        </div>
      </motion.div>
      <div className="text-center">
        <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">
          Don't settle for 1X
        </h1>
        <div className="mt-4 flex items-center gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
