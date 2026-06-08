import type { Field } from 'payload'

export const socialLinksField: Field = {
  name: 'socialLinks',
  type: 'group',
  label: 'Social links',
  fields: [
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact email',
    },
  ],
}
