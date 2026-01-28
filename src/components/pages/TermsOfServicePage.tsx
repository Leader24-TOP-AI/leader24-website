'use client'

import { useTranslations } from 'next-intl'

const TermsOfServicePage = () => {
  const t = useTranslations('policies.terms')

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {t('title')}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Section 1 - Introduction */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.introduction.title')}
          </h2>
          <p className="mb-4">
            {t('sections.introduction.content')}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="font-semibold text-gray-900 dark:text-white">Sevedo Co. Ltd.</p>
            <p>9/291 Vichitsongkram Road, Kathu, Phuket, Thailand</p>
            <p>Email: info@leader24.ai</p>
          </div>
        </section>

        {/* Section 2 - Acceptance */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.acceptance.title')}
          </h2>
          <p className="mb-4">
            {t('sections.acceptance.content')}
          </p>
          <p className="mb-4">
            {t('sections.acceptance.organizationUse')}
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              {t('sections.acceptance.warning')}
            </p>
          </div>
        </section>

        {/* Section 3 - Service Description */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.serviceDescription.title')}
          </h2>
          <p className="mb-4">
            {t('sections.serviceDescription.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {(t.raw('sections.serviceDescription.features') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {t('sections.serviceDescription.disclaimer')}
          </p>
        </section>

        {/* Section 4 - User Accounts */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.userAccounts.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.userAccounts.registration.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.userAccounts.registration.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.userAccounts.security.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.userAccounts.security.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.userAccounts.organizations.title')}
          </h3>
          <p>
            {t('sections.userAccounts.organizations.content')}
          </p>
        </section>

        {/* Section 5 - Pricing and Payments */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.pricing.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.pricing.credits.title')}
          </h3>
          <p className="mb-4">
            {t('sections.pricing.credits.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.pricing.subscriptions.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.pricing.subscriptions.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.pricing.changes.title')}
          </h3>
          <p className="mb-4">
            {t('sections.pricing.changes.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.pricing.refunds.title')}
          </h3>
          <p>
            {t('sections.pricing.refunds.content')}
          </p>
        </section>

        {/* Section 6 - Acceptable Use */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.acceptableUse.title')}
          </h2>
          <p className="mb-4">
            {t('sections.acceptableUse.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {(t.raw('sections.acceptableUse.prohibitedActions') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 font-medium">
              {t('sections.acceptableUse.warning')}
            </p>
          </div>
        </section>

        {/* Section 7 - Third-Party Services */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.thirdPartyServices.title')}
          </h2>
          <p className="mb-4">
            {t('sections.thirdPartyServices.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li><strong>Stripe, Inc.</strong> - {t('sections.thirdPartyServices.services.stripe')}</li>
            <li><strong>Google Analytics (Google LLC)</strong> - {t('sections.thirdPartyServices.services.analytics')}</li>
            <li><strong>Meta Platforms, Inc.</strong> - {t('sections.thirdPartyServices.services.meta')}</li>
            <li><strong>Supabase, Inc.</strong> - {t('sections.thirdPartyServices.services.supabase')}</li>
            <li><strong>WhatsApp Business API (Meta Platforms, Inc.)</strong> - {t('sections.thirdPartyServices.services.whatsapp')}</li>
          </ul>
          <p className="mb-4">
            {t('sections.thirdPartyServices.termsNote')}
          </p>
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('sections.thirdPartyServices.disclaimer')}
            </p>
          </div>
        </section>

        {/* Section 8 - Technical Restrictions */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.technicalRestrictions.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.technicalRestrictions.useRestrictions.title')}
          </h3>
          <p className="mb-2">
            {t('sections.technicalRestrictions.useRestrictions.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.technicalRestrictions.useRestrictions.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.technicalRestrictions.apiLimits.title')}
          </h3>
          <p className="mb-4">
            {t('sections.technicalRestrictions.apiLimits.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.technicalRestrictions.apiLimits.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {t('sections.technicalRestrictions.apiLimits.disclaimer')}
          </p>
        </section>

        {/* Section 9 - Confidentiality */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.confidentiality.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.confidentiality.information.title')}
          </h3>
          <p className="mb-4">
            {t('sections.confidentiality.information.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.confidentiality.protection.title')}
          </h3>
          <p className="mb-4">
            {t('sections.confidentiality.protection.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.confidentiality.disclosure.title')}
          </h3>
          <p className="mb-4">
            {t('sections.confidentiality.disclosure.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.confidentiality.feedback.title')}
          </h3>
          <p>
            {t('sections.confidentiality.feedback.content')}
          </p>
        </section>

        {/* Section 10 - Data */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.dataRetention.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataRetention.userInfo.title')}
          </h3>
          <p className="mb-4">
            {t('sections.dataRetention.userInfo.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataRetention.userSubmissions.title')}
          </h3>
          <p className="mb-4">
            {t('sections.dataRetention.userSubmissions.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataRetention.serviceData.title')}
          </h3>
          <p className="mb-4">
            {t('sections.dataRetention.serviceData.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataRetention.retention.title')}
          </h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.dataRetention.retention.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.dataRetention.protection.title')}
          </h3>
          <p>
            {t('sections.dataRetention.protection.content')}
          </p>
        </section>

        {/* Section 11 - Intellectual Property */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.intellectualProperty.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.intellectualProperty.ourProperty.title')}
          </h3>
          <p className="mb-4">
            {t('sections.intellectualProperty.ourProperty.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.intellectualProperty.yourProperty.title')}
          </h3>
          <p className="mb-4">
            {t('sections.intellectualProperty.yourProperty.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.intellectualProperty.license.title')}
          </h3>
          <p>
            {t('sections.intellectualProperty.license.content')}
          </p>
        </section>

        {/* Section 12 - AI Disclaimer */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.aiDisclaimer.title')}
          </h2>
          <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg p-4 mb-4">
            <p className="text-blue-800 dark:text-blue-200">
              {t('sections.aiDisclaimer.intro')}
            </p>
          </div>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {(t.raw('sections.aiDisclaimer.limitations') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="font-medium text-gray-900 dark:text-white">
            {t('sections.aiDisclaimer.recommendation')}
          </p>
        </section>

        {/* Section 13 - Limitation of Liability */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.liability.title')}
          </h2>
          <p className="mb-4 uppercase font-medium text-sm">
            {t('sections.liability.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            {(t.raw('sections.liability.items') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section 14 - Termination */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.termination.title')}
          </h2>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.termination.byYou.title')}
          </h3>
          <p className="mb-4">
            {t('sections.termination.byYou.content')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.termination.byUs.title')}
          </h3>
          <p className="mb-4">
            {t('sections.termination.byUs.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            {(t.raw('sections.termination.byUs.reasons') as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {t('sections.termination.effects.title')}
          </h3>
          <p>
            {t('sections.termination.effects.content')}
          </p>
        </section>

        {/* Section 15 - Changes to Terms */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.changes.title')}
          </h2>
          <p className="mb-4">
            {t('sections.changes.content')}
          </p>
          <p className="mb-4">
            {t('sections.changes.notification')}
          </p>
        </section>

        {/* Section 16 - Governing Law */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.governingLaw.title')}
          </h2>
          <p className="mb-4">
            {t('sections.governingLaw.content')}
          </p>
          <p className="mb-4">
            {t('sections.governingLaw.jurisdiction')}
          </p>
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            {t('sections.governingLaw.euNote')}
          </p>
        </section>

        {/* Section 17 - Dispute Resolution */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.disputes.title')}
          </h2>
          <p className="mb-4">
            {t('sections.disputes.content')}
          </p>
          <p>
            {t('sections.disputes.contact')}
          </p>
        </section>

        {/* Section 18 - Miscellaneous */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.miscellaneous.title')}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>{t('sections.miscellaneous.entireAgreement.title')}</strong>{' '}
              {t('sections.miscellaneous.entireAgreement.content')}
            </li>
            <li>
              <strong>{t('sections.miscellaneous.severability.title')}</strong>{' '}
              {t('sections.miscellaneous.severability.content')}
            </li>
            <li>
              <strong>{t('sections.miscellaneous.waiver.title')}</strong>{' '}
              {t('sections.miscellaneous.waiver.content')}
            </li>
            <li>
              <strong>{t('sections.miscellaneous.assignment.title')}</strong>{' '}
              {t('sections.miscellaneous.assignment.content')}
            </li>
            <li>
              <strong>{t('sections.miscellaneous.forceMajeure.title')}</strong>{' '}
              {t('sections.miscellaneous.forceMajeure.content')}
            </li>
          </ul>
        </section>

        {/* Section 19 - Contact */}
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

export default TermsOfServicePage
