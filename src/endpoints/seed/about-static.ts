import type { RequiredDataFromCollectionSlug } from 'payload'

import { aboutPageData } from '@/endpoints/seed/about-page'

// Fallback when the About page has not been created in the Pages collection yet
export const aboutStatic: RequiredDataFromCollectionSlug<'pages'> = aboutPageData()
