import type { Field } from 'payload'

export const serviceIconOptions = [
  { label: 'Clock', value: 'clock' },
  { label: 'Dollar sign', value: 'dollar' },
  { label: 'Check', value: 'check' },
  { label: 'Heart', value: 'heart' },
  { label: 'Cube', value: 'cube' },
  { label: 'Image', value: 'image' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Pencil', value: 'pencil' },
  { label: 'Users', value: 'users' },
  { label: 'Layers', value: 'layers' },
] as const

export type ServiceIcon = (typeof serviceIconOptions)[number]['value']

export const serviceIconField: Field = {
  name: 'icon',
  type: 'select',
  defaultValue: 'cube',
  options: [...serviceIconOptions],
  required: true,
}
