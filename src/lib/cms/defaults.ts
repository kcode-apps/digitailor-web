/** Starter content for seed + ensure only — DB is the frontend source of truth. */
export const siteDefaults = {
  siteName: 'DIGITAILOR',
  siteTagline: 'by Devmini',
  copyright: '© 2024 DIGITAILOR. All rights reserved.',
  primaryCtaLabel: 'BOOK A DISCOVERY CALL',
  discoveryCallModalDescription:
    "Share your details and preferred time. We'll follow up to confirm your call.",
  hero: {
    headline: 'Built for the Future of',
    headlineAccent: 'Fashion Production.',
    subheadline:
      'Helping fashion brands create faster workflows, scalable content, and smarter digital production through 3D and AI.',
    taglineLead: 'One digital garment.',
    taglineAccent: 'Endless possibilities.',
    heroCta: {
      type: 'custom' as const,
      label: 'VIEW OUR WORK',
      url: '/projects',
      newTab: false,
    },
  },
  outputs: {
    overline: 'ONE DIGITAL GARMENT.',
    headline: 'Multiple outputs. Maximum impact.',
    body: 'Create everything your brand needs from one digital foundation.',
    cta: {
      type: 'custom' as const,
      label: 'EXPLORE ALL OUTPUTS',
      url: '/projects',
      newTab: false,
    },
    cards: [
      { label: 'Ecommerce', isVideo: false },
      { label: 'Campaign', isVideo: false },
      { label: 'Social Content', isVideo: false },
      { label: 'Editorial', isVideo: false },
      { label: 'Video / Motion', isVideo: true },
    ],
  },
  impact: {
    overline: 'THE IMPACT',
    stats: [
      {
        icon: 'clock' as const,
        headline: '30–40%',
        subheading: 'Faster development workflows',
        description: 'Accelerate product development from concept to approval.',
      },
      {
        icon: 'cube' as const,
        headline: 'Reduced',
        subheading: 'Physical sampling dependency',
        description: 'Minimize physical samples and waste with 3D-first workflows.',
      },
      {
        icon: 'image' as const,
        headline: 'Scalable',
        subheading: 'Ecommerce content creation',
        description: 'Produce consistent, on-brand content at scale across every channel.',
      },
      {
        icon: 'document' as const,
        headline: 'One Digital Garment',
        subheading: 'Multiple campaign outputs',
        description: 'Maximize every asset with limitless creative possibilities.',
      },
    ],
  },
  about: {
    overline: 'About Devmini',
    headline: 'Where Fashion Expertise Meets Digital Innovation.',
    bio: 'Devmini brings deep fashion industry knowledge together with cutting-edge 3D and AI workflows — helping brands move from concept to campaign faster, with less waste and more creative control.',
    credentials: [
      { label: 'Expert in Browzwear & CLO3D' },
      { label: 'AI-assisted visualization workflows' },
      { label: 'End-to-end digital product creation' },
    ],
    sidebarItems: [
      {
        title: '8+ Years in Fashion Design',
        description:
          'Experience across product development, technical design, and digital prototyping.',
      },
      {
        title: 'Global Perspective',
        description: 'Worked with brands and suppliers across Europe, Asia, and North America.',
      },
      {
        title: 'Fashion-First Mindset',
        description: 'Technology in service of craft — not the other way around.',
      },
    ],
  },
  projectsPage: {
    overline: 'Case Studies',
    headline: 'Selected projects and digital production work.',
    intro:
      'Explore DIGITAILOR case studies in 3D, AI, and digital fashion production — from concept to campaign-ready output.',
    emptyStateMessage: 'New projects will be published here soon.',
  },
  servicesPage: {
    overline: 'SERVICES',
    headline: 'From Concept to Campaign.',
    headlineAccent: 'Digitally.',
    subheadline: 'Fashion Design • 3D Product Creation • AI Visual Content',
    description:
      'At DIGITAILOR, we combine design expertise, 3D technology, and AI creativity to help fashion brands develop better products and powerful visuals—faster.',
    valueProps: [
      { icon: 'clock' as const, label: 'FASTER DEVELOPMENT' },
      { icon: 'dollar' as const, label: 'REDUCED SAMPLING COSTS' },
      { icon: 'check' as const, label: 'SMARTER DECISIONS' },
      { icon: 'heart' as const, label: 'STRONGER BRANDS' },
    ],
    sectionOverline: 'WHAT WE DO',
    emptyStateMessage: 'Services will appear here once published.',
  },
}

