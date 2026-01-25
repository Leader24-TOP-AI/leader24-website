'use client'

import { useTranslations, useLocale } from 'next-intl'
import type { SiteSetting } from '@/lib/cms/types'

interface LegalPageProps {
  pageKey: 'privacy' | 'cookie' | 'terms' | 'refund'
  legalSettings: Record<string, SiteSetting>
  contactSettings: Record<string, SiteSetting>
}

const pageTitles = {
  privacy: { it: 'Privacy Policy', en: 'Privacy Policy' },
  cookie: { it: 'Cookie Policy', en: 'Cookie Policy' },
  terms: { it: 'Termini di Servizio', en: 'Terms of Service' },
  refund: { it: 'Politica di Rimborso', en: 'Refund Policy' }
}

const pageDescriptions = {
  privacy: {
    it: 'Questa informativa descrive come Leader24 (Sevedo Co. Ltd.) raccoglie, utilizza e protegge le informazioni personali degli utenti.',
    en: 'This policy describes how Leader24 (Sevedo Co. Ltd.) collects, uses, and protects users\' personal information.'
  },
  cookie: {
    it: 'Questa informativa descrive come Leader24 utilizza i cookie e tecnologie simili sul nostro sito web.',
    en: 'This policy describes how Leader24 uses cookies and similar technologies on our website.'
  },
  terms: {
    it: 'Questi termini regolano l\'utilizzo dei servizi Leader24. Utilizzando i nostri servizi, accetti questi termini.',
    en: 'These terms govern the use of Leader24 services. By using our services, you accept these terms.'
  },
  refund: {
    it: 'Questa politica descrive le condizioni per richiedere un rimborso per i servizi Leader24.',
    en: 'This policy describes the conditions for requesting a refund for Leader24 services.'
  }
}

export default function LegalPage({ pageKey, legalSettings, contactSettings }: LegalPageProps) {
  const t = useTranslations('footer')
  const locale = useLocale() as 'it' | 'en'

  const title = pageTitles[pageKey][locale]
  const description = pageDescriptions[pageKey][locale]

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="glass-card p-8">
          <p className="text-lg mb-6">{description}</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {locale === 'it'
              ? 'Per ulteriori informazioni, contattaci utilizzando i recapiti di seguito.'
              : 'For more information, contact us using the details below.'
            }
          </p>
        </section>

        {/* Contact section */}
        <section className="glass-card p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {locale === 'it' ? 'Contatti' : 'Contact'}
          </h2>
          <ul className="list-none space-y-2">
            <li><strong>{legalSettings?.company_name?.value_it || 'Sevedo Co. Ltd.'}</strong></li>
            <li>
              {locale === 'it' ? 'Indirizzo' : 'Address'}: {legalSettings?.company_address?.value_it || '9/291 Vichitsongkran Road - Phuket, Thailand'}
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
              {locale === 'it' ? 'Telefono' : 'Phone'}: {contactSettings?.company_phone?.value_it || '+66 (0) 8-1087-1041'}
            </li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {locale === 'it'
            ? 'Ultimo aggiornamento: Gennaio 2026'
            : 'Last updated: January 2026'
          }
        </p>
      </div>
    </main>
  )
}
