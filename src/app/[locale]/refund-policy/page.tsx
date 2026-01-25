import type { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'

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

export default function RefundPolicyPage() {
  return <LegalPage pageKey="refund" />
}
