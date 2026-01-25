import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import CaseStudiesPage from '@/components/pages/CaseStudiesPage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'casestudies' })

  return {
    title: t('seo.title'),
    description: t('seo.description'),
  }
}

export default function CaseStudiesEnPage() {
  return <CaseStudiesPage />
}
