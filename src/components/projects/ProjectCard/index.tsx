import type { Project } from '@/payload-types'

import { getProjectFeaturedImage } from '@/lib/cms/projects/images'
import { Media } from '@/components/Media'
import Link from 'next/link'
import React from 'react'

type ProjectCardProps = {
  project: Pick<Project, 'title' | 'slug' | 'client' | 'excerpt' | 'images'>
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const featuredImage = getProjectFeaturedImage(project)

  return (
    <article className="group border border-warm-border/60 bg-beige">
      <Link className="block" href={`/projects/${project.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-beige-dark">
          {featuredImage && typeof featuredImage === 'object' ? (
            <Media
              fill
              imgClassName="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              resource={featuredImage}
              size="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs uppercase tracking-[0.14em] text-warm-gray">
              Project image
            </div>
          )}
        </div>
        <div className="p-6">
          {project.client && (
            <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-warm-gray">
              {project.client}
            </p>
          )}
          <h2 className="mt-3 font-serif text-2xl leading-tight text-charcoal">{project.title}</h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-warm-gray">{project.excerpt}</p>
        </div>
      </Link>
    </article>
  )
}
