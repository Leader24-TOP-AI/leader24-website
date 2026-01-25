'use client'

import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/cms/types'
import type { SectionContent } from '@/lib/cms/types'

interface CTAProps {
  sectionContent: Record<string, SectionContent>
}

const CTA = ({ sectionContent }: CTAProps) => {
  const locale = useLocale()
  const t = useTranslations('home.cta')

  const getCMS = (key: string, i18nKey: string) => {
    return getLocalizedValue(sectionContent[key], 'content', locale) || t(i18nKey)
  }

  return (
    <div className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-dark-bg z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 mix-blend-overlay"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
          {getCMS('cta_title', 'title')}
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          {getCMS('cta_subtitle', 'subtitle')}
        </p>
        <div className="flex justify-center">
          <a
            href={`https://dash.leader24.ai/${locale}`}
            className="btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20"
          >
            {getCMS('cta_button', 'primary')}
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          {getCMS('cta_footer', 'footer')}
        </p>
      </div>
    </div>
  )
}

export default CTA
