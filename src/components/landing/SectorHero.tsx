'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Sector } from '@/hooks/useCMSContent'
import { getLocalizedValue } from '@/hooks/useCMSContent'
import { useNavbarContext } from '@/context/NavbarContext'

interface SectorHeroProps {
  sector: Sector
  locale: 'it' | 'en'
}

export default function SectorHero({ sector, locale }: SectorHeroProps) {
  const isEnglish = locale === 'en'
  const { setForceDarkText } = useNavbarContext()

  const title = getLocalizedValue(sector, 'hero_title', locale) || getLocalizedValue(sector, 'title', locale)
  const subtitle = getLocalizedValue(sector, 'hero_subtitle', locale) || getLocalizedValue(sector, 'description', locale)
  const ctaText = getLocalizedValue(sector, 'hero_cta_text', locale) || (isEnglish ? 'Try Free' : 'Prova Gratis')
  const ctaUrl = sector?.hero_cta_url || `https://dash.leader24.ai/${locale}/signup`
  const hasBackgroundImage = !!sector?.hero_background_url

  // Set navbar to use light text when hero has dark background image
  useEffect(() => {
    setForceDarkText(hasBackgroundImage)
    return () => setForceDarkText(false) // Reset on unmount
  }, [hasBackgroundImage, setForceDarkText])

  return (
    <section className="min-h-screen flex items-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      {hasBackgroundImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sector.hero_background_url})` }}
        />
      )}

      {/* Overlay for text readability (when image is present) */}
      {hasBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900 dark:to-dark-bg z-0" />
      )}

      {/* Fallback gradient (no image) */}
      {!hasBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent z-0" />
      )}

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Main Heading */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
            hasBackgroundImage
              ? 'text-white'
              : 'text-gray-900 dark:text-white'
          }`}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${
            hasBackgroundImage
              ? 'text-gray-200'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {subtitle}
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a
              href={ctaUrl}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className={`mt-4 text-sm ${
              hasBackgroundImage
                ? 'text-gray-300'
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {isEnglish ? 'No credit card required' : 'Nessuna carta di credito richiesta'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
