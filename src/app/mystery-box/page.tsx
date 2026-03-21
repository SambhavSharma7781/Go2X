'use client'

import { MysteryBox } from '@/components/MysteryBox'
import { motion } from 'framer-motion'
import { Gift, Zap, TrendingUp } from 'lucide-react'

export default function RewardsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">Rewards Hub</h2>
        <p className="text-muted-foreground font-medium text-lg italic">Claim your daily rewards and boost your AI profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MysteryBox />
        
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border-white/10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center border border-yellow-500/20">
              <Zap className="text-yellow-500 w-8 h-8 fill-yellow-500" />
            </div>
            <div>
              <h4 className="font-black text-xl text-white">XP Multiplier</h4>
              <p className="text-muted-foreground text-sm font-medium">Activate a 2x boost for 1 hour.</p>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold border border-white/5 transition-all">
              Coming Soon
            </button>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-white/10 flex flex-col items-center text-center space-y-4 opacity-50">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
              <Gift className="text-blue-500 w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-xl text-white">Streak Freeze</h4>
              <p className="text-muted-foreground text-sm font-medium">Protect your streak for 24 hours.</p>
            </div>
            <button className="w-full py-3 bg-white/5 cursor-not-allowed text-white rounded-xl text-sm font-bold border border-white/5 transition-all">
              Locked
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
