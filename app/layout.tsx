'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { jetbrains } from '@fonts'

import './globals.scss'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className={clsx(jetbrains.className, 'bg-zinc-800')}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
