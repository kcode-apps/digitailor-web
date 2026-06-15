import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { bodyFont, displayFont } from '@/fonts'
import React, { Suspense } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SiteFooterLoader } from '@/components/layout/SiteFooter'
import { SiteHeaderLoader } from '@/components/layout/SiteHeader'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(displayFont.variable, bodyFont.variable)}
      data-theme="light"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Suspense
            fallback={
              <LoadingOverlay
                className="h-20 border-b border-warm-border/60"
                scope="section"
              />
            }
          >
            <SiteHeaderLoader />
          </Suspense>
          {children}
          <Suspense
            fallback={
              <LoadingOverlay
                className="border-t border-warm-border/60 py-12"
                scope="section"
              />
            }
          >
            <SiteFooterLoader />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
    twitter: {
    card: 'summary_large_image',
  },
}
