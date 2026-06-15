import type { About as AboutType } from '@/payload-types'

import { EditorialHeadline, SectionLabel } from '@/components/brand'
import { Media } from '@/components/Media'
import React from 'react'

type AboutPageProps = {
  about: AboutType
}

export const AboutPage: React.FC<AboutPageProps> = ({ about }) => {
  const headline = about.headline
  const bio = about.bio
  const credentials = about.credentials || []
  const sidebarItems = about.sidebarItems || []

  return (
    <section className="border-b border-blush/20 bg-cream paper-texture">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-sm bg-cream-dark shadow-[0_8px_24px_rgb(26_26_26_/0.06)] lg:mx-0 lg:max-w-none lg:translate-x-4">
              {about.portrait && typeof about.portrait === 'object' ? (
                <Media
                  fill
                  imgClassName="object-cover"
                  priority
                  resource={about.portrait}
                  size="(max-width: 1024px) 100vw, 33vw"
                />
              ) : (
                <div className="flex size-full items-center justify-center font-sans text-xs uppercase tracking-[0.14em] text-warm-gray">
                  Portrait
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            {about.overline && <SectionLabel>{about.overline}</SectionLabel>}
            <EditorialHeadline
              className="mt-4"
              lead={headline}
              size="page"
              variant="serif"
            />
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">{bio}</p>

            {credentials.length > 0 && (
              <ul className="mt-8 space-y-3">
                {credentials.map((item, index) => (
                  <li className="flex items-start gap-3" key={index}>
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-blush" />
                    <span className="font-sans text-sm text-charcoal">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="lg:col-span-3">
            <div className="border-t border-blush/20 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <ul className="space-y-8">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-charcoal">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="mt-2 font-sans text-sm leading-relaxed text-warm-gray">
                        {item.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
