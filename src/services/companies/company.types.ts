import type { Company } from '@/types/entities/company.entity'

export type ListCompaniesResponse = Company[]

export type ReadCompanyResponse = Company

export type CreateCompanyRequest = Partial<{
  name: string
  legalName: string | null
  document: string | null
  documents: {
    cnpj?: string | null
  } | null
  contacts: {
    email?: string | null
    website?: string | null
    phone?: {
      country?: string | null
      number?: string | null
    } | null
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
  media: {
    logoUrl?: string | null
  } | null
  status: Company['status']
}>

export type CreateCompanyResponse = Company

export type UpdateCompanyRequest = Partial<{
  name: string
  legalName: string | null
  document: string | null
  documents: {
    cnpj?: string | null
  } | null
  contacts: {
    email?: string | null
    website?: string | null
    phone?: {
      country?: string | null
      number?: string | null
    } | null
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
  media: {
    logoUrl?: string | null
  } | null
  status: Company['status']
}>

export type UpdateCompanyResponse = Company

export type DeleteCompanyResponse = {
  message: string
}

export type RejectCompanyRequest = {
  reason?: string
}

export type ApproveCompanyResponse = Company

export type RejectCompanyResponse = Company
