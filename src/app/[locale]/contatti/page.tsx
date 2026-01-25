import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ContactPage from '@/components/pages/ContactPage'
import { getSiteSettings, getSectionContent } from '@/lib/cms/server'

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

export default async function ContattiPage({ params }: Props) {
  const { locale } = await params

  if (locale === 'en') {
    redirect('/en/contact')
  }

  const [contactSettings, sectionContent] = await Promise.all([
    getSiteSettings('contact'),
    getSectionContent([
      'contact_hero_title', 'contact_hero_desc',
      'contact_form_title', 'contact_form_submit', 'contact_privacy',
      'contact_testimonial_text', 'contact_testimonial_author', 'contact_testimonial_role',
      'contact_placeholder_name', 'contact_placeholder_company',
      'contact_placeholder_email', 'contact_placeholder_message'
    ])
  ])

  return <ContactPage contactSettings={contactSettings} sectionContent={sectionContent} />
}
