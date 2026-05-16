'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { z } from 'zod'
import {
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiCheckSquare,
  FiFileText,
  FiHeart,
  FiImage,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiSave,
  FiShield,
  FiSquare,
  FiTag,
  FiTrash2,
  FiTruck,
  FiX,
} from 'react-icons/fi'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { ROUTES } from '@/constants/routes'
import { companyService } from '@/services/companies/company.service'
import { getApiErrorMessage } from '@/services/http/api-error'
import { jobService } from '@/services/jobs/job.service'
import { uploadService } from '@/services/upload/upload.service'
import type { Company } from '@/types/entities/company.entity'
import type { EducationLevel, Job, JobRequirementLanguage } from '@/types/entities/job.entity'

const educationLevelOptions = [
  'high_school',
  'technical',
  'bachelor',
  'associate',
  'postgraduate',
  'mba',
  'master',
  'doctorate',
  'extension',
  'other',
] as const satisfies readonly EducationLevel[]

const jobFormSchema = z.object({
  slug: z.string().min(1, 'Enter the slug.'),
  title: z.string().min(2, 'Enter the job title.'),
  description: z
    .string()
    .min(1, 'Enter the description.')
    .max(140, 'Description must have at most 140 characters.'),
  companyId: z.string().min(1, 'Select a company.'),
  companyName: z.string().min(1, 'Select a company.'),
  location: z.string().min(1, 'Enter the location.'),
  contractType: z
    .enum([
      'clt',
      'pj',
      'freelance',
      'internship',
      'temporary',
      'part_time',
      'full_time',
      'autonomous',
    ]),
  slots: z.coerce.number().min(1, 'Enter the number of slots.'),
  educationLevel: z.union([z.enum(educationLevelOptions), z.literal('')]),
  languages: z
    .array(
      z.object({
        language: z.string().min(1),
        level: z.string().min(1),
      }),
    )
    .min(1, 'Add at least one language.'),
  minExperienceYears: z.coerce.number().min(0, 'Enter the minimum experience.'),
  maxExperienceYears: z.coerce.number().min(0, 'Enter the maximum experience.'),
  salary: z.coerce.number().min(0.01, 'Enter the salary.'),
  healthInsurance: z.boolean().optional(),
  dentalInsurance: z.boolean().optional(),
  alimentationVoucher: z.boolean().optional(),
  transportationVoucher: z.boolean().optional(),
  coverUrl: z.string().min(1, 'Upload the job cover image.'),
  status: z.enum([
    'draft',
    'pending',
    'approved',
    'rejected',
    'published',
    'closed',
  ]),
})

type JobFormData = z.input<typeof jobFormSchema>

type JobFormProps = {
  job?: Job
}

function buildJobSlug(title: string, companyName: string, location: string) {
  return [companyName, location, title]
    .filter(Boolean)
    .join('-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function splitSlugParts(slug: string, title: string, companyName: string, location: string) {
  const baseSlug = buildJobSlug('', companyName, location)
  const titleSlug = buildJobSlug(title, '', '')

  if (!slug) {
    return {
      base: baseSlug,
      accent: titleSlug,
    }
  }

  if (baseSlug && slug.startsWith(`${baseSlug}-`)) {
    return {
      base: `${baseSlug}-`,
      accent: slug.slice(baseSlug.length + 1),
    }
  }

  if (baseSlug && slug === baseSlug) {
    return {
      base: baseSlug,
      accent: '',
    }
  }

  return {
    base: '',
    accent: slug,
  }
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

function formatCurrencyInput(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatCurrencyDigits(value?: number) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return ''
  }

  return formatCurrencyInput(value).replace(/^R\$\s?/, '')
}

function parseCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return undefined
  }

  return Number(digits) / 100
}

const defaultLanguage: JobRequirementLanguage = {
  language: 'Portuguese',
  level: 'native',
}

const optionalLanguageOrder = ['English', 'Spanish']

const languageLevelOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' },
]

function normalizeLanguages(languages?: JobRequirementLanguage[] | null) {
  const languageMap = new Map<string, JobRequirementLanguage>()

  languageMap.set(defaultLanguage.language, defaultLanguage)

  languages?.forEach((item) => {
    if (!item?.language || !item?.level) {
      return
    }

    languageMap.set(item.language, item)
  })

  return [
    languageMap.get(defaultLanguage.language) ?? defaultLanguage,
    ...optionalLanguageOrder
      .map((language) => languageMap.get(language))
      .filter((item): item is JobRequirementLanguage => Boolean(item)),
  ]
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

function BenefitCard({
  label,
  description,
  icon,
  checked,
  onChange,
}: {
  label: string
  description: string
  icon: ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-4 text-slate-300 transition hover:border-green-500/20 hover:bg-slate-900/70">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
          checked
            ? 'border-green-500/20 bg-green-500/10 text-green-300'
            : 'border-slate-700 bg-slate-950 text-slate-400'
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-100">{label}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <div className={checked ? 'text-green-400' : 'text-slate-500'}>
        {checked ? (
          <FiCheckSquare className="h-5 w-5" />
        ) : (
          <FiSquare className="h-5 w-5" />
        )}
      </div>
    </label>
  )
}

function StepperNumberInput({
  label,
  value,
  onChange,
}: {
  label: string
  value?: number
  onChange: (value: number) => void
}) {
  const safeValue = value ?? 0

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-950 transition hover:bg-white"
          onClick={() => onChange(Math.max(0, safeValue - 1))}
        >
          <FiMinus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={safeValue}
          onChange={(event) => onChange(Number(event.target.value) || 0)}
          className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-center text-sm text-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
        />
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-950 transition hover:bg-white"
          onClick={() => onChange(safeValue + 1)}
        >
          <FiPlus className="h-4 w-4" />
        </button>
      </div>
    </label>
  )
}

