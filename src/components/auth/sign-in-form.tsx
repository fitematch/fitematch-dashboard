'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/use-auth'
import { getApiErrorMessage } from '@/services/http/api-error'

const signInSchema = z.object({
  email: z.email('Enter a valid email.'),
  password: z.string().min(1, 'Enter your password.'),
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignInForm() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInFormData) {
    try {
      setError(null)

      await signIn(data)

      router.replace(ROUTES.dashboard.home)
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {error ? <Alert variant="danger">{error}</Alert> : null}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button className="w-full" isLoading={isSubmitting} type="submit">
        Sign in
      </Button>
    </form>
  )
}
