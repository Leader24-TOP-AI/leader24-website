import { createClient } from '@/lib/supabase/server'

// Re-export types and utilities from shared types file
export * from './types'

// Import types for use in this file
import type {
  ChatScenario,
  HomepageFeature,
  HomepageStep,
  FAQ,
  SectionContent,
  SiteSetting,
  Testimonial,
  Integration,
  Sector,
  PricingPlan,
  CaseStudy
} from './types'

// Server-side data fetching functions
export async function getChatScenarios(): Promise<ChatScenario[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hero_chat_scenarios')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching chat scenarios:', error)
    return []
  }
  return data || []
}

export async function getHomepageFeatures(): Promise<HomepageFeature[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_features')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching homepage features:', error)
    return []
  }
  return data || []
}

export async function getHomepageSteps(): Promise<HomepageStep[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_steps')
    .select('*')
    .eq('is_active', true)
    .order('step_number')

  if (error) {
    console.error('Error fetching homepage steps:', error)
    return []
  }
  return data || []
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .is('sector_slug', null)
    .order('display_order')

  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
  return data || []
}

export async function getSectionContent(keys: string[]): Promise<Record<string, SectionContent>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('section_content')
    .select('*')
    .in('section_key', keys)

  if (error) {
    console.error('Error fetching section content:', error)
    return {}
  }

  const contentObj: Record<string, SectionContent> = {}
  ;(data || []).forEach((item: SectionContent) => {
    contentObj[item.section_key] = item
  })
  return contentObj
}

export async function getSiteSettings(category: string): Promise<Record<string, SiteSetting>> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('category', category)

  if (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }

  const settingsObj: Record<string, SiteSetting> = {}
  ;(data || []).forEach((item: SiteSetting) => {
    settingsObj[item.key] = item
  })
  return settingsObj
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data || []
}

export async function getIntegrations(): Promise<Integration[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching integrations:', error)
    return []
  }
  return data || []
}

export async function getSectors(): Promise<Sector[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sectors')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching sectors:', error)
    return []
  }
  return data || []
}

export async function getSectorBySlug(slug: string): Promise<Sector | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sectors')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching sector by slug:', error)
    return null
  }
  return data
}

export async function getSectorFAQs(sectorSlug: string): Promise<FAQ[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .eq('sector_slug', sectorSlug)
    .order('display_order')

  if (error) {
    console.error('Error fetching sector FAQs:', error)
    return []
  }
  return data || []
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('pricing_plans')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching pricing plans:', error)
    return []
  }
  return data || []
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
  return data || []
}

