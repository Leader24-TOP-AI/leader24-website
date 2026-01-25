import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage'

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

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />
}
