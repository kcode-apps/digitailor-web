import type { Project } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import React from 'react'

type ProjectPageProps = {
  project: Project
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  return (
    <article className="border-b border-warm-border/60">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            {project.client && (
              <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
                {project.client}
              </p>
            )}
            <h1 className="mt-4 font-serif text-3xl leading-[1.12] text-charcoal md:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">
              {project.excerpt}
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-beige-dark">
              {project.featuredImage && typeof project.featuredImage === 'object' ? (
                <Media
                  fill
                  imgClassName="object-cover"
                  priority
                  resource={project.featuredImage}
                  size="(max-width: 1024px) 100vw, 58vw"
                />
              ) : null}
            </div>
          </div>
        </div>

        {project.content && (
          <div className="prose prose-neutral mt-12 max-w-3xl dark:prose-invert md:mt-16">
            <RichText data={project.content} enableGutter={false} />
          </div>
        )}
      </div>
    </article>
  )
}
