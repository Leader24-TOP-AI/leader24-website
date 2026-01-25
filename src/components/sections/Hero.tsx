'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useTheme } from '@/context/ThemeContext'
import { useSiteSettings } from '@/hooks/useCMSContent'
import HeroChatRotator from './HeroChatRotator'

const defaultScenarios = [
  { id: 'ecommerce' },
  { id: 'hotel' },
  { id: 'restaurant' }
]

const Hero = () => {
  const t = useTranslations('hero')
  const locale = useLocale()
  const { theme } = useTheme()
  const { settings: urlSettings } = useSiteSettings('urls')

  const [chatConfig, setChatConfig] = useState({
    selectedSectorId: 'ecommerce',
    speed: 1,
    isAutoPlay: true
  })

  // Video URLs from database with fallback
  const darkVideo = urlSettings?.hero_video_dark?.value_it || "https://vz-0e0772bf-9fb.b-cdn.net/e5530b4c-71c1-43d7-b166-4ee9c827afc2/play_720p.mp4"
  const lightVideo = urlSettings?.hero_video_light?.value_it || "https://vz-0e0772bf-9fb.b-cdn.net/75ce1227-684d-4df2-b651-0ac818788b9b/play_720p.mp4"

  const handleScenarioComplete = () => {
    if (chatConfig.isAutoPlay && defaultScenarios.length > 0) {
      const currentIndex = defaultScenarios.findIndex(s => s.id === chatConfig.selectedSectorId)
      const nextIndex = (currentIndex + 1) % defaultScenarios.length
      setChatConfig(prev => ({ ...prev, selectedSectorId: defaultScenarios[nextIndex].id }))
    }
  }

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Text */}
        <div className="text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.1] text-gray-900 dark:text-white">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">WhatsApp</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={`https://dash.leader24.ai/${locale}/signup`} className="btn-primary group">
              {t('ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary">
              {t('ctaSecondary')}
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{t('noCard')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>{t('trial')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Demo */}
        <div className="relative flex flex-col items-center gap-8">
          <div className="w-full max-w-md">
            <HeroChatRotator
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
