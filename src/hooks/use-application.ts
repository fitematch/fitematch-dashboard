'use client'

import { useEffect, useState } from 'react'

import { applicationService } from '@/services/applications/application.service'
import type { Application } from '@/types/entities/application.entity'

export function useApplication(applicationId: string) {
  const [application, setApplication] = useState<Application | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadApplication() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await applicationService.read(applicationId)

        setApplication(response)
      } catch {
        setError('Failed to load application.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadApplication()
  }, [applicationId])

  return {
    application,
    isLoading,
    error,
  }
}