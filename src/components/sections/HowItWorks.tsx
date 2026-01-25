'use client'

import { MessageSquare, Bot, BarChart3, FolderOpen, Zap, Upload, Settings, Play, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useHomepageSteps, useSectionContent, getLocalizedValue } from '@/hooks/useCMSContent'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  FolderOpen, MessageSquare, BarChart3, Zap, Upload, Settings, Play, Bot
}

const HowItWorks = () => {
  const t = useTranslations('home.howItWorks')
  const locale = useLocale()
  const { steps: dbSteps, loading } = useHomepageSteps()
  const { content: sectionContent } = useSectionContent(['how_it_works_title', 'how_it_works_subtitle'])

  // Use DB steps if available, otherwise use fallback i18n
  const steps = dbSteps.length > 0
    ? dbSteps.map(s => ({
        number: String(s.step_number).padStart(2, '0'),
        title: getLocalizedValue(s, 'title', locale),
        description: getLocalizedValue(s, 'description', locale),
        icon: iconMap[s.icon_name] || Bot
      }))
    : [
        { number: '01', title: t('steps.1.title'), description: t('steps.1.desc'), icon: Bot },
        { number: '02', title: t('steps.2.title'), description: t('steps.2.desc'), icon: MessageSquare },
        { number: '03', title: t('steps.3.title'), description: t('steps.3.desc'), icon: BarChart3 }
      ]

  // Get title and subtitle from CMS or fallback to i18n
  const title = getLocalizedValue(sectionContent.how_it_works_title, 'content', locale) || t('title')
  const subtitle = getLocalizedValue(sectionContent.how_it_works_subtitle, 'content', locale) || t('subtitle')

  if (loading) {
    return (
      <div className="py-24 bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="py-24 bg-gray-50 dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="section-heading mb-6">{title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 z-0"></div>

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 flex items-center justify-center mb-8 shadow-lg shadow-gray-200/50 dark:shadow-black/50 group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-300 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border-2 border-gray-50 dark:border-dark-bg">
                  {step.number}
                </div>
                <step.icon className="w-10 h-10 text-primary-light group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
