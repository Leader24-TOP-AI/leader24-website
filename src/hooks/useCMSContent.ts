'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Types
interface ChatScenario {
  id: string
  sector_key: string
  sector_name_it: string
  sector_name_en: string
  icon_name: string
  color: string
  bg_color: string
  user_message_it: string
  user_message_en: string
  ai_message_it: string
  ai_message_en: string
  options_it: string[]
  options_en: string[]
  stat_it: string
  stat_en: string
  is_active: boolean
  display_order: number
}

interface FAQ {
  id: string
  question_it: string
  question_en: string
  answer_it: string
  answer_en: string
  sector_slug: string | null
  is_active: boolean
  display_order: number
  [key: string]: string | boolean | number | null // Index signature for dynamic field access
}

interface HomepageFeature {
  id: string
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  is_active: boolean
  display_order: number
  [key: string]: string | boolean | number // Index signature for dynamic field access
}

interface HomepageStep {
  id: string
  step_number: number
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  is_active: boolean
  [key: string]: string | boolean | number // Index signature for dynamic field access
}

interface SectionContent {
  section_key: string
  content_it: string
  content_en: string
  [key: string]: string // Index signature for dynamic field access
}

interface SiteSetting {
  key: string
  value_it: string
  value_en: string
  category: string
  [key: string]: string // Index signature for dynamic field access
}

interface PricingPlan {
  id: string
  plan_key: string
  name_it: string
  name_en: string
  description_it: string
  description_en: string
  price_display_it: string
  price_display_en: string
  price_yearly_display_it: string
  price_yearly_display_en: string
  price_yearly: number
  billing_period_it: string
  billing_period_en: string
  features_it: string[]
  features_en: string[]
  not_included_it: string[]
  not_included_en: string[]
  cta_text_it: string
  cta_text_en: string
  signup_url: string
  is_popular: boolean
  icon_name: string
  display_order: number
  is_active: boolean
  [key: string]: string | string[] | number | boolean // Index signature for dynamic field access
}

// Sector interface
export interface Sector {
  id: string
  slug: string
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  image_url: string | null
  hero_background_url: string | null
  hero_title_it: string
  hero_title_en: string
  hero_subtitle_it: string
  hero_subtitle_en: string
  hero_cta_text_it: string
  hero_cta_text_en: string
  hero_cta_url: string | null
  usecases_title_it: string
  usecases_title_en: string
  usecases_it: Array<{ icon: string; title: string; description: string }>
  usecases_en: Array<{ icon: string; title: string; description: string }>
  social_proof_stat_value: string | null
  social_proof_stat_suffix: string | null
  social_proof_stat_label_it: string
  social_proof_stat_label_en: string
  testimonial_quote_it: string
  testimonial_quote_en: string
  testimonial_author: string | null
  testimonial_company: string | null
  testimonial_image_url: string | null
  final_cta_title_it: string
  final_cta_title_en: string
  final_cta_subtitle_it: string
  final_cta_subtitle_en: string
  seo_title_it: string
  seo_title_en: string
  seo_description_it: string
  seo_description_en: string
  seo_keywords_it: string[]
  seo_keywords_en: string[]
  og_image_url: string | null
  color_bg: string
  color_text: string
  is_active: boolean
  display_order: number
  [key: string]: string | string[] | number | boolean | null | Array<{ icon: string; title: string; description: string }> // Index signature
}

// Hook for fetching chat scenarios
export const useChatScenarios = () => {
  const [scenarios, setScenarios] = useState<ChatScenario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('hero_chat_scenarios')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setScenarios(data || [])
      } catch (err) {
        console.error('Error fetching scenarios:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchScenarios()
  }, [])

  return { scenarios, loading, error }
}

// Hook for fetching homepage features
export const useHomepageFeatures = () => {
  const [features, setFeatures] = useState<HomepageFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('homepage_features')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setFeatures(data || [])
      } catch (err) {
        console.error('Error fetching features:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchFeatures()
  }, [])

  return { features, loading, error }
}

// Hook for fetching homepage steps (How It Works)
export const useHomepageSteps = () => {
  const [steps, setSteps] = useState<HomepageStep[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('homepage_steps')
          .select('*')
          .eq('is_active', true)
          .order('step_number')

        if (error) throw error
        setSteps(data || [])
      } catch (err) {
        console.error('Error fetching steps:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSteps()
  }, [])

  return { steps, loading, error }
}

// Hook for fetching FAQs (homepage only - sector_slug IS NULL)
export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .eq('is_active', true)
          .is('sector_slug', null)
          .order('display_order')

        if (error) throw error
        setFaqs(data || [])
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  return { faqs, loading, error }
}

