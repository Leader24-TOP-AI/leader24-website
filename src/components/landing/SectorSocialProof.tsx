'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import { getLocalizedValue } from '@/lib/cms/types'
import type { Sector } from '@/lib/cms/types'

interface SectorSocialProofProps {
  sector: Sector
  locale: string
}

export default function SectorSocialProof({ sector, locale }: SectorSocialProofProps) {
  const statValue = sector.social_proof_stat_value
  const statSuffix = sector.social_proof_stat_suffix || ''
  const statLabel = getLocalizedValue(sector, 'social_proof_stat_label', locale)
  const testimonialQuote = getLocalizedValue(sector, 'testimonial_quote', locale)
  const testimonialAuthor = sector.testimonial_author
  const testimonialCompany = sector.testimonial_company
  const testimonialImage = sector.testimonial_image_url

  // Don't render if no social proof content
  const hasStats = statValue && statLabel
  const hasTestimonial = testimonialQuote && testimonialAuthor

  if (!hasStats && !hasTestimonial) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-dark to-dark-bg relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Section */}
          {hasStats && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="inline-block">
                <span className="text-7xl md:text-8xl font-bold text-white">
                  {statValue}
                </span>
                <span className="text-5xl md:text-6xl font-bold text-primary">
                  {statSuffix}
                </span>
              </div>
              <p className="text-xl md:text-2xl text-gray-300 mt-4">
                {statLabel}
              </p>
            </motion.div>
          )}

          {/* Testimonial Section */}
          {hasTestimonial && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <Quote className="w-10 h-10 text-primary mb-4" />
              <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-6">
                &ldquo;{testimonialQuote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                {testimonialImage && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonialImage}
                      alt={testimonialAuthor}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">
                    {testimonialAuthor}
                  </p>
                  {testimonialCompany && (
                    <p className="text-gray-400 text-sm">
                      {testimonialCompany}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
