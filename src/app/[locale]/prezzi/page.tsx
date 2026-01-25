import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
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

export default async function PrezziPage({ params }: Props) {
  const { locale } = await params

  // Redirect English users to /pricing
  if (locale === 'en') {
    redirect('/en/pricing')
  }

  const plans = await getPricingPlans()

  return <PricingPage plans={plans} />
}
