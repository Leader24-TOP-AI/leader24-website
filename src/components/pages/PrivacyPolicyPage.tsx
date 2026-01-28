'use client'

import { useTranslations } from 'next-intl'

const PrivacyPolicyPage = () => {
  const t = useTranslations('policies.privacy')

  const purposeRows = t.raw('sections.purposes.rows') as string[][]

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {t('title')}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Section 1 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.dataController.title')}
          </h2>
          <p className="mb-4">
            {t('sections.dataController.intro')}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Sevedo Co. Ltd.</p>
            <p>9/291 Vichitsongkram Road, Kathu, Phuket, Thailand</p>
            <p>Email: info@leader24.ai</p>
          </div>
          <p>
            <strong>{t('sections.dataController.dpoLabel')}</strong> Marco Perdonò
          </p>
          <p>
            {t('sections.dataController.contactLabel')} info@leader24.ai
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.dataCollected.title')}
          </h2>
          <p className="mb-4">
            {t('sections.dataCollected.intro')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataCollected.directData.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {(t.raw('sections.dataCollected.directData.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataCollected.autoData.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {(t.raw('sections.dataCollected.autoData.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataCollected.serviceData.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {(t.raw('sections.dataCollected.serviceData.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className="mt-4 italic text-sm text-gray-500 dark:text-gray-400">
            {t('sections.dataCollected.disclaimer')}
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.purposes.title')}
          </h2>
          <p className="mb-4">
            {t('sections.purposes.intro')}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {(t.raw('sections.purposes.tableHeaders') as string[])[0]}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {(t.raw('sections.purposes.tableHeaders') as string[])[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {purposeRows.map((row, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {row[0]}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {row[1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.thirdParty.title')}
          </h2>
          <p className="mb-4">
            {t('sections.thirdParty.intro')}
          </p>

          <ul className="space-y-2">
            <li><strong>Stripe, Inc.</strong> - {t('sections.thirdParty.services.stripe')}</li>
            <li><strong>Google Analytics (Google LLC)</strong> - {t('sections.thirdParty.services.analytics')}</li>
            <li><strong>Meta Platforms, Inc. (Facebook Pixel)</strong> - {t('sections.thirdParty.services.meta')}</li>
            <li><strong>Supabase, Inc.</strong> - {t('sections.thirdParty.services.supabase')}</li>
            <li><strong>WhatsApp Business API (Meta Platforms, Inc.)</strong> - {t('sections.thirdParty.services.whatsapp')}</li>
          </ul>

          <p className="mt-4 text-sm">
            {t('sections.thirdParty.disclaimer')}
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.cookies.title')}
          </h2>
          <p className="mb-4">
            {t('sections.cookies.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t('sections.cookies.types.technical.title')}</strong>{' '}
              {t('sections.cookies.types.technical.desc')}
            </li>
            <li>
              <strong>{t('sections.cookies.types.analytics.title')}</strong>{' '}
              {t('sections.cookies.types.analytics.desc')}
            </li>
            <li>
              <strong>{t('sections.cookies.types.marketing.title')}</strong>{' '}
              {t('sections.cookies.types.marketing.desc')}
            </li>
          </ul>

          <p className="mt-4 text-sm">
            {t('sections.cookies.management')}
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.retention.title')}
          </h2>
          <p className="mb-4">
            {t('sections.retention.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t('sections.retention.periods.account.title')}</strong>{' '}
              {t('sections.retention.periods.account.desc')}
            </li>
            <li>
              <strong>{t('sections.retention.periods.whatsapp.title')}</strong>{' '}
              {t('sections.retention.periods.whatsapp.desc')}
            </li>
            <li>
              <strong>{t('sections.retention.periods.billing.title')}</strong>{' '}
              {t('sections.retention.periods.billing.desc')}
            </li>
            <li>
              <strong>{t('sections.retention.periods.analytics.title')}</strong>{' '}
              {t('sections.retention.periods.analytics.desc')}
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.transfers.title')}
          </h2>
          <p className="mb-4">
            {t('sections.transfers.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            {(t.raw('sections.transfers.safeguards') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section 8 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.rights.title')}
          </h2>
          <p className="mb-4">
            {t('sections.rights.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t('sections.rights.list.access.title')}</strong>{' '}
              {t('sections.rights.list.access.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.rectification.title')}</strong>{' '}
              {t('sections.rights.list.rectification.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.erasure.title')}</strong>{' '}
              {t('sections.rights.list.erasure.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.restriction.title')}</strong>{' '}
              {t('sections.rights.list.restriction.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.portability.title')}</strong>{' '}
              {t('sections.rights.list.portability.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.objection.title')}</strong>{' '}
              {t('sections.rights.list.objection.desc')}
            </li>
            <li>
              <strong>{t('sections.rights.list.withdraw.title')}</strong>{' '}
              {t('sections.rights.list.withdraw.desc')}
            </li>
          </ul>

          <p className="mt-4">
            {t('sections.rights.exerciseRights')}{' '}
            <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">info@leader24.ai</a>
          </p>
          <p className="mt-2 text-sm">
            {t('sections.rights.complaint')}
          </p>
        </section>

        {/* Section 9 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.security.title')}
          </h2>
          <p className="mb-4">
            {t('sections.security.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-1">
            {(t.raw('sections.security.measures') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section 10 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.age.title')}
          </h2>
          <p>
            {t('sections.age.content')}
          </p>
        </section>

        {/* Section 11 */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.changes.title')}
          </h2>
          <p className="mb-4">
            {t('sections.changes.content')}
          </p>
          <p className="text-sm">
            {t('sections.changes.notification')}
          </p>
        </section>

        {/* Section 12 - Contact */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.contact.title')}
          </h2>
          <p className="mb-4">
            {t('sections.contact.intro')}
          </p>

          <ul className="list-none space-y-2">
            <li><strong>Sevedo Co. Ltd.</strong></li>
            <li>
              {t('sections.contact.addressLabel')}: 9/291 Vichitsongkram Road, Kathu, Phuket, Thailand
            </li>
            <li>
              Email:{' '}
              <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
                info@leader24.ai
              </a>
            </li>
          </ul>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('lastUpdated')}
        </p>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage
