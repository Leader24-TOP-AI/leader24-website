import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import SectorsPage from '@/components/pages/SectorsPage'
import { getSectors, getSectionContent } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sectors' })

  return {
    title: `${t('title')} | Leader24`,
    description: t('subtitle'),
  }
}

export default async function SectorsRoute() {
  const [sectors, sectionContent] = await Promise.all([
    getSectors(),
    getSectionContent([
      'sectors_title', 'sectors_subtitle',
      'sectors_cta_title', 'sectors_cta_desc', 'sectors_cta_button'
    ])
  ])

  return <SectorsPage sectors={sectors} sectionContent={sectionContent} />
}
