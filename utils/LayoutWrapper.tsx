'use client'

import { ReactNode } from 'react'

import QueryWrapper from './QueryWrapper'
import ToastWrapper from './ToastWrapper'

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryWrapper>
      <ToastWrapper>{children}</ToastWrapper>
    </QueryWrapper>
  )
}
