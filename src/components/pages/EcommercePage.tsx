'use client'

import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ShoppingCart, Package, TrendingUp, Star, CheckCircle2, ArrowRight } from 'lucide-react'
import HeroChatRotator from '@/components/sections/HeroChatRotator'
import Link from 'next/link'

export default function EcommercePage() {
  const t = useTranslations('ecommerce')
  const locale = useLocale()

  const contactLink = `/${locale}/contact`

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium mb-4">
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t('badge')}
        </div>
        <h1 className="section-heading">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Hero Section for Ecommerce */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t('hero.title')}<br />
            <span className="text-primary-light">{t('hero.highlight')}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            {t('hero.desc')}
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              {t('hero.list.carts')}
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              {t('hero.list.notifications')}
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
              </div>
              {t('hero.list.upsell')}
            </li>
          </ul>
          <Link href={contactLink} className="btn-primary inline-flex">
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative group"
        >
          <HeroChatRotator selectedSectorId="ecommerce" />
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-card p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.tracking.title')}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('features.tracking.desc')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.recommendations.title')}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('features.recommendations.desc')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('features.reviews.title')}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t('features.reviews.desc')}</p>
        </motion.div>
      </div>

      {/* ROI Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-gray-100 dark:from-primary-dark/50 dark:to-dark-card z-0"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 z-0 mix-blend-overlay"></div>

        <div className="relative z-10 p-12 md:p-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{t('roi.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-lg">
            {t('roi.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/5">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-heading">{t('roi.stats.carts.value')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{t('roi.stats.carts.label')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/5">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-heading">{t('roi.stats.support.value')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{t('roi.stats.support.label')}</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/5">
              <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2 font-heading">{t('roi.stats.availability.value')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{t('roi.stats.availability.label')}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
