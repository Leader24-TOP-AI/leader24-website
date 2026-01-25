import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

// Server-side CMS data fetching
import {
  getChatScenarios,
  getHomepageFeatures,
  getHomepageSteps,
  getFAQs,
  getSectionContent,
  getSiteSettings,
  getTestimonials,
  getIntegrations,
  getSectors
} from '@/lib/cms/server'

// Section components
import Hero from '@/components/sections/Hero'
import HowItWorks from '@/components/sections/HowItWorks'
import SectorPreview from '@/components/sections/SectorPreview'
import Features from '@/components/sections/Features'
import Integrations from '@/components/sections/Integrations'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.seo' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage() {
  // Fetch ALL CMS data in parallel on the server
  const [
    chatScenarios,
    features,
    steps,
    faqs,
    sectionContent,
    heroSettings,
    testimonials,
    integrations,
    sectors
  ] = await Promise.all([
    getChatScenarios(),
    getHomepageFeatures(),
    getHomepageSteps(),
    getFAQs(),
    getSectionContent([
      'features_title', 'features_subtitle',
      'how_it_works_title', 'how_it_works_subtitle',
      'testimonials_title', 'testimonials_subtitle',
      'faq_title', 'faq_subtitle',
      'cta_title', 'cta_subtitle', 'cta_button', 'cta_footer'
    ]),
    getSiteSettings('urls'),
    getTestimonials(),
    getIntegrations(),
    getSectors()
  ])

  return (
    <>
      <Hero
        chatScenarios={chatScenarios}
        heroSettings={heroSettings}
      />
      <HowItWorks
        steps={steps}
        sectionContent={sectionContent}
      />
      <SectorPreview
        sectors={sectors}
      />
      <Features
        features={features}
        sectionContent={sectionContent}
      />
      <Integrations
        integrations={integrations}
      />
      <Testimonials
        testimonials={testimonials}
        sectionContent={sectionContent}
      />
      <FAQ
        faqs={faqs}
        sectionContent={sectionContent}
      />
      <CTA sectionContent={sectionContent} />
    </>
  )
}
