import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import EcommercePage from '@/components/pages/EcommercePage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ecommerce' })

  return {
    title: t('seo.title'),
    description: t('seo.description'),
  }
}

export default function EcommerceRoute() {
  return <EcommercePage />
}
