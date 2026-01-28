'use client'

import { useTranslations } from 'next-intl'

interface CookieItem {
  cookie: string
  purpose: string
}

const CookiePolicyPage = () => {
  const t = useTranslations('policies.cookie')

  const necessaryCookies = t.raw('sections.cookieList.necessary.items') as CookieItem[]
  const performanceCookies = t.raw('sections.cookieList.performance.items') as CookieItem[]
  const marketingCookies = t.raw('sections.cookieList.marketing.items') as CookieItem[]

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        {t('title')}
      </h1>

      <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {/* Introduction */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <p className="mb-4">
            {t('sections.intro.content1')}
          </p>
          <p>
            {t('sections.intro.content2')}
          </p>
        </section>

        {/* How We Use Cookies */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.howWeUse.title')}
          </h2>

          <p className="mb-6">
            {t('sections.howWeUse.intro')}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('sections.howWeUse.purposes.authentication.title')}
              </h3>
              <p>
                {t('sections.howWeUse.purposes.authentication.content')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('sections.howWeUse.purposes.security.title')}
              </h3>
              <p>
                {t('sections.howWeUse.purposes.security.content')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('sections.howWeUse.purposes.preferences.title')}
              </h3>
              <p>
                {t('sections.howWeUse.purposes.preferences.content')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('sections.howWeUse.purposes.analytics.title')}
              </h3>
              <p>
                {t('sections.howWeUse.purposes.analytics.content')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {t('sections.howWeUse.purposes.marketing.title')}
              </h3>
              <p>
                {t('sections.howWeUse.purposes.marketing.content')}
              </p>
            </div>
          </div>
        </section>

        {/* Your Choices */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.yourChoices.title')}
          </h2>

          <p className="mb-4">
            {t('sections.yourChoices.intro')}
          </p>

          <ul className="list-disc pl-6 space-y-3 mb-6">
            <li>
              <strong>{t('sections.yourChoices.options.banner.title')}</strong>{' '}
              {t('sections.yourChoices.options.banner.content')}
            </li>
            <li>
              <strong>{t('sections.yourChoices.options.browser.title')}</strong>{' '}
              {t('sections.yourChoices.options.browser.content')}
            </li>
          </ul>

          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              {t('sections.yourChoices.warning')}
            </p>
          </div>
        </section>

        {/* Do Not Track */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.doNotTrack.title')}
          </h2>
          <p>
            {t('sections.doNotTrack.content')}
          </p>
        </section>

        {/* Third Party Services */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.thirdParty.title')}
          </h2>
          <p className="mb-4">
            {t('sections.thirdParty.intro')}
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Meta Privacy Policy
              </a>
            </li>
            <li>
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                Supabase Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        {/* Updates */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.updates.title')}
          </h2>
          <p>
            {t('sections.updates.content')}
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('sections.contact.title')}
          </h2>
          <p className="mb-4">
            {t('sections.contact.intro')}
          </p>
          <p>
            Email:{' '}
            <a href="mailto:info@leader24.ai" className="text-blue-400 hover:text-blue-300 transition-colors">
              info@leader24.ai
            </a>
          </p>
        </section>

        {/* Appendix - Cookie Tables */}
        <section className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            {t('sections.cookieList.title')}
          </h2>

          {/* Strictly Necessary Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {t('sections.cookieList.necessary.title')}
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.type')}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.purpose')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {necessaryCookies.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                      {item.cookie}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {t('sections.cookieList.types.firstParty')}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {item.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Performance Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {t('sections.cookieList.performance.title')}
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.type')}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.purpose')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {performanceCookies.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                      {item.cookie}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {t('sections.cookieList.types.thirdParty')}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {item.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Marketing Cookies */}
          <h3 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
            {t('sections.cookieList.marketing.title')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800/50">
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    Cookie
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.type')}
                  </th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left text-gray-900 dark:text-white">
                    {t('sections.cookieList.tableHeaders.purpose')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketingCookies.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 font-mono text-xs">
                      {item.cookie}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {t('sections.cookieList.types.thirdParty')}
                    </td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">
                      {item.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          {t('lastUpdated')}
        </p>
      </div>
    </main>
  )
}

export default CookiePolicyPage
