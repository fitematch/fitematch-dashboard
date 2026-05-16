import type { User } from '@/types/entities/user.entity'

export type ListUsersResponse = User

export type ReadUserResponse = User

export type CreateUserRequest = Partial<{
  name: string
  email: string
  productRole: User['productRole']
  adminRole: User['adminRole']
  status: User['status']
}>

export type CreateUserResponse = User

export type UpdateUserRequest = Partial<{
  name: string
  email: string
  productRole: User['productRole']
  adminRole: User['adminRole']
  status: User['status']
}>

export type UpdateUserResponse = User

export type DeleteUserResponse = {
  message: string
}
