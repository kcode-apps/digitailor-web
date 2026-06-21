import type { Homepage } from '@/payload-types'

import { EditorialHeadline } from '@/components/brand'
import { CTAButton } from '@/components/layout/CTAButton'
import { Media } from '@/components/Media'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import React from 'react'

type HomeHeroProps = {
  homepage: Homepage
}

export const HomeHero: React.FC<HomeHeroProps> = ({ homepage }) => {
  const headline = homepage.headline
  const headlineAccent = homepage.headlineAccent
  const subheadline = homepage.subheadline
  const taglineLead = homepage.taglineLead
  const taglineAccent = homepage.taglineAccent
  const heroCta = resolveLinkProps(homepage.heroCta)

  return (
    <section className="relative min-h-[calc(100svh-5rem)] border-b border-blush/20 lg:min-h-[calc(100svh-5rem)]">
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-cream-dark">
        {homepage.heroImage && typeof homepage.heroImage === 'object' ? (
          <Media
            fill
            imgClassName="object-cover object-[62%_center] lg:object-[58%_center]"
            priority
            resource={homepage.heroImage}
            size="100vw"
          />
        ) : null}

        {/* Localized scrims — text column only; right side of hero stays clear */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-cream/88 via-cream/45 to-transparent sm:via-cream/35 md:w-[75%] md:from-cream/85 md:via-cream/30 lg:w-[52%] lg:from-cream/82 lg:via-cream/20" />
        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-cream/75 via-cream/20 to-transparent sm:h-40 md:max-w-2xl lg:h-44 lg:max-w-xl lg:from-cream/70" />
      </div>

      <div className="container relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-between py-10 md:py-14 lg:py-16">
        <div className="max-w-xl pt-4 md:max-w-2xl md:pt-8 lg:max-w-[36rem]">
          <EditorialHeadline accent={headlineAccent} lead={headline} size="hero" />
          <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-warm-gray md:mt-6 md:text-lg">
            {subheadline}
          </p>
          {heroCta && (
            <div className="mt-8">
              <CTAButton
                href={heroCta.href}
                label={heroCta.label || ''}
                newTab={heroCta.newTab}
              />
            </div>
          )}
        </div>

        {(taglineLead || taglineAccent) && (
          <p className="max-w-md pb-2 text-2xl leading-tight text-charcoal md:text-3xl lg:pb-4">
            {taglineLead && (
              <span className="font-sans font-semibold tracking-[-0.02em]">{taglineLead}</span>
            )}{' '}
            {taglineAccent && (
              <span className="font-serif font-normal italic">{taglineAccent}</span>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
