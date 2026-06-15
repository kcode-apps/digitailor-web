import type { Service } from '@/payload-types'

import { Media } from '@/components/Media'
import { getServiceIcon } from '@/lib/icons/serviceIcons'
import type { ServiceIcon } from '@/fields/serviceIcon'
import React from 'react'

type ServiceCardProps = {
  service: Pick<
    Service,
    'displayNumber' | 'title' | 'icon' | 'image' | 'features' | 'footerLabel' | 'footerText'
  >
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const Icon = getServiceIcon(service.icon as ServiceIcon)
  const features = service.features || []

  return (
    <article className="flex h-full flex-col border border-warm-border/60 bg-off-white">
      <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-start gap-3 border-b border-warm-border/60 px-6 py-5">
        <span className="flex size-10 items-center justify-center rounded-full border border-warm-border/60 bg-beige">
          <Icon aria-hidden className="size-4 stroke-[1.25] text-charcoal" strokeWidth={1.25} />
        </span>
        <h2 className="pt-2 text-center font-sans text-sm font-semibold uppercase tracking-[0.08em] text-charcoal">
          {service.title}
        </h2>
        <span className="pt-2 text-right font-sans text-sm text-warm-gray">{service.displayNumber}</span>
      </div>

      <div className="relative aspect-[3/2] overflow-hidden bg-beige-dark">
        {service.image && typeof service.image === 'object' ? (
          <Media
            fill
            imgClassName="object-cover"
            resource={service.image}
            size="(max-width: 768px) 100vw, 32vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-sans text-xs uppercase tracking-[0.14em] text-warm-gray">
            Service image
          </div>
        )}
      </div>

      {features.length > 0 && (
        <ul className="mt-5 flex-1 space-y-2.5 px-6 pb-6">
          {features.map((feature, index) => (
            <li
              className="flex gap-2 font-sans text-sm leading-relaxed text-warm-gray"
              key={feature.id || `${feature.label}-${index}`}
            >
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-charcoal/60" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      )}

      {(service.footerLabel || service.footerText) && (
        <div className="mt-auto border-t border-warm-border/60 bg-beige px-6 py-5">
          {service.footerLabel && (
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-charcoal">
              {service.footerLabel}
            </p>
          )}
          {service.footerText && (
            <p className="mt-2 font-sans text-sm leading-relaxed text-warm-gray">{service.footerText}</p>
          )}
        </div>
      )}
    </article>
  )
}
