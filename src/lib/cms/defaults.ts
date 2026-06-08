export const siteDefaults = {
  siteName: 'DIGITAILOR',
  siteTagline: 'by Devmini',
  copyright: '© 2024 DIGITAILOR. All rights reserved.',
  primaryCta: {
    type: 'custom' as const,
    label: 'BOOK A DISCOVERY CALL',
    url: '/contact',
    newTab: false,
  },
  hero: {
    headline: 'Built for the Future of Fashion Production.',
    subheadline:
      'End-to-end 3D and AI workflows that transform how fashion brands design, develop, and deliver.',
    heroCta: {
      type: 'custom' as const,
      label: 'VIEW OUR WORK',
      url: '/case-studies',
      newTab: false,
    },
  },
}
