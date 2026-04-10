import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'My Quick Trippers | Coming Soon - Your Perfect Escape Awaits',
  description: 'Precision Planning. The Perfect Escape. My Quick Trippers is launching soon with curated travel experiences to breathtaking destinations.',
  keywords: 'travel, tours, Himalayan adventures, quick trips, travel planning, vacation packages',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
