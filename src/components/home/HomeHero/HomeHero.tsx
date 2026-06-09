import type { Homepage } from '@/payload-types'

import { CTAButton } from '@/components/layout/CTAButton'
import { Media } from '@/components/Media'
import { siteDefaults } from '@/lib/cms/defaults'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import React from 'react'

type HomeHeroProps = {
  homepage: Homepage
}

export const HomeHero: React.FC<HomeHeroProps> = ({ homepage }) => {
  const defaults = siteDefaults.hero
  const headlineLead = homepage.headlineLead || defaults.headlineLead
  const headlineAccent = homepage.headlineAccent || defaults.headlineAccent
  const subheadline = homepage.subheadline || defaults.subheadline
  const taglineLead = homepage.taglineLead || defaults.taglineLead
  const taglineAccent = homepage.taglineAccent || defaults.taglineAccent
  const heroCta = resolveLinkProps(homepage.heroCta) || resolveLinkProps(defaults.heroCta)

  return (
    <section className="relative min-h-[calc(100svh-5rem)] border-b border-warm-border/60 lg:min-h-[calc(100svh-5rem)]">
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-beige-dark">
        {homepage.heroImage && typeof homepage.heroImage === 'object' ? (
          <Media
            fill
            imgClassName="object-cover object-[62%_center] lg:object-[58%_center]"
            priority
            resource={homepage.heroImage}
            size="100vw"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-r from-beige/95 via-beige/55 to-beige/10 lg:from-beige/92 lg:via-beige/45 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-beige/90 via-transparent to-beige/20" />
      </div>

      <div className="container relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-between py-10 md:py-14 lg:py-16">
        <div className="max-w-xl pt-4 md:max-w-2xl md:pt-8 lg:max-w-[34rem]">
          <h1 className="text-4xl leading-[1.08] text-charcoal md:text-5xl lg:text-[3.35rem]">
            <span className="font-sans font-semibold tracking-[-0.02em]">{headlineLead}</span>{' '}
            <span className="font-serif font-normal italic">{headlineAccent}</span>
          </h1>
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
