import type { Field } from 'payload'

export const projectImagesField: Field = {
  name: 'images',
  type: 'array',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  admin: {
    description: 'Add project images and mark one as featured for cards and the project page hero.',
    initCollapsed: false,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
