import type { User } from '@/types/entities/user.entity'

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  accessToken: string
  refreshToken?: string
  user: User
}

export type AuthMeResponse = User
