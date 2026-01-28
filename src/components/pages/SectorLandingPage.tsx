'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Sector, FAQ } from '@/lib/cms/types'

// Landing page sections
import SectorHero from '@/components/landing/SectorHero'
import SectorUseCases from '@/components/landing/SectorUseCases'
import SectorSocialProof from '@/components/landing/SectorSocialProof'
import SectorFAQ from '@/components/landing/SectorFAQ'
import SectorFinalCTA from '@/components/landing/SectorFinalCTA'

interface SectorLandingPageProps {
  sector: Sector | null
  sectorFAQs: FAQ[]
}

export default function SectorLandingPage({ sector, sectorFAQs }: SectorLandingPageProps) {
  const locale = useLocale()
  const t = useTranslations('sectors')

  // Error or not found state
  if (!sector) {
    return (
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('notFound.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('notFound.desc')}
        </p>
        <Link
          href={`/${locale}/sectors`}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('notFound.cta')}
        </Link>
      </main>
    )
  }

  return (
    <>
      {/* Section 1: Hero */}
      <SectorHero sector={sector} locale={locale} />

      {/* Section 2: Use Cases */}
      <SectorUseCases sector={sector} locale={locale} />

      {/* Section 3: Social Proof */}
      <SectorSocialProof sector={sector} locale={locale} />

      {/* Section 4: FAQ */}
      <SectorFAQ faqs={sectorFAQs} locale={locale} />

      {/* Section 5: Final CTA */}
      <SectorFinalCTA sector={sector} locale={locale} />
    </>
  )
}
