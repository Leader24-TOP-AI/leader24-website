import type { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'
import { getSiteSettings } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: `Privacy Policy | Leader24`,
    description: locale === 'it'
      ? 'Informativa sulla privacy di Leader24'
      : 'Leader24 Privacy Policy',
  }
}

export default async function PrivacyPolicyPage() {
  const [legalSettings, contactSettings] = await Promise.all([
    getSiteSettings('legal'),
    getSiteSettings('contact')
  ])

  return <LegalPage pageKey="privacy" legalSettings={legalSettings} contactSettings={contactSettings} />
}
