import type { Homepage } from '@/payload-types'

import { ProcessStepper } from '@/components/home/ProcessStepper/ProcessStepper'
import { CTAButton } from '@/components/layout/CTAButton'
import { Media } from '@/components/Media'
import { siteDefaults } from '@/lib/cms/defaults'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import React from 'react'

type HomeHeroProps = {
  homepage: Homepage
}

export const HomeHero: React.FC<HomeHeroProps> = ({ homepage }) => {
  const headline = homepage.headline || siteDefaults.hero.headline
  const subheadline = homepage.subheadline || siteDefaults.hero.subheadline
  const heroCta =
    resolveLinkProps(homepage.heroCta) || resolveLinkProps(siteDefaults.hero.heroCta)
  const processSteps = homepage.processSteps || []

  return (
    <section className="border-b border-warm-border/60">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">
              {subheadline}
            </p>
            {heroCta && (
              <div className="mt-8">
                <CTAButton
                  href={heroCta.href}
                  label={heroCta.label || ''}
                  newTab={heroCta.newTab}
                  showArrow={false}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige-dark">
              {homepage.heroImage && typeof homepage.heroImage === 'object' ? (
                <Media
                  fill
                  imgClassName="object-cover"
                  priority
                  resource={homepage.heroImage}
                  size="(max-width: 1024px) 100vw, 50vw"
                />
              ) : null}
            </div>

            {processSteps.length > 0 && (
              <ProcessStepper
                className="mt-8 lg:absolute lg:-right-4 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 xl:right-0"
                steps={processSteps}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
