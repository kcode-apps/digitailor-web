import React, { Suspense } from 'react'

import { NavigationLoadingOverlay } from '@/components/layout/NavigationLoadingOverlay'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <NavigationLoadingOverlay />
      </Suspense>
      {children}
    </ThemeProvider>
  )
}
