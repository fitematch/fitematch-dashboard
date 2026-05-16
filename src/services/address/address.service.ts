import { ApiError } from '@/services/http/api-error'

import type { ViaCepResponse } from './address.types'

function normalizeZipCode(zipCode: string) {
  return zipCode.replace(/\D/g, '')
}

export const addressService = {
  normalizeZipCode,

  async findByZipCode(zipCode: string): Promise<ViaCepResponse> {
    const normalizedZipCode = normalizeZipCode(zipCode)

    if (normalizedZipCode.length !== 8) {
      throw new ApiError('Invalid ZIP code.', 400)
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${normalizedZipCode}/json/`,
    )

    if (!response.ok) {
      throw new ApiError('Unable to look up ZIP code.', response.status)
    }

    const data = (await response.json()) as ViaCepResponse

    if (data.erro) {
      throw new ApiError('ZIP code not found.', 404)
    }

    return data
  },
}
