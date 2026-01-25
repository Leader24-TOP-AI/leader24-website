import type { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'
import { getSiteSettings } from '@/lib/cms/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'it' ? 'Politica di Rimborso | Leader24' : 'Refund Policy | Leader24',
    description: locale === 'it'
      ? 'Politica di rimborso per i servizi Leader24'
      : 'Leader24 Refund Policy',
  }
}

export default async function RefundPolicyPage() {
  const [legalSettings, contactSettings] = await Promise.all([
    getSiteSettings('legal'),
    getSiteSettings('contact')
  ])

  return <LegalPage pageKey="refund" legalSettings={legalSettings} contactSettings={contactSettings} />
}
