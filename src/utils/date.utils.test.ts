import { formatDate } from './date.utils'

describe('formatDate', () => {
  it('formats ISO date according to the local timezone', () => {
    expect(formatDate('2026-05-12T00:00:00.000Z')).toBe('11/05/2026')
  })

  it('returns dash when value is empty', () => {
    expect(formatDate(null)).toBe('-')
  })

  it('returns dash when value is invalid', () => {
    expect(formatDate('invalid-date')).toBe('-')
  })
})
