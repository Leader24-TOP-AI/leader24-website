'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getLocalizedValue } from '@/lib/cms/types'
import type { Sector } from '@/lib/cms/types'

interface SectorFinalCTAProps {
  sector: Sector
  locale: 'it' | 'en'
}

export default function SectorFinalCTA({ sector, locale }: SectorFinalCTAProps) {
  const isEnglish = locale === 'en'

  const sectorTitle = getLocalizedValue(sector, 'title', locale)
  const title = getLocalizedValue(sector, 'final_cta_title', locale) ||
    (isEnglish
      ? `Ready to transform your ${sectorTitle}?`
      : `Pronto a trasformare il tuo ${sectorTitle}?`
    )
  const subtitle = getLocalizedValue(sector, 'final_cta_subtitle', locale) ||
    (isEnglish
      ? 'Start your free trial today. No credit card required.'
      : 'Inizia la tua prova gratuita oggi. Nessuna carta di credito richiesta.'
    )
  const ctaText = getLocalizedValue(sector, 'hero_cta_text', locale) || (isEnglish ? 'Start Free Trial' : 'Inizia Prova Gratuita')
  const ctaUrl = sector?.hero_cta_url || `https://dash.leader24.ai/${locale}/signup`

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* CTA Button */}
          <a
            href={ctaUrl}
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
