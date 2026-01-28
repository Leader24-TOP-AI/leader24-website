'use client'

import { ChevronDown } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { locales, type Locale } from '@/i18n/config'

// Language display names and flags
const languageConfig: Record<Locale, { name: string; flag: string }> = {
  it: { name: 'Italiano', flag: '🇮🇹' },
  en: { name: 'English', flag: '🇬🇧' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
}

interface LanguageSwitcherProps {
  forceLightMode?: boolean
}

const LanguageSwitcher = ({ forceLightMode = false }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSwitch = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    // Remove current locale from path and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

    setIsOpen(false)
    router.push(newPath)
  }

  const currentLang = languageConfig[locale]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          forceLightMode
            ? 'text-white/90 hover:text-white hover:bg-white/10'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg border z-50 ${
            forceLightMode
              ? 'bg-gray-900 border-white/20'
              : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-white/10'
          }`}
          role="listbox"
        >
          {locales.map((loc) => {
            const lang = languageConfig[loc]
            const isSelected = loc === locale
            return (
              <button
                key={loc}
                onClick={() => handleLanguageSwitch(loc)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  isSelected
                    ? forceLightMode
                      ? 'bg-white/10 text-white'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : forceLightMode
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {isSelected && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
