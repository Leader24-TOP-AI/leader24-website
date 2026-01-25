'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSectors, getLocalizedValue } from '@/hooks/useCMSContent'
import { getIconComponent } from '@/lib/iconMap'

export default function SectorPreview() {
  const t = useTranslations('home.sectorPreview')
  const locale = useLocale() as 'it' | 'en'
  const { sectors, loading } = useSectors()

  // Get sector link based on locale
  const getSectorLink = (slug: string) =>
    locale === 'en' ? `/en/sectors/${slug}` : `/it/settori/${slug}`

  // Get all sectors link based on locale
  const getAllSectorsLink = () =>
    locale === 'en' ? '/en/sectors' : '/it/settori'

  // Take first 4 sectors
  const displaySectors = sectors.slice(0, 4)

  return (
    <section className="py-24 bg-white dark:bg-dark-card border-y border-gray-200 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="section-heading mb-4">{t('title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href={getAllSectorsLink()}
            className="hidden md:inline-flex items-center text-gray-900 dark:text-white font-medium hover:text-primary-light transition-colors group"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displaySectors.map((sector, index) => {
              const Icon = getIconComponent(sector.icon_name)
              const title = getLocalizedValue(sector, 'title', locale)

              return (
                <motion.div
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={getSectorLink(sector.slug)}
                    className="group p-8 rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-300 dark:border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center text-center hover:-translate-y-1 shadow-sm hover:shadow-lg hover:shadow-primary/10 h-full"
                  >
                    <div className={`p-4 rounded-xl ${sector.color_bg || 'bg-primary/10'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${sector.color_text || 'text-primary'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {title}
                    </h3>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link
            href={getAllSectorsLink()}
            className="inline-flex items-center text-gray-900 dark:text-white font-medium hover:text-primary-light transition-colors group"
          >
            {t('cta')}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
