'use client'

import { Globe } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'

// Route translations IT <-> EN
const routeTranslations: Record<string, Record<string, string>> = {
  it: {
    '/settori': '/sectors',
    '/prezzi': '/pricing',
    '/casi-studio': '/case-studies',
    '/contatti': '/contact',
  },
  en: {
    '/sectors': '/settori',
    '/pricing': '/prezzi',
    '/case-studies': '/casi-studio',
    '/contact': '/contatti',
  }
}

interface LanguageSwitcherProps {
  forceLightMode?: boolean
}

const LanguageSwitcher = ({ forceLightMode = false }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const newLocale = locale === 'it' ? 'en' : 'it'

  const handleLanguageSwitch = () => {
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

    // Translate path segments if needed
    let translatedPath = pathWithoutLocale
    const translations = routeTranslations[locale]

    if (translations) {
      // Check if the path or a part of it needs translation
      for (const [from, to] of Object.entries(translations)) {
        if (translatedPath.startsWith(from)) {
          translatedPath = translatedPath.replace(from, to)
          break
        }
      }
    }

    // Navigate to new locale
    const newPath = `/${newLocale}${translatedPath === '/' ? '' : translatedPath}`
    router.push(newPath)
  }

  return (
    <button
      onClick={handleLanguageSwitch}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        forceLightMode
          ? 'text-white/90 hover:text-white hover:bg-white/10'
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
      }`}
      title={newLocale === 'en' ? 'Switch to English' : "Passa all'Italiano"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{locale}</span>
    </button>
  )
}

export default LanguageSwitcher
