'use client'

import React, { createContext, use, useMemo } from 'react'

import type { Theme, ThemeContextType } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: 'light',
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo<ThemeContextType>(
    () => ({
      setTheme: () => null,
      theme: 'light' as Theme,
    }),
    [],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
