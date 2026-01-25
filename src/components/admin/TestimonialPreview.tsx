'use client'

import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'

interface TestimonialData {
    author_name?: string
    company?: string
    role_it?: string
    role_en?: string
    content_it?: string
    content_en?: string
    image_url?: string
    rating?: number
    is_active?: boolean
}

interface TestimonialPreviewProps {
    testimonial: TestimonialData
    language?: 'it' | 'en'
}

export default function TestimonialPreview({ testimonial, language = 'it' }: TestimonialPreviewProps) {
    // Localizzazione
    const role = language === 'it'
        ? testimonial?.role_it
        : testimonial?.role_en || testimonial?.role_it

    const content = language === 'it'
        ? testimonial?.content_it
        : testimonial?.content_en || testimonial?.content_it

    if (!testimonial || (!testimonial.author_name && !testimonial.content_it)) {
        return (
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 text-center border border-gray-200 dark:border-white/10">
                <div className="text-gray-400 dark:text-gray-500">
                    Compila i campi per vedere l&apos;anteprima
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                bg-white dark:bg-dark-card
                border border-gray-200 dark:border-white/10
                rounded-2xl p-8
                hover:bg-gray-50 dark:hover:bg-white/5
                transition-all duration-300
                max-w-sm mx-auto
            "
        >
            {/* Header con Avatar e Info - Stile identico al sito */}
            <div className="flex items-center mb-6">
                {testimonial.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={testimonial.image_url}
                        alt={testimonial.author_name || 'Avatar'}
                        className="w-12 h-12 rounded-full border-2 border-primary mr-4 object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full border-2 border-primary mr-4 bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                )}
                <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">
                        {testimonial.author_name || 'Nome Autore'}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {role || 'Ruolo'}{testimonial.company ? `, ${testimonial.company}` : ''}
                    </p>
                </div>
            </div>

            {/* Contenuto - Stile identico al sito */}
            <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                &quot;{content || 'Il contenuto della testimonianza apparirà qui...'}&quot;
            </p>

            {/* Rating con Stelle - Stile identico al sito */}
            <div className="mt-6 flex text-yellow-400">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                ))}
            </div>

            {/* Badge Visibilità (solo per admin) */}
            {testimonial.is_active === false && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        Non visibile sul sito
                    </span>
                </div>
            )}
        </motion.div>
    )
}
