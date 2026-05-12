export type CompanyStatus = 'pending' | 'approved' | 'rejected' | 'inactive'

export type CompanyMedia = {
  logoUrl?: string | null
  coverUrl?: string | null
}

export type Company = {
  id: string
  name: string
  document?: string | null
  description?: string | null
  website?: string | null
  media?: CompanyMedia | null
  status?: CompanyStatus | null
  ownerId?: string | null
  createdAt?: string
  updatedAt?: string
}
