'use client'

import { useEffect, useState } from 'react'

import { userService } from '@/services/users/user.service'
import type { User } from '@/types/entities/user.entity'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await userService.list()

        setUsers(response)
      } catch {
        setError('Failed to load users.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadUsers()
  }, [])

  return { users, isLoading, error }
}
