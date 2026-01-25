'use client'

import { useTranslations } from 'next-intl'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useIntegrations, Integration } from '@/hooks/useCMSContent'

// Fallback integrations (used while loading or if DB is empty)
const fallbackIntegrations: Integration[] = [
  { id: 'gmail', name: 'Gmail', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', is_active: true, display_order: 1 },
  { id: 'gcal', name: 'Google Calendar', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg', is_active: true, display_order: 2 },
  { id: 'slack', name: 'Slack', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', is_active: true, display_order: 3 },
  { id: 'zendesk', name: 'Zendesk', logo_url: 'https://cdn.simpleicons.org/zendesk', is_active: true, display_order: 4 },
  { id: 'mailchimp', name: 'Mailchimp', logo_url: 'https://cdn.simpleicons.org/mailchimp', is_active: true, display_order: 5 },
  { id: 'calendly', name: 'Calendly', logo_url: 'https://cdn.simpleicons.org/calendly', is_active: true, display_order: 6 },
  { id: 'woocommerce', name: 'WooCommerce', logo_url: 'https://cdn.simpleicons.org/woocommerce', is_active: true, display_order: 7 },
  { id: 'wordpress', name: 'WordPress', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg', is_active: true, display_order: 8 },
]

export default function Integrations() {
  const t = useTranslations('home.integrations')
  const { integrations: dbIntegrations, loading } = useIntegrations()

  // Use DB integrations if available, otherwise fallback
  const tools = dbIntegrations.length > 0 ? dbIntegrations : fallbackIntegrations

  if (loading) {
    return (
      <div className="py-20 bg-white dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <section className="py-20 bg-white dark:bg-dark-bg border-y border-gray-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 md:px-8">
          {/* First set of logos */}
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-center w-20 sm:w-24 md:w-32 h-12 sm:h-14 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={tool.logo_url}
                alt={tool.name}
                width={128}
                height={64}
                className="max-w-full max-h-full object-contain"
                unoptimized
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {tools.map((tool) => (
            <div
              key={`${tool.id}-duplicate`}
              className="flex items-center justify-center w-20 sm:w-24 md:w-32 h-12 sm:h-14 md:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
            >
              <Image
                src={tool.logo_url}
                alt={tool.name}
                width={128}
                height={64}
                className="max-w-full max-h-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Gradient masks for smooth fade edges */}
        <div className="absolute top-0 left-0 w-12 sm:w-20 md:w-32 h-full bg-gradient-to-r from-white dark:from-dark-bg to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-12 sm:w-20 md:w-32 h-full bg-gradient-to-l from-white dark:from-dark-bg to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  )
}
