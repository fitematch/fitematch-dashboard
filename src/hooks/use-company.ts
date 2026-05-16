'use client'

import { useEffect, useState } from 'react'

import { companyService } from '@/services/companies/company.service'
import type { Company } from '@/types/entities/company.entity'

export function useCompany(companyId: string) {
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCompany() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await companyService.read(companyId)

        setCompany(response)
      } catch {
        setError('Failed to load company.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadCompany()
  }, [companyId])

  return {
    company,
    isLoading,
    error,
  }
}