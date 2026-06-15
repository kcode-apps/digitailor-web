import type { Project } from '@/payload-types'

import RichText from '@/components/RichText'
import { EditorialHeadline, SectionLabel } from '@/components/brand'
import { ProjectGallery } from '@/components/projects/ProjectGallery'
import {
  getProjectFeaturedImageIndex,
  getProjectGalleryMedia,
} from '@/lib/cms/projects/images'
import React from 'react'

type ProjectPageProps = {
  project: Project
}

export const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const images = getProjectGalleryMedia(project)
  const featuredIndex = getProjectFeaturedImageIndex(project)

  return (
    <article className="border-b border-blush/20 bg-cream paper-texture">
      <div className="container py-12 md:py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            {project.client && <SectionLabel>{project.client}</SectionLabel>}
            <EditorialHeadline
              className="mt-4"
              lead={project.title}
              size="page"
              variant="serif"
            />
            <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">
              {project.excerpt}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ProjectGallery
              images={images}
              initialIndex={featuredIndex}
              priority
            />
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
