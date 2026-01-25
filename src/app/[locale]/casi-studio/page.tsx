import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import CaseStudiesPage from '@/components/pages/CaseStudiesPage'
import { getCaseStudies, getSectionContent } from '@/lib/cms/server'

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

export default async function CasiStudioPage() {
  const [caseStudies, sectionContent] = await Promise.all([
    getCaseStudies(),
    getSectionContent([
      'casestudies_title', 'casestudies_subtitle',
      'casestudies_cta_title', 'casestudies_cta_button'
    ])
  ])

  return <CaseStudiesPage caseStudies={caseStudies} sectionContent={sectionContent} />
}
