import type { Field } from 'payload'

export const aboutContentField: Field = {
  name: 'aboutContent',
  type: 'group',
  admin: {
    condition: (_, siblingData) => siblingData?.pageType === 'about',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'credentials',
      type: 'array',
      labels: {
        singular: 'Credential',
        plural: 'Credentials',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sidebarItems',
      type: 'array',
      labels: {
        singular: 'Highlight',
        plural: 'Highlights',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
}
