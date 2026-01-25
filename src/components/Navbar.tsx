'use client'

import { useState, useEffect } from 'react'
import { UserRoundCheck, Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import LocaleLink from './LocaleLink'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useSiteSettings } from '@/hooks/useCMSContent'
import { useNavbarContext } from '@/context/NavbarContext'

const Navbar = () => {
  const { forceDarkText } = useNavbarContext()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const { settings: navbarSettings } = useSiteSettings('navbar')

  // When on dark hero (forceDarkText) and not scrolled, use light text
  const shouldUseLightText = forceDarkText && !scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Block scroll on both body and html for cross-browser support
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      // Fix for iOS Safari
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40
      }
    }
  }

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    })
  }

  // Navigation links with localized routes
  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.sectors'), href: locale === 'it' ? '/settori' : '/sectors' },
    { name: t('nav.pricing'), href: locale === 'it' ? '/prezzi' : '/pricing' },
    { name: t('nav.cases'), href: locale === 'it' ? '/casi-studio' : '/case-studies' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center z-50">
            <LocaleLink href="/" className="flex-shrink-0 flex items-center gap-2">
              {/* Dark logo: shown in light mode when NOT on dark hero */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={navbarSettings?.logo_dark_url?.value_it || '/logo-dark.png'}
                alt="Leader24 Logo"
                className={`h-8 w-auto ${shouldUseLightText ? 'hidden' : 'dark:hidden'}`}
              />
              {/* Light logo: shown in dark mode OR on dark hero in light mode */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={navbarSettings?.logo_light_url?.value_it || '/logo.png'}
                alt="Leader24 Logo"
                className={`h-8 w-auto ${shouldUseLightText ? 'block' : 'hidden dark:block'}`}
              />
            </LocaleLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <LocaleLink
                key={link.href}
                href={link.href}
                className={`transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                  shouldUseLightText
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.name}
              </LocaleLink>
            ))}

            <div className={`h-6 w-px mx-2 ${shouldUseLightText ? 'bg-white/30' : 'bg-gray-200 dark:bg-white/10'}`}></div>

            <LanguageSwitcher forceLightMode={shouldUseLightText} />
            <ThemeToggle forceLightMode={shouldUseLightText} />

            <a
              href={`https://dash.leader24.ai/${locale}`}
              className={`transition-colors px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                shouldUseLightText
                  ? 'text-white/90 hover:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <UserRoundCheck className="w-4 h-4" />
              {t('nav.login')}
            </a>
            <a href={`https://dash.leader24.ai/${locale}/signup`} className="btn-primary text-sm">
              Prova Gratis
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden z-50">
            <LanguageSwitcher forceLightMode={shouldUseLightText} />
            <ThemeToggle forceLightMode={shouldUseLightText} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-full focus:outline-none transition-colors ${
                shouldUseLightText
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-white dark:bg-dark-bg z-40 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto overscroll-contain"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                >
                  <LocaleLink
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-between group border-b border-gray-200 dark:border-white/5 pb-4"
                  >
                    {link.name}
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                  </LocaleLink>
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                className="pt-4 space-y-4"
              >
                <a
                  href={`https://dash.leader24.ai/${locale}`}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  <UserRoundCheck className="w-5 h-5" />
                  {t('nav.login')}
                </a>
                <a
                  href={`https://dash.leader24.ai/${locale}/signup`}
                  className="flex items-center justify-center w-full py-4 rounded-xl btn-primary font-bold text-lg shadow-lg shadow-primary/20"
                >
                  Inizia la Prova Gratuita
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
