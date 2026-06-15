import { SectionRule, type SectionRuleProps } from '@/components/brand'

type ServicesSectionHeaderProps = {
  overline?: string | null
}

export const ServicesSectionHeader: React.FC<ServicesSectionHeaderProps> = ({ overline }) => {
  if (!overline) return null

  return <SectionRule label={overline} />
}
