import type { Service } from '@/payload-types'

import { PaperCard } from '@/components/brand'
import { Media } from '@/components/Media'
import React from 'react'

type ServiceCardProps = {
  service: Pick<
    Service,
    'displayNumber' | 'title' | 'icon' | 'image' | 'features' | 'footerLabel' | 'footerText'
  >
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const features = service.features || []

  return (
    <PaperCard as="article" className="group flex h-full flex-col" hover>
      <div className="relative aspect-[3/2] overflow-hidden bg-cream-dark">
        {service.image && typeof service.image === 'object' ? (
          <Media
            fill
            imgClassName="object-cover editorial-image-hover"
            resource={service.image}
            size="(max-width: 768px) 100vw, 32vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-sans text-xs uppercase tracking-[0.14em] text-warm-gray">
            Service image
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-4 border-b border-blush/15 px-6 py-5">
        <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.06em] text-charcoal">
          {service.title}
        </h2>
        <span className="shrink-0 font-serif text-lg text-blush/80">{service.displayNumber}</span>
      </div>

      {features.length > 0 && (
        <ul className="flex-1 space-y-2.5 px-6 py-5">
          {features.map((feature, index) => (
            <li
              className="flex gap-2.5 font-sans text-sm leading-relaxed text-warm-gray"
              key={feature.id || `${feature.label}-${index}`}
            >
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-blush/70" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      )}

      {(service.footerLabel || service.footerText) && (
        <div className="mt-auto border-t border-blush/15 bg-blush/8 px-6 py-5">
          {service.footerLabel && (
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-charcoal">
              {service.footerLabel}
            </p>
          )}
          {service.footerText && (
            <p className="mt-2 font-sans text-sm leading-relaxed text-warm-gray">{service.footerText}</p>
          )}
        </div>
      )}
    </PaperCard>
  )
}
