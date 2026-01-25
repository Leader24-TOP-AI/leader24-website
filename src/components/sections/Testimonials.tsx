'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getLocalizedValue } from '@/lib/cms/types'
import type { Testimonial, SectionContent } from '@/lib/cms/types'

// Fallback testimonials (used if DB is empty)
// Using generic titles instead of fake names to be truthful
const fallbackTestimonials: Testimonial[] = [
  {
    id: 'fallback-1',
    author_name: "Responsabile E-commerce",
    company: "Negozio Online",
    role_it: "E-commerce Manager",
    role_en: "E-commerce Manager",
    content_it: "L'integrazione con WhatsApp è stata semplice. Ora i clienti ricevono risposte immediate sulle disponibilità e lo stato degli ordini.",
    content_en: "WhatsApp integration was simple. Now customers get immediate responses about availability and order status.",
    image_url: null,
    rating: 5,
    is_active: true,
    display_order: 1
  },
  {
    id: 'fallback-2',
    author_name: "Titolare Agenzia",
    company: "Agenzia Immobiliare",
    role_it: "Titolare",
    role_en: "Owner",
    content_it: "Riceviamo richieste di informazioni a qualsiasi ora. L'agente AI qualifica i contatti e raccoglie le preferenze prima che li contattiamo.",
    content_en: "We receive information requests at any hour. The AI agent qualifies contacts and collects preferences before we contact them.",
    image_url: null,
    rating: 5,
    is_active: true,
    display_order: 2
  },
  {
    id: 'fallback-3',
    author_name: "Professionista",
    company: "Studio Professionale",
    role_it: "Titolare",
    role_en: "Owner",
    content_it: "I clienti possono prenotare consulenze e inviare documenti via WhatsApp. Risparmio tempo nella gestione delle richieste ripetitive.",
    content_en: "Clients can book consultations and send documents via WhatsApp. I save time managing repetitive requests.",
    image_url: null,
    rating: 5,
    is_active: true,
    display_order: 3
  }
]

interface TestimonialsProps {
  testimonials: Testimonial[]
  sectionContent: Record<string, SectionContent>
}

export default function Testimonials({ testimonials: dbTestimonials, sectionContent }: TestimonialsProps) {
  const locale = useLocale() as 'it' | 'en'
  const t = useTranslations('home.testimonials')

  // Use DB testimonials if available, otherwise fallback
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials

  // Get localized section content with i18n fallback
  const title = sectionContent.testimonials_title
    ? getLocalizedValue(sectionContent.testimonials_title, 'content', locale) || t('title')
    : t('title')

  const subtitle = sectionContent.testimonials_subtitle
    ? getLocalizedValue(sectionContent.testimonials_subtitle, 'content', locale) || t('subtitle')
    : t('subtitle')

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-bg relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">{title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                {testimonial.image_url ? (
                  <Image
                    src={testimonial.image_url}
                    alt={testimonial.author_name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-2 border-primary mr-4 object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full border-2 border-primary mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500 dark:text-gray-300">
                      {testimonial.author_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="text-gray-900 dark:text-white font-bold">{testimonial.author_name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getLocalizedValue(testimonial, 'role', locale)}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &ldquo;{getLocalizedValue(testimonial, 'content', locale)}&rdquo;
              </p>
              <div className="mt-6 flex text-yellow-400">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
