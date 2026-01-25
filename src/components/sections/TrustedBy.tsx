import { getTranslations } from 'next-intl/server'

const companies = [
  { name: 'TechCorp' },
  { name: 'GlobalSystems' },
  { name: 'InnovateLtd' },
  { name: 'FutureWorks' },
  { name: 'SmartSolutions' },
  { name: 'NextGen' },
]

export default async function TrustedBy() {
  const t = await getTranslations('home.trustedBy')

  return (
    <div className="py-12 bg-dark-bg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
          {t('title')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company) => (
            <span
              key={company.name}
              className="text-xl md:text-2xl font-bold text-gray-400 hover:text-white transition-colors cursor-default"
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
