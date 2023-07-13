import { GlobalContextProvider } from '@/lib/context/GlobalContext'
import { AppProvider } from '@/lib/providers/AppProviders'
import { roboto } from '@/public/fonts/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Connect chat app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} h-screen`}>
        <AppProvider>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </AppProvider>
      </body>
    </html>
  )
}
