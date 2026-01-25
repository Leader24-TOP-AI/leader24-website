import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Don't add locale prefix for default locale
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  // Exclude: api routes, _next, static files, admin routes
  matcher: [
    '/',
    '/(it|en)/:path*',
    // Exclude these paths from i18n
    '/((?!api|_next|_vercel|admin|.*\\..*).*)'
  ]
}
