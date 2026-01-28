// Shared CMS types and utilities
// This file can be imported by both server and client components

// Supported languages
export const SUPPORTED_LANGUAGES = ['it', 'en', 'es', 'fr', 'de'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

export interface ChatScenario {
  id: string
  sector_key: string
  sector_name_it: string
  sector_name_en: string
  sector_name_es?: string
  sector_name_fr?: string
  sector_name_de?: string
  icon_name: string
  color: string
  bg_color: string
  user_message_it: string
  user_message_en: string
  user_message_es?: string
  user_message_fr?: string
  user_message_de?: string
  ai_message_it: string
  ai_message_en: string
  ai_message_es?: string
  ai_message_fr?: string
  ai_message_de?: string
  options_it: string[]
  options_en: string[]
  options_es?: string[]
  options_fr?: string[]
  options_de?: string[]
  stat_it: string
  stat_en: string
  stat_es?: string
  stat_fr?: string
  stat_de?: string
  is_active: boolean
  display_order: number
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | string[] | boolean | number | undefined
}

export interface HomepageFeature {
  id: string
  title_it: string
  title_en: string
  title_es?: string
  title_fr?: string
  title_de?: string
  description_it: string
  description_en: string
  description_es?: string
  description_fr?: string
  description_de?: string
  icon_name: string
  is_active: boolean
  display_order: number
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | number | undefined
}

export interface HomepageStep {
  id: string
  step_number: number
  title_it: string
  title_en: string
  title_es?: string
  title_fr?: string
  title_de?: string
  description_it: string
  description_en: string
  description_es?: string
  description_fr?: string
  description_de?: string
  icon_name: string
  is_active: boolean
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | number | undefined
}

export interface FAQ {
  id: string
  question_it: string
  question_en: string
  question_es?: string
  question_fr?: string
  question_de?: string
  answer_it: string
  answer_en: string
  answer_es?: string
  answer_fr?: string
  answer_de?: string
  sector_slug: string | null
  is_active: boolean
  display_order: number
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | number | null | undefined
}

export interface SectionContent {
  section_key: string
  content_it: string
  content_en: string
  content_es?: string
  content_fr?: string
  content_de?: string
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | undefined
}

export interface SiteSetting {
  key: string
  value_it: string
  value_en: string
  value_es?: string
  value_fr?: string
  value_de?: string
  category: string
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | undefined
}

export interface Testimonial {
  id: string
  author_name: string
  company: string
  role_it: string
  role_en: string
  role_es?: string
  role_fr?: string
  role_de?: string
  content_it: string
  content_en: string
  content_es?: string
  content_fr?: string
  content_de?: string
  image_url: string | null
  rating: number
  is_active: boolean
  display_order: number
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | number | boolean | null | undefined
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
  title_es?: string
  title_fr?: string
  title_de?: string
  description_it: string
  description_en: string
  description_es?: string
  description_fr?: string
  description_de?: string
  icon_name: string
  image_url: string | null
  is_active: boolean
  display_order: number
  color_bg?: string
  color_text?: string
  hero_title_it?: string
  hero_title_en?: string
  hero_title_es?: string
  hero_title_fr?: string
  hero_title_de?: string
  hero_subtitle_it?: string
  hero_subtitle_en?: string
  hero_subtitle_es?: string
  hero_subtitle_fr?: string
  hero_subtitle_de?: string
  hero_cta_text_it?: string
  hero_cta_text_en?: string
  hero_cta_text_es?: string
  hero_cta_text_fr?: string
  hero_cta_text_de?: string
  hero_cta_url?: string
  hero_background_url?: string
  usecases_it?: UseCase[]
  usecases_en?: UseCase[]
  usecases_es?: UseCase[]
  usecases_fr?: UseCase[]
  usecases_de?: UseCase[]
  usecases_title_it?: string
  usecases_title_en?: string
  usecases_title_es?: string
  usecases_title_fr?: string
  usecases_title_de?: string
  social_proof_stat_value?: string
  social_proof_stat_suffix?: string
  social_proof_stat_label_it?: string
  social_proof_stat_label_en?: string
  social_proof_stat_label_es?: string
  social_proof_stat_label_fr?: string
  social_proof_stat_label_de?: string
  testimonial_quote_it?: string
  testimonial_quote_en?: string
  testimonial_quote_es?: string
  testimonial_quote_fr?: string
  testimonial_quote_de?: string
  testimonial_author?: string
  testimonial_company?: string
  testimonial_image_url?: string
  final_cta_title_it?: string
  final_cta_title_en?: string
  final_cta_title_es?: string
  final_cta_title_fr?: string
  final_cta_title_de?: string
  final_cta_subtitle_it?: string
  final_cta_subtitle_en?: string
  final_cta_subtitle_es?: string
  final_cta_subtitle_fr?: string
  final_cta_subtitle_de?: string
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | boolean | number | null | undefined | UseCase[]
}

export interface PricingPlan {
  id: string
  plan_key: string
  name_it: string
  name_en: string
  name_es?: string
  name_fr?: string
  name_de?: string
  description_it: string
  description_en: string
  description_es?: string
  description_fr?: string
  description_de?: string
  price_display_it: string
  price_display_en: string
  price_display_es?: string
  price_display_fr?: string
  price_display_de?: string
  price_yearly_display_it: string
  price_yearly_display_en: string
  price_yearly_display_es?: string
  price_yearly_display_fr?: string
  price_yearly_display_de?: string
  price_yearly: number
  billing_period_it: string
  billing_period_en: string
  billing_period_es?: string
  billing_period_fr?: string
  billing_period_de?: string
  features_it: string[]
  features_en: string[]
  features_es?: string[]
  features_fr?: string[]
  features_de?: string[]
  not_included_it: string[]
  not_included_en: string[]
  not_included_es?: string[]
  not_included_fr?: string[]
  not_included_de?: string[]
  cta_text_it: string
  cta_text_en: string
  cta_text_es?: string
  cta_text_fr?: string
  cta_text_de?: string
  is_popular: boolean
  icon_name: string
  display_order: number
  signup_url: string
  is_active: boolean
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | string[] | boolean | number | undefined
}

export interface CaseStudy {
  id: string
  tag_it: string
  tag_en: string
  tag_es?: string
  tag_fr?: string
  tag_de?: string
  title_it: string
  title_en: string
  title_es?: string
  title_fr?: string
  title_de?: string
  challenge_title_it: string
  challenge_title_en: string
  challenge_title_es?: string
  challenge_title_fr?: string
  challenge_title_de?: string
  challenge_desc_it: string
  challenge_desc_en: string
  challenge_desc_es?: string
  challenge_desc_fr?: string
  challenge_desc_de?: string
  solution_title_it: string
  solution_title_en: string
  solution_title_es?: string
  solution_title_fr?: string
  solution_title_de?: string
  solution_desc_it: string
  solution_desc_en: string
  solution_desc_es?: string
  solution_desc_fr?: string
  solution_desc_de?: string
  results_title_it: string
  results_title_en: string
  results_title_es?: string
  results_title_fr?: string
  results_title_de?: string
  results_list_it: string[]
  results_list_en: string[]
  results_list_es?: string[]
  results_list_fr?: string[]
  results_list_de?: string[]
  stat_value: string
  stat_label_it: string
  stat_label_en: string
  stat_label_es?: string
  stat_label_fr?: string
  stat_label_de?: string
  image_url: string | null
  is_reversed: boolean
  is_active: boolean
  display_order: number
  auto_translated_en?: boolean
  auto_translated_es?: boolean
  auto_translated_fr?: boolean
  auto_translated_de?: boolean
  [key: string]: string | string[] | boolean | number | null | undefined
}

/**
 * Validates and normalizes a language code to a supported language.
 * Returns 'it' as default if the language is not supported.
 */
export const normalizeLanguage = (lang: string | undefined): SupportedLanguage => {
  if (!lang) return 'it'
  const normalized = lang.toLowerCase() as SupportedLanguage
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : 'it'
}

/**
 * Helper to get localized value with fallback chain.
 * Fallback order: requested language -> English -> Italian -> base field
 *
 * @param item - The item containing localized fields
 * @param fieldName - Base field name without language suffix (e.g., 'title', 'description')
 * @param language - Target language code ('it', 'en', 'es', 'fr', 'de') - accepts string for flexibility
 * @returns The localized string value
 */
export const getLocalizedValue = <T extends Record<string, unknown>>(
  item: T | null | undefined,
  fieldName: string,
  language: string | SupportedLanguage = 'it'
): string => {
  if (!item) return ''

  // Normalize language to ensure it's a valid supported language
  const lang = normalizeLanguage(language)

  // Try requested language first
  const localizedField = `${fieldName}_${lang}` as keyof T
  if (item[localizedField]) {
    return item[localizedField] as string
  }

  // Fallback to English
  const enField = `${fieldName}_en` as keyof T
  if (lang !== 'en' && item[enField]) {
    return item[enField] as string
  }

  // Fallback to Italian
  const itField = `${fieldName}_it` as keyof T
  if (lang !== 'it' && item[itField]) {
    return item[itField] as string
  }

  // Fallback to base field (no suffix)
  const baseField = fieldName as keyof T
  return (item[baseField] as string) || ''
}

/**
 * Helper to get localized array with fallback chain.
 *
 * @param item - The item containing localized arrays
 * @param fieldName - Base field name without language suffix
 * @param language - Target language code - accepts string for flexibility
 * @returns The localized array
 */
export const getLocalizedArray = <T extends Record<string, unknown>>(
  item: T | null | undefined,
  fieldName: string,
  language: string | SupportedLanguage = 'it'
): string[] => {
  if (!item) return []

  // Normalize language to ensure it's a valid supported language
  const lang = normalizeLanguage(language)

  // Try requested language first
  const localizedField = `${fieldName}_${lang}` as keyof T
  const localizedValue = item[localizedField]
  if (Array.isArray(localizedValue) && localizedValue.length > 0) {
    return localizedValue as string[]
  }

  // Fallback to English
  const enField = `${fieldName}_en` as keyof T
  const enValue = item[enField]
  if (lang !== 'en' && Array.isArray(enValue) && enValue.length > 0) {
    return enValue as string[]
  }

  // Fallback to Italian
  const itField = `${fieldName}_it` as keyof T
  const itValue = item[itField]
  if (lang !== 'it' && Array.isArray(itValue) && itValue.length > 0) {
    return itValue as string[]
  }

  // Fallback to base field
  const baseField = fieldName as keyof T
  const baseValue = item[baseField]
  return Array.isArray(baseValue) ? baseValue as string[] : []
}
