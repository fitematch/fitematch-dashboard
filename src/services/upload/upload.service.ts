import { API_ENDPOINTS } from '@/constants/api-endpoints'
import { apiClient } from '@/services/http/api-client'

type UploadResponse = {
  url: string
}

function uploadFile(endpoint: string, file: File) {
  const formData = new FormData()

  formData.append('file', file)

  return apiClient.post<UploadResponse, FormData>(endpoint, formData)
}

export const uploadService = {
  uploadCompanyLogo(file: File) {
    return uploadFile(API_ENDPOINTS.upload.companyLogo, file)
  },

  uploadJobCover(file: File) {
    return uploadFile(API_ENDPOINTS.upload.jobCover, file)
  },

  uploadResume(file: File) {
    return uploadFile(API_ENDPOINTS.upload.candidateResume, file)
  },
}

