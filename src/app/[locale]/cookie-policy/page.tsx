import type { Metadata } from 'next'
import CookiePolicyPage from '@/components/pages/CookiePolicyPage'

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

export default function CookiePolicy() {
  return <CookiePolicyPage />
}
