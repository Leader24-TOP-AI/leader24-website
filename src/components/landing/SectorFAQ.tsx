'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { useSectorFAQs, getLocalizedValue } from '@/hooks/useCMSContent'

interface SectorFAQProps {
  sectorSlug: string
  locale: 'it' | 'en'
}

export default function SectorFAQ({ sectorSlug, locale }: SectorFAQProps) {
  const isEnglish = locale === 'en'
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { faqs, loading } = useSectorFAQs(sectorSlug)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Don't render if no FAQs
  if (!loading && faqs.length === 0) return null

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isEnglish ? 'Frequently Asked Questions' : 'Domande Frequenti'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isEnglish
              ? 'Everything you need to know about Leader24'
              : 'Tutto quello che devi sapere su Leader24'
            }
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id || index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-gray-100 dark:bg-white/5 border-primary/30'
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`text-lg font-medium ${
                  activeIndex === index
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {getLocalizedValue(faq, 'question', locale)}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-white/5 pt-4">
                      {getLocalizedValue(faq, 'answer', locale)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
