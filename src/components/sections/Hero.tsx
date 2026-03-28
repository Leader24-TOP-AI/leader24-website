'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from '@/context/ThemeContext'
import HeroChatRotator from './HeroChatRotator'
import { getLocalizedValue } from '@/lib/cms/types'
import type { ChatScenario, SiteSetting, SectionContent } from '@/lib/cms/types'

interface HeroProps {
  chatScenarios: ChatScenario[]
  heroSettings: Record<string, SiteSetting>
  sectionContent: Record<string, SectionContent>
}

const Hero = ({ chatScenarios, heroSettings, sectionContent }: HeroProps) => {
  const t = useTranslations('hero')
  const locale = useLocale()
  const { theme } = useTheme()

  const getCMS = (key: string, i18nKey: string) => {
    return getLocalizedValue(sectionContent[key], 'content', locale) || t(i18nKey)
  }

  // Rotating words
  const rotatingWordsRaw = getLocalizedValue(sectionContent['hero_rotating_words'], 'content', locale) || 'dormi'
  const rotatingWords = rotatingWordsRaw.split(',').map(w => w.trim()).filter(Boolean)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (rotatingWords.length <= 1) return
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % rotatingWords.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [rotatingWords.length])

  // Use scenarios from props, with fallback
  const scenarios = chatScenarios.length > 0 ? chatScenarios : [
    { id: 'ecommerce', sector_key: 'ecommerce' },
    { id: 'hotel', sector_key: 'hotel' },
    { id: 'restaurant', sector_key: 'restaurant' }
  ] as ChatScenario[]

  const [chatConfig, setChatConfig] = useState({
    selectedSectorId: 'ecommerce',
    speed: 1,
    isAutoPlay: true
  })

  // Video URLs from database with fallback
  const darkVideo = heroSettings?.hero_video_dark?.value_it || "https://vz-0e0772bf-9fb.b-cdn.net/e5530b4c-71c1-43d7-b166-4ee9c827afc2/play_720p.mp4"
  const lightVideo = heroSettings?.hero_video_light?.value_it || "https://vz-0e0772bf-9fb.b-cdn.net/75ce1227-684d-4df2-b651-0ac818788b9b/play_720p.mp4"

  const handleScenarioComplete = () => {
    if (chatConfig.isAutoPlay && scenarios.length > 0) {
      const currentIndex = scenarios.findIndex(s => s.id === chatConfig.selectedSectorId || s.sector_key === chatConfig.selectedSectorId)
      const nextIndex = (currentIndex + 1) % scenarios.length
      setChatConfig(prev => ({ ...prev, selectedSectorId: scenarios[nextIndex].id }))
    }
  }

  return (
    <div className="relative min-h-screen flex items-center pt-20 pb-12 md:pb-16 lg:pb-0 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-dark-bg z-0 transition-colors duration-300">
        <video
          key={theme}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80 dark:opacity-40"
        >
          <source src={theme === 'dark' ? darkVideo : lightVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-white/30 to-white/30 dark:from-primary/20 dark:via-dark-bg dark:to-dark-bg opacity-30 dark:opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-center">

        {/* Left Column: Text */}
        <div className="text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{getCMS('hero_badge', 'badge')}</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-heading leading-[1.1] text-gray-900 dark:text-white">
            {getCMS('hero_title', 'title')}
            <br />
            {getCMS('hero_title_prefix', '')}{' '}
            <span className="inline-block relative align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            {getCMS('hero_title_highlight', '') && (
              <>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                  {getCMS('hero_title_highlight', '')}
                </span>
              </>
            )}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            {getCMS('hero_subtitle', 'subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`https://dash.leader24.ai/${locale}/signup`} className="btn-primary group">
              {getCMS('hero_cta_primary', 'ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary">
              {getCMS('hero_cta_secondary', 'ctaSecondary')}
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{getCMS('hero_check_1', 'noCard')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{getCMS('hero_check_2', 'trial')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Demo */}
        <div className="relative flex flex-col items-center gap-8">
          <div className="w-full max-w-md">
            <HeroChatRotator
              scenarios={chatScenarios}
              selectedSectorId={chatConfig.selectedSectorId}
              speed={chatConfig.speed}
              isAutoPlay={chatConfig.isAutoPlay}
              onScenarioComplete={handleScenarioComplete}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
