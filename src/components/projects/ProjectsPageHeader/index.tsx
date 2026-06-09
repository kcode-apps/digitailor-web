import type { ProjectsPage as ProjectsPageGlobal } from '@/payload-types'

import React from 'react'

type ProjectsPageHeaderProps = {
  projectsPage: Pick<ProjectsPageGlobal, 'overline' | 'headline' | 'intro'>
}

export const ProjectsPageHeader: React.FC<ProjectsPageHeaderProps> = ({ projectsPage }) => {
  return (
    <header className="max-w-3xl">
      {projectsPage.overline && (
        <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
          {projectsPage.overline}
        </p>
      )}
      <h1 className="mt-4 font-serif text-3xl leading-[1.12] text-charcoal md:text-4xl lg:text-5xl">
        {projectsPage.headline}
      </h1>
      {projectsPage.intro && (
        <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">
          {projectsPage.intro}
        </p>
      )}
    </header>
  )
}
