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

  // Route mapping (all use English slugs now)
  const routes = {
    sectors: '/sectors',
    pricing: '/pricing',
    cases: '/case-studies',
    contact: '/contact',
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
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
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
            &copy; {new Date().getFullYear()} Leader24 - Sevedo Co. Ltd. {t('footer.rights')}
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
