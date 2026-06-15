import type { ProjectsPage as ProjectsPageGlobal } from '@/payload-types'

import { EditorialHeadline, SectionLabel } from '@/components/brand'
import React from 'react'

type ProjectsPageHeaderProps = {
  projectsPage: Pick<ProjectsPageGlobal, 'overline' | 'headline' | 'intro'>
}

export const ProjectsPageHeader: React.FC<ProjectsPageHeaderProps> = ({ projectsPage }) => {
  return (
    <header className="max-w-3xl">
      {projectsPage.overline && <SectionLabel>{projectsPage.overline}</SectionLabel>}
      <EditorialHeadline
        className="mt-4"
        lead={projectsPage.headline}
        size="page"
        variant="serif"
      />
      {projectsPage.intro && (
        <p className="mt-6 font-sans text-base leading-relaxed text-warm-gray md:text-lg">
          {projectsPage.intro}
        </p>
      )}
    </header>
  )
}
