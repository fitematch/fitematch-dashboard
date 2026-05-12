'use client'

import { useEffect, useState } from 'react'

import { dashboardService } from '@/services/dashboard/dashboard.service'
import type { DashboardSummaryResponse } from '@/services/dashboard/dashboard.types'

type UseDashboardSummaryReturn = {
  summary: DashboardSummaryResponse | null
  isLoading: boolean
  error: string | null
}

export function useDashboardSummary(): UseDashboardSummaryReturn {
  const [summary, setSummary] =
    useState<DashboardSummaryResponse | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSummary() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await dashboardService.getSummary()

        setSummary(response)
      } catch (err) {
        console.error(err)

        setError('Failed to load dashboard summary.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadSummary()
  }, [])

  return {
    summary,
    isLoading,
    error,
  }
}
