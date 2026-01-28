import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import PricingPage from '@/components/pages/PricingPage'
import { getPricingPlans } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pricing' })

  return {
    title: `${t('title')} | Leader24`,
    description: t('subtitle'),
  }
}

export default async function PricingPageRoute() {
  const plans = await getPricingPlans()

  return <PricingPage plans={plans} />
}
