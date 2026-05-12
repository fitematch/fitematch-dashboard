'use client'

import { useEffect, useState } from 'react'

import { applicationService } from '@/services/applications/application.service'
import type { Application } from '@/types/entities/application.entity'

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadApplications() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await applicationService.list()

        setApplications(response)
      } catch {
        setError('Failed to load applications.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadApplications()
  }, [])

  return { applications, isLoading, error }
}
