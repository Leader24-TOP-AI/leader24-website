'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/cms/types'
import type { Sector, UseCase } from '@/lib/cms/types'
import { getIconComponent } from '@/lib/iconMap'

interface SectorUseCasesProps {
  sector: Sector
  locale: string
}

export default function SectorUseCases({ sector, locale }: SectorUseCasesProps) {
  const t = useTranslations('sectors')
  const sectorTitle = getLocalizedValue(sector, 'title', locale)

  const title = getLocalizedValue(sector, 'usecases_title', locale) ||
    t('usecases.titleTemplate', { sector: sectorTitle })

  // Get usecases for the current locale with fallback chain
  const getUsecases = (): UseCase[] => {
    const localeMap: Record<string, keyof Sector> = {
      it: 'usecases_it',
      en: 'usecases_en',
      es: 'usecases_es',
      fr: 'usecases_fr',
      de: 'usecases_de'
    }
    const primaryKey = localeMap[locale] || 'usecases_en'
    const primaryUsecases = sector[primaryKey] as UseCase[] | undefined
    if (primaryUsecases && primaryUsecases.length > 0) return primaryUsecases
    // Fallback to English, then Italian
    return (sector.usecases_en || sector.usecases_it || [])
  }

  const usecases = getUsecases()

  // Don't render if no use cases
  if (!usecases || usecases.length === 0) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-card/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usecases.map((usecase, index) => {
            const Icon = getIconComponent(usecase.icon)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon - Always use primary blue color */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {usecase.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {usecase.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