/** Starter data for seed + ensure only — not used by frontend components. */
export function siteSettingsStarterData(options?: { discoveryCallFormId?: number }) {
  return {
    siteName: siteDefaults.siteName,
    siteTagline: siteDefaults.siteTagline,
    copyright: siteDefaults.copyright,
    primaryCtaLabel: siteDefaults.primaryCtaLabel,
    discoveryCallModalDescription: siteDefaults.discoveryCallModalDescription,
    ...(options?.discoveryCallFormId
      ? { discoveryCallForm: options.discoveryCallFormId }
      : {}),
  }
}

/** Starter data for seed + ensure only — not used by frontend components. */
export function homepageStarterData() {
  return {
    headline: siteDefaults.hero.headline,
    headlineAccent: siteDefaults.hero.headlineAccent,
    subheadline: siteDefaults.hero.subheadline,
    taglineLead: siteDefaults.hero.taglineLead,
    taglineAccent: siteDefaults.hero.taglineAccent,
    heroCta: siteDefaults.hero.heroCta,
    outputs: siteDefaults.outputs,
    impact: siteDefaults.impact,
  }
}

/** Text-only homepage reset for seed clear — omits cards so media FKs can be deleted. */
export function homepageClearData() {
  return {
    headline: siteDefaults.hero.headline,
    headlineAccent: siteDefaults.hero.headlineAccent,
    subheadline: siteDefaults.hero.subheadline,
    taglineLead: siteDefaults.hero.taglineLead,
    taglineAccent: siteDefaults.hero.taglineAccent,
    heroCta: siteDefaults.hero.heroCta,
    outputs: {
      overline: siteDefaults.outputs.overline,
      headline: siteDefaults.outputs.headline,
      body: siteDefaults.outputs.body,
      cta: siteDefaults.outputs.cta,
      cards: [],
    },
    impact: siteDefaults.impact,
  }
}

export function homepageSeedData(mediaIds: number[]) {
  const cards = siteDefaults.outputs.cards.map((card, index) => ({
    ...card,
    image: mediaIds[index % mediaIds.length],
  }))

  return {
    ...homepageStarterData(),
    outputs: {
      ...siteDefaults.outputs,
      cards,
    },
  }
}

/** Starter data for seed + ensure only — not used by frontend components. */
export function aboutStarterData() {
  return {
    overline: siteDefaults.about.overline,
    headline: siteDefaults.about.headline,
    bio: siteDefaults.about.bio,
    credentials: siteDefaults.about.credentials,
    sidebarItems: siteDefaults.about.sidebarItems,
  }
}

/** Starter data for seed + ensure only — not used by frontend components. */
export function projectsPageStarterData() {
  return {
    overline: siteDefaults.projectsPage.overline,
    headline: siteDefaults.projectsPage.headline,
    intro: siteDefaults.projectsPage.intro,
    emptyStateMessage: siteDefaults.projectsPage.emptyStateMessage,
  }
}

/** Starter data for seed + ensure only — not used by frontend components. */
export function servicesPageStarterData() {
  return {
    overline: siteDefaults.servicesPage.overline,
    headline: siteDefaults.servicesPage.headline,
    headlineAccent: siteDefaults.servicesPage.headlineAccent,
    subheadline: siteDefaults.servicesPage.subheadline,
    description: siteDefaults.servicesPage.description,
    valueProps: siteDefaults.servicesPage.valueProps,
    sectionOverline: siteDefaults.servicesPage.sectionOverline,
    emptyStateMessage: siteDefaults.servicesPage.emptyStateMessage,
  }
}
