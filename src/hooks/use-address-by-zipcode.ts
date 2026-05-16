'use client'

import { useState } from 'react'

import { addressService } from '@/services/address/address.service'
import { getApiErrorMessage } from '@/services/http/api-error'

type AddressByZipCodeData = {
  street: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export function useAddressByZipCode() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function searchZipCode(
    zipCode: string,
  ): Promise<AddressByZipCodeData | null> {
    const normalizedZipCode = addressService.normalizeZipCode(zipCode)

    if (normalizedZipCode.length !== 8) {
      setError(null)
      return null
    }

    try {
      setIsLoading(true)
      setError(null)

      const data = await addressService.findByZipCode(normalizedZipCode)

      return {
        street: data.logradouro || '',
        complement: data.complemento || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
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
    searchZipCode,
    clearError,
    isLoading,
    error,
  }
}
