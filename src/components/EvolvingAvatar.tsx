"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Cloud, Sun, Sparkles } from "lucide-react";

type AvatarStage =
  | "seed"
  | "sprout"
  | "sapling"
  | "flower"
  | "tree"
  | "twoTrees"
  | "forest";
type AvatarState = "normal" | "excited" | "sick";

const getAvatarStage = (xp: number): AvatarStage => {
  if (xp < 50) return "seed";
  if (xp < 150) return "sprout";
  if (xp < 300) return "sapling";
  if (xp < 600) return "flower";
  if (xp < 1000) return "tree";
  if (xp < 1500) return "twoTrees";
  return "forest";
};

export function EvolvingAvatar() {
  const { xp, streak, lastXPGain } = useStore();
  const [avatarState, setAvatarState] = useState<AvatarState>("normal");
  const stage = useMemo(() => getAvatarStage(xp), [xp]);

  useEffect(() => {
    if (streak === 0) {
      setAvatarState("sick");
    } else {
      setAvatarState("normal");
    }
  }, [streak]);

  // Trigger excited state when XP gain is fresh (within last 2 seconds)
  useEffect(() => {
    const timeSinceGain = Date.now() - lastXPGain;
    if (timeSinceGain < 2000 && lastXPGain !== 0 && streak > 0) {
      setAvatarState("excited");
      const timer = setTimeout(() => {
        if (streak > 0) setAvatarState("normal");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lastXPGain, streak]);

  const containerBg = useMemo(() => {
    switch (stage) {
      case "seed":
        return "bg-amber-900/20"; // Soil
      case "sprout":
      case "sapling":
        return "bg-emerald-900/10"; // Grass
      case "flower":
      case "tree":
        return "bg-sky-500/10"; // Sky
      case "twoTrees":
      case "forest":
        return "bg-green-950/20"; // Deep Forest
    }
  }, [stage]);

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <motion.div
        layout
        className={`w-48 h-48 rounded-3xl ${containerBg} border border-white/5 flex items-center justify-center relative overflow-hidden bg-[#131313]/90 backdrop-blur-md shadow-2xl transition-colors duration-1000`}
      >
        {/* Background elements */}
        <AnimatePresence>
          {(stage === "flower" || stage === "tree") && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4"
            >
              <Sun className="w-8 h-8 text-yellow-500/40 animate-pulse" />
            </motion.div>
          )}
          {(stage === "twoTrees" || stage === "forest") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={
            avatarState === "excited"
              ? {
                  scale: [1, 1.1, 1],
                  y: [0, -15, 0],
                }
              : avatarState === "sick"
                ? {
                    rotate: [0, -2, 2, -2, 2, 0],
                    filter: "grayscale(0.8) contrast(0.8)",
                  }
                : {
                    scale: [1, 1.02, 1],
                  }
          }
          transition={{
            duration: avatarState === "excited" ? 0.5 : 2,
            repeat: avatarState === "normal" ? Infinity : 0,
          }}
          className="relative z-10"
        >
          <AvatarStageRenderer stage={stage} state={avatarState} />
        </motion.div>

        {/* Floating XP Text Animation */}
        <AnimatePresence>
          {avatarState === "excited" && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -60, opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute font-semibold text-orange-500 pointer-events-none drop-shadow-lg"
            >
              +XP
              <Sparkles className="inline w-4 h-4 ml-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="text-center space-y-1">
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] drop-shadow-sm"
        >
          Level {Math.floor(xp / 100) + 1} — {stage}
        </motion.p>
        <p className="text-sm text-zinc-400 font-medium">
          {avatarState === "sick"
            ? "Needs attention! Maintain your streak."
            : "Growth in progress..."}
        </p>
      </div>
    </div>
  );
}

function AvatarStageRenderer({
  stage,
  state,
}: {
  stage: AvatarStage;
  state: AvatarState;
}) {
  const isSick = state === "sick";
  const leafColor = isSick ? "#4a5568" : "#22c55e";
  const trunkColor = isSick ? "#2d3748" : "#78350f";
  const flowerColor = isSick ? "#718096" : "#ec4899";

  const variants = {
    initial: { scale: 0.8, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 1.2, opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.svg
        key={stage}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="drop-shadow-2xl"
      >
        {/* Ground */}
        <ellipse
          cx="60"
          cy="110"
          rx="40"
          ry="10"
          fill="rgba(255,255,255,0.05)"
        />

        {stage === "seed" && (
          <motion.circle
            cx="60"
            cy="100"
            r="8"
            fill="#5c4033"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}

        {stage === "sprout" && (
          <g transform={isSick ? "rotate(10 60 110)" : ""}>
            <rect x="58" y="80" width="4" height="30" rx="2" fill={leafColor} />
            <motion.path
              d="M60 85 Q75 75 80 85 Q75 95 60 85"
              fill={leafColor}
              animate={{ rotate: isSick ? 10 : [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </g>
        )}

        {stage === "sapling" && (
          <g transform={isSick ? "rotate(15 60 110)" : ""}>
            <rect
              x="57"
              y="70"
              width="6"
              height="40"
              rx="2"
              fill={trunkColor}
            />
            <motion.path
              d="M60 75 Q40 65 35 75 Q40 85 60 75"
              fill={leafColor}
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <motion.path
              d="M60 85 Q80 75 85 85 Q80 95 60 85"
              fill={leafColor}
              animate={{ rotate: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 4.5 }}
            />
          </g>
        )}

        {stage === "flower" && (
          <g transform={isSick ? "rotate(20 60 110)" : ""}>
            <rect
              x="57"
              y="60"
              width="6"
              height="50"
              rx="3"
              fill={trunkColor}
            />
            {/* Leaves */}
            <path
              d="M60 90 Q40 80 35 90"
              stroke={leafColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M60 100 Q80 90 85 100"
              stroke={leafColor}
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Flower */}
            <motion.g
              animate={{
                scale: isSick ? 0.9 : [1, 1.05, 1],
                rotate: isSick ? 20 : [0, 5, -5, 0],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <circle
                cx="60"
                cy="55"
                r="12"
                fill={flowerColor}
                filter="blur(1px)"
              />
              <circle cx="60" cy="55" r="5" fill="#facc15" />
            </motion.g>
          </g>
        )}

        {stage === "tree" && (
          <g transform={isSick ? "rotate(10 60 110)" : ""}>
            <rect
              x="54"
              y="50"
              width="12"
              height="60"
              rx="4"
              fill={trunkColor}
            />
            <motion.circle
              cx="60"
              cy="45"
              r="30"
              fill={leafColor}
              className="opacity-80"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 5 }}
            />
            <motion.circle
              cx="45"
              cy="50"
              r="20"
              fill={leafColor}
              className="opacity-90"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 6, delay: 0.5 }}
            />
            <motion.circle
              cx="75"
              cy="50"
              r="20"
              fill={leafColor}
              className="opacity-90"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 5.5, delay: 1 }}
            />
          </g>
        )}

        {stage === "twoTrees" && (
          <g transform={isSick ? "scale(0.9) translate(10 10)" : ""}>
            {/* Tree 1 */}
            <g transform="translate(-20 10) scale(0.8)">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="45" r="25" fill={leafColor} />
            </g>
            {/* Tree 2 */}
            <g transform="translate(20 0)">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="45" r="30" fill={leafColor} />
            </g>
          </g>
        )}

        {stage === "forest" && (
          <g transform={isSick ? "scale(0.85) translate(10 15)" : ""}>
            {/* Background trees */}
            <g transform="translate(-30 20) scale(0.6)" opacity="0.5">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="40" r="25" fill={leafColor} />
            </g>
            <g transform="translate(35 25) scale(0.5)" opacity="0.5">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="40" r="25" fill={leafColor} />
            </g>
            {/* Mid trees */}
            <g transform="translate(-15 10) scale(0.8)">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="40" r="30" fill={leafColor} />
            </g>
            {/* Main foreground tree */}
            <g transform="translate(15 0)">
              <rect
                x="54"
                y="50"
                width="12"
                height="60"
                rx="4"
                fill={trunkColor}
              />
              <circle cx="60" cy="40" r="35" fill={leafColor} />
            </g>
            <Sparkles className="absolute top-0 right-0 w-8 h-8 text-yellow-400 opacity-20" />
          </g>
        )}
      </motion.svg>
    </AnimatePresence>
  );
}
