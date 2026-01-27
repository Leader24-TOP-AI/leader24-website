import type { Metadata } from 'next'
import TermsOfServicePage from '@/components/pages/TermsOfServicePage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'it' ? 'Termini di Servizio | Leader24' : 'Terms of Service | Leader24',
    description: locale === 'it'
      ? 'Termini e condizioni di utilizzo dei servizi Leader24'
      : 'Leader24 Terms of Service',
  }
}

export default function TermsOfService() {
  return <TermsOfServicePage />
}
