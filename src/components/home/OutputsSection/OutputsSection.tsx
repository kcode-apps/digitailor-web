import type { Homepage } from '@/payload-types'

import { EditorialHeadline, SectionLabel } from '@/components/brand'
import { Media } from '@/components/Media'
import { resolveLinkProps } from '@/lib/cms/resolveLink'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type OutputsSectionProps = {
  outputs?: Homepage['outputs']
}

export const OutputsSection: React.FC<OutputsSectionProps> = ({ outputs }) => {
  if (!outputs) return null

  const overline = outputs.overline
  const headline = outputs.headline
  const body = outputs.body
  const cta = resolveLinkProps(outputs.cta)
  const cards = outputs.cards || []

  return (
    <section className="border-b border-blush/20 bg-cream paper-texture">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-8">
            {overline && <SectionLabel>{overline}</SectionLabel>}
            <EditorialHeadline
              as="h2"
              className="mt-4"
              lead={headline}
              size="section"
              variant="serif"
            />
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray">{body}</p>
            {cta && (
              <Link
                className="mt-8 inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-charcoal transition-gentle hover:text-blush"
                href={cta.href}
                {...(cta.newTab
                  ? { rel: 'noopener noreferrer', target: '_blank' as const }
                  : {})}
              >
                {cta.label}
                <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.5} />
              </Link>
            )}
          </div>

          <div className="lg:col-span-8">
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:gap-4 lg:mx-0 lg:px-0">
              {cards.map((card, index) => (
                <figure
                  className="group relative aspect-[3/5] w-[42vw] max-w-[11rem] shrink-0 overflow-hidden rounded-sm bg-cream-dark shadow-[0_2px_12px_rgb(26_26_26_/0.05)] sm:w-[28vw] md:max-w-[10.5rem] lg:max-w-none lg:flex-1"
                  key={card.id || `${card.label}-${index}`}
                >
                  {card.image && typeof card.image === 'object' ? (
                    <Media
                      fill
                      imgClassName="object-cover editorial-image-hover"
                      resource={card.image}
                      size="(max-width: 1024px) 42vw, 20vw"
                    />
                  ) : (
                    <div className="size-full bg-cream-dark" />
                  )}

                  {card.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex size-12 items-center justify-center rounded-full border border-off-white/80 bg-charcoal/20 text-off-white backdrop-blur-sm">
                        <Play aria-hidden className="ml-0.5 size-5 fill-current" strokeWidth={0} />
                      </span>
                    </div>
                  )}

                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 to-transparent px-3 pb-4 pt-12">
                    <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em] text-off-white">
                      {card.label}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
