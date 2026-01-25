import type { Metadata } from 'next'
import LegalPage from '@/components/pages/LegalPage'

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

export default function PrivacyPolicyPage() {
  return <LegalPage pageKey="privacy" />
}
