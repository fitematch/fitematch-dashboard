import { formatCurrency } from './currency.utils'

describe('formatCurrency', () => {
  it('formats value as BRL currency', () => {
    expect(formatCurrency(2500)).toBe('R$\u00a02.500,00')
  })

  it('returns dash when value is null', () => {
    expect(formatCurrency(null)).toBe('-')
  })
})
