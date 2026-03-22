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
        <div className="bg-[#111111] rounded-2xl border border-gray-800 p-8 space-y-4 shadow-lg">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-900/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest">
          Weekly Ranking
        </div>
        <h2 className="text-5xl font-semibold text-white">Hall of Pioneers</h2>
        <p className="text-gray-400 font-medium text-lg">
          Competition fuels evolution. Where do you stand?
        </p>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-gray-800 bg-gray-900/30">
          <div className="col-span-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Rank
          </div>
          <div className="col-span-7 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Pioneer
          </div>
          <div className="col-span-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right">
            Experience
          </div>
          <div className="col-span-1 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right">
            Trend
          </div>
        </div>

        <div className="divide-y divide-gray-800">
          {leaderboardData.map((user, i) => (
            <motion.div
              key={user.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-12 gap-4 px-8 py-10 items-center transition-all group ${user.isUser ? "bg-orange-500/10 border-l-4 border-orange-500" : "hover:bg-gray-900/40"}`}
            >
              <div className="col-span-1">
                {user.rank === 1 ? (
                  <Medal className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                ) : user.rank === 3 ? (
                  <Medal className="w-8 h-8 text-orange-600 fill-orange-600" />
                ) : (
                  <span className="text-2xl font-semibold text-white/30 pl-2">
                    {user.rank}
                  </span>
                )}
              </div>
              <div className="col-span-7 flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${user.isUser ? "bg-orange-500 shadow-lg shadow-orange-500/30" : "bg-gray-800"} border ${user.isUser ? "border-orange-400" : "border-gray-700"} flex items-center justify-center font-semibold text-white text-lg`}
                >
                  {user.name[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-xl text-white group-hover:text-orange-500 transition-colors">
                    {user.name} {user.isUser && "(You)"}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium">
                    Level {Math.floor(user.xp / 100) + 1} entity
                  </p>
                </div>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xl font-semibold text-white">
                  {user.xp.toLocaleString()}
                </span>
                <span className="text-[10px] font-semibold text-orange-500 block">
                  XP
                </span>
              </div>
              <div className="col-span-1 flex justify-end">
                {user.trend === "up" && (
                  <ChevronUp className="w-5 h-5 text-green-500" />
                )}
                {user.trend === "neutral" && (
                  <Target className="w-5 h-5 text-gray-600 opacity-50" />
                )}
                {user.trend === "down" && (
                  <ChevronUp className="w-5 h-5 text-red-500 rotate-180" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
