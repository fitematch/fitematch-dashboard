import { render, screen } from '@testing-library/react'

import { useJobs } from '@/hooks/use-jobs'

import JobsPage from './page'

jest.mock('@/hooks/use-jobs', () => ({
  useJobs: jest.fn(),
}))

describe('JobsPage', () => {
  beforeEach(() => {
    jest.mocked(useJobs).mockReturnValue({
      jobs: [
        {
          id: 'job-1',
          title: 'Personal Trainer',
          companyName: 'Academia Fit Pro',
          location: 'Sao Paulo, BR',
          status: 'published',
        },
      ],
      isLoading: false,
      error: null,
    })
  })

  it('renders jobs from API', async () => {
    render(<JobsPage />)

    expect(screen.getAllByText('Personal Trainer')).toHaveLength(2)
    expect(screen.getAllByText('Academia Fit Pro')).toHaveLength(2)
  })
})
