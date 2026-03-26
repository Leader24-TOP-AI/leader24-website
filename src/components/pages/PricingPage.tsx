'use client'

import { useState } from 'react'
import { Check, Zap, Sparkles, Crown, RefreshCw, Bot, Users } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { getLocalizedValue } from '@/lib/cms/types'
import type { PricingPlan } from '@/lib/cms/types'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Zap, Sparkles, Crown
}

// Fallback plans (aligned with real Stripe data)
const fallbackPlans: PricingPlan[] = [
  {
    id: 'starter',
    plan_key: 'starter',
    name_it: 'Starter',
    name_en: 'Starter',
    description_it: 'Ideale per piccole attività',
    description_en: 'Ideal for small businesses',
    price_display_it: '€35',
    price_display_en: '€35',
    price_yearly_display_it: '€28',
    price_yearly_display_en: '€28',
    price_yearly: 336,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['500 messaggi/mese', '1 agente AI', '2 membri team', '20 pagine web', '30 MB upload documenti', 'WhatsApp, Shopify, WordPress, WooCommerce', 'Mailchimp e Calendly'],
    features_en: ['500 messages/month', '1 AI agent', '2 team members', '20 web pages', '30 MB document upload', 'WhatsApp, Shopify, WordPress, WooCommerce', 'Mailchimp and Calendly'],
    not_included_it: ['Gmail e Google Calendar', 'AI Insights', 'Supporto prioritario'],
    not_included_en: ['Gmail and Google Calendar', 'AI Insights', 'Priority support'],
    cta_text_it: 'Prova gratis 30 giorni',
    cta_text_en: 'Try free for 30 days',
    is_popular: false,
    icon_name: 'Zap',
    display_order: 0,
    signup_url: 'https://dash.leader24.ai/signup?plan=starter',
    is_active: true
  },
  {
    id: 'business',
    plan_key: 'business',
    name_it: 'Business',
    name_en: 'Business',
    description_it: 'Per team in crescita',
    description_en: 'For growing teams',
    price_display_it: '€120',
    price_display_en: '€120',
    price_yearly_display_it: '€96',
    price_yearly_display_en: '€96',
    price_yearly: 1152,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['4.000 messaggi/mese', '3 agenti AI', '5 membri team', '50 pagine web', '100 MB upload documenti', 'Gmail e Google Calendar', 'AI Insights'],
    features_en: ['4,000 messages/month', '3 AI agents', '5 team members', '50 web pages', '100 MB document upload', 'Gmail and Google Calendar', 'AI Insights'],
    not_included_it: ['Supporto prioritario', 'Manager dedicato'],
    not_included_en: ['Priority support', 'Dedicated manager'],
    cta_text_it: 'Inizia ora',
    cta_text_en: 'Get started',
    is_popular: true,
    icon_name: 'Sparkles',
    display_order: 1,
    signup_url: 'https://dash.leader24.ai/signup?plan=business',
    is_active: true
  },
  {
    id: 'enterprise',
    plan_key: 'enterprise',
    name_it: 'Enterprise',
    name_en: 'Enterprise',
    description_it: 'Per grandi aziende',
    description_en: 'For large enterprises',
    price_display_it: '€300',
    price_display_en: '€300',
    price_yearly_display_it: '€240',
    price_yearly_display_en: '€240',
    price_yearly: 2880,
    billing_period_it: '/mese',
    billing_period_en: '/month',
    features_it: ['15.000 messaggi/mese', '6 agenti AI', '8 membri team', '150 pagine web', '500 MB upload documenti', 'Supporto prioritario', 'Manager dedicato'],
    features_en: ['15,000 messages/month', '6 AI agents', '8 team members', '150 web pages', '500 MB document upload', 'Priority support', 'Dedicated manager'],
    not_included_it: [],
    not_included_en: [],
    cta_text_it: 'Inizia ora',
    cta_text_en: 'Get started',
    is_popular: false,
    icon_name: 'Crown',
    display_order: 2,
    signup_url: 'https://dash.leader24.ai/signup?plan=enterprise',
    is_active: true
  }
]

