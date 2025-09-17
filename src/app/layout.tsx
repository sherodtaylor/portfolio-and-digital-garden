import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Analytics } from '@vercel/analytics/react'
import { getSiteConfig, getPersonalConfig } from '@/lib/config-server'
import { firaCode } from '../../lib/fonts'

import '@/styles/tailwind.css'

const siteConfig = getSiteConfig()
const personalConfig = getPersonalConfig()

export const metadata: Metadata = {
  title: {
    template: `%s - ${personalConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.title,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="flex h-full bg-zinc-50 font-mono dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
