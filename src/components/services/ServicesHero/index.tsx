import type { ServicesPage as ServicesPageGlobal } from '@/payload-types'

import { EditorialHeadline, SectionLabel } from '@/components/brand'
import { Media } from '@/components/Media'
import React from 'react'

type ServicesHeroProps = {
  servicesPage: Pick<
    ServicesPageGlobal,
    | 'bannerImage'
    | 'overline'
    | 'headline'
    | 'headlineAccent'
    | 'subheadline'
    | 'description'
    | 'valueProps'
  >
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ servicesPage }) => {
  const valueProps = servicesPage.valueProps || []

  return (
    <section className="border-b border-blush/20 bg-cream">
      <div className="relative min-h-[17.5rem] w-full overflow-hidden bg-cream-dark sm:min-h-[19rem] lg:min-h-[21rem] lg:max-h-[22rem]">
        <div aria-hidden className="absolute inset-0">
          {servicesPage.bannerImage && typeof servicesPage.bannerImage === 'object' ? (
            <Media
              fill
              imgClassName="object-cover object-[72%_center] sm:object-[68%_center] lg:object-[right_center]"
              priority
              resource={servicesPage.bannerImage}
              size="100vw"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/92 to-cream/35 sm:from-cream sm:via-cream/88 sm:to-cream/25 lg:from-cream lg:via-cream/78 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream/80 via-transparent to-cream/30 lg:from-cream/40" />
        </div>

        <div className="container relative z-10 flex h-full min-h-[inherit] flex-col justify-center pt-8 pb-5 sm:pt-9 sm:pb-6 lg:pt-10 lg:pb-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-6">
            <div className="max-w-xl lg:max-w-none">
              {servicesPage.overline && <SectionLabel>{servicesPage.overline}</SectionLabel>}
              <EditorialHeadline
                accent={servicesPage.headlineAccent}
                className="mt-3"
                lead={servicesPage.headline}
                size="banner"
              />
              {servicesPage.subheadline && (
                <p className="mt-3 font-sans text-xs font-medium tracking-[0.04em] text-charcoal/80 sm:text-sm">
                  {servicesPage.subheadline}
                </p>
              )}
              {servicesPage.description && (
                <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-warm-gray sm:text-base">
                  {servicesPage.description}
                </p>
              )}

              {valueProps.length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-7 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3 xl:grid-cols-4">
                  {valueProps.map((item, index) => (
                    <li
                      className="flex items-start gap-2.5"
                      key={item.id || `${item.label}-${index}`}
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-blush"
                      />
                      <p className="font-sans text-[0.6rem] font-medium uppercase leading-snug tracking-[0.1em] text-charcoal sm:text-[0.65rem]">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
