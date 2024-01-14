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
        <div className='grid place-items-center h-screen bf-gray-300'>
          <div className='flex bg-gray-200 -mt-12 h-[90vh] w-[90vw] shadow-lg'>
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
