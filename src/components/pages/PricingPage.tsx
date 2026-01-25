'use client'

import { useState } from 'react'
import { Check, X, Zap, Rocket, Building2, Loader2, Sparkles } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { usePricingPlans, getLocalizedValue } from '@/hooks/useCMSContent'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Zap, Rocket, Building2, Sparkles
}

// Fallback plans
const fallbackPlans = [
  {
    id: 'free',
    plan_key: 'free',
    name_it: 'Free',
    name_en: 'Free',
    description_it: 'Perfetto per provare',
    description_en: 'Perfect to try',
    price_display_it: '€0',
    price_display_en: '€0',
    price_yearly_display_it: '€0',
    price_yearly_display_en: '€0',
    price_yearly: 0,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['1 Agente AI', '100 conversazioni/mese', 'Integrazione WhatsApp', 'Dashboard base'],
    features_en: ['1 AI Agent', '100 conversations/month', 'WhatsApp integration', 'Basic dashboard'],
    not_included_it: ['Supporto prioritario', 'API access', 'Personalizzazione avanzata'],
    not_included_en: ['Priority support', 'API access', 'Advanced customization'],
    cta_text_it: 'Inizia Gratis',
    cta_text_en: 'Start Free',
    is_popular: false,
    icon_name: 'Sparkles',
    display_order: 0,
    signup_url: '',
    is_active: true
  },
  {
    id: 'starter',
    plan_key: 'starter',
    name_it: 'Starter',
    name_en: 'Starter',
    description_it: 'Perfetto per iniziare',
    description_en: 'Perfect to get started',
    price_display_it: '€49',
    price_display_en: '€49',
    price_yearly_display_it: '€39',
    price_yearly_display_en: '€39',
    price_yearly: 470,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['1 Agente AI', '500 conversazioni/mese', 'Integrazione WhatsApp', 'Dashboard base', 'Supporto email'],
    features_en: ['1 AI Agent', '500 conversations/month', 'WhatsApp integration', 'Basic dashboard', 'Email support'],
    not_included_it: ['Personalizzazione avanzata', 'API access', 'Supporto prioritario'],
    not_included_en: ['Advanced customization', 'API access', 'Priority support'],
    cta_text_it: 'Sottoscrivi',
    cta_text_en: 'Subscribe',
    is_popular: false,
    icon_name: 'Zap',
    display_order: 1,
    signup_url: '',
    is_active: true
  },
  {
    id: 'growth',
    plan_key: 'growth',
    name_it: 'Growth',
    name_en: 'Growth',
    description_it: 'Per aziende in crescita',
    description_en: 'For growing businesses',
    price_display_it: '€149',
    price_display_en: '€149',
    price_yearly_display_it: '€119',
    price_yearly_display_en: '€119',
    price_yearly: 1428,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['3 Agenti AI', '2000 conversazioni/mese', 'Tutte le integrazioni', 'Analytics avanzate', 'Personalizzazione brand', 'Supporto prioritario'],
    features_en: ['3 AI Agents', '2000 conversations/month', 'All integrations', 'Advanced analytics', 'Brand customization', 'Priority support'],
    not_included_it: ['API access illimitato', 'SLA garantito'],
    not_included_en: ['Unlimited API access', 'Guaranteed SLA'],
    cta_text_it: 'Sottoscrivi',
    cta_text_en: 'Subscribe',
    is_popular: true,
    icon_name: 'Rocket',
    display_order: 2,
    signup_url: '',
    is_active: true
  },
  {
    id: 'enterprise',
    plan_key: 'enterprise',
    name_it: 'Enterprise',
    name_en: 'Enterprise',
    description_it: 'Soluzioni personalizzate',
    description_en: 'Custom solutions',
    price_display_it: 'Custom',
    price_display_en: 'Custom',
    price_yearly_display_it: '',
    price_yearly_display_en: '',
    price_yearly: 0,
    billing_period_it: '',
    billing_period_en: '',
    features_it: ['Agenti illimitati', 'Messaggi illimitati', 'Account manager dedicato', 'SLA garantito', 'API access completa'],
    features_en: ['Unlimited agents', 'Unlimited messages', 'Dedicated account manager', 'Guaranteed SLA', 'Full API access'],
    not_included_it: [],
    not_included_en: [],
    cta_text_it: 'Contattaci',
    cta_text_en: 'Contact Us',
    is_popular: false,
    icon_name: 'Building2',
    display_order: 3,
    signup_url: '',
    is_active: true
  }
]

