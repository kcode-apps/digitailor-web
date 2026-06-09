import { HomeHero } from '@/components/home/HomeHero'
import { ImpactSection } from '@/components/home/ImpactSection'
import { OutputsSection } from '@/components/home/OutputsSection'
import { getCachedHomepage } from '@/lib/cms/queries'
import React from 'react'

export async function HomePageLoader() {
  const homepage = await getCachedHomepage(2)()

  return (
    <>
      <HomeHero homepage={homepage} />
      <OutputsSection outputs={homepage.outputs} />
      <ImpactSection impact={homepage.impact} />
    </>
  )
}
