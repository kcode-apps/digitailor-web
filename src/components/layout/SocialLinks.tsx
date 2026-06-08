import { cn } from '@/utilities/ui'
import { Instagram, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type SocialLinksProps = {
  instagram?: string | null
  linkedin?: string | null
  email?: string | null
  className?: string
  iconClassName?: string
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  instagram,
  linkedin,
  email,
  className,
  iconClassName,
}) => {
  const links = [
    instagram && { href: instagram, label: 'Instagram', icon: Instagram },
    linkedin && { href: linkedin, label: 'LinkedIn', icon: Linkedin },
    email && { href: `mailto:${email}`, label: 'Email', icon: Mail },
  ].filter(Boolean) as {
    href: string
    label: string
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  }[]

  if (links.length === 0) return null

  return (
    <nav aria-label="Social links" className={cn('flex items-center gap-4', className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          aria-label={label}
          className="text-off-white transition-opacity hover:opacity-70"
          href={href}
          {...(href.startsWith('http') ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        >
          <Icon aria-hidden className={cn('size-4', iconClassName)} strokeWidth={1.5} />
        </Link>
      ))}
    </nav>
  )
}
