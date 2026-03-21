import { supabase } from './supabase'

export interface User {
  id: string
  name: string
  xp: number
  streak: number
  topics: string[]
  level: number
  created_at: string
  updated_at: string
}

export const supabaseService = {
  async getUserByName(name: string): Promise<User | null> {
    console.log('Fetching user from Supabase:', name)

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('User not found:', name)
        return null // Not found
      }
      console.error('Supabase getUserByName error:', error)
      throw error
    }

    console.log('User found:', data)
    return data
  },

  async createUser(name: string, topics: string[]): Promise<User> {
    // Ensure topics is always an array
    const validTopics = Array.isArray(topics) ? topics : []

    const userData = {
      name,
      xp: 0,
      streak: 1,
      topics: validTopics
    }

    console.log('Creating user in Supabase:', userData)

    const { data, error } = await supabase
      .from('users')
      .insert([userData])  // Use array format
      .select()
      .single()

    if (error) {
      console.error('Supabase createUser error:', error)
      throw error
    }

    console.log('User created successfully:', data)
    return data
  },

  async updateUserXP(name: string, newXP: number): Promise<void> {
    console.log('Updating XP in Supabase:', { name, newXP })

    const { error } = await supabase
      .from('users')
      .update({ xp: newXP })
      .eq('name', name)

    if (error) {
      console.error('Supabase updateUserXP error:', error)
      throw error
    }

    console.log('XP updated successfully for:', name)
  },

  async getLeaderboard(limit: number = 20): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('xp', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  }
}