export function JobForm({ job }: JobFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [companyOptions, setCompanyOptions] = useState<Company[]>([])
  const [isCompanyMenuOpen, setIsCompanyMenuOpen] = useState(false)
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
  const [languageDraft, setLanguageDraft] = useState(optionalLanguageOrder[0])
  const [languageLevelDraft, setLanguageLevelDraft] = useState(
    languageLevelOptions[0]?.value ?? 'basic',
  )
  const companyDropdownRef = useRef<HTMLDivElement | null>(null)
  const salaryInputRef = useRef<HTMLInputElement | null>(null)
  const isEditing = Boolean(job)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      slug: job?.slug ?? '',
      title: job?.title ?? '',
      description: job?.description ?? '',
      companyId: job?.companyId ?? '',
      companyName: job?.companyName ?? '',
      location: job?.location ?? '',
      contractType: job?.contractType ?? 'clt',
      slots: job?.slots ?? 1,
      educationLevel: job?.requirements?.educationLevel ?? '',
      languages: normalizeLanguages(job?.requirements?.languages),
      minExperienceYears: job?.requirements?.minExperienceYears ?? 0,
      maxExperienceYears: job?.requirements?.maxExperienceYears ?? 0,
      salary: job?.benefits?.salary ?? job?.salary?.amount ?? 0,
      healthInsurance: job?.benefits?.healthInsurance ?? false,
      dentalInsurance: job?.benefits?.dentalInsurance ?? false,
      alimentationVoucher: job?.benefits?.alimentationVoucher ?? false,
      transportationVoucher: job?.benefits?.transportationVoucher ?? false,
      coverUrl: job?.media?.coverUrl ?? '',
      status: job?.status ?? 'pending',
    },
  })

  useEffect(() => {
    async function loadCompanies() {
      try {
        const companies = await companyService.list()

        setCompanyOptions(
          companies.filter((company) => company.status === 'approved'),
        )
      } catch {
        setCompanyOptions([])
      }
    }

    void loadCompanies()
  }, [])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!companyDropdownRef.current?.contains(event.target as Node)) {
        setIsCompanyMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  useEffect(() => {
    if (!job) {
      return
    }

    reset({
      slug: job.slug ?? '',
      title: job.title ?? '',
      description: job.description ?? '',
      companyId: job.companyId ?? '',
      companyName: job.companyName ?? '',
      location: job.location ?? '',
      contractType: job.contractType ?? 'clt',
      slots: job.slots ?? 1,
      educationLevel: job.requirements?.educationLevel ?? '',
      languages: normalizeLanguages(job.requirements?.languages),
      minExperienceYears: job.requirements?.minExperienceYears ?? 0,
      maxExperienceYears: job.requirements?.maxExperienceYears ?? 0,
      salary: job.benefits?.salary ?? job.salary?.amount ?? 0,
      healthInsurance: job.benefits?.healthInsurance ?? false,
      dentalInsurance: job.benefits?.dentalInsurance ?? false,
      alimentationVoucher: job.benefits?.alimentationVoucher ?? false,
      transportationVoucher: job.benefits?.transportationVoucher ?? false,
      coverUrl: job.media?.coverUrl ?? '',
      status: job.status ?? 'pending',
    })
  }, [job, reset])

  const titleValue = useWatch<JobFormData, 'title'>({ control, name: 'title' })
  const companyIdValue = useWatch<JobFormData, 'companyId'>({ control, name: 'companyId' })
  const companyNameValue = useWatch<JobFormData, 'companyName'>({
    control,
    name: 'companyName',
  })
  const locationValue = useWatch<JobFormData, 'location'>({ control, name: 'location' })
  const statusValue = useWatch<JobFormData, 'status'>({ control, name: 'status' })
  const slotsValue = useWatch<JobFormData, 'slots'>({
    control,
    name: 'slots',
  }) as number | undefined
  const minExperienceYearsValue = useWatch<JobFormData, 'minExperienceYears'>({
    control,
    name: 'minExperienceYears',
  }) as number | undefined
  const maxExperienceYearsValue = useWatch<JobFormData, 'maxExperienceYears'>({
    control,
    name: 'maxExperienceYears',
  }) as number | undefined
  const languagesValue = useWatch<JobFormData, 'languages'>({ control, name: 'languages' })
  const slugValue = useWatch<JobFormData, 'slug'>({ control, name: 'slug' })
  const descriptionValue = useWatch<JobFormData, 'description'>({
    control,
    name: 'description',
  })
  const salaryValue = useWatch<JobFormData, 'salary'>({
    control,
    name: 'salary',
  }) as number | undefined
  const healthInsuranceValue = useWatch<JobFormData, 'healthInsurance'>({
    control,
    name: 'healthInsurance',
  })
  const dentalInsuranceValue = useWatch<JobFormData, 'dentalInsurance'>({
    control,
    name: 'dentalInsurance',
  })
  const alimentationVoucherValue = useWatch<JobFormData, 'alimentationVoucher'>({
    control,
    name: 'alimentationVoucher',
  })
  const transportationVoucherValue = useWatch<JobFormData, 'transportationVoucher'>({
    control,
    name: 'transportationVoucher',
  })
  const coverUrlValue = useWatch<JobFormData, 'coverUrl'>({ control, name: 'coverUrl' })
  const filteredCompanyOptions = useMemo(() => {
    const query = (companyNameValue ?? '').trim().toLowerCase()

    if (!query) {
      return companyOptions
    }

    return companyOptions.filter((company) =>
      company.name.toLowerCase().includes(query),
    )
  }, [companyNameValue, companyOptions])

  const selectClassName =
    'h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30'
  const normalizedLanguages = normalizeLanguages(languagesValue)
  const availableLanguageOptions = optionalLanguageOrder.filter(
    (language) =>
      !normalizedLanguages.some((item) => item.language === language),
  )
  const languageCards = [
    defaultLanguage,
    ...optionalLanguageOrder.map((language) => {
      const activeLanguage = normalizedLanguages.find(
        (item) => item.language === language,
      )

      return activeLanguage ?? { language, level: '' }
    }),
  ]
  const slugParts = splitSlugParts(
    slugValue ?? '',
    titleValue ?? '',
    companyNameValue ?? '',
    locationValue ?? '',
  )

  useEffect(() => {
    setValue(
      'slug',
      buildJobSlug(titleValue ?? '', companyNameValue ?? '', locationValue ?? ''),
    )
  }, [companyNameValue, locationValue, setValue, titleValue])

  async function onSubmit(data: JobFormData) {
    try {
      setError(null)

      const payload = {
        slug: data.slug || null,
        title: data.title,
        description: data.description || null,
        companyId: data.companyId || null,
        companyName: data.companyName || null,
        location: data.location || null,
        contractType: data.contractType || null,
        slots:
          data.slots === '' || data.slots === undefined
            ? null
            : Number(data.slots),
        requirements: {
          educationLevel: data.educationLevel || null,
          languages: normalizeLanguages(data.languages),
          minExperienceYears:
            data.minExperienceYears === '' || data.minExperienceYears === undefined
              ? null
              : Number(data.minExperienceYears),
          maxExperienceYears:
            data.maxExperienceYears === '' || data.maxExperienceYears === undefined
              ? null
              : Number(data.maxExperienceYears),
        },
        benefits: {
          salary:
            data.salary === '' || data.salary === undefined
              ? null
              : Number(data.salary),
          healthInsurance: Boolean(data.healthInsurance),
          dentalInsurance: Boolean(data.dentalInsurance),
          alimentationVoucher: Boolean(data.alimentationVoucher),
          transportationVoucher: Boolean(data.transportationVoucher),
        },
        media: {
          coverUrl: data.coverUrl || null,
        },
        status: data.status,
      }

      if (job) {
        await jobService.update(job.id, payload)
      } else {
        await jobService.create(payload)
      }

      router.push(ROUTES.dashboard.jobs)
      router.refresh()
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  function handleAddLanguage() {
    const currentLanguages = normalizeLanguages(languagesValue)
    const nextLanguage: JobRequirementLanguage = {
      language: languageDraft,
      level: languageLevelDraft,
    }

    setValue('languages', normalizeLanguages([...currentLanguages, nextLanguage]), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    setIsLanguageModalOpen(false)
    setLanguageDraft(availableLanguageOptions[0] ?? optionalLanguageOrder[0])
    setLanguageLevelDraft(languageLevelOptions[0]?.value ?? 'basic')
  }

  function handleRemoveLanguage(index: number) {
    const currentLanguages = normalizeLanguages(languagesValue)

    if (currentLanguages[index]?.language === defaultLanguage.language) {
      return
    }

    setValue(
      'languages',
      normalizeLanguages(
        currentLanguages.filter((_, currentIndex) => currentIndex !== index),
      ),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error ? <Alert variant="danger">{error}</Alert> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Job"
          value={titleValue?.trim() || 'Untitled job'}
          helper="Primary title used in listings"
          icon={<FiBriefcase className="h-4 w-4" />}
        />
        <SummaryCard
          label="Status"
          value={(statusValue ?? 'pending').toUpperCase()}
          helper="Current workflow state"
          icon={<FiCheckCircle className="h-4 w-4" />}
        />
        <SummaryCard
          label="Slots"
          value={String(slotsValue ?? 0)}
          helper="Number of openings"
          icon={<FiTag className="h-4 w-4" />}
        />
        <SummaryCard
          label="Salary"
          value={salaryValue ? `R$ ${salaryValue}` : 'Not informed'}
          helper="Compensation reference"
          icon={<FiFileText className="h-4 w-4" />}
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
                {isEditing ? 'Job details' : 'Job setup'}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Organize publication, requirements and benefits in a single flow.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <SectionCard
            title="Administration"
            description="Manage status and publication metadata."
            icon={<FiCheckCircle className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">Status</span>
                  <select
                    className={selectClassName}
                    {...register('status')}
                  >
                    <option value="draft">DRAFT</option>
                    <option value="pending">PENDING</option>
                    <option value="approved">APPROVED</option>
                    <option value="rejected">REJECTED</option>
                    <option value="published">PUBLISHED</option>
                    <option value="closed">CLOSED</option>
                  </select>
                </label>
                <div />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Media"
            description="Upload a cover image for the opportunity."
            icon={<FiImage className="h-4 w-4" />}
          >
            <div className="grid gap-4">
              <FileUpload
                label="Job cover"
                accept="image/*"
                value={coverUrlValue ?? ''}
                cropAspectRatio={20 / 7}
                onUpload={async (file) => {
                  const response = await uploadService.uploadJobCover(file)
                  setValue('coverUrl', response.url, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                  return response.url
                }}
              />
              <input type="hidden" {...register('coverUrl')} />
              {errors.coverUrl?.message ? (
                <p className="text-sm text-red-400">{errors.coverUrl.message}</p>
              ) : null}
            </div>
          </SectionCard>

          <SectionCard
            title="Identity"
            description="Define job naming, company reference and location."
            icon={<FiBriefcase className="h-4 w-4" />}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-200">
                    Company
                  </span>

                  <div className="relative" ref={companyDropdownRef}>
                    <div className="relative">
                      <input
                        value={companyNameValue ?? ''}
                        placeholder="Search or select an active company"
                        className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 pr-10 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                        onFocus={() => setIsCompanyMenuOpen(true)}
                        onChange={(event) => {
                          const nextCompanyName = event.target.value
                          const selectedCompany = companyOptions.find(
                            (company) => company.name === nextCompanyName,
                          )

                          setValue('companyName', nextCompanyName, {
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                          setValue('companyId', selectedCompany?.id ?? '', {
                            shouldDirty: true,
                            shouldTouch: true,
                          })
                          setIsCompanyMenuOpen(true)
                        }}
                      />

                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400"
                        onClick={() =>
                          setIsCompanyMenuOpen((current) => !current)
                        }
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    {errors.companyName?.message ? (
                      <span className="mt-2 block text-sm text-red-400">
                        {errors.companyName.message}
                      </span>
                    ) : null}

                    {isCompanyMenuOpen ? (
                      <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-1 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
                        {filteredCompanyOptions.length > 0 ? (
                          filteredCompanyOptions.map((company) => (
                            <button
                              key={company.id}
                              type="button"
                              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-slate-900 hover:text-slate-100"
                              onClick={() => {
                                setValue('companyId', company.id, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                })
                                setValue('companyName', company.name, {
                                  shouldDirty: true,
                                  shouldTouch: true,
                                })
                                setValue(
                                  'location',
                                  company.city && company.state
                                    ? `${company.city}/${company.state}`
                                    : company.city ?? company.state ?? '',
                                  {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  },
                                )
                                setIsCompanyMenuOpen(false)
                              }}
                            >
                              <span>{company.name}</span>
                              <span className="text-xs text-slate-500">
                                {company.document ?? ''}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2.5 text-sm text-slate-500">
                            No active company found
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </label>

                <input type="hidden" {...register('companyId')} value={companyIdValue ?? ''} />
                <input type="hidden" {...register('companyName')} value={companyNameValue ?? ''} />
              </div>

              <Input
                label="Title"
                error={errors.title?.message}
                {...register('title')}
              />

              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">Slug</span>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden rounded-xl px-3 text-sm">
                    <span className="whitespace-pre text-white">
                      {slugParts.base}
                    </span>
                    <span className="whitespace-pre text-green-400">
                      {slugParts.accent}
                    </span>
                  </div>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-transparent caret-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    {...register('slug')}
                  />
                </div>
                <span className="text-sm text-slate-400">
                  Generated from company, location and title.
                </span>
                {errors.slug?.message ? (
                  <span className="text-sm text-red-400">{errors.slug.message}</span>
                ) : null}
              </label>
            </div>

            <div>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-200">
                  Description
                </span>
                <textarea
                  aria-label="Description"
                  className="min-h-[96px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  maxLength={140}
                  {...register('description')}
                />
                <div className="text-right text-xs text-slate-400">
                  {(descriptionValue ?? '').length}/140
                </div>
                {errors.description?.message ? (
                  <div className="text-sm text-red-400">{errors.description.message}</div>
                ) : null}
              </label>
            </div>
          </SectionCard>

          <SectionCard
            title="Requirements"
            description="Set contract, experience and education expectations."
            icon={<FiTag className="h-4 w-4" />}
          >
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-200">Contract type</span>
                    <select
                      className={selectClassName}
                      {...register('contractType')}
                    >
                      <option value="clt">CLT</option>
                      <option value="pj">PJ</option>
                      <option value="freelance">FREELANCE</option>
                      <option value="internship">INTERNSHIP</option>
                      <option value="temporary">TEMPORARY</option>
                      <option value="part_time">PART TIME</option>
                      <option value="full_time">FULL TIME</option>
                      <option value="autonomous">AUTONOMOUS</option>
                    </select>
                  </label>
                  <StepperNumberInput
                    label="Slots"
                    value={slotsValue}
                    onChange={(value) =>
                      setValue('slots', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <StepperNumberInput
                    label="Min experience years"
                    value={minExperienceYearsValue}
                    onChange={(value) =>
                      setValue('minExperienceYears', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                  <StepperNumberInput
                    label="Max experience years"
                    value={maxExperienceYearsValue}
                    onChange={(value) =>
                      setValue('maxExperienceYears', value, {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block space-y-2">
                    <span className="text-sm font-medium text-slate-200">Education level</span>
                    <select
                      className={selectClassName}
                      {...register('educationLevel')}
                    >
                      <option value="">NOT INFORMED</option>
                      <option value="high_school">HIGH SCHOOL</option>
                      <option value="technical">TECHNICAL</option>
                      <option value="bachelor">BACHELOR</option>
                      <option value="associate">ASSOCIATE</option>
                      <option value="postgraduate">POSTGRADUATE</option>
                      <option value="mba">MBA</option>
                      <option value="master">MASTER</option>
                      <option value="doctorate">DOCTORATE</option>
                      <option value="extension">EXTENSION</option>
                      <option value="other">OTHER</option>
                    </select>
                  </label>
                  <div className="space-y-2">
                    <span className="block text-sm font-medium leading-5 text-transparent">
                      Languages
                    </span>
                    <button
                      type="button"
                      className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-100 px-4 text-sm font-medium text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-300"
                      disabled={availableLanguageOptions.length === 0}
                      onClick={() => setIsLanguageModalOpen(true)}
                    >
                      <FiPlus className="h-4 w-4" />
                      Add language
                    </button>
                  </div>
                </div>
                <div className="grid gap-2 md:grid-cols-3">
                  {languageCards.map((item, index) => {
                    const isActive = Boolean(item.level)
                    const isDefault = item.language === defaultLanguage.language

                    return (
                    <div
                      key={`${item.language}-${item.level}-${index}`}
                      className={`flex min-h-[76px] items-center justify-between rounded-2xl border px-4 py-3 transition ${
                        isActive
                          ? 'border-green-500/20 bg-green-500/10'
                          : 'border-slate-800 bg-slate-950/40 opacity-55'
                      }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            isActive ? 'text-slate-100' : 'text-slate-500'
                          }`}
                        >
                          {item.language}
                        </p>
                        <p
                          className={`text-xs uppercase tracking-[0.18em] ${
                            isActive ? 'text-slate-400' : 'text-slate-600'
                          }`}
                        >
                          {isActive ? item.level : 'disabled'}
                        </p>
                      </div>
                      {!isDefault && isActive ? (
                        <button
                          type="button"
                          aria-label={`Delete ${item.language}`}
                          className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-900 hover:text-red-400"
                          onClick={() => handleRemoveLanguage(index)}
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="h-8 w-8" />
                      )}
                    </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Benefits"
            description="Capture compensation and benefit flags."
            icon={<FiMapPin className="h-4 w-4" />}
          >
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <input type="hidden" {...register('salary')} />
                    <label className="block space-y-2">
                      <span className="text-sm font-medium text-slate-200">Salary</span>
                      <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/30">
                        <button
                          type="button"
                          className="px-3 text-sm text-slate-400"
                          onClick={() => salaryInputRef.current?.focus()}
                        >
                          R$
                        </button>
                        <input
                          ref={salaryInputRef}
                          aria-label="Salary"
                          type="text"
                          inputMode="numeric"
                          className="h-10 w-full bg-transparent pr-3 text-sm text-slate-100 outline-none"
                          value={formatCurrencyDigits(salaryValue)}
                          onChange={(event) => {
                            setValue('salary', parseCurrencyInput(`R$ ${event.target.value}`), {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            })
                          }}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="hidden md:block" />
                </div>
                <div className="hidden md:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <BenefitCard
                  label="Health insurance"
                  description="Medical coverage offered as part of the package."
                  icon={<FiHeart className="h-5 w-5" />}
                  checked={Boolean(healthInsuranceValue)}
                  onChange={(checked) =>
                    setValue('healthInsurance', checked, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />
                <BenefitCard
                  label="Dental insurance"
                  description="Dental assistance available for the hire."
                  icon={<FiShield className="h-5 w-5" />}
                  checked={Boolean(dentalInsuranceValue)}
                  onChange={(checked) =>
                    setValue('dentalInsurance', checked, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />
                <BenefitCard
                  label="Alimentation voucher"
                  description="Daily food support included in the benefits."
                  icon={<FiFileText className="h-5 w-5" />}
                  checked={Boolean(alimentationVoucherValue)}
                  onChange={(checked) =>
                    setValue('alimentationVoucher', checked, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />
                <BenefitCard
                  label="Transportation voucher"
                  description="Commute assistance for the work routine."
                  icon={<FiTruck className="h-5 w-5" />}
                  checked={Boolean(transportationVoucherValue)}
                  onChange={(checked) =>
                    setValue('transportationVoucher', checked, {
                      shouldDirty: true,
                      shouldTouch: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </div>
          </SectionCard>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          asChild
          href={ROUTES.dashboard.jobs}
          type="button"
          variant="secondary"
        >
          <FiChevronLeft className="h-4 w-4" />
          Cancel
        </Button>

        <Button isLoading={isSubmitting} type="submit">
          <FiSave className="h-4 w-4" />
          {isEditing ? 'Save changes' : 'Create job'}
        </Button>
      </div>

      <Modal
        isOpen={isLanguageModalOpen}
        title="Add language"
        description="Choose the language and required proficiency level."
        onClose={() => setIsLanguageModalOpen(false)}
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Language</span>
              <select
                className={selectClassName}
                value={languageDraft}
                onChange={(event) => setLanguageDraft(event.target.value)}
              >
                {availableLanguageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Level</span>
              <select
                className={selectClassName}
                value={languageLevelDraft}
                onChange={(event) => setLanguageLevelDraft(event.target.value)}
              >
                {languageLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsLanguageModalOpen(false)}
            >
              <FiX className="h-4 w-4" />
              Cancel
            </Button>
            <Button type="button" onClick={handleAddLanguage}>
              <FiSave className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </form>
  )
}
