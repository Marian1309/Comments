import { LayoutWrapper } from '@utils'
import clsx from 'clsx'

import { Navigation } from '@components/auth'

import { jetbrains } from '@fonts'

import '../styles/globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className={clsx(jetbrains.className, 'mx-8 bg-zinc-800')}>
        <LayoutWrapper>
          <Navigation />

          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
