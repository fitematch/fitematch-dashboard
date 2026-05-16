import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { companyService } from '@/services/companies/company.service'
import { jobService } from '@/services/jobs/job.service'
import { uploadService } from '@/services/upload/upload.service'

import { JobForm } from './job-form'

const pushMock = jest.fn()
const refreshMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

jest.mock('@/services/companies/company.service', () => ({
  companyService: {
    list: jest.fn(),
  },
}))

jest.mock('@/services/upload/upload.service', () => ({
  uploadService: {
    uploadJobCover: jest.fn(),
  },
}))

jest.mock('@/services/jobs/job.service', () => ({
  jobService: {
    create: jest.fn(),
    update: jest.fn(),
  },
}))

describe('JobForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(URL, 'createObjectURL', {
      writable: true,
      value: jest.fn(() => 'blob:cover-preview'),
    })
    Object.defineProperty(URL, 'revokeObjectURL', {
      writable: true,
      value: jest.fn(),
    })

    jest.mocked(companyService.list).mockResolvedValue([
      {
        id: 'company-1',
        name: 'Academia Fit Pro',
        document: '12.345.678/0001-90',
        city: 'Sao Paulo',
        state: 'SP',
        status: 'approved',
      },
    ] as never)
    jest.mocked(uploadService.uploadJobCover).mockResolvedValue({
      url: 'https://s3.amazonaws.com/bucket/job-cover.png',
    })
    jest.mocked(jobService.create).mockResolvedValue({
      id: 'job-1',
      title: 'Personal Trainer',
    } as never)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('uploads the selected file and submits the returned cover URL', async () => {
    const user = userEvent.setup()

    const { container } = render(<JobForm />)

    await waitFor(() => {
      expect(companyService.list).toHaveBeenCalled()
    })

    await user.click(
      screen.getByPlaceholderText('Search or select an active company'),
    )
    await user.click(screen.getByRole('button', { name: /academia fit pro/i }))
    await user.type(screen.getByLabelText('Title'), 'Personal Trainer')
    await user.type(screen.getByLabelText('Description'), 'Short job description')
    await user.selectOptions(screen.getByLabelText('Education level'), 'bachelor')
    await user.click(screen.getByRole('button', { name: /add language/i }))
    await user.selectOptions(screen.getByLabelText('Language'), 'English')
    await user.selectOptions(screen.getByLabelText('Level'), 'fluent')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await user.type(screen.getByRole('textbox', { name: 'Salary' }), '500000')

    const fileInput = container.querySelector('input[type="file"]')

    expect(fileInput).not.toBeNull()

    const file = new File(['cover'], 'cover.png', { type: 'image/png' })

    await user.upload(fileInput as HTMLInputElement, file)

    expect(screen.getByText('Confirm image')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Save image' }))

    expect(screen.getByText('File: cover.png')).toBeInTheDocument()
    expect(screen.getByText('Select a file to upload.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Preview' })).toBeInTheDocument()

    await waitFor(() => {
      expect(uploadService.uploadJobCover).toHaveBeenCalledWith(file)
    })

    await user.click(screen.getByRole('button', { name: 'Create job' }))

    await waitFor(() => {
        expect(jobService.create).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Personal Trainer',
            requirements: expect.objectContaining({
              languages: [
                {
                  language: 'Portuguese',
                  level: 'native',
                },
                {
                  language: 'English',
                  level: 'fluent',
                },
              ],
            }),
            media: {
              coverUrl: 'https://s3.amazonaws.com/bucket/job-cover.png',
            },
        }),
      )
    })
  })
})
