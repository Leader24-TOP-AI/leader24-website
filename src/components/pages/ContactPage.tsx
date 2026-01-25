'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useSiteSettings, useSectionContent, getLocalizedValue } from '@/hooks/useCMSContent'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const { settings: contactSettings } = useSiteSettings('contact')
  const { content: sectionContent } = useSectionContent([
    'contact_hero_title', 'contact_hero_desc',
    'contact_form_title', 'contact_form_submit', 'contact_privacy',
    'contact_testimonial_text', 'contact_testimonial_author', 'contact_testimonial_role',
    'contact_placeholder_name', 'contact_placeholder_company',
    'contact_placeholder_email', 'contact_placeholder_message'
  ])

  const getCMS = (key: string, fallbackKey: string) => {
    return getLocalizedValue(sectionContent[key], 'content', locale) || t(fallbackKey)
  }

  const getSetting = (key: string, fallback: string) => {
    const setting = contactSettings?.[key]
    if (!setting) return fallback
    return locale === 'en' ? (setting.value_en || setting.value_it || fallback) : (setting.value_it || fallback)
  }

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: null as string | null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: null })

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({ loading: false, success: true, error: null })
        setFormData({ name: '', company: '', email: '', message: '' })
      } else {
        setStatus({ loading: false, success: false, error: result.error || t('form.error') })
      }
    } catch {
      setStatus({ loading: false, success: false, error: t('form.error') })
    }
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left Column: Text & Info */}
        <div>
          <h1 className="section-heading text-left mb-6">{getCMS('contact_hero_title', 'hero.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
            {getCMS('contact_hero_desc', 'hero.desc')}
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-light">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('info.email')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{getSetting('company_email', 'info@leader24.ai')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('info.location')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{getSetting('company_address_line1', t('info.address_line1'))}</p>
                <p className="text-gray-600 dark:text-gray-400">{getSetting('company_address_line2', t('info.address_line2'))}</p>
                <p className="text-gray-600 dark:text-gray-400">{getSetting('company_address_line3', t('info.address_line3'))}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{t('info.phone')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{getSetting('company_phone', '+66 (0) 8-1087-1041')}</p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 p-6 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">{getCMS('contact_testimonial_text', 'testimonial.text')}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 mr-3"></div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">{getCMS('contact_testimonial_author', 'testimonial.author')}</p>
                  <p className="text-sm text-gray-500">{getCMS('contact_testimonial_role', 'testimonial.role')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{getCMS('contact_form_title', 'form.title')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('form.name')}</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder={getCMS('contact_placeholder_name', 'form.placeholders.name')}
                  required
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('form.company')}</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder={getCMS('contact_placeholder_company', 'form.placeholders.company')}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('form.email')}</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                placeholder={getCMS('contact_placeholder_email', 'form.placeholders.email')}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('form.message')}</label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white dark:bg-dark-bg border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                placeholder={getCMS('contact_placeholder_message', 'form.placeholders.message')}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.loading}
              className={`w-full btn-primary py-4 text-lg ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {status.loading ? t('form.sending') : getCMS('contact_form_submit', 'form.submit')}
            </button>

            {status.success && (
              <p className="text-green-400 text-center mt-4">{t('form.success')}</p>
            )}
            {status.error && (
              <p className="text-red-400 text-center mt-4">{status.error}</p>
            )}

            <p className="text-xs text-center text-gray-500 mt-4">
              {getCMS('contact_privacy', 'form.privacy')}
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}
