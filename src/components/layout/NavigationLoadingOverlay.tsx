'use client'

import React from 'react'

import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { useNavigationPending } from '@/hooks/useNavigationPending'

export const NavigationLoadingOverlay: React.FC = () => {
  const pending = useNavigationPending()

  return <LoadingOverlay label="Loading..." open={pending} scope="viewport" />
}
