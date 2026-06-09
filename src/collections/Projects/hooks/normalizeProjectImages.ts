import type { CollectionBeforeChangeHook, CollectionBeforeValidateHook } from 'payload'

import type { Project } from '@/payload-types'

type ProjectImage = NonNullable<Project['images']>[number]

function normalizeFeaturedSelection(images: ProjectImage[]): ProjectImage[] {
  if (images.length === 0) {
    return images
  }

  const featuredIndexes = images.reduce<number[]>((indexes, item, index) => {
    if (item.isFeatured) {
      indexes.push(index)
    }

    return indexes
  }, [])

  if (featuredIndexes.length === 0) {
    return images.map((item, index) => ({
      ...item,
      isFeatured: index === 0,
    }))
  }

  const featuredIndex = featuredIndexes[featuredIndexes.length - 1]

  return images.map((item, index) => ({
    ...item,
    isFeatured: index === featuredIndex,
  }))
}

export const normalizeProjectImages: CollectionBeforeChangeHook<Project> = ({ data }) => {
  if (!data?.images) {
    return data
  }

  return {
    ...data,
    images: normalizeFeaturedSelection(data.images),
  }
}

export const validateProjectImages: CollectionBeforeValidateHook<Project> = ({ data }) => {
  if (data?._status === 'published' && (!data.images || data.images.length === 0)) {
    throw new Error('Published projects require at least one image.')
  }

  return data
}
