import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getLogoSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('key, value_it, value_en')
    .in('key', ['logo_light_url', 'logo_dark_url'])

  const settings: Record<string, { value_it: string; value_en: string }> = {}
  data?.forEach(item => {
    settings[item.key] = { value_it: item.value_it, value_en: item.value_en }
  })
  return settings
}

export default async function Footer() {
  const t = await getTranslations()
  const locale = await getLocale()
  const logoSettings = await getLogoSettings()

  // Route mapping
  const routes = {
    sectors: locale === 'it' ? '/settori' : '/sectors',
    pricing: locale === 'it' ? '/prezzi' : '/pricing',
    cases: locale === 'it' ? '/casi-studio' : '/case-studies',
    contact: locale === 'it' ? '/contatti' : '/contact',
    privacy: '/privacy-policy',
    cookie: '/cookie-policy',
    terms: '/terms-of-service',
    refund: '/refund-policy',
  }

  return (
    <footer className="bg-gray-100 dark:bg-dark-card border-t border-gray-200 dark:border-white/10 pt-12 pb-8 lg:pt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 text-left">
          <div className="col-span-2 lg:col-span-2 flex flex-col items-start">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSettings?.logo_dark_url?.value_it || '/logo-dark.png'} alt="Leader24 Logo" className="h-8 w-auto dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSettings?.logo_light_url?.value_it || '/logo.png'} alt="Leader24 Logo" className="h-8 w-auto hidden dark:block" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">{t('footer.product')}</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('footer.features')}</a></li>
              <li><Link href={`/${locale}${routes.sectors}`} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.sectors')}</Link></li>
              <li><Link href={`/${locale}${routes.cases}`} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.cases')}</Link></li>
              <li><Link href={`/${locale}${routes.pricing}`} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">{t('footer.support')}</h3>
            <ul className="space-y-3">
              <li><Link href={`/${locale}${routes.contact}`} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><a href={`https://docs.leader24.ai/${locale}/docs`} className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('footer.documentation')}</a></li>
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">{t('footer.status')}</a></li>
              <li className="text-base text-gray-600 dark:text-gray-400">info@leader24.ai</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-left gap-4">
          <p className="text-base text-gray-500 order-2 md:order-1 w-full md:w-auto text-center md:text-left">
            &copy; {new Date().getFullYear()} Leader24. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 order-1 md:order-2 w-full md:w-auto">
            <Link href={`/${locale}${routes.privacy}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">{t('footer.privacy')}</Link>
            <Link href={`/${locale}${routes.terms}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">{t('footer.terms')}</Link>
            <Link href={`/${locale}${routes.cookie}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">{t('footer.cookie')}</Link>
            <Link href={`/${locale}${routes.refund}`} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">{t('footer.refund')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