const planStyles: Record<string, { color: string; bg: string; border: string }> = {
  free: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  starter: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  growth: { color: 'text-primary-light', bg: 'bg-primary/10', border: 'border-primary/50' },
  enterprise: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }
}

export default function PricingPage() {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const { plans: dbPlans, loading } = usePricingPlans()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = dbPlans.length > 0 ? dbPlans : fallbackPlans

  const getLocalizedArray = (item: Record<string, unknown>, fieldName: string): string[] => {
    const value = item[`${fieldName}_${locale}`] || item[`${fieldName}_it`] || item[fieldName] || []
    if (typeof value === 'string') {
      try { return JSON.parse(value) } catch { return [] }
    }
    return Array.isArray(value) ? value : []
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="section-heading pb-2">{t('title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-xl inline-flex">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-white dark:bg-dark-card shadow-md text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t('monthly')}
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
              billingPeriod === 'yearly'
                ? 'bg-white dark:bg-dark-card shadow-md text-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t('yearly')}
          </button>
        </div>
      </div>

      {/* Discount Badge */}
      {billingPeriod === 'yearly' && (
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full font-medium">
            <span className="text-lg">🎉</span>
            {t('yearlyDiscount')}
          </span>
        </div>
      )}

      {billingPeriod === 'monthly' && <div className="mb-10" />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const planKey = plan.plan_key || plan.id
          const style = planStyles[planKey] || planStyles.starter
          const Icon = iconMap[plan.icon_name] || Zap
          const features = getLocalizedArray(plan, 'features')
          const notIncluded = getLocalizedArray(plan, 'not_included')

          const hasYearlyPricing = plan.price_yearly && plan.price_yearly > 0
          const showYearlyPrice = billingPeriod === 'yearly' && hasYearlyPricing

          return (
            <div
              key={plan.id}
              className={`relative glass-card p-6 flex flex-col ${
                plan.is_popular
                  ? 'border-primary/50 shadow-lg shadow-primary/10 md:scale-105 z-10'
                  : 'border-gray-200 dark:border-white/5'
              }`}
            >
              {plan.is_popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  {t('popular')}
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${style.color}`} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {getLocalizedValue(plan, 'name', locale)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 min-h-[36px]">
                {getLocalizedValue(plan, 'description', locale)}
              </p>

              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {showYearlyPrice
                      ? getLocalizedValue(plan, 'price_yearly_display', locale)
                      : getLocalizedValue(plan, 'price_display', locale)
                    }
                  </span>
                  {planKey !== 'enterprise' && (
                    <span className="text-gray-500 ml-1 text-sm">
                      /{t('perMonth')}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 h-5">
                  {showYearlyPrice && `€${Math.round(plan.price_yearly)}/${t('year')}`}
                </p>
              </div>

              <a
                href={planKey === 'enterprise'
                  ? (locale === 'it' ? '/it/contatti' : '/en/contact')
                  : (plan.signup_url || `https://dash.leader24.ai/${locale}/signup`)
                }
                className={`w-full py-2.5 rounded-xl font-bold text-center transition-all duration-300 mb-6 block ${
                  plan.is_popular
                    ? 'btn-primary shadow-lg shadow-primary/25'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10'
                }`}
              >
                {getLocalizedValue(plan, 'cta_text', locale)}
              </a>

              <div className="space-y-3 flex-1">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                {notIncluded.map((feature, idx) => (
                  <div key={idx} className="flex items-start opacity-50">
                    <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
