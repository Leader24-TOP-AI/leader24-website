import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { ThemeProvider } from '@/context/ThemeContext'
import { NavbarProvider } from '@/context/NavbarContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getSiteSettings } from '@/lib/cms/server'
import CookieConsentBanner from '@/components/CookieConsent'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  // Validate that the incoming locale is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Fetch messages and navbar settings in parallel
  const [messages, navbarSettings] = await Promise.all([
    getMessages(),
    getSiteSettings('navbar')
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      <CookieConsentBanner locale={locale} />
      <ThemeProvider>
        <NavbarProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
            <Navbar settings={navbarSettings} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NavbarProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
