'use client'

import { motion } from 'framer-motion'
import { LucideIcon, AlertCircle } from 'lucide-react'

interface AdminPagePlaceholderProps {
  title: string
  description: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export default function AdminPagePlaceholder({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor
}: AdminPagePlaceholderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </motion.div>

      {/* Placeholder Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-12 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Pagina in costruzione
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Questa sezione admin sarà disponibile dopo la migrazione completa.
              Per ora usa la versione Vite esistente per gestire questi contenuti.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
