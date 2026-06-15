import {
  Box,
  Check,
  Clock,
  DollarSign,
  Heart,
  Image as ImageIcon,
  Layers,
  Pencil,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'

import type { ServiceIcon } from '@/fields/serviceIcon'

export const serviceIconMap: Record<ServiceIcon, LucideIcon> = {
  clock: Clock,
  dollar: DollarSign,
  check: Check,
  heart: Heart,
  cube: Box,
  image: ImageIcon,
  sparkles: Sparkles,
  pencil: Pencil,
  users: Users,
  layers: Layers,
}

export function getServiceIcon(icon?: ServiceIcon | null): LucideIcon {
  return serviceIconMap[icon || 'cube']
}
