'use client'

import { useEffect, useState } from 'react'

import { companyService } from '@/services/companies/company.service'
import type { Company } from '@/types/entities/company.entity'

export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCompanies() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await companyService.list()

        setCompanies(response)
      } catch {
        setError('Failed to load companies.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadCompanies()
  }, [])

  return { companies, isLoading, error }
}
