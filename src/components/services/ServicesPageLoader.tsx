import { ServicesGrid } from '@/components/services/ServicesGrid'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesSectionHeader } from '@/components/services/ServicesSectionHeader'
import { getCachedPublishedServices, getCachedServicesPage } from '@/lib/cms/queries'
import React from 'react'

export async function ServicesPageLoader() {
  const [servicesPage, services] = await Promise.all([
    getCachedServicesPage(1)(),
    getCachedPublishedServices({ depth: 1 })(),
  ])

  return (
    <>
      <ServicesHero servicesPage={servicesPage} />
      <section className="border-b border-warm-border/60 bg-beige">
        <div className="mx-auto w-full max-w-[96rem] px-4 pt-6 pb-12 md:px-5 md:pt-8 md:pb-14 lg:px-6 lg:pb-16">
          <ServicesSectionHeader overline={servicesPage.sectionOverline} />
          <ServicesGrid
            emptyStateMessage={servicesPage.emptyStateMessage}
            services={services.docs}
          />
        </div>
      </section>
    </>
  )
}
