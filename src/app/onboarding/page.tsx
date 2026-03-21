'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Sparkles, Code, Brain, Globe, Database, Cpu, ArrowRight } from 'lucide-react'

const TOPICS = [
  { id: 'web-dev', label: 'Web Development', icon: Globe, color: 'bg-blue-500' },
  { id: 'ai', label: 'Artificial Intelligence', icon: Brain, color: 'bg-purple-500' },
  { id: 'dsa', label: 'Data Structures', icon: Database, color: 'bg-emerald-500' },
  { id: 'backend', label: 'Backend Systems', icon: Cpu, color: 'bg-orange-500' },
  { id: 'react', label: 'React & Next.js', icon: Code, color: 'bg-cyan-500' },
  { id: 'ux', label: 'User Experience', icon: Sparkles, color: 'bg-pink-500' },
]

export default function OnboardingPage() {
  const [name, setLocalName] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const { setTopics, setStreak, setName } = useStore()
  const router = useRouter()

  const toggleTopic = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const handleStart = () => {
    if (selected.length === 0 || !name.trim()) return
    setName(name.trim())
    setTopics(selected)
    setStreak(1) // Start their streak!
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em]"
          >
            Personalize Your Path
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            What fuels your <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">curiosity?</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg font-medium"
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
            className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border-2 border-white/10 text-white text-xl font-bold focus:border-primary focus:outline-none focus:bg-white/10 transition-all text-center"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {TOPICS.map((topic, i) => {
            const isSelected = selected.includes(topic.id)
            const Icon = topic.icon
            return (
              <motion.button
                key={topic.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + (i * 0.05) }}
                onClick={() => toggleTopic(topic.id)}
                className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-300 text-left overflow-hidden ${
                  isSelected 
                    ? 'border-primary bg-primary/10 shadow-2xl shadow-primary/20 translate-y-[-4px]' 
                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 hover:translate-y-[-2px]'
                }`}
              >
                {isSelected && (
                  <motion.div 
                    layoutId="topic-bg"
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" 
                  />
                )}
                <div className={`w-14 h-14 rounded-2xl ${topic.color} flex items-center justify-center mb-6 shadow-lg shadow-${topic.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-white leading-tight">{topic.label}</h3 >
                <p className="text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Select to follow</p>
              </motion.button>
            )
          })}
        </div>

        <div className="flex justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={selected.length === 0 || !name.trim()}
            className={`px-12 py-5 rounded-full font-black text-xl transition-all flex items-center gap-3 ${
              selected.length > 0 && name.trim()
                ? 'bg-primary text-white glow shadow-2xl shadow-primary/40' 
                : 'bg-white/5 text-muted-foreground cursor-not-allowed border border-white/5'
            }`}
          >
            Launch My Path
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
