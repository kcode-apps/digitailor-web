import type { Media, Project } from '@/payload-types'

type ProjectWithImages = Pick<Project, 'images'>

export function getProjectGalleryMedia(project: ProjectWithImages): Media[] {
  return (project.images ?? [])
    .map((item) => item.image)
    .filter((image): image is Media => typeof image === 'object' && image !== null)
}

export function getProjectFeaturedImageIndex(project: ProjectWithImages): number {
  const items = project.images ?? []
  const featuredIndex = items.findIndex((item) => item.isFeatured)

  return featuredIndex >= 0 ? featuredIndex : 0
}

export function getProjectFeaturedImage(
  project: ProjectWithImages,
): (number | Media) | null | undefined {
  const images = project.images ?? []
  const featured = images.find((item) => item.isFeatured)

  return featured?.image ?? images[0]?.image
}

export function getProjectGallery(project: ProjectWithImages): NonNullable<Project['images']> {
  return project.images ?? []
}
