import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import ThemeProvider from '@/components/ui/ThemeProvider'
import NavDots from '@/components/ui/NavDots'

export const metadata: Metadata = {
  title: 'Jun Ren — Software Engineer',
  description: 'Building resilient systems with clarity, performance, and human impact. MS student at CMU Silicon Valley.',
  keywords: ['software engineer', 'CMU', 'Carnegie Mellon', 'full-stack', 'SDE', 'Jun Ren'],
  openGraph: {
    title: 'Jun Ren — Software Engineer',
    description: 'Building resilient systems with clarity, performance, and human impact.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <NavDots />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
