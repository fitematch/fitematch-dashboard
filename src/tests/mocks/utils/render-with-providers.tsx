import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

function Providers({ children }: ProvidersProps) {
  return children
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: Providers,
    ...options,
  })
}
