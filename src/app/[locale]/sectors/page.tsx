import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import SectorsPage from '@/components/pages/SectorsPage'
import { getSectors, getSectionContent } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'en' ? 'Sectors | Leader24' : 'Settori | Leader24',
    description: locale === 'en'
      ? 'Discover how Leader24 helps businesses across industries with custom AI solutions'
      : 'Scopri come Leader24 aiuta le aziende di ogni settore con soluzioni AI personalizzate',
  }
}

export default async function SectorsRoute({ params }: Props) {
  const { locale } = await params

  // If Italian locale, redirect to /settori
  if (locale === 'it') {
    redirect('/it/settori')
  }

  const [sectors, sectionContent] = await Promise.all([
    getSectors(),
    getSectionContent([
      'sectors_title', 'sectors_subtitle',
      'sectors_cta_title', 'sectors_cta_desc', 'sectors_cta_button'
    ])
  ])

  return <SectorsPage sectors={sectors} sectionContent={sectionContent} />
}
