'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/constants/routes'
import { applicationService } from '@/services/applications/application.service'
import { getApiErrorMessage } from '@/services/http/api-error'
import type { Application } from '@/types/entities/application.entity'

const applicationFormSchema = z.object({
  userId: z.string().optional(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
  jobId: z.string().optional(),
  jobTitle: z.string().optional(),
  companyId: z.string().optional(),
  companyName: z.string().optional(),
  status: z.enum(['pending', 'reviewing', 'approved', 'rejected', 'cancelled']),
})

type ApplicationFormData = z.infer<typeof applicationFormSchema>

type ApplicationFormProps = {
  application?: Application
}

export function ApplicationForm({ application }: ApplicationFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const isEditing = Boolean(application)
  const selectClassName =
    'h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30'

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      userId: application?.userId ?? '',
      userName: application?.userName ?? '',
      userEmail: application?.userEmail ?? '',
      jobId: application?.jobId ?? '',
      jobTitle: application?.jobTitle ?? '',
      companyId: application?.companyId ?? '',
      companyName: application?.companyName ?? '',
      status: application?.status ?? 'pending',
    },
  })

  async function onSubmit(data: ApplicationFormData) {
    try {
      setError(null)

      if (application) {
        await applicationService.update(application.id, {
          status: data.status,
        })
      } else {
        await applicationService.create({
          userId: data.userId || null,
          userName: data.userName || null,
          userEmail: data.userEmail || null,
          jobId: data.jobId || null,
          jobTitle: data.jobTitle || null,
          companyId: data.companyId || null,
          companyName: data.companyName || null,
          status: data.status,
        })
      }

      router.push(ROUTES.dashboard.applications)
      router.refresh()
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-100">
            {isEditing
              ? 'Application information'
              : 'New application information'}
          </h2>
        </CardHeader>

        <CardContent>
          {application ? (
            <dl className="mb-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Candidate</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {application.userName ?? '-'}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500">Candidate email</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {application.userEmail ?? '-'}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500">Job</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {application.jobTitle ?? '-'}
                </dd>
              </div>

              <div>
                <dt className="text-slate-500">Company</dt>
                <dd className="mt-1 font-medium text-slate-100">
                  {application.companyName ?? '-'}
                </dd>
              </div>
            </dl>
          ) : (
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <Input label="Candidate ID" {...register('userId')} />
              <Input label="Candidate name" {...register('userName')} />
              <Input
                label="Candidate email"
                type="email"
                {...register('userEmail')}
              />
              <Input label="Job ID" {...register('jobId')} />
              <Input label="Job title" {...register('jobTitle')} />
              <Input label="Company ID" {...register('companyId')} />
              <Input label="Company name" {...register('companyName')} />
            </div>
          )}

          <label className="block max-w-md space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Status
            </span>

            <select
              className={selectClassName}
              {...register('status')}
            >
              <option value="pending">PENDING</option>
              <option value="reviewing">REVIEWING</option>
              <option value="approved">APPROVED</option>
              <option value="rejected">REJECTED</option>
              <option value="cancelled">CANCELLED</option>
            </select>
          </label>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          asChild
          href={ROUTES.dashboard.applications}
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>

        <Button isLoading={isSubmitting} type="submit">
          {isEditing ? 'Save changes' : 'Create application'}
        </Button>
      </div>
    </form>
  )
}
