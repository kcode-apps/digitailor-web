import type { About as AboutType } from '@/payload-types'

import { Media } from '@/components/Media'
import { Check } from 'lucide-react'
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
    <section className="border-b border-warm-border/60">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden bg-beige-dark lg:mx-0 lg:max-w-none">
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
            {about.overline && (
              <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
                {about.overline}
              </p>
            )}
            <h1 className="mt-4 font-serif text-3xl leading-[1.15] text-charcoal md:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">{bio}</p>

            {credentials.length > 0 && (
              <ul className="mt-8 space-y-3">
                {credentials.map((item, index) => (
                  <li className="flex items-start gap-3" key={index}>
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-charcoal"
                      strokeWidth={1.5}
                    />
                    <span className="font-sans text-sm text-charcoal">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="lg:col-span-3">
            <div className="border-t border-warm-border pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
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
