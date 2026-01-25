'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSectionContent, useCaseStudies, getLocalizedValue, CaseStudy } from '@/hooks/useCMSContent'

// Color mapping for tags
const tagColors = [
  'bg-blue-500/20 text-blue-600 dark:text-blue-300',
  'bg-green-500/20 text-green-600 dark:text-green-300',
  'bg-purple-500/20 text-purple-600 dark:text-purple-300',
  'bg-orange-500/20 text-orange-600 dark:text-orange-300',
]

const bgGradients = [
  'bg-primary/10',
  'bg-secondary/10',
  'bg-purple-500/10',
  'bg-orange-500/10',
]

export default function CaseStudiesPage() {
  const t = useTranslations('casestudies')
  const locale = useLocale() as 'it' | 'en'
  const { content: sectionContent } = useSectionContent([
    'casestudies_title', 'casestudies_subtitle',
    'casestudies_cta_title', 'casestudies_cta_button'
  ])
  const { caseStudies, loading: casesLoading } = useCaseStudies()

  // Helper to get localized value from case study
  const getCS = (caseStudy: CaseStudy, field: string) => {
    return getLocalizedValue(caseStudy, field, locale)
  }

  // Helper to get results list
  const getResultsList = (caseStudy: CaseStudy): string[] => {
    const localizedField = `results_list_${locale}` as keyof CaseStudy
    const list = caseStudy[localizedField] || caseStudy.results_list_it || []
    return Array.isArray(list) ? list as string[] : []
  }

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="section-heading">
          {getLocalizedValue(sectionContent['casestudies_title'], 'content', locale) || t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {getLocalizedValue(sectionContent['casestudies_subtitle'], 'content', locale) || t('subtitle')}
        </p>
      </motion.div>

      <div className="space-y-20">
        {casesLoading ? (
          // Loading skeleton
          <div className="space-y-20">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card p-8 md:p-12 animate-pulse">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : caseStudies.length === 0 ? (
          // Empty state
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {locale === 'en' ? 'No case studies available yet.' : 'Nessun caso studio disponibile.'}
            </p>
          </div>
        ) : (
          // Dynamic case studies
          caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`glass-card p-8 md:p-12 flex flex-col ${caseStudy.is_reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className={`inline-block px-4 py-1 rounded-full ${tagColors[index % tagColors.length]} text-sm font-semibold mb-4`}>
                  {getCS(caseStudy, 'tag')}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  {getCS(caseStudy, 'title')}
                </h2>
                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                      {getCS(caseStudy, 'challenge_title')}
                    </h4>
                    <p>{getCS(caseStudy, 'challenge_desc')}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                      {getCS(caseStudy, 'solution_title')}
                    </h4>
                    <p>{getCS(caseStudy, 'solution_desc')}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
                      {getCS(caseStudy, 'results_title')}
                    </h4>
                    <ul className="list-disc list-inside space-y-1">
                      {getResultsList(caseStudy).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-white/5 relative overflow-hidden min-h-[200px]">
                {caseStudy.image_url ? (
                  <Image
                    src={caseStudy.image_url}
                    alt={getCS(caseStudy, 'title')}
                    fill
                    className="object-cover rounded-xl"
                    unoptimized
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 ${bgGradients[index % bgGradients.length]} animate-pulse`}></div>
                    <div className="relative z-10 text-center py-8">
                      <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                        {caseStudy.stat_value || ''}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 uppercase tracking-wider text-sm">
                        {getCS(caseStudy, 'stat_label')}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {getLocalizedValue(sectionContent['casestudies_cta_title'], 'content', locale) || t('cta.title')}
        </h2>
        <a href={`https://dash.leader24.ai/${locale}`} className="btn-primary inline-flex">
          {getLocalizedValue(sectionContent['casestudies_cta_button'], 'content', locale) || t('cta.button')}
        </a>
      </motion.div>
    </div>
  )
}
