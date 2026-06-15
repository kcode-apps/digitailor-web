import type { ServicesPage as ServicesPageGlobal } from '@/payload-types'

import { Media } from '@/components/Media'
import { getServiceIcon } from '@/lib/icons/serviceIcons'
import type { ServiceIcon } from '@/fields/serviceIcon'
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
    <section className="border-b border-warm-border/60 bg-beige">
      <div className="relative min-h-[17.5rem] w-full overflow-hidden bg-beige-dark sm:min-h-[19rem] lg:min-h-[21rem] lg:max-h-[22rem]">
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

          <div className="absolute inset-0 bg-gradient-to-r from-beige via-beige/92 to-beige/35 sm:from-beige sm:via-beige/88 sm:to-beige/25 lg:from-beige lg:via-beige/78 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-beige/80 via-transparent to-beige/30 lg:from-beige/40" />
        </div>

        <div className="container relative z-10 flex h-full min-h-[inherit] flex-col justify-center pt-8 pb-5 sm:pt-9 sm:pb-6 lg:pt-10 lg:pb-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-6">
            <div className="max-w-xl lg:max-w-none">
                {servicesPage.overline && (
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
                    {servicesPage.overline}
                  </p>
                )}
                <h1 className="mt-3 text-2xl leading-[1.12] text-charcoal sm:text-3xl lg:text-4xl">
                  <span className="font-sans font-semibold tracking-[-0.02em]">
                    {servicesPage.headline}
                  </span>{' '}
                  {servicesPage.headlineAccent && (
                    <span className="font-serif font-normal italic">{servicesPage.headlineAccent}</span>
                  )}
                </h1>
                {servicesPage.subheadline && (
                  <p className="mt-3 font-sans text-xs font-medium uppercase tracking-[0.08em] text-charcoal/80 sm:text-sm">
                    {servicesPage.subheadline}
                  </p>
                )}
                {servicesPage.description && (
                  <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-warm-gray sm:text-base">
                    {servicesPage.description}
                  </p>
                )}

                {valueProps.length > 0 && (
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-7 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-4 xl:grid-cols-4">
                    {valueProps.map((item, index) => {
                      const Icon = getServiceIcon(item.icon as ServiceIcon)

                      return (
                        <li
                          className="flex items-center gap-2.5"
                          key={item.id || `${item.label}-${index}`}
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-warm-border/60 bg-off-white/90">
                            <Icon
                              aria-hidden
                              className="size-3.5 stroke-[1.25] text-charcoal"
                              strokeWidth={1.25}
                            />
                          </span>
                          <p className="font-sans text-[0.6rem] font-medium uppercase leading-snug tracking-[0.12em] text-charcoal sm:text-[0.65rem]">
                            {item.label}
                          </p>
                        </li>
                      )
                    })}
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
