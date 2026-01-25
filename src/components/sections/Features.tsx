'use client'

import { Clock, Zap, BarChart3, ShieldCheck, BookOpen, FileCheck, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useHomepageFeatures, useSectionContent, getLocalizedValue } from '@/hooks/useCMSContent'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Clock, Zap, BarChart3, ShieldCheck, BookOpen, FileCheck
}

const Features = () => {
  const t = useTranslations('home.features')
  const locale = useLocale()
  const { features: dbFeatures, loading } = useHomepageFeatures()
  const { content: sectionContent } = useSectionContent(['features_title', 'features_subtitle'])

  // Use DB features if available, otherwise use fallback i18n
  const features = dbFeatures.length > 0
    ? dbFeatures.map(f => ({
        title: getLocalizedValue(f, 'title', locale),
        description: getLocalizedValue(f, 'description', locale),
        icon: iconMap[f.icon_name] || Clock
      }))
    : [
        { title: t('items.time.title'), description: t('items.time.desc'), icon: Clock },
        { title: t('items.available.title'), description: t('items.available.desc'), icon: Zap },
        { title: t('items.setup.title'), description: t('items.setup.desc'), icon: FileCheck },
        { title: t('items.analytics.title'), description: t('items.analytics.desc'), icon: BarChart3 },
        { title: t('items.knowledge.title'), description: t('items.knowledge.desc'), icon: BookOpen },
        { title: t('items.security.title'), description: t('items.security.desc'), icon: ShieldCheck }
      ]

  // Get title and subtitle from CMS or fallback to i18n
  const title = getLocalizedValue(sectionContent.features_title, 'content', locale) || t('title')
  const subtitle = getLocalizedValue(sectionContent.features_subtitle, 'content', locale) || t('subtitle')

  if (loading) {
    return (
      <div className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-primary-light tracking-widest uppercase mb-3">{t('badge')}</h2>
          <p className="section-heading">
            {title}
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-4 sm:p-6 md:p-8 group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary-light mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-white/5 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
