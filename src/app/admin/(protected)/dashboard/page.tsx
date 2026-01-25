'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Quote,
  Puzzle,
  CreditCard,
  FileText,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Globe,
  Database
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number | string
  color: { bg: string; icon: string }
  delay: number
}

const StatCard = ({ icon: Icon, label, value, color, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="
      group relative p-6
      bg-white dark:bg-dark-card
      border border-gray-200 dark:border-white/10
      rounded-2xl
      hover:border-gray-300 dark:hover:border-white/20
      transition-all duration-300
    "
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 min-w-[3rem] rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${color.icon}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white font-heading">{value}</p>
      </div>
    </div>
  </motion.div>
)

interface QuickLinkCardProps {
  icon: React.ElementType
  title: string
  description: string
  href: string
  color: {
    bg: string
    icon: string
    borderHover: string
    textHover: string
    arrowHover: string
  }
  delay: number
}

const QuickLinkCard = ({ icon: Icon, title, description, href, color, delay }: QuickLinkCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Link
      href={href}
      className={`
        group flex items-center gap-4 p-5 h-full
        bg-white dark:bg-dark-card
        border border-gray-200 dark:border-white/10
        rounded-xl
        ${color.borderHover}
        transition-all duration-300
      `}
    >
      <div className={`w-10 h-10 rounded-lg ${color.bg} flex items-center justify-center flex-shrink-0 transition-colors`}>
        <Icon className={`w-5 h-5 ${color.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold text-gray-900 dark:text-white ${color.textHover} transition-colors`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>
      <ArrowRight className={`w-5 h-5 text-gray-400 ${color.arrowHover} group-hover:translate-x-1 transition-all flex-shrink-0`} />
    </Link>
  </motion.div>
)

export default function DashboardPage() {
  const [stats, setStats] = useState({
    scenarios: 0,
    testimonials: 0,
    integrations: 0,
    pricingPlans: 0,
    sections: 0,
    settings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()
        const [
          { count: scenarios },
          { count: testimonials },
          { count: integrations },
          { count: pricingPlans },
          { count: sections },
          { count: settings }
        ] = await Promise.all([
          supabase.from('hero_chat_scenarios').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('integrations').select('*', { count: 'exact', head: true }),
          supabase.from('pricing_plans').select('*', { count: 'exact', head: true }),
          supabase.from('section_content').select('*', { count: 'exact', head: true }),
          supabase.from('site_settings').select('*', { count: 'exact', head: true })
        ])

        setStats({
          scenarios: scenarios || 0,
          testimonials: testimonials || 0,
          integrations: integrations || 0,
          pricingPlans: pricingPlans || 0,
          sections: sections || 0,
          settings: settings || 0
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickLinks = [
    {
      icon: MessageSquare,
      title: 'Chat Demo',
      description: 'Gestisci scenari demo',
      href: '/admin/chat-scenarios',
      color: {
        bg: 'bg-blue-100 dark:bg-blue-500/20',
        icon: 'text-blue-600 dark:text-blue-400',
        borderHover: 'hover:border-blue-300 dark:hover:border-blue-500/30',
        textHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
        arrowHover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
      }
    },
    {
      icon: Quote,
      title: 'Testimonianze',
      description: 'Modifica recensioni',
      href: '/admin/testimonials',
      color: {
        bg: 'bg-purple-100 dark:bg-purple-500/20',
        icon: 'text-purple-600 dark:text-purple-400',
        borderHover: 'hover:border-purple-300 dark:hover:border-purple-500/30',
        textHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
        arrowHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
      }
    },
    {
      icon: CreditCard,
      title: 'Prezzi',
      description: 'Aggiorna piani e tariffe',
      href: '/admin/pricing',
      color: {
        bg: 'bg-emerald-100 dark:bg-emerald-500/20',
        icon: 'text-emerald-600 dark:text-emerald-400',
        borderHover: 'hover:border-emerald-300 dark:hover:border-emerald-500/30',
        textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
        arrowHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
      }
    },
    {
      icon: Settings,
      title: 'Impostazioni',
      description: 'Email, telefono e URL',
      href: '/admin/settings',
      color: {
        bg: 'bg-slate-100 dark:bg-slate-500/20',
        icon: 'text-slate-600 dark:text-slate-400',
        borderHover: 'hover:border-slate-300 dark:hover:border-slate-500/30',
        textHover: 'group-hover:text-slate-600 dark:group-hover:text-slate-400',
        arrowHover: 'group-hover:text-slate-600 dark:group-hover:text-slate-400'
      }
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Benvenuto nel pannello di controllo Leader24
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Database className="w-4 h-4" />
          <span>Database connesso</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          icon={MessageSquare}
          label="Chat Demo"
          value={loading ? '...' : stats.scenarios}
          color={{ bg: 'bg-blue-100 dark:bg-blue-500/20', icon: 'text-blue-600 dark:text-blue-400' }}
          delay={0.1}
        />
        <StatCard
          icon={Quote}
          label="Testimonianze"
          value={loading ? '...' : stats.testimonials}
          color={{ bg: 'bg-purple-100 dark:bg-purple-500/20', icon: 'text-purple-600 dark:text-purple-400' }}
          delay={0.15}
        />
        <StatCard
          icon={Puzzle}
          label="Integrazioni"
          value={loading ? '...' : stats.integrations}
          color={{ bg: 'bg-amber-100 dark:bg-amber-500/20', icon: 'text-amber-600 dark:text-amber-400' }}
          delay={0.2}
        />
        <StatCard
          icon={CreditCard}
          label="Prezzi"
          value={loading ? '...' : stats.pricingPlans}
          color={{ bg: 'bg-emerald-100 dark:bg-emerald-500/20', icon: 'text-emerald-600 dark:text-emerald-400' }}
          delay={0.25}
        />
        <StatCard
          icon={FileText}
          label="Sezioni"
          value={loading ? '...' : stats.sections}
          color={{ bg: 'bg-rose-100 dark:bg-rose-500/20', icon: 'text-rose-600 dark:text-rose-400' }}
          delay={0.3}
        />
        <StatCard
          icon={Settings}
          label="Impostazioni"
          value={loading ? '...' : stats.settings}
          color={{ bg: 'bg-slate-100 dark:bg-slate-500/20', icon: 'text-slate-600 dark:text-slate-400' }}
          delay={0.35}
        />
      </div>

      {/* Quick Links & Info */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Accesso Rapido
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <QuickLinkCard key={link.href} {...link} delay={0.45 + index * 0.05} />
            ))}
          </div>
        </div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Informazioni Sistema
          </h2>
          <div className="
            p-5
            bg-white dark:bg-dark-card
            border border-gray-200 dark:border-white/10
            rounded-xl
            space-y-4
          ">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Sistema Attivo</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tutti i servizi funzionano</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Multilingua</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Italiano + Inglese</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">DeepL Integrato</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Traduzione automatica</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Leader24 CMS v2.0 (Next.js)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
