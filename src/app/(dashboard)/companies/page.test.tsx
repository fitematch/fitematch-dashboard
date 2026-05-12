import { render, screen } from '@testing-library/react'

import { useCompanies } from '@/hooks/use-companies'

import CompaniesPage from './page'

jest.mock('@/hooks/use-companies', () => ({
  useCompanies: jest.fn(),
}))

describe('CompaniesPage', () => {
  beforeEach(() => {
    jest.mocked(useCompanies).mockReturnValue({
      companies: [
        {
          id: 'company-1',
          name: 'Academia Fit Pro',
          document: '12.345.678/0001-90',
          website: 'https://fitpro.example.com',
          status: 'approved',
        },
      ],
      isLoading: false,
      error: null,
    })
  })

  it('renders companies from API', async () => {
    render(<CompaniesPage />)

    expect(screen.getAllByText('Academia Fit Pro')).toHaveLength(2)
    expect(screen.getAllByText('12.345.678/0001-90')).toHaveLength(2)
  })
})
