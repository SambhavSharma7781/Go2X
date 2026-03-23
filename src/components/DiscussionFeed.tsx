"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import {
  MessageSquare,
  ExternalLink,
  Hash,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface StackOverflowPost {
  title: string;
  link: string;
  tags: string[];
  score: number;
  answer_count: number;
  question_id: number;
  ai_score?: number;
}

export function DiscussionFeed() {
  const { topics } = useStore();
  const [posts, setPosts] = useState<StackOverflowPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const currentTopic = topics[0] || "javascript";

  useEffect(() => {
    const fetchDiscussions = async () => {
      setLoading(true);
      setError(false);
      try {
        const query = encodeURIComponent(currentTopic);
        const response = await fetch(
          `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${query}&site=stackoverflow`,
        );
        const data = await response.json();
        const rawPosts = data.items || [];

        // Simulated AI Layer: Ranking by relevance to all user topics
        const scoredPosts = rawPosts.map((post: any) => ({
          ...post,
          ai_score: topics.reduce((acc, topic) => {
            if (!topic) return acc;
            return (
              acc +
              (post.title.toLowerCase().includes(topic.toLowerCase()) ? 1 : 0)
            );
          }, 0),
        }));

        const filteredPosts = scoredPosts
          .filter((post: any) => (post.ai_score || 0) >= 0) // Keep all for now to show something, but rank by score
          .sort(
            (a: any, b: any) =>
              (b.ai_score || 0) - (a.ai_score || 0) || b.score - a.score,
          )
          .slice(0, 6);

        setPosts(filteredPosts);
      } catch (err) {
        console.error("Failed to fetch Stack Overflow discussions:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [currentTopic, topics]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col space-y-2">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-semibold text-white flex items-center gap-4"
        >
          <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
            <MessageSquare className="w-8 h-8 text-orange-500" />
          </div>
          Knowledge Exchange
        </motion.h3>
        <p className="text-zinc-400 font-medium pl-14">
          Real-time insights synthesized from{" "}
          <span className="text-orange-500 font-semibold">#{currentTopic}</span>{" "}
          discussions
        </p>
      </div>

      <div className="relative group">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-zinc-800/20 transition-colors duration-700" />

        <div className="bg-[#111111]/80 backdrop-blur-md rounded-3xl p-10 relative overflow-hidden border border-white/5 shadow-2xl">
          <div className="absolute top-6 right-10 flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-1 h-3 bg-orange-500 rounded-full"
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md">
              Link Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-3xl bg-[#1A1A1A]/50 border border-white/5 space-y-6 animate-pulse"
                  >
                    <div className="space-y-3">
                      <div className="h-3 bg-[#222222] rounded-full w-1/3" />
                      <div className="h-5 bg-[#222222] rounded-xl w-full" />
                      <div className="h-5 bg-[#222222] rounded-xl w-4/5" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 bg-[#222222] rounded-full w-20" />
                      <div className="h-7 bg-[#222222] rounded-full w-20" />
                    </div>
                  </motion.div>
                ))
              ) : error ? (
                <div className="col-span-full py-20 flex flex-col items-center text-center space-y-6">
                  <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-12 h-12 text-red-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-white">
                      Unable to Load
                    </p>
                    <p className="text-zinc-400 max-w-xs mx-auto">
                      Please check your connection and try again.
                    </p>
                  </div>
                </div>
              ) : (
                posts.map((post, i) => (
                  <motion.div
                    key={post.question_id}
                    layout
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      delay: i * 0.1,
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-5 md:p-8 rounded-3xl bg-[#131313]/90 backdrop-blur-sm border border-white/5 hover:border-orange-500/30 hover:bg-[#151515] transition-all duration-300 group/card flex flex-col justify-between shadow-xl hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />

                    <div className="space-y-5 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-orange-500 uppercase tracking-tighter px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                          Curated
                        </span>
                        <div className="flex items-center gap-4 text-zinc-400 text-xs font-semibold">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1A1A1A] border border-white/5">
                            <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />{" "}
                            {post.score}
                          </div>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1A1A1A] border border-white/5">
                            <MessageCircle className="w-3.5 h-3.5 text-orange-400" />{" "}
                            {post.answer_count}
                          </div>
                        </div>
                      </div>

                      <h4
                        className="text-lg md:text-xl font-bold text-zinc-100 leading-snug group-hover/card:text-orange-100 transition-colors cursor-pointer tracking-tight"
                        onClick={() => window.open(post.link, "_blank")}
                      >
                        {post.title
                          .replace(/&quot;/g, '"')
                          .replace(/&#39;/g, "'")
                          .replace(/&amp;/g, "&")}
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium text-zinc-400 px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center gap-1.5 hover:bg-[#222222] hover:text-zinc-200 transition-colors cursor-default"
                          >
                            <Hash className="w-2.5 h-2.5 text-orange-400/60" />{" "}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(post.link, "_blank")}
                      className="mt-8 flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-semibold transition-all shadow-lg shadow-orange-500/20 relative z-10"
                    >
                      Follow Discussion
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
              <p className="text-sm text-zinc-400 font-medium italic max-w-sm">
                "AI-powered curation surfaces relevant discussions aligned with
                your learning goals."
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-[#1A1A1A] border border-white/5 shadow-inner">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-[#111111] bg-gradient-to-br from-orange-500 to-orange-600"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-white uppercase tracking-tighter">
                  1.2k Active
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-[8px] font-medium text-zinc-400 uppercase">
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
