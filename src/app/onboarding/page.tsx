"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { supabaseService } from "@/lib/supabaseService";
import {
  Sparkles,
  Code,
  Brain,
  Globe,
  Database,
  Cpu,
  ArrowRight,
} from "lucide-react";

const TOPICS = [
  {
    id: "web-dev",
    label: "Web Development",
    icon: Globe,
    color: "bg-orange-500",
    shadow: "shadow-orange-600/30",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    icon: Brain,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/30",
  },
  {
    id: "dsa",
    label: "Data Structures",
    icon: Database,
    color: "bg-orange-600",
    shadow: "shadow-orange-400/30",
  },
  {
    id: "backend",
    label: "Backend Systems",
    icon: Cpu,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/30",
  },
  {
    id: "react",
    label: "React & Next.js",
    icon: Code,
    color: "bg-orange-500",
    shadow: "shadow-orange-300/30",
  },
  {
    id: "ux",
    label: "User Experience",
    icon: Sparkles,
    color: "bg-orange-600",
    shadow: "shadow-orange-200/30",
  },
];

export default function OnboardingPage() {
  const [name, setLocalName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setTopics, setStreak, setName, setXP } = useStore();
  const router = useRouter();

  const toggleTopic = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const handleStart = async () => {
    if (selected.length === 0 || !name.trim()) return;

    setLoading(true);
    setError("");

    try {
      const trimmedName = name.trim();
      const existingUser = await supabaseService.getUserByName(trimmedName);

      if (existingUser) {
        // Load saved data (account recovery)
        setName(existingUser.name);
        setXP(existingUser.xp);
        setStreak(existingUser.streak);
        setTopics(existingUser.topics);
      } else {
        // Create new user
        await supabaseService.createUser(trimmedName, selected);
        setName(trimmedName);
        setTopics(selected);
        setStreak(1);
        setXP(0);
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Onboarding error:", err);
      console.error("Error details:", JSON.stringify(err, null, 2));
      if (err.code === "23505") {
        setError("This name is already taken. Please try another name.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.15)]"
          >
            Personalize Your Path
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-zinc-100 leading-tight tracking-tight"
          >
            What fuels your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 drop-shadow-sm">curiosity?</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm md:text-lg font-medium"
          >
            First, tell us your name, then pick what fuels your curiosity.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setLocalName(e.target.value)}
            className="w-full px-6 py-4 md:px-8 md:py-6 rounded-2xl bg-[#131313]/90 backdrop-blur-md border border-white/5 text-zinc-100 text-lg md:text-xl font-semibold focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 focus:outline-none transition-all text-center shadow-lg placeholder:text-zinc-600"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {TOPICS.map((topic, i) => {
            const isSelected = selected.includes(topic.id);
            const Icon = topic.icon;
            return (
              <motion.button
                key={topic.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => toggleTopic(topic.id)}
                className={`group relative p-5 md:p-8 rounded-3xl border transition-all duration-300 text-left overflow-hidden flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 ${
                  isSelected
                    ? "border-orange-500/50 bg-[#1A1A1A]/90 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.15)] sm:-translate-y-1"
                    : "border-white/5 bg-[#131313]/80 backdrop-blur-sm hover:bg-[#1A1A1A]/80 hover:border-white/10 hover:shadow-lg"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="topic-bg"
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none"
                  />
                )}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl ${topic.color} flex items-center justify-center sm:mb-6 ${topic.shadow} group-hover:scale-110 transition-transform shadow-inner`}
                >
                  <Icon className="text-white w-6 h-6 md:w-8 md:h-8 drop-shadow-md" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-base md:text-lg font-bold text-zinc-100 leading-tight tracking-tight">
                    {topic.label}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-500 mt-1 sm:mt-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Select to follow
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="flex justify-center pt-8 pb-10">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-semibold backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={selected.length === 0 || !name.trim() || loading}
            className={`px-8 py-4 md:px-12 md:py-5 rounded-2xl font-bold text-lg md:text-xl transition-all flex items-center gap-2 md:gap-3 group relative overflow-hidden ${
              selected.length > 0 && name.trim() && !loading
                ? "bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(249,115,22,0.6)]"
                : "bg-[#131313]/80 text-zinc-500 cursor-not-allowed border border-white/5 backdrop-blur-md"
            }`}
          >
            {selected.length > 0 && name.trim() && !loading && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            )}
            <span className="relative z-10 drop-shadow-md">
              {loading ? "Launching..." : "Launch My Path"}
            </span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
