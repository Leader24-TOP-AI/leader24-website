import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
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
  return (
    <>
      <Hero />
      <HowItWorks />
      <SectorPreview />
      <Features />
      <Integrations />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
