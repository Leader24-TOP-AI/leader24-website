'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { getIconComponent } from '@/lib/iconMap'
import type { ChatScenario } from '@/lib/cms/types'

// Fallback scenarios (used if DB is empty)
const defaultScenarios: ChatScenario[] = [
  {
    id: 'ecommerce',
    sector_key: 'ecommerce',
    sector_name_it: 'E-commerce',
    sector_name_en: 'E-commerce',
    icon_name: 'ShoppingCart',
    color: 'text-blue-400',
    bg_color: 'bg-blue-500/20',
    user_message_it: 'Ciao, vorrei sapere se avete la taglia M disponibile per la giacca blu',
    user_message_en: 'Hi, I would like to know if you have size M available for the blue jacket',
    ai_message_it: "Ciao! Sì, la giacca blu è disponibile in taglia M. Vuoi che ti invii il link per l'acquisto?",
    ai_message_en: 'Hello! Yes, the blue jacket is available in size M. Would you like me to send you the purchase link?',
    options_it: [],
    options_en: [],
    stat_it: 'Risposta istantanea',
    stat_en: 'Instant response',
    is_active: true,
    display_order: 1
  },
  {
    id: 'hotel',
    sector_key: 'hotel',
    sector_name_it: 'Hotel & Hospitality',
    sector_name_en: 'Hotel & Hospitality',
    icon_name: 'Building2',
    color: 'text-purple-400',
    bg_color: 'bg-purple-500/20',
    user_message_it: 'Vorrei prenotare una camera doppia per il weekend del 15 marzo',
    user_message_en: 'I would like to book a double room for the weekend of March 15',
    ai_message_it: 'Perfetto! Abbiamo disponibilità per il 15-16 marzo. Camera doppia con colazione a €120/notte. Procedo con la prenotazione?',
    ai_message_en: 'Perfect! We have availability for March 15-16. Double room with breakfast at €120/night. Shall I proceed with the booking?',
    options_it: [],
    options_en: [],
    stat_it: 'Prenotazioni 24/7',
    stat_en: 'Bookings 24/7',
    is_active: true,
    display_order: 2
  },
  {
    id: 'restaurant',
    sector_key: 'restaurant',
    sector_name_it: 'Ristorante',
    sector_name_en: 'Restaurant',
    icon_name: 'Utensils',
    color: 'text-orange-400',
    bg_color: 'bg-orange-500/20',
    user_message_it: 'Tavolo per 4 persone stasera alle 20:30 è possibile?',
    user_message_en: 'Table for 4 people tonight at 8:30 PM, is it possible?',
    ai_message_it: 'Buongiorno! Sì, abbiamo disponibilità per 4 persone alle 20:30. A che nome devo registrare la prenotazione?',
    ai_message_en: 'Good morning! Yes, we have availability for 4 people at 8:30 PM. What name should I register the reservation under?',
    options_it: [],
    options_en: [],
    stat_it: 'Conferma immediata',
    stat_en: 'Instant confirmation',
    is_active: true,
    display_order: 3
  }
]

interface HeroChatRotatorProps {
  scenarios?: ChatScenario[]
  selectedSectorId: string
  speed?: number
  isAutoPlay?: boolean
  onScenarioComplete?: () => void
}

const HeroChatRotator = ({
  scenarios: propScenarios = [],
  selectedSectorId,
  speed = 1,
  isAutoPlay = true,
  onScenarioComplete
}: HeroChatRotatorProps) => {
  const t = useTranslations('hero.chat')
  const locale = useLocale()

  // Use prop scenarios if available, otherwise fallback to defaults
  const scenarios = propScenarios.length > 0 ? propScenarios : defaultScenarios
  const [step, setStep] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ role: string; content: string }>>([])

  // Find current scenario
  const currentScenario = scenarios.find(s =>
    s.id === selectedSectorId || s.sector_key === selectedSectorId
  ) || scenarios[0]

  // Helper to get localized content
  const getLocalizedField = (fieldName: string): string => {
    if (!currentScenario) return ''
    const localizedValue = (currentScenario as Record<string, unknown>)[`${fieldName}_${locale}`]
    if (localizedValue) return localizedValue as string
    const italianValue = (currentScenario as Record<string, unknown>)[`${fieldName}_it`]
    if (italianValue) return italianValue as string
    return ''
  }

  const userMessage = getLocalizedField('user_message')
  const aiMessage = getLocalizedField('ai_message')
  const statText = getLocalizedField('stat')
  const sectorName = getLocalizedField('sector_name') || 'Assistant'

  // Reset step when sector changes
  useEffect(() => {
    setStep(0)
    setDisplayedMessages([])
  }, [selectedSectorId])

  const isTyping = step === 2
  const showStat = step === 4

  // Update displayed messages based on step
  useEffect(() => {
    if (step === 1) {
      setDisplayedMessages([{ role: 'user', content: userMessage }])
    } else if (step === 3) {
      setDisplayedMessages([
        { role: 'user', content: userMessage },
        { role: 'assistant', content: aiMessage }
      ])
    }
  }, [step, userMessage, aiMessage])

  // Animation timing
  useEffect(() => {
    let timer: NodeJS.Timeout
    const adjustedDelay = (ms: number) => ms / speed

    if (step === 0) {
      timer = setTimeout(() => setStep(1), adjustedDelay(500))
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), adjustedDelay(1000))
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), adjustedDelay(1500))
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), adjustedDelay(2000))
    } else if (step === 4 && isAutoPlay) {
      timer = setTimeout(() => {
        if (onScenarioComplete) onScenarioComplete()
      }, adjustedDelay(4000))
    }

    return () => clearTimeout(timer)
  }, [step, speed, isAutoPlay, onScenarioComplete])

  if (!currentScenario) return null

  const Icon = getIconComponent(currentScenario.icon_name || 'MessageSquare')

  return (
    <div className="relative">
      <div className="absolute -top-10 left-0 w-full flex justify-center">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-300 dark:border-white/10">
          {t('liveDemo')}
        </span>
      </div>
      <div className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-[380px] mx-auto h-[550px] sm:h-[575px] md:h-[600px] flex flex-col">
        {/* Main Chat Interface */}
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full relative z-10 backdrop-blur-sm">

          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-dark-bg/50 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${currentScenario.bg_color || 'bg-blue-500/20'} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${currentScenario.color || 'text-blue-400'}`} />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">
                {sectorName}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500 dark:text-green-400 font-medium">
                  {t('online')}
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
            <div className="text-center text-xs text-gray-500 my-4">
              {t('today')}
            </div>

            <AnimatePresence mode='popLayout'>
              {displayedMessages.map((msg, idx) => (
                <motion.div
                  key={`${selectedSectorId}-${idx}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                    }
                  `}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-white/10 p-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stat Card */}
            <AnimatePresence>
              {showStat && statText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex justify-end mt-4"
                >
                  <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 p-3 rounded-xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Icon className="w-5 h-5 text-green-500 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Risultato</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{statText}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area (Visual Only) */}
          <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-dark-bg/50">
            <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">{t('placeholder')}</span>
              <div className="p-1.5 rounded-lg bg-primary text-white">
                <Send className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroChatRotator
