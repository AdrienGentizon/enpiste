import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import ReactQueryProvider from '@/providers/ReactQueryProvider/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'En Piste',
  description: '421 dices game from your device',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} grid min-h-[100dvh] max-w-[100dvw] grid-cols-1 grid-rows-[min-content_1fr] overflow-x-hidden`}
      >
        <ReactQueryProvider>
          <ClerkProvider>
            <Header />
            {children}
          </ClerkProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
