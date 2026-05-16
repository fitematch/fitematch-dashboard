export type CompanyStatus = 'pending' | 'approved' | 'rejected' | 'inactive'

export type CompanyMedia = {
  logoUrl?: string | null
  coverUrl?: string | null
}

export type Company = {
  id: string
  name: string
  legalName?: string | null
  document?: string | null
  email?: string | null
  phone?: string | null
  phoneCountry?: string | null
  phoneNumber?: string | null
  description?: string | null
  website?: string | null
  zipCode?: string | null
  street?: string | null
  number?: string | null
  complement?: string | null
  neighborhood?: string | null
  city?: string | null
  state?: string | null
  media?: CompanyMedia | null
  status?: CompanyStatus | null
  ownerId?: string | null
  createdAt?: string
  updatedAt?: string
}
