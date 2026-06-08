import { Cormorant_Garamond, DM_Sans } from 'next/font/google'

export const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
})

export const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})
