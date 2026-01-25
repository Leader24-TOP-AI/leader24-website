'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSectors, useSectionContent, getLocalizedValue } from '@/hooks/useCMSContent'
import { getIconComponent } from '@/lib/iconMap'

export default function SectorsPage() {
  const locale = useLocale() as 'it' | 'en'
  const { sectors, loading } = useSectors()
  const { content: sectionContent } = useSectionContent([
    'sectors_title', 'sectors_subtitle',
    'sectors_cta_title', 'sectors_cta_desc', 'sectors_cta_button'
  ])

  // Helper to get CMS content with fallback
  const getCMS = (key: string, fallback: string) => {
    return getLocalizedValue(sectionContent[key], 'content', locale) || fallback
  }

  // Generate sector landing page link
  const getSectorLink = (slug: string) => {
    if (locale === 'en') {
      return `/en/sectors/${slug}`
    }
    return `/it/settori/${slug}`
  }

  const pageTitle = getCMS('sectors_title', locale === 'it' ? 'I Nostri Settori' : 'Our Sectors')
  const pageSubtitle = getCMS('sectors_subtitle',
    locale === 'it'
      ? 'Soluzioni AI personalizzate per ogni settore'
      : 'Custom AI solutions for every industry'
  )

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-heading"
        >
          {pageTitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
        >
          {pageSubtitle}
        </motion.p>
      </div>

      {/* Sectors Grid */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {locale === 'it' ? 'Caricamento settori...' : 'Loading sectors...'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => {
            const Icon = getIconComponent(sector.icon_name)
            const title = getLocalizedValue(sector, 'title', locale)
            const description = getLocalizedValue(sector, 'description', locale)
            const imageUrl = sector.image_url

            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={getSectorLink(sector.slug)}
                  className="glass-card relative overflow-hidden p-8 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 group border border-gray-200 dark:border-white/5 hover:border-primary/30 hover:scale-[1.02] block h-full"
                >
                  {/* Background Image with Overlay */}
                  {imageUrl && (
                    <>
                      <div
                        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      />
                      <div className="absolute inset-0 z-0 bg-white/90 dark:bg-dark-bg/90 group-hover:bg-white/80 dark:group-hover:bg-dark-bg/80 transition-colors duration-500" />
                    </>
                  )}

                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${sector.color_bg || 'bg-primary/10'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${sector.color_text || 'text-primary'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 min-h-[80px] group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {description}
                    </p>
                    <span className="text-gray-900 dark:text-white font-medium inline-flex items-center group-hover:text-primary transition-colors">
                      {locale === 'it' ? 'Scopri di più' : 'Learn more'}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-0" />
        <div className="relative z-10 p-12 md:p-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {getCMS('sectors_cta_title', locale === 'it' ? 'Non trovi il tuo settore?' : "Don't see your industry?")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
            {getCMS('sectors_cta_desc',
              locale === 'it'
                ? 'Crea e testa il tuo agente AI personalizzato in pochi minuti.'
                : 'Create and test your custom AI agent in minutes.'
            )}
          </p>
          <a
            href={`https://dash.leader24.ai/${locale}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {getCMS('sectors_cta_button', locale === 'it' ? 'Inizia Ora' : 'Start Now')}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </main>
  )
}
