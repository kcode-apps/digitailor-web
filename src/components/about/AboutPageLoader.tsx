import { AboutPage } from '@/components/about/AboutPage'
import { getCachedAbout } from '@/lib/cms/queries'
import React from 'react'

export async function AboutPageLoader() {
  const about = await getCachedAbout(1)()

  return <AboutPage about={about} />
}
