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
import { getApiErrorMessage } from '@/services/http/api-error'
import { userService } from '@/services/users/user.service'
import type { User } from '@/types/entities/user.entity'

const userFormSchema = z.object({
  name: z.string().min(2, 'Enter the user name.'),
  email: z.email('Enter a valid email.'),
  productRole: z.enum(['', 'candidate', 'recruiter']),
  adminRole: z.enum(['', 'staff', 'admin', 'super_admin']),
  status: z.enum(['pending', 'active', 'inactive', 'blocked']),
})

type UserFormData = z.infer<typeof userFormSchema>

type UserFormProps = {
  user?: User
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const isEditing = Boolean(user)
  const selectClassName =
    'h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 transition focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      productRole: user?.productRole ?? '',
      adminRole: user?.adminRole ?? '',
      status: user?.status ?? 'active',
    },
  })

  async function onSubmit(data: UserFormData) {
    try {
      setError(null)

      const payload = {
        name: data.name,
        email: data.email,
        productRole: data.productRole || null,
        adminRole: data.adminRole || null,
        status: data.status,
      }

      if (user) {
        await userService.update(user.id, payload)
      } else {
        await userService.create(payload)
      }

      router.push(ROUTES.dashboard.users)
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
            {isEditing ? 'User information' : 'New user information'}
          </h2>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">
                Product role
              </span>

              <select
                className={selectClassName}
                {...register('productRole')}
              >
                <option value="">None</option>
                <option value="candidate">Candidate</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">
                Admin role
              </span>

              <select
                className={selectClassName}
                {...register('adminRole')}
              >
                <option value="">None</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super admin</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">
                Status
              </span>

              <select
                className={selectClassName}
                {...register('status')}
              >
                <option value="pending">PENDING</option>
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
                <option value="blocked">BLOCKED</option>
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          href={ROUTES.dashboard.users}
          asChild
          type="button"
          variant="secondary"
        >
          Cancel
        </Button>

        <Button isLoading={isSubmitting} type="submit">
          {isEditing ? 'Save changes' : 'Create user'}
        </Button>
      </div>
    </form>
  )
}
