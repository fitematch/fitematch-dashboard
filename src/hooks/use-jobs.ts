'use client'

import { useEffect, useState } from 'react'

import { jobService } from '@/services/jobs/job.service'
import type { Job } from '@/types/entities/job.entity'

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadJobs() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await jobService.list()

        setJobs(response)
      } catch {
        setError('Failed to load jobs.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadJobs()
  }, [])

  return { jobs, isLoading, error }
}