// Hook for fetching section content
export const useSectionContent = (sectionKeys: string[] = []) => {
  const [content, setContent] = useState<Record<string, SectionContent>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('section_content').select('*')
        if (sectionKeys.length > 0) {
          query = query.in('section_key', sectionKeys)
        }

        const { data, error } = await query

        if (error) throw error

        const contentObj: Record<string, SectionContent> = {}
        ;(data || []).forEach((item: SectionContent) => {
          contentObj[item.section_key] = item
        })
        setContent(contentObj)
      } catch (err) {
        console.error('Error fetching section content:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [JSON.stringify(sectionKeys)])

  return { content, loading, error }
}

// Hook for fetching site settings by category
export const useSiteSettings = (category: string | null = null) => {
  const [settings, setSettings] = useState<Record<string, SiteSetting>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from('site_settings').select('*')
        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error

        const settingsObj: Record<string, SiteSetting> = {}
        ;(data || []).forEach((item: SiteSetting) => {
          settingsObj[item.key] = item
        })
        setSettings(settingsObj)
      } catch (err) {
        console.error('Error fetching settings:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [category])

  return { settings, loading, error }
}

// Hook for fetching pricing plans
export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('pricing_plans')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setPlans(data || [])
      } catch (err) {
        console.error('Error fetching plans:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return { plans, loading, error }
}

// Hook for fetching all sectors
export const useSectors = () => {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('sectors')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setSectors(data || [])
      } catch (err) {
        console.error('Error fetching sectors:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSectors()
  }, [])

  return { sectors, loading, error }
}

// Hook for fetching single sector by slug
export const useSector = (slug: string | null) => {
  const [sector, setSector] = useState<Sector | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSector = async () => {
      if (!slug) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('sectors')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single()

        if (error) throw error
        setSector(data)
      } catch (err) {
        console.error('Error fetching sector:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSector()
  }, [slug])

  return { sector, loading, error }
}

// Hook for fetching sector-specific FAQs
export const useSectorFAQs = (sectorSlug: string | null) => {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      if (!sectorSlug) {
        setLoading(false)
        return
      }

      try {
        const supabase = createClient()
        // Fetch both sector-specific and general FAQs
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .or(`sector_slug.eq.${sectorSlug},sector_slug.is.null`)
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error

        // Prioritize sector-specific FAQs, then general ones
        const sectorFaqs = data?.filter(f => f.sector_slug === sectorSlug) || []
        const generalFaqs = data?.filter(f => !f.sector_slug) || []

        // Combine: sector FAQs first, then up to 2 general FAQs
        const combinedFaqs = [...sectorFaqs, ...generalFaqs.slice(0, 2)]
        setFaqs(combinedFaqs)
      } catch (err) {
        console.error('Error fetching sector FAQs:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [sectorSlug])

  return { faqs, loading, error }
}

// Helper to get localized value
export const getLocalizedValue = <T extends Record<string, unknown>>(
  item: T | null | undefined,
  fieldName: string,
  language: string = 'it'
): string => {
  if (!item) return ''
  const localizedField = `${fieldName}_${language}` as keyof T
  const fallbackField = `${fieldName}_it` as keyof T
  const baseField = fieldName as keyof T
  return (item[localizedField] as string) || (item[fallbackField] as string) || (item[baseField] as string) || ''
}

// ============================================
// HOOKS AGGIUNTI PER COMPLETARE LA MIGRAZIONE
// ============================================

// Testimonial interface
export interface Testimonial {
  id: string
  author_name: string
  company: string
  role_it: string
  role_en: string
  content_it: string
  content_en: string
  image_url: string | null
  rating: number
  is_active: boolean
  display_order: number
  [key: string]: string | number | boolean | null
}

// Hook for fetching testimonials
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setTestimonials(data || [])
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}

// Integration interface
export interface Integration {
  id: string
  name: string
  logo_url: string
  is_active: boolean
  display_order: number
}

// Hook for fetching integrations
export const useIntegrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('integrations')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setIntegrations(data || [])
      } catch (err) {
        console.error('Error fetching integrations:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  return { integrations, loading, error }
}

// CaseStudy interface
export interface CaseStudy {
  id: string
  tag_it: string
  tag_en: string
  title_it: string
  title_en: string
  challenge_title_it: string
  challenge_title_en: string
  challenge_desc_it: string
  challenge_desc_en: string
  solution_title_it: string
  solution_title_en: string
  solution_desc_it: string
  solution_desc_en: string
  results_title_it: string
  results_title_en: string
  results_list_it: string[]
  results_list_en: string[]
  stat_value: string | null
  stat_label_it: string
  stat_label_en: string
  image_url: string | null
  is_reversed: boolean
  is_active: boolean
  display_order: number
  [key: string]: string | string[] | number | boolean | null
}

// Hook for fetching case studies
export const useCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('case_studies')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setCaseStudies(data || [])
      } catch (err) {
        console.error('Error fetching case studies:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  return { caseStudies, loading, error }
}
