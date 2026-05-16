import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

import type {
  ApproveCompanyResponse,
  CreateCompanyRequest,
  DeleteCompanyResponse,
  ListCompaniesResponse,
  ReadCompanyResponse,
  RejectCompanyRequest,
  RejectCompanyResponse,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
} from './company.types'

type CompanyApiResponse = {
  id?: string
  _id?: string
  companyId?: string
  name?: string | null
  tradeName?: string | null
  legalName?: string | null
  document?: string | null
  website?: string | null
  phone?: string | null
  description?: string | null
  status?: 'pending' | 'approved' | 'rejected' | 'inactive' | null
  ownerId?: string | null
  media?: {
    logoUrl?: string | null
    coverUrl?: string | null
  } | null
  documents?: {
    cnpj?: string | null
  } | null
  contacts?: {
    email?: string | null
    website?: string | null
    phone?:
      | string
      | {
          country?: string | null
          number?: string | null
        }
      | null
    address?: {
      zipCode?: string | null
      street?: string | null
      number?: string | null
      complement?: string | null
      neighborhood?: string | null
      city?: string | null
      state?: string | null
    } | null
  } | null
  createdAt?: string
  updatedAt?: string
}

function normalizeCompanyStatus(status: string | null | undefined) {
  if (!status) {
    return null
  }

  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus === 'approved' || normalizedStatus === 'active') {
    return 'approved'
  }

  if (normalizedStatus === 'rejected' || normalizedStatus === 'inactive') {
    return normalizedStatus === 'rejected' ? 'rejected' : 'inactive'
  }

  if (normalizedStatus === 'pending') {
    return 'pending'
  }

  return null
}

function normalizePhone(
  phone:
    | string
    | {
        country?: string | null
        number?: string | null
      }
    | null
    | undefined,
) {
  if (!phone) {
    return null
  }

  if (typeof phone === 'string') {
    return phone
  }

  const country = phone.country ?? ''
  const number = phone.number ?? ''
  const combined = `${country} ${number}`.trim()

  return combined || null
}

function splitPhone(
  phone:
    | string
    | {
        country?: string | null
        number?: string | null
      }
    | null
    | undefined,
) {
  if (!phone) {
    return {
      phoneCountry: null,
      phoneNumber: null,
    }
  }

  if (typeof phone === 'string') {
    const parts = phone.trim().split(/\s+/)

    if (parts.length <= 1) {
      return {
        phoneCountry: null,
        phoneNumber: phone,
      }
    }

    return {
      phoneCountry: parts[0] ?? null,
      phoneNumber: parts.slice(1).join(' ') || null,
    }
  }

  return {
    phoneCountry: phone.country ?? null,
    phoneNumber: phone.number ?? null,
  }
}

function normalizeCompany(company: CompanyApiResponse) {
  const phoneData = splitPhone(company.phone ?? company.contacts?.phone)

  return {
    ...company,
    id: company.id ?? company._id ?? company.companyId ?? '',
    name: company.name ?? company.tradeName ?? company.legalName ?? '',
    legalName: company.legalName ?? null,
    document: company.document ?? company.documents?.cnpj ?? null,
    phone: company.phone ?? normalizePhone(company.contacts?.phone) ?? null,
    phoneCountry: phoneData.phoneCountry,
    phoneNumber: phoneData.phoneNumber,
    email: company.contacts?.email ?? null,
    website: company.website ?? company.contacts?.website ?? null,
    description: company.description ?? null,
    zipCode: company.contacts?.address?.zipCode ?? null,
    street: company.contacts?.address?.street ?? null,
    number: company.contacts?.address?.number ?? null,
    complement: company.contacts?.address?.complement ?? null,
    neighborhood: company.contacts?.address?.neighborhood ?? null,
    city: company.contacts?.address?.city ?? null,
    state: company.contacts?.address?.state ?? null,
    status: normalizeCompanyStatus(company.status),
    ownerId: company.ownerId ?? null,
    media: company.media ?? null,
  }
}

export const companyService = {
  async list() {
    const companies = await apiClient.get<CompanyApiResponse[]>(
      API_ENDPOINTS.companies.list,
    )

    return companies.map(normalizeCompany) as ListCompaniesResponse
  },

  async read(companyId: string) {
    const company = await apiClient.get<CompanyApiResponse>(
      API_ENDPOINTS.companies.read(companyId),
    )

    return normalizeCompany(company) as ReadCompanyResponse
  },

  async create(payload: CreateCompanyRequest) {
    const company = await apiClient.post<CompanyApiResponse, CreateCompanyRequest>(
      API_ENDPOINTS.companies.list,
      payload,
    )

    return normalizeCompany(company) as ReadCompanyResponse
  },

  async update(companyId: string, payload: UpdateCompanyRequest) {
    const company = await apiClient.patch<CompanyApiResponse, UpdateCompanyRequest>(
      API_ENDPOINTS.companies.update(companyId),
      payload,
    )

    return normalizeCompany(company) as UpdateCompanyResponse
  },

  delete(companyId: string) {
    return apiClient.delete<DeleteCompanyResponse>(
      API_ENDPOINTS.companies.delete(companyId),
    )
  },

  async approve(companyId: string) {
    const company = await apiClient.patch<CompanyApiResponse>(
      API_ENDPOINTS.companies.approve(companyId),
    )

    return normalizeCompany(company) as ApproveCompanyResponse
  },

  async reject(companyId: string, payload: RejectCompanyRequest) {
    const company = await apiClient.patch<CompanyApiResponse, RejectCompanyRequest>(
      API_ENDPOINTS.companies.reject(companyId),
      payload,
    )

    return normalizeCompany(company) as RejectCompanyResponse
  },
}
