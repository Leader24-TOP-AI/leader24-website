import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: `${t('title')} | Leader24`,
    description: t('subtitle'),
  }
}

export default async function ContactPageRoute({ params }: Props) {
  const { locale } = await params

  if (locale === 'it') {
    redirect('/it/contatti')
  }

  return <ContactPage />
}
