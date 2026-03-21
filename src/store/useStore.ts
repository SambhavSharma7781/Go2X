import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabaseService } from '@/lib/supabaseService'

interface UserState {
  xp: number
  streak: number
  topics: string[]
  level: number
  notifications: string[]
  name: string
  lastXPGain: number
  _hasHydrated: boolean
  setName: (name: string) => void
  setXP: (xp: number) => void
  addXP: (amount: number) => void
  setStreak: (streak: number) => void
  setTopics: (topics: string[]) => void
  addNotification: (message: string) => void
  clearNotifications: () => void
  setHasHydrated: (hasHydrated: boolean) => void
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
      _hasHydrated: false,
      setName: (name) => set({ name }),
      setXP: (xp) => set({ xp, level: Math.floor(xp / 100) + 1 }),
      addXP: (amount) => set((state) => {
        const newXP = state.xp + amount

        // Sync to Supabase (fire-and-forget for performance) - Only on client
        if (typeof window !== 'undefined' && state.name) {
          supabaseService.updateUserXP(state.name, newXP).catch(err => {
            console.error('Failed to sync XP to Supabase:', err)
          })
        }

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
      setHasHydrated: (hasHydrated) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'learning-platform-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {}
            }
      ),
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)

// Manual hydration for client-side
if (typeof window !== 'undefined') {
  useStore.persist.rehydrate()
}
