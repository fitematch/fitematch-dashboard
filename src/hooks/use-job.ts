'use client'

import { useEffect, useState } from 'react'

import { jobService } from '@/services/jobs/job.service'
import type { Job } from '@/types/entities/job.entity'

export function useJob(jobId: string) {
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadJob() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await jobService.read(jobId)

        setJob(response)
      } catch {
        setError('Failed to load job.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadJob()
  }, [jobId])

  return {
    job,
    isLoading,
    error,
  }
}