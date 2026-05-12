import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/contexts/auth-context'

import './globals.css'

export const metadata: Metadata = {
  title: 'fitematch dashboard',
  description: 'Administrative dashboard for fitematch.',
  robots: {
    index: false,
    follow: false,
  },
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
