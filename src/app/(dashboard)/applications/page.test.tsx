import { render, screen } from '@testing-library/react'

import { useApplications } from '@/hooks/use-applications'

import ApplicationsPage from './page'

jest.mock('@/hooks/use-applications', () => ({
  useApplications: jest.fn(),
}))

describe('ApplicationsPage', () => {
  beforeEach(() => {
    jest.mocked(useApplications).mockReturnValue({
      applications: [
        {
          id: 'application-1',
          userName: 'Candidate User',
          userEmail: 'candidate@fitematch.com.br',
          jobTitle: 'Personal Trainer',
          companyName: 'Academia Fit Pro',
          status: 'pending',
        },
      ],
      isLoading: false,
      error: null,
    })
  })

  it('renders applications from API', async () => {
    render(<ApplicationsPage />)

    expect(screen.getAllByText('Candidate User')).toHaveLength(2)
    expect(screen.getAllByText('candidate@fitematch.com.br')).toHaveLength(2)
  })
})
