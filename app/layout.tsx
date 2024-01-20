import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalContextProvider } from './Context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Clone',
  description: 'Version 2 of the WhatsApp clone. Powered by Next and Firebase.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </div>
      </body>
    </html>
  )
}
