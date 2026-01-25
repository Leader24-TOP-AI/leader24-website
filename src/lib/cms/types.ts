// Shared CMS types and utilities
// This file can be imported by both server and client components

export interface ChatScenario {
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
  [key: string]: string | string[] | boolean | number
}

export interface HomepageFeature {
  id: string
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  is_active: boolean
  display_order: number
  [key: string]: string | boolean | number
}

export interface HomepageStep {
  id: string
  step_number: number
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  is_active: boolean
  [key: string]: string | boolean | number
}

export interface FAQ {
  id: string
  question_it: string
  question_en: string
  answer_it: string
  answer_en: string
  sector_slug: string | null
  is_active: boolean
  display_order: number
  [key: string]: string | boolean | number | null
}

export interface SectionContent {
  section_key: string
  content_it: string
  content_en: string
  [key: string]: string
}

export interface SiteSetting {
  key: string
  value_it: string
  value_en: string
  category: string
  [key: string]: string
}

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

export interface Integration {
  id: string
  name: string
  logo_url: string
  is_active: boolean
  display_order: number
}

export interface UseCase {
  icon: string
  title: string
  description: string
}

export interface Sector {
  id: string
  slug: string
  title_it: string
  title_en: string
  description_it: string
  description_en: string
  icon_name: string
  image_url: string | null
  is_active: boolean
  display_order: number
  color_bg?: string
  color_text?: string
  hero_title_it?: string
  hero_title_en?: string
  hero_subtitle_it?: string
  hero_subtitle_en?: string
  hero_cta_text_it?: string
  hero_cta_text_en?: string
  hero_cta_url?: string
  hero_background_url?: string
  usecases_it?: UseCase[]
  usecases_en?: UseCase[]
  usecases_title_it?: string
  usecases_title_en?: string
  social_proof_stat_value?: string
  social_proof_stat_suffix?: string
  social_proof_stat_label_it?: string
  social_proof_stat_label_en?: string
  testimonial_quote_it?: string
  testimonial_quote_en?: string
  testimonial_author?: string
  testimonial_company?: string
  testimonial_image_url?: string
  final_cta_title_it?: string
  final_cta_title_en?: string
  final_cta_subtitle_it?: string
  final_cta_subtitle_en?: string
  [key: string]: string | boolean | number | null | undefined | UseCase[]
}

export interface PricingPlan {
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
  is_popular: boolean
  icon_name: string
  display_order: number
  signup_url: string
  is_active: boolean
  [key: string]: string | string[] | boolean | number
}

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
  stat_value: string
  stat_label_it: string
  stat_label_en: string
  image_url: string | null
  is_reversed: boolean
  is_active: boolean
  display_order: number
  [key: string]: string | string[] | boolean | number | null
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
