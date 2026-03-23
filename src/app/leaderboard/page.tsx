"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { supabaseService } from "@/lib/supabaseService";
import { Trophy, Medal, Target, ChevronUp } from "lucide-react";

interface LeaderboardUser {
  name: string;
  xp: number;
  isUser?: boolean;
  rank?: number;
  trend?: "up" | "neutral" | "down";
}

export default function LeaderboardPage() {
  const { xp, name } = useStore();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const users = await supabaseService.getLeaderboard(20);

        // Check if current user is in top 20
        const isInTop20 = users.some((u) => u.name === name);

        const data = isInTop20
          ? users.map((u) => ({
              name: u.name,
              xp: u.xp,
              isUser: u.name === name,
            }))
          : [...users, { name: name || "You", xp: xp, isUser: true }].sort(
              (a, b) => b.xp - a.xp,
            );

        setLeaderboardData(
          data.map((user, index) => ({
            ...user,
            rank: index + 1,
            trend:
              index % 3 === 0 ? "up" : index % 3 === 1 ? "neutral" : "down",
          })),
        );
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [name, xp]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-widest">
            <Trophy className="w-3 h-3 fill-orange-500" />
            Weekly Ranking
          </div> */}
          <h2 className="text-5xl font-semibold text-white">
            Hall of Pioneers
          </h2>
        </div>
        <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl border border-white/5 p-8 space-y-4 shadow-2xl">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-[#1A1A1A] rounded-2xl animate-pulse shadow-inner border border-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-widest shadow-inner">
          Weekly Ranking
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 tracking-tight">Hall of Pioneers</h2>
        <p className="text-zinc-400 font-medium text-lg tracking-wide">
          Competition fuels evolution. Where do you stand?
        </p>
      </div>

      <div className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-12 gap-4 px-4 md:px-8 py-4 md:py-6 border-b border-white/5 bg-zinc-900/30">
            <div className="col-span-2 md:col-span-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Rank
            </div>
            <div className="col-span-6 md:col-span-7 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Pioneer
            </div>
            <div className="col-span-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">
              Experience
            </div>
            <div className="col-span-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">
              Trend
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {leaderboardData.map((user, i) => (
              <motion.div
                key={user.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`grid grid-cols-12 gap-4 px-4 md:px-8 py-6 md:py-8 items-center transition-all duration-300 group ${user.isUser ? "bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500" : "hover:bg-zinc-900/50"}`}
              >
                <div className="col-span-2 md:col-span-1 flex items-center">
                  {user.rank === 1 ? (
                    <div className="p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                      <Medal className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 drop-shadow-md" />
                    </div>
                  ) : user.rank === 3 ? (
                    <div className="p-2 rounded-full bg-orange-600/10 border border-orange-600/20">
                      <Medal className="w-6 h-6 md:w-8 md:h-8 text-orange-600 drop-shadow-md" />
                    </div>
                  ) : (
                    <span className="text-xl md:text-2xl font-bold text-zinc-600 pl-1 md:pl-2">
                      {user.rank}
                    </span>
                  )}
                </div>
                <div className="col-span-6 md:col-span-7 flex items-center gap-3 md:gap-5">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${user.isUser ? "bg-gradient-to-br from-orange-400 to-rose-500 shadow-lg shadow-orange-500/40 text-black" : "bg-zinc-800/80 text-zinc-300"} border ${user.isUser ? "border-orange-300" : "border-white/5"} flex items-center justify-center font-bold text-base md:text-lg shrink-0 transition-transform group-hover:scale-105`}
                  >
                    {user.name[0]}
                  </div>
                  <div className="truncate">
                    <h4 className={`font-bold text-base md:text-lg tracking-tight transition-colors truncate ${user.isUser ? "text-orange-400" : "text-zinc-200 group-hover:text-white"}`}>
                      {user.name} {user.isUser && "(You)"}
                    </h4>
                    <p className="text-[10px] md:text-xs text-zinc-500 font-semibold tracking-wide">
                      Level {Math.floor(user.xp / 100) + 1} entity
                    </p>
                  </div>
                </div>
                <div className="col-span-3 text-right flex flex-col justify-center">
                  <span className={`text-base md:text-xl font-bold ${user.isUser ? "text-orange-400 drop-shadow-sm" : "text-zinc-200"}`}>
                    {user.xp.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-orange-500/70 tracking-widest mt-0.5">
                    XP
                  </span>
                </div>
                <div className="col-span-1 flex justify-end">
                  {user.trend === "up" && (
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  )}
                  {user.trend === "neutral" && (
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-zinc-600 opacity-50" />
                  )}
                  {user.trend === "down" && (
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-red-500 rotate-180" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