const planStyles: Record<string, { color: string; bg: string; border: string }> = {
  starter: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  business: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  enterprise: { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' }
}

const ADDONS: { key: string; icon: LucideIcon; color: string; bg: string; type: 'onetime' | 'recurring'; priceMonthly: number; priceYearly?: number }[] = [
  { key: 'creditRecharge', icon: RefreshCw, color: 'text-blue-500', bg: 'bg-blue-500/10', type: 'onetime', priceMonthly: 30 },
  { key: 'extraAgent', icon: Bot, color: 'text-violet-500', bg: 'bg-violet-500/10', type: 'recurring', priceMonthly: 25, priceYearly: 240 },
  { key: 'extraMember', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10', type: 'recurring', priceMonthly: 15, priceYearly: 144 },
  { key: 'brandRemoval', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-500/10', type: 'recurring', priceMonthly: 10, priceYearly: 96 },
]

interface PricingPageProps {
  plans: PricingPlan[]
}

export default function PricingPage({ plans: dbPlans }: PricingPageProps) {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans = dbPlans.length > 0 ? dbPlans : fallbackPlans

  const getLocalizedArray = (item: Record<string, unknown>, fieldName: string): string[] => {
    const value = item[`${fieldName}_${locale}`] || item[`${fieldName}_it`] || item[fieldName] || []
    if (typeof value === 'string') {
      try { return JSON.parse(value) } catch { return [] }
    }
    return Array.isArray(value) ? value : []
  }

  // "Everything in X +" label for non-starter plans
  const getPrevPlanName = (index: number): string | null => {
    if (index === 0) return null
    const prevPlan = plans[index - 1]
    return prevPlan ? getLocalizedValue(prevPlan, 'name', locale) : null
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
      <div className="flex flex-col items-center gap-3 mb-10">
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
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {t('yearlyDiscount')}
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        {plans.map((plan, index) => {
          const planKey = plan.plan_key || plan.id
          const style = planStyles[planKey] || planStyles.starter
          const Icon = iconMap[plan.icon_name] || Zap
          const features = getLocalizedArray(plan, 'features')

          const hasYearlyPricing = plan.price_yearly && plan.price_yearly > 0
          const showYearlyPrice = billingPeriod === 'yearly' && hasYearlyPricing
          const isPopular = plan.is_popular
          const isStarter = planKey === 'starter'
          const prevPlanName = getPrevPlanName(index)

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col glass-card overflow-hidden ${
                isPopular
                  ? 'border-primary/50 shadow-lg shadow-primary/10 md:-mt-4 md:mb-4'
                  : 'border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 hover:shadow-md'
              } transition-all duration-200`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div className="bg-primary text-white text-center text-sm font-semibold py-2">
                  {t('popular')}
                </div>
              )}

              <div className={`flex flex-col flex-1 p-6 sm:p-8 ${isPopular ? 'pt-6' : ''}`}>
                {/* Plan Name + Icon */}
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 ${style.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {getLocalizedValue(plan, 'name', locale)}
                  </h3>
                  {billingPeriod === 'yearly' && (
                    <span className="text-emerald-600 bg-emerald-500/10 text-xs font-medium px-2 py-0.5 rounded-full ml-auto">
                      -20%
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {showYearlyPrice
                        ? getLocalizedValue(plan, 'price_yearly_display', locale)
                        : getLocalizedValue(plan, 'price_display', locale)
                      }
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {showYearlyPrice
                      ? t('perMonthBilledYearly', { total: `€${Math.round(plan.price_yearly)}` })
                      : t('perMonth')
                    }
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mb-8">
                  <a
                    href={plan.signup_url || `https://dash.leader24.ai/${locale}/signup`}
                    className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 block ${
                      isPopular
                        ? 'btn-primary shadow-lg shadow-primary/25'
                        : 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10'
                    }`}
                  >
                    {getLocalizedValue(plan, 'cta_text', locale)}
                  </a>
                  {isStarter && (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('trialBullet1')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('trialBullet2')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                        <span className="text-emerald-500">✓</span> {t('trialBullet3')}
                      </p>
                    </div>
                  )}
                </div>

                {/* "Everything in X +" header */}
                {prevPlanName && (
                  <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
                    {t('everythingIn', { plan: prevPlanName })}
                  </p>
                )}

                {/* Feature list */}
                <div className="space-y-3 flex-1 text-sm">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Add-ons Section */}
      <div className="mt-20 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="section-heading pb-2">{t('addons.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('addons.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {ADDONS.map(({ key, icon: AddonIcon, color, bg, type, priceMonthly, priceYearly }) => (
            <div key={key} className="glass-card p-5 border-gray-200 dark:border-white/5">
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${bg} shrink-0`}>
                  <AddonIcon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {t(`addons.${key}.name`)}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {t(`addons.${key}.description`)}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/5 space-y-2">
                    {/* Monthly price */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {type === 'onetime' ? t('addons.oneTime') : t('addons.monthlyLabel')}
                      </span>
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">€{priceMonthly}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          {t(`addons.${key}.priceUnit`)}
                        </span>
                      </div>
                    </div>
                    {/* Yearly price (only for recurring addons) */}
                    {type === 'recurring' && priceYearly && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {t('addons.yearlyLabel')}
                        </span>
                        <div>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">€{priceYearly}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                            {t(`addons.${key}.priceYearUnit`)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
