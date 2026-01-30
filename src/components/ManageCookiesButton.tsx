'use client'

import * as CookieConsent from 'vanilla-cookieconsent'

export default function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
    >
      {label}
    </button>
  )
}
