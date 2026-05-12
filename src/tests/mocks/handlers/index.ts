import { http, HttpResponse } from 'msw'

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export const handlers = [
  http.get(`${apiUrl}/health-check`, () => {
    return HttpResponse.json({
      healthy: true,
      name: 'API',
      version: '0.0.1',
    })
  }),

  http.get(`${apiUrl}/dashboard/summary`, () => {
    return HttpResponse.json({
      users: {
        total: 124,
        lastWeek: 12,
      },
      companies: {
        total: 18,
        lastWeek: 3,
      },
      jobs: {
        total: 56,
        lastWeek: 9,
      },
      applications: {
        total: 421,
        lastWeek: 37,
      },
    })
  }),

  http.get(`${apiUrl}/user`, () => {
    return HttpResponse.json([
      {
        id: 'user-1',
        name: 'Admin User',
        email: 'admin@fitematch.com.br',
        productRole: null,
        adminRole: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'user-2',
        name: 'Recruiter User',
        email: 'recruiter@fitematch.com.br',
        productRole: 'recruiter',
        adminRole: null,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }),

  http.get(`${apiUrl}/company`, () => {
    return HttpResponse.json([
      {
        id: 'company-1',
        name: 'Academia Fit Pro',
        document: '12.345.678/0001-90',
        description: 'Premium gym focused on performance.',
        website: 'https://fitpro.example.com',
        status: 'approved',
        ownerId: 'user-2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'company-2',
        name: 'Studio Match Training',
        document: '98.765.432/0001-10',
        description: 'Functional training studio.',
        website: null,
        status: 'pending',
        ownerId: 'user-3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }),

  http.get(`${apiUrl}/job`, () => {
    return HttpResponse.json([
      {
        id: 'job-1',
        title: 'Personal Trainer',
        description: 'Work with individual and group training.',
        companyId: 'company-1',
        companyName: 'Academia Fit Pro',
        location: 'São Paulo, SP',
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'job-2',
        title: 'Instrutor de Musculação',
        description: 'Atendimento na sala de musculação.',
        companyId: 'company-2',
        companyName: 'Studio Match Training',
        location: 'Praia Grande, SP',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }),

  http.get(`${apiUrl}/apply`, () => {
    return HttpResponse.json([
      {
        id: 'application-1',
        userId: 'user-10',
        userName: 'Candidate User',
        userEmail: 'candidate@fitematch.com.br',
        jobId: 'job-1',
        jobTitle: 'Personal Trainer',
        companyId: 'company-1',
        companyName: 'Academia Fit Pro',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'application-2',
        userId: 'user-11',
        userName: 'Maria Silva',
        userEmail: 'maria@fitematch.com.br',
        jobId: 'job-2',
        jobTitle: 'Instrutor de Musculação',
        companyId: 'company-2',
        companyName: 'Studio Match Training',
        status: 'reviewing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ])
  }),

]