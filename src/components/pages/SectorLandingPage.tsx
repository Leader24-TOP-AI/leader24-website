'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useSector } from '@/hooks/useCMSContent'

// Landing page sections
import SectorHero from '@/components/landing/SectorHero'
import SectorUseCases from '@/components/landing/SectorUseCases'
import SectorSocialProof from '@/components/landing/SectorSocialProof'
import SectorFAQ from '@/components/landing/SectorFAQ'
import SectorFinalCTA from '@/components/landing/SectorFinalCTA'

interface SectorLandingPageProps {
  slug: string
}

export default function SectorLandingPage({ slug }: SectorLandingPageProps) {
  const locale = useLocale() as 'it' | 'en'
  const isEnglish = locale === 'en'
  const { sector, loading, error } = useSector(slug)

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    )
  }

  // Error or not found state
  if (error || !sector) {
    return (
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {isEnglish ? 'Sector not found' : 'Settore non trovato'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {isEnglish
            ? 'The sector you are looking for does not exist.'
            : 'Il settore che stai cercando non esiste.'
          }
        </p>
        <Link
          href={isEnglish ? '/en/sectors' : '/it/settori'}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {isEnglish ? 'Back to sectors' : 'Torna ai settori'}
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
      <SectorFAQ sectorSlug={slug} locale={locale} />

      {/* Section 5: Final CTA */}
      <SectorFinalCTA sector={sector} locale={locale} />
    </>
  )
}
