import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'
import type { User } from '@/types/entities/user.entity'

import type {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  UpdateUserRequest,
} from './user.types'

type UserApiResponse = Partial<User> & {
  _id?: string
  userId?: string
}

function normalizeUser(user: UserApiResponse): User {
  return {
    ...user,
    id: user.id ?? user._id ?? user.userId ?? '',
    name: user.name ?? '',
    email: user.email ?? '',
    birthday: user.birthday ?? user.birthDate ?? user.dateOfBirth ?? null,
  }
}

export const userService = {
  async list() {
    const users = await apiClient.get<UserApiResponse[]>(API_ENDPOINTS.users.list)

    return users.map(normalizeUser)
  },

  async read(userId: string) {
    const user = await apiClient.get<UserApiResponse>(
      API_ENDPOINTS.users.read(userId),
    )

    return normalizeUser(user)
  },

  async create(payload: CreateUserRequest) {
    const user = await apiClient.post<UserApiResponse, CreateUserRequest>(
      API_ENDPOINTS.users.list,
      payload,
    )

    return normalizeUser(user as CreateUserResponse)
  },

  async update(userId: string, payload: UpdateUserRequest) {
    const user = await apiClient.patch<UserApiResponse, UpdateUserRequest>(
      API_ENDPOINTS.users.update(userId),
      payload,
    )

    return normalizeUser(user)
  },

  delete(userId: string) {
    return apiClient.delete<DeleteUserResponse>(
      API_ENDPOINTS.users.delete(userId),
    )
  },
}
