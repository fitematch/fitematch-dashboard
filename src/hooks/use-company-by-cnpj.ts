'use client'

import { useState } from 'react'

import { companyRegistryService } from '@/services/companies/company-registry.service'
import { getApiErrorMessage } from '@/services/http/api-error'

type CompanyByCnpjData = {
  legalName: string
  tradeName: string
}

export function useCompanyByCnpj() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function searchCompanyByCnpj(
    cnpj: string,
  ): Promise<CompanyByCnpjData | null> {
    const normalizedCnpj = companyRegistryService.normalizeCnpj(cnpj)

    if (normalizedCnpj.length !== 14) {
      setError(null)
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      const data = await companyRegistryService.findByCnpj(normalizedCnpj)

      return {
        legalName: data.razao_social || '',
        tradeName: data.nome_fantasia || '',
      }
    } catch (caughtError) {
      setError(getApiErrorMessage(caughtError))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  function clearError() {
    setError(null)
  }

  return {
    searchCompanyByCnpj,
    clearError,
    isLoading,
    error,
  }
}
