import { render, screen } from '@testing-library/react'
import { FiUsers } from 'react-icons/fi'

import { DashboardSummaryCard } from './dashboard-summary-card'

describe('DashboardSummaryCard', () => {
  it('renders summary data', () => {
    render(
      <DashboardSummaryCard
        title="Users"
        total={124}
        lastWeek={12}
        icon={FiUsers}
      />,
    )

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('124')).toBeInTheDocument()
    expect(screen.getByText('+12 last week')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    const { container } = render(
      <DashboardSummaryCard
        title="Users"
        icon={FiUsers}
        isLoading
      />,
    )

    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})
