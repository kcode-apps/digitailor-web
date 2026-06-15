import type { Homepage } from '@/payload-types'

import { SectionLabel } from '@/components/brand'
import { Box, Clock, FileText, Image as ImageIcon, type LucideIcon } from 'lucide-react'
import React from 'react'

type ImpactSectionProps = {
  impact?: Homepage['impact']
}

type ImpactIcon = NonNullable<
  NonNullable<NonNullable<Homepage['impact']>['stats']>[number]['icon']
>

const iconMap: Record<ImpactIcon, LucideIcon> = {
  clock: Clock,
  cube: Box,
  image: ImageIcon,
  document: FileText,
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ impact }) => {
  if (!impact) return null

  const overline = impact.overline
  const stats = impact.stats || []

  return (
    <section className="bg-charcoal text-off-white">
      <div className="container pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
        {overline && (
          <SectionLabel className="text-blush-muted">{overline}</SectionLabel>
        )}

        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[(stat.icon || 'clock') as ImpactIcon]

            return (
              <li key={'id' in stat && stat.id ? stat.id : index}>
                <Icon
                  aria-hidden
                  className="size-5 stroke-[1.25] text-blush-muted"
                  strokeWidth={1.25}
                />
                <p className="mt-6 font-serif text-3xl leading-tight md:text-[2.5rem]">
                  {stat.headline}
                </p>
                <p className="mt-3 font-sans text-sm font-semibold leading-snug">{stat.subheading}</p>
                {stat.description && (
                  <p className="mt-3 font-sans text-sm leading-relaxed text-off-white/70">
                    {stat.description}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
