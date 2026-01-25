'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useFAQs, useSectionContent, getLocalizedValue } from '@/hooks/useCMSContent'

const FAQ = () => {
  const t = useTranslations('home.faq')
  const locale = useLocale()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { faqs: dbFaqs, loading } = useFAQs()
  const { content: sectionContent } = useSectionContent(['faq_title', 'faq_subtitle'])

  // Use DB FAQs if available, otherwise use fallback i18n
  const faqs = dbFaqs.length > 0
    ? dbFaqs.map(faq => ({
        question: getLocalizedValue(faq, 'question', locale),
        answer: getLocalizedValue(faq, 'answer', locale)
      }))
    : [
        { question: t('items.setup.q'), answer: t('items.setup.a') },
        { question: t('items.accuracy.q'), answer: t('items.accuracy.a') },
        { question: t('items.number.q'), answer: t('items.number.a') },
        { question: t('items.security.q'), answer: t('items.security.a') },
        { question: t('items.cancel.q'), answer: t('items.cancel.a') }
      ]

  // Get title and subtitle from CMS or fallback to i18n
  const title = getLocalizedValue(sectionContent.faq_title, 'content', locale) || t('title')
  const subtitle = getLocalizedValue(sectionContent.faq_subtitle, 'content', locale) || t('subtitle')

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  if (loading) {
    return (
      <div className="py-24 bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-6">{title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
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
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
