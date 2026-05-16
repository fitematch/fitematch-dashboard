'use client'

import { useEffect, useState } from 'react'

import { userService } from '@/services/users/user.service'
import type { User } from '@/types/entities/user.entity'

export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await userService.read(userId)

        setUser(response)
      } catch {
        setError('Failed to load user.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadUser()
  }, [userId])

  return {
    user,
    isLoading,
    error,
  }
}