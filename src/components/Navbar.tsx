'use client'

import { useStore } from '@/store/useStore'
import { Zap, Flame, Bell, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const { xp, streak, level, notifications } = useStore()

  return (
    <div className="h-16 glass border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/20 glow">
          <Zap className="text-primary w-4 h-4 fill-primary animate-pulse" />
          <span className="text-sm font-bold text-white tracking-tight">{xp} XP</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/20">
          <Flame className="text-orange-500 w-4 h-4 fill-orange-500" />
          <span className="text-sm font-bold text-white tracking-tight">{streak} Day Streak</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/20">
          <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Level {level}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          )}
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center border border-white/20">
          <User className="text-white w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
