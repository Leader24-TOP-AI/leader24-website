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
    title: locale === 'it' ? 'Settori | Leader24' : 'Sectors | Leader24',
    description: locale === 'it'
      ? 'Scopri come Leader24 aiuta le aziende di ogni settore con soluzioni AI personalizzate'
      : 'Discover how Leader24 helps businesses across industries with custom AI solutions',
  }
}

export default async function SettoriPage({ params }: Props) {
  const { locale } = await params

  // If English locale, redirect to /sectors
  if (locale === 'en') {
    redirect('/en/sectors')
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
