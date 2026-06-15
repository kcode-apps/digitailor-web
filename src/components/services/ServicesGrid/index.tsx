import type { Service } from '@/payload-types'

import { ServiceCard } from '@/components/services/ServiceCard'
import React from 'react'

type ServicesGridProps = {
  services: Pick<
    Service,
    'id' | 'displayNumber' | 'title' | 'icon' | 'image' | 'features' | 'footerLabel' | 'footerText'
  >[]
  emptyStateMessage?: string | null
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services, emptyStateMessage }) => {
  if (services.length === 0) {
    return (
      <p className="mt-6 font-sans text-base text-warm-gray md:mt-8">
        {emptyStateMessage || 'Services will appear here once published.'}
      </p>
    )
  }

  return (
    <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-7">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  )
}
