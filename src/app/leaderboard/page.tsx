'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { Trophy, Medal, Target, ChevronUp } from 'lucide-react'

interface LeaderboardUser {
  name: string
  xp: number
  isUser?: boolean
  rank?: number
  trend?: 'up' | 'neutral' | 'down'
}

const STATIC_COMPETITORS: LeaderboardUser[] = [
  { name: 'Akshdeep', xp: 2450 },
  { name: 'Nikita', xp: 2210 },
  { name: 'Sambhav', xp: 1800 },
  { name: 'Sanjay', xp: 1420 },
  { name: 'Aarohi', xp: 1200 },
  { name: 'Kashish', xp: 950 },
  { name: 'Dhananjai', xp: 700 },
]

export default function LeaderboardPage() {
  const { xp, name } = useStore()

  const leaderboardData: LeaderboardUser[] = [
    ...STATIC_COMPETITORS,
    { name: name || 'You', xp: xp, isUser: true }
  ]
  .sort((a, b) => b.xp - a.xp)
  .map((user, index) => ({
    ...user,
    rank: index + 1,
    trend: (index % 3 === 0 ? 'up' : index % 3 === 1 ? 'neutral' : 'down') as 'up' | 'neutral' | 'down'
  }))

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest">
          <Trophy className="w-3 h-3 fill-yellow-500" />
          Weekly Ranking
        </div>
        <h2 className="text-5xl font-black text-white italic">Hall of Pioneers</h2>
        <p className="text-muted-foreground font-medium text-lg italic">Competition fuels evolution. Where do you stand?</p>
      </div>

      <div className="glass rounded-[3rem] border-white/10 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-white/5 bg-white/5">
          <div className="col-span-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rank</div>
          <div className="col-span-7 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Pioneer</div>
          <div className="col-span-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Experience</div>
          <div className="col-span-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Trend</div>
        </div>

        <div className="divide-y divide-white/5">
          {leaderboardData.map((user, i) => (
            <motion.div 
              key={user.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-12 gap-4 px-8 py-10 items-center transition-all group ${user.isUser ? 'bg-primary/20 border-l-4 border-primary' : 'hover:bg-white/5'}`}
            >
              <div className="col-span-1">
                {user.rank === 1 ? <Medal className="w-8 h-8 text-yellow-500 glow fill-yellow-500" /> : 
                 user.rank === 2 ? <Medal className="w-8 h-8 text-gray-400 fill-gray-400" /> :
                 user.rank === 3 ? <Medal className="w-8 h-8 text-orange-500 fill-orange-500" /> :
                 <span className="text-2xl font-black text-white/20 pl-2">{user.rank}</span>}
              </div>
              <div className="col-span-7 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${user.isUser ? 'bg-primary shadow-lg shadow-primary/40' : 'bg-white/10'} border border-white/10 flex items-center justify-center font-black text-white text-xl`}>
                   {user.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-white group-hover:text-primary transition-colors">
                    {user.name} {user.isUser && "(You)"}
                  </h4>
                  <p className="text-xs text-muted-foreground font-bold">Level {Math.floor(user.xp / 100) + 1} entity</p>
                </div>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xl font-black text-white">{user.xp.toLocaleString()}</span>
                <span className="text-[10px] font-black text-primary block">XP</span>
              </div>
              <div className="col-span-1 flex justify-end">
                {user.trend === 'up' && <ChevronUp className="w-5 h-5 text-green-500 glow" />}
                {user.trend === 'neutral' && <Target className="w-5 h-5 text-muted-foreground opacity-30" />}
                {user.trend === 'down' && <ChevronUp className="w-5 h-5 text-red-500 rotate-180" />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
