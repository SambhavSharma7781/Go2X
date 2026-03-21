import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  xp: number
  streak: number
  topics: string[]
  level: number
  notifications: string[]
  name: string
  lastXPGain: number
  setName: (name: string) => void
  setXP: (xp: number) => void
  addXP: (amount: number) => void
  setStreak: (streak: number) => void
  setTopics: (topics: string[]) => void
  addNotification: (message: string) => void
  clearNotifications: () => void
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      xp: 0,
      streak: 0,
      topics: [],
      level: 1,
      notifications: [],
      name: '',
      lastXPGain: 0,
      setName: (name) => set({ name }),
      setXP: (xp) => set({ xp, level: Math.floor(xp / 100) + 1 }),
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount
        return { 
          xp: newXP, 
          level: Math.floor(newXP / 100) + 1,
          lastXPGain: Date.now()
        }
      }),
      setStreak: (streak) => set({ streak }),
      setTopics: (topics) => set({ topics }),
      addNotification: (message) => set((state) => ({ 
        notifications: [...state.notifications, message].slice(-5) 
      })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'learning-platform-storage',
    }
  )
)
