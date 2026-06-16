import type { Field } from 'payload'

export const projectImagesField: Field = {
  name: 'images',
  type: 'array',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    description:
      'Add project images and mark one as featured. Recommended: 800×1000px (4:5) for cards; 1600×1000px (16:10) for the project page gallery. Upload the highest resolution available.',
    initCollapsed: false,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Recommended: 1600×1000px (16:10) minimum for gallery; 800×1000px (4:5) works for featured cards.',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Only one image can be featured at a time.',
      },
    },
  ],
}
