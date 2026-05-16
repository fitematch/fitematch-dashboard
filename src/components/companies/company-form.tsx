'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { z } from 'zod'
import {
  FiBriefcase,
  FiCheckCircle,
  FiChevronLeft,
  FiFileText,
  FiGlobe,
  FiImage,
  FiMapPin,
  FiSave,
} from 'react-icons/fi'

import { PhoneInput } from '@/components/form/phone-input'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { useAddressByZipCode } from '@/hooks/use-address-by-zipcode'
import { useCompanyByCnpj } from '@/hooks/use-company-by-cnpj'
import { ROUTES } from '@/constants/routes'
import { companyService } from '@/services/companies/company.service'
import { getApiErrorMessage } from '@/services/http/api-error'
import { uploadService } from '@/services/upload/upload.service'
import type { Company } from '@/types/entities/company.entity'

function formatZipCode(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 5) {
    return digits
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

function formatCnpj(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 14)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`
  }

  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  }

  if (digits.length <= 12) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  }

  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function toCapitalizedWords(value: string) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

const companyFormSchema = z.object({
  name: z.string().min(2, 'Enter the company name.'),
  legalName: z.string().optional(),
  document: z.string().optional(),
  email: z.string().optional(),
  phoneCountry: z.string().optional(),
  phoneNumber: z.string().optional(),
  logoUrl: z.string().optional(),
  website: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'inactive']),
})

type CompanyFormData = z.infer<typeof companyFormSchema>

type CompanyFormProps = {
  company?: Company
}

function SummaryCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string
  value: string
  helper: string
  icon: ReactNode
}) {
  return (
    <Card className="bg-slate-950/70">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-300">
            {icon}
          </div>

          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            {label}
          </span>
        </div>

        <p className="mt-6 truncate text-2xl font-semibold tracking-tight text-slate-50">
          {value}
        </p>

        <p className="mt-2 text-sm text-slate-400">{helper}</p>
      </CardContent>
    </Card>
  )
}

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-300">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-100">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      </div>

      {children}
    </div>
  )
}

export function CompanyForm({ company }: CompanyFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const isEditing = Boolean(company)
  const {
    searchCompanyByCnpj,
    clearError: clearCnpjError,
    isLoading: isCnpjLoading,
    error: cnpjError,
  } = useCompanyByCnpj()
  const {
    searchZipCode,
    clearError: clearZipCodeError,
    isLoading: isZipCodeLoading,
    error: zipCodeError,
  } = useAddressByZipCode()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name ?? '',
      legalName: company?.legalName ?? '',
      document: company?.document ?? '',
      email: company?.email ?? '',
      phoneCountry: company?.phoneCountry ?? '+55',
      phoneNumber: company?.phoneNumber ?? '',
      logoUrl: company?.media?.logoUrl ?? '',
      website: company?.website ?? '',
      zipCode: company?.zipCode ?? '',
      street: company?.street ?? '',
      number: company?.number ?? '',
      complement: company?.complement ?? '',
      neighborhood: company?.neighborhood ?? '',
      city: company?.city ?? '',
      state: company?.state ?? '',
      status: company?.status ?? 'pending',
    },
  })

  useEffect(() => {
    if (!company) {
      return
    }

    reset({
      name: company.name ?? '',
      legalName: company.legalName ?? '',
      document: company.document ?? '',
      email: company.email ?? '',
      phoneCountry: company.phoneCountry ?? '+55',
      phoneNumber: company.phoneNumber ?? '',
      logoUrl: company.media?.logoUrl ?? '',
      website: company.website ?? '',
      zipCode: company.zipCode ?? '',
      street: company.street ?? '',
      number: company.number ?? '',
      complement: company.complement ?? '',
      neighborhood: company.neighborhood ?? '',
      city: company.city ?? '',
      state: company.state ?? '',
      status: company.status ?? 'pending',
    })
  }, [company, reset])

  const nameValue = useWatch({ control, name: 'name' })
  const documentValue = useWatch({ control, name: 'document' })
  const websiteValue = useWatch({ control, name: 'website' })
  const statusValue = useWatch({ control, name: 'status' })
  const logoUrlValue = useWatch({ control, name: 'logoUrl' })
  const phoneCountryValue = useWatch({ control, name: 'phoneCountry' })
  const phoneNumberValue = useWatch({ control, name: 'phoneNumber' })
  const selectClassName =
    'h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30'

  async function handleCnpjLookup(cnpj?: string) {
    const result = await searchCompanyByCnpj(cnpj || '')

    if (!result) {
      return
    }

    setValue('legalName', toCapitalizedWords(result.legalName), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setValue(
      'name',
      toCapitalizedWords(result.tradeName || result.legalName),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    )
  }

  async function handleZipCodeLookup(zipCode?: string) {
    const result = await searchZipCode(zipCode || '')

    if (!result) {
      return
    }

    setValue('street', result.street, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setValue('complement', result.complement, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setValue('neighborhood', result.neighborhood, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setValue('city', result.city, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setValue('state', result.state, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  async function onSubmit(data: CompanyFormData) {
    try {
      setError(null)

      const payload = {
        name: data.name,
        legalName: data.legalName || null,
        document: data.document || null,
        documents: {
          cnpj: data.document || null,
        },
        contacts: {
          email: data.email || null,
          website: data.website || null,
          phone: {
            country: data.phoneCountry || null,
            number: data.phoneNumber || null,
          },
          address: {
            zipCode: data.zipCode || null,
            street: data.street || null,
            number: data.number || null,
            complement: data.complement || null,
            neighborhood: data.neighborhood || null,
            city: data.city || null,
            state: data.state || null,
          },
        },
        media: {
          logoUrl: data.logoUrl || null,
        },
        status: data.status,
      }

      if (company) {
        await companyService.update(company.id, payload)
      } else {
        await companyService.create(payload)
      }

      router.push(ROUTES.dashboard.companies)
      router.refresh()
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error ? <Alert variant="danger">{error}</Alert> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Company"
          value={nameValue?.trim() || 'Unnamed company'}
          helper="Public company identity in the dashboard"
          icon={<FiBriefcase className="h-4 w-4" />}
        />

        <SummaryCard
          label="Document"
          value={documentValue?.trim() || 'CNPJ not informed'}
          helper="Fiscal document used for verification"
          icon={<FiFileText className="h-4 w-4" />}
        />

        <SummaryCard
          label="Website"
          value={websiteValue?.trim() || 'No website linked'}
          helper="Primary online presence for the company"
          icon={<FiGlobe className="h-4 w-4" />}
        />

        <SummaryCard
          label="Status"
          value={(statusValue || 'pending').toUpperCase()}
          helper="Current moderation and publication state"
          icon={<FiCheckCircle className="h-4 w-4" />}
        />
      </section>

      <Card>
        <CardHeader className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 text-slate-100">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-300">
              <FiBriefcase className="h-4 w-4" />
            </span>

            <div>
              <h2 className="text-xl font-semibold text-slate-50">
                {isEditing ? 'Company details' : 'Company setup'}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Organize identity, verification data and presentation details in
                a single flow.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <SectionCard
            title="Administration"
            description="Keep moderation state available for the team."
            icon={<FiCheckCircle className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">
                    Status
                  </span>

                  <select
                    className={selectClassName}
                    {...register('status')}
                  >
                    <option value="pending">PENDING</option>
                    <option value="approved">APPROVED</option>
                    <option value="rejected">REJECTED</option>
                    <option value="inactive">INACTIVE</option>
                  </select>
                </label>
                <div />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Media"
            description="Upload the company logo using the same API flow used in the public app."
            icon={<FiImage className="h-4 w-4" />}
          >
            <div className="grid gap-4">
              <FileUpload
                label="Company logo"
                accept="image/*"
                value={logoUrlValue ?? ''}
                onUpload={async (file) => {
                  const response = await uploadService.uploadCompanyLogo(file)

                  setValue('logoUrl', response.url, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })

                  return response.url
                }}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Identity"
            description="Define the company identity used across listings and moderation."
            icon={<FiBriefcase className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Input
                    label="Document"
                    helperText="Use the company CNPJ or official document."
                    {...register('document', {
                      onChange: (event) => {
                        clearCnpjError()

                        setValue('document', formatCnpj(event.target.value), {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        })
                      },
                      onBlur: (event) => {
                        void handleCnpjLookup(event.target.value)
                      },
                    })}
                  />

                  {isCnpjLoading ? (
                    <p className="mt-2 text-sm text-slate-400">
                      Looking up CNPJ...
                    </p>
                  ) : null}

                  {cnpjError ? (
                    <p className="mt-2 text-sm text-red-400">{cnpjError}</p>
                  ) : null}
                </div>
                <div />
              </div>

              <div />

              <div>
                <Input
                  label="Name"
                  error={errors.name?.message}
                  helperText="Primary name shown in the admin dashboard."
                  {...register('name')}
                />
              </div>

              <div>
                <Input
                  label="Legal name"
                  helperText="Official registered company name."
                  {...register('legalName')}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Presence"
            description="Keep the public company contact points aligned."
            icon={<FiGlobe className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <PhoneInput
                  label="Phone"
                  countryValue={phoneCountryValue ?? '+55'}
                  numberValue={phoneNumberValue ?? ''}
                  onCountryChange={(value) => {
                    setValue('phoneCountry', value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }}
                  onNumberChange={(value) => {
                    setValue('phoneNumber', value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }}
                />
              </div>

              <div />

              <div>
                <Input
                  label="Email"
                  type="email"
                  helperText="Primary contact email for the company."
                  {...register('email')}
                />
              </div>

              <div>
                <Input
                  label="Website"
                  helperText="Public website or landing page."
                  {...register('website')}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Address"
            description="Organize the main operating address for the company."
            icon={<FiMapPin className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Input
                    label="Zip code"
                    helperText="Postal code for the main address."
                    {...register('zipCode', {
                      onChange: (event) => {
                        clearZipCodeError()

                        setValue('zipCode', formatZipCode(event.target.value), {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        })
                      },
                      onBlur: (event) => {
                        void handleZipCodeLookup(event.target.value)
                      },
                    })}
                  />

                  {isZipCodeLoading ? (
                    <p className="mt-2 text-sm text-slate-400">
                      Looking up ZIP code...
                    </p>
                  ) : null}

                  {zipCodeError ? (
                    <p className="mt-2 text-sm text-red-400">{zipCodeError}</p>
                  ) : null}
                </div>
                <div />
              </div>

              <div />

              <div>
                <Input
                  label="Street"
                  helperText="Street or avenue name."
                  {...register('street')}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Number"
                  helperText="Building number."
                  {...register('number')}
                />

                <Input
                  label="Complement"
                  helperText="Suite, floor or extra details."
                  {...register('complement')}
                />
              </div>

              <div>
                <Input
                  label="Neighborhood"
                  helperText="District or neighborhood."
                  {...register('neighborhood')}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="City"
                  helperText="Main city."
                  {...register('city')}
                />

                <Input
                  label="State"
                  helperText="State code."
                  {...register('state')}
                />
              </div>
            </div>
          </SectionCard>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          asChild
          href={ROUTES.dashboard.companies}
          type="button"
          variant="secondary"
        >
          <FiChevronLeft className="h-4 w-4" />
          Cancel
        </Button>

        <Button isLoading={isSubmitting} type="submit">
          <FiSave className="h-4 w-4" />
          {isEditing ? 'Save changes' : 'Create company'}
        </Button>
      </div>
    </form>
  )
}
