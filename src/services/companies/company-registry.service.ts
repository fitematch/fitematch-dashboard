import { ApiError } from '@/services/http/api-error'

import type { CompanyByCnpjResponse } from './company-registry.types'

function normalizeCnpj(cnpj: string) {
  return cnpj.replace(/\D/g, '')
}

export const companyRegistryService = {
  normalizeCnpj,

  async findByCnpj(cnpj: string): Promise<CompanyByCnpjResponse> {
    const normalizedCnpj = normalizeCnpj(cnpj)

    if (normalizedCnpj.length !== 14) {
      throw new ApiError('Invalid CNPJ.', 400)
    }

    const response = await fetch(
      `https://brasilapi.com.br/api/cnpj/v1/${normalizedCnpj}`,
    )

    if (!response.ok) {
      throw new ApiError('Unable to look up CNPJ.', response.status)
    }

    return (await response.json()) as CompanyByCnpjResponse
  },
}
