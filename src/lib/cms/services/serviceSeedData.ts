import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type ServiceSeedArgs = {
  displayNumber: string
  title: string
  icon: 'clock' | 'dollar' | 'check' | 'heart' | 'cube' | 'image' | 'sparkles' | 'pencil' | 'users' | 'layers'
  features: string[]
  footerLabel: string
  footerText: string
  sortOrder: number
  image?: Media
}

const service = ({
  displayNumber,
  features,
  footerLabel,
  footerText,
  icon,
  image,
  sortOrder,
  title,
}: ServiceSeedArgs): RequiredDataFromCollectionSlug<'services'> => ({
  displayNumber,
  title,
  icon,
  features: features.map((label) => ({ label })),
  footerLabel,
  footerText,
  sortOrder,
  ...(image ? { image: image.id } : {}),
})

export const serviceStarterData = (): RequiredDataFromCollectionSlug<'services'>[] => [
  service({
    displayNumber: '01',
    title: '3D Product Development',
    icon: 'cube',
    sortOrder: 1,
    features: [
      '3D garment creation in CLO3D & Browzwear',
      'Fabric, trims & colorway application',
      'Technical presentations',
      'Virtual sample reviews',
    ],
    footerLabel: 'IDEAL FOR:',
    footerText: 'Brands, product teams, suppliers & manufacturers.',
  }),
  service({
    displayNumber: '02',
    title: 'Digital Fit Validation',
    icon: 'users',
    sortOrder: 2,
    features: [
      'Avatar fitting',
      'Fit issue identification',
      'Garment adjustments',
      'Construction & production recommendations',
    ],
    footerLabel: 'BENEFITS:',
    footerText: 'Fewer sampling rounds, lower costs, more confidence.',
  }),
  service({
    displayNumber: '03',
    title: 'AI Fashion Visuals',
    icon: 'image',
    sortOrder: 3,
    features: [
      'Editorial & eCommerce imagery',
      'Lifestyle campaigns',
      'Collection launch assets',
      'Social media content',
    ],
    footerLabel: 'IDEAL FOR:',
    footerText: 'Brands seeking fast, scalable & cost-effective visual content.',
  }),
  service({
    displayNumber: '04',
    title: 'Sketch to Marketing Visuals',
    icon: 'pencil',
    sortOrder: 4,
    features: [
      'Sketch enhancement',
      'AI rendering & colorway visualization',
      'Collection boards',
      'Retail-ready imagery',
    ],
    footerLabel: 'PERFECT FOR:',
    footerText: 'Design reviews, buyer meetings & marketing prep before samples.',
  }),
  service({
    displayNumber: '05',
    title: 'Lingerie & Intimates Design Consulting',
    icon: 'layers',
    sortOrder: 5,
    features: [
      'Collection concepts & trend interpretation',
      'Range architecture',
      'Newness & product gap analysis',
      'Design direction with commercial focus',
    ],
    footerLabel: 'EXPERTISE:',
    footerText: 'In-depth experience across global intimate apparel brands.',
  }),
  service({
    displayNumber: '06',
    title: 'AI Campaign Creation',
    icon: 'sparkles',
    sortOrder: 6,
    features: [
      'Campaign concept & art direction',
      'AI generated photography',
      'Short form video creation',
      'Complete social content packages',
    ],
    footerLabel: 'IDEAL FOR:',
    footerText: 'Brands that want premium campaigns delivered at speed.',
  }),
]

export const serviceSeedData = (images: Media[]) =>
  serviceStarterData().map((item, index) =>
    service({
      displayNumber: item.displayNumber,
      title: item.title,
      icon: item.icon,
      sortOrder: item.sortOrder,
      features: (item.features || []).map((feature) => feature.label),
      footerLabel: item.footerLabel || '',
      footerText: item.footerText || '',
      image: images[index % images.length],
    }),
  )
