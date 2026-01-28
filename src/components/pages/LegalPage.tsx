'use client'

import { useTranslations, useLocale } from 'next-intl'
import type { SiteSetting } from '@/lib/cms/types'

interface LegalPageProps {
  pageKey: 'privacy' | 'cookie' | 'terms' | 'refund'
  legalSettings: Record<string, SiteSetting>
  contactSettings: Record<string, SiteSetting>
}

export default function LegalPage({ pageKey, legalSettings, contactSettings }: LegalPageProps) {
  const t = useTranslations('legal')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const title = t(`titles.${pageKey}`)
  const description = t(`descriptions.${pageKey}`)

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="glass-card p-8">
          <p className="text-lg mb-6">{description}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {tCommon('moreInfo')}
          </p>
        </section>

        {/* Contact section */}
        <section className="glass-card p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('contact')}
          </h2>
          <ul className="list-none space-y-2">
            <li><strong>{legalSettings?.company_name?.value_it || 'Sevedo Co. Ltd.'}</strong></li>
            <li>
              {tCommon('address')}: {legalSettings?.company_address?.value_it || '9/291 Vichitsongkran Road - Phuket, Thailand'}
            </li>
            <li>
              Email:{' '}
              <a
                href={`mailto:${contactSettings?.company_email?.value_it || 'info@leader24.ai'}`}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {contactSettings?.company_email?.value_it || 'info@leader24.ai'}
              </a>
            </li>
            <li>
              {tCommon('phone')}: {contactSettings?.company_phone?.value_it || '+66 (0) 8-1087-1041'}
            </li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {tCommon('lastUpdated')}
        </p>
      </div>
    </main>
  )
}
