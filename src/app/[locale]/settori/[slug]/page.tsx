import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SectorLandingPage from '@/components/pages/SectorLandingPage'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const supabase = await createClient()

  const { data: sector } = await supabase
    .from('sectors')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!sector) {
    return {
      title: locale === 'it' ? 'Settore non trovato | Leader24' : 'Sector not found | Leader24',
    }
  }

  const title = locale === 'it'
    ? (sector.seo_title_it || sector.hero_title_it || sector.title_it)
    : (sector.seo_title_en || sector.hero_title_en || sector.title_en || sector.title_it)

  const description = locale === 'it'
    ? (sector.seo_description_it || sector.hero_subtitle_it || sector.description_it)
    : (sector.seo_description_en || sector.hero_subtitle_en || sector.description_en || sector.description_it)

  return {
    title: `${title} | Leader24`,
    description,
    openGraph: sector.og_image_url ? {
      images: [{ url: sector.og_image_url }],
    } : undefined,
  }
}

export default async function SettoreSlugPage({ params }: Props) {
  const { locale, slug } = await params

  // If English locale, redirect to /sectors/[slug]
  if (locale === 'en') {
    redirect(`/en/sectors/${slug}`)
  }

  return <SectorLandingPage slug={slug} />
}
