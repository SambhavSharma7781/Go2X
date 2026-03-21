'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Sparkles, Ghost, Zap } from 'lucide-react'

export function LearningAvatar() {
  const { streak } = useStore()

  // Avatar states: 0-3 (beginner), 4-7 (growing), 8+ (advanced)
  let state = 'beginner'
  let color = 'from-blue-500 to-indigo-600'
  let Icon = Ghost

  if (streak > 7) {
    state = 'advanced'
    color = 'from-purple-600 to-pink-600'
    Icon = Sparkles
  } else if (streak > 3) {
    state = 'growing'
    color = 'from-green-500 to-emerald-600'
    Icon = Zap
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div 
        key={state}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${color} flex items-center justify-center relative shadow-2xl glow shadow-primary/40 group overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="w-16 h-16 text-white drop-shadow-lg" />
        
        {/* Particle effect for advanced */}
        {state === 'advanced' && (
          <>
            <motion.div 
              animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full"
            />
            <motion.div 
              animate={{ y: [10, -10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute bottom-4 right-6 w-1 h-1 bg-white rounded-full"
            />
          </>
        )}
      </motion.div>
      <div className="text-center">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{state} entity</p>
        <p className="text-sm text-white font-semibold">Your Learning Avatar</p>
      </div>
    </div>
  )
}
