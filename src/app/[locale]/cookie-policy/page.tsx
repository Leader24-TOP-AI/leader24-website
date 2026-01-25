import type { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'
import { getSiteSettings } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: `Cookie Policy | Leader24`,
    description: locale === 'it'
      ? 'Informativa sui cookie di Leader24'
      : 'Leader24 Cookie Policy',
  }
}

export default async function CookiePolicyPage() {
  const [legalSettings, contactSettings] = await Promise.all([
    getSiteSettings('legal'),
    getSiteSettings('contact')
  ])

  return <LegalPage pageKey="cookie" legalSettings={legalSettings} contactSettings={contactSettings} />
}
