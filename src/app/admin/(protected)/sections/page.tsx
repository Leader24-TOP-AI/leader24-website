'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Navigation, FileText, Home, CreditCard, Phone, BookOpen, Grid3x3,
    ArrowLeft, Edit2, Save, Loader2, Check, AlertCircle, X, Languages, Lightbulb,
    LucideIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateToAllLanguages } from '@/services/deeplService'

// Configurazione sezioni - una card per ogni pagina del sito
interface SectionItem {
    key: string
    type: 'text' | 'textarea' | 'image'
    label: string
    source: 'content' | 'settings'
    category?: string
}

interface SectionConfig {
    id: string
    name: string
    icon: LucideIcon
    color: string
    description: string
    items: SectionItem[]
}

const SECTION_CONFIG: SectionConfig[] = [
    {
        id: 'navbar',
        name: 'Navbar',
        icon: Navigation,
        color: 'blue',
        description: 'Menu e pulsanti di navigazione',
        items: [
            { key: 'nav_home', type: 'text', label: 'Voce Menu: Home', source: 'settings', category: 'navbar' },
            { key: 'nav_sectors', type: 'text', label: 'Voce Menu: Settori', source: 'settings', category: 'navbar' },
            { key: 'nav_pricing', type: 'text', label: 'Voce Menu: Prezzi', source: 'settings', category: 'navbar' },
            { key: 'nav_cases', type: 'text', label: 'Voce Menu: Casi Studio', source: 'settings', category: 'navbar' },
            { key: 'navbar_cta_text', type: 'text', label: 'CTA Desktop', source: 'settings', category: 'navbar' },
            { key: 'navbar_cta_mobile_text', type: 'text', label: 'CTA Mobile', source: 'settings', category: 'navbar' }
        ]
    },
    {
        id: 'footer',
        name: 'Footer',
        icon: FileText,
        color: 'purple',
        description: 'Testi a piè di pagina',
        items: [
            { key: 'footer_description', type: 'textarea', label: 'Descrizione', source: 'content' },
            { key: 'footer_copyright', type: 'text', label: 'Copyright', source: 'content' }
        ]
    },
    {
        id: 'home',
        name: 'Home',
        icon: Home,
        color: 'green',
        description: 'Tutti i testi della homepage',
        items: [
            // Hero
            { key: 'hero_badge', type: 'text', label: '🏠 Hero: Badge (es. AI Attiva 24/7)', source: 'content' },
            { key: 'hero_title', type: 'text', label: '🏠 Hero: Titolo', source: 'content' },
            { key: 'hero_title_prefix', type: 'text', label: '🏠 Hero: Prefisso parola rotante (es. Anche quando)', source: 'content' },
            { key: 'hero_rotating_words', type: 'text', label: '🏠 Hero: Parole rotanti (separate da virgola)', source: 'content' },
            { key: 'hero_title_highlight', type: 'text', label: '🏠 Hero: Riga evidenziata (verde)', source: 'content' },
            { key: 'hero_subtitle', type: 'textarea', label: '🏠 Hero: Sottotitolo', source: 'content' },
            { key: 'hero_cta_primary', type: 'text', label: '🏠 Hero: CTA Primario', source: 'content' },
            { key: 'hero_cta_secondary', type: 'text', label: '🏠 Hero: CTA Secondario', source: 'content' },
            { key: 'hero_check_1', type: 'text', label: '🏠 Hero: Check 1 (es. Nessuna carta richiesta)', source: 'content' },
            { key: 'hero_check_2', type: 'text', label: '🏠 Hero: Check 2 (es. 14 giorni di prova)', source: 'content' },
            // How It Works
            { key: 'how_it_works_title', type: 'text', label: '⚙️ Come Funziona: Titolo', source: 'content' },
            { key: 'how_it_works_subtitle', type: 'textarea', label: '⚙️ Come Funziona: Sottotitolo', source: 'content' },
            // Features
            { key: 'features_title', type: 'text', label: '✨ Features: Titolo', source: 'content' },
            { key: 'features_subtitle', type: 'textarea', label: '✨ Features: Sottotitolo', source: 'content' },
            // Sector Preview
            { key: 'sector_preview_title', type: 'text', label: '🏢 Settori Preview: Titolo', source: 'content' },
            { key: 'sector_preview_subtitle', type: 'textarea', label: '🏢 Settori Preview: Sottotitolo', source: 'content' },
            // Integrations
            { key: 'integrations_title', type: 'text', label: '🔗 Integrazioni: Titolo', source: 'content' },
            { key: 'integrations_subtitle', type: 'textarea', label: '🔗 Integrazioni: Sottotitolo', source: 'content' },
            // Testimonials
            { key: 'testimonials_title', type: 'text', label: '⭐ Testimonianze: Titolo', source: 'content' },
            { key: 'testimonials_subtitle', type: 'textarea', label: '⭐ Testimonianze: Sottotitolo', source: 'content' },
            // FAQ
            { key: 'faq_title', type: 'text', label: '❓ FAQ: Titolo', source: 'content' },
            { key: 'faq_subtitle', type: 'textarea', label: '❓ FAQ: Sottotitolo', source: 'content' },
            // CTA
            { key: 'cta_title', type: 'text', label: '🚀 CTA Finale: Titolo', source: 'content' },
            { key: 'cta_subtitle', type: 'textarea', label: '🚀 CTA Finale: Sottotitolo', source: 'content' },
            { key: 'cta_button', type: 'text', label: '🚀 CTA Finale: Testo Bottone', source: 'content' },
            { key: 'cta_footer', type: 'text', label: '🚀 CTA Finale: Footer', source: 'content' }
        ]
    },
    {
        id: 'casestudies',
        name: 'Casi Studio',
        icon: BookOpen,
        color: 'indigo',
        description: 'Pagina casi studio',
        items: [
            { key: 'casestudies_title', type: 'text', label: 'Titolo Pagina', source: 'content' },
            { key: 'casestudies_subtitle', type: 'textarea', label: 'Sottotitolo', source: 'content' },
            { key: 'casestudies_cta_title', type: 'text', label: 'CTA: Titolo', source: 'content' },
            { key: 'casestudies_cta_button', type: 'text', label: 'CTA: Testo Bottone', source: 'content' }
        ]
    },
    {
        id: 'pricing',
        name: 'Prezzi',
        icon: CreditCard,
        color: 'yellow',
        description: 'Titoli pagina prezzi',
        items: [
            { key: 'pricing_title', type: 'text', label: '📄 Titolo Pagina', source: 'content' },
            { key: 'pricing_subtitle', type: 'textarea', label: '📝 Sottotitolo', source: 'content' }
        ]
    },
    {
        id: 'contact',
        name: 'Contatti',
        icon: Phone,
        color: 'red',
        description: 'Pagina contatti e info aziendali',
        items: [
            { key: 'contact_hero_title', type: 'text', label: '🏠 Hero: Titolo', source: 'content' },
            { key: 'contact_hero_desc', type: 'textarea', label: '🏠 Hero: Descrizione', source: 'content' },
            { key: 'contact_form_title', type: 'text', label: '📋 Form: Titolo', source: 'content' },
            { key: 'contact_form_submit', type: 'text', label: '📋 Form: Bottone Invio', source: 'content' },
            { key: 'contact_placeholder_name', type: 'text', label: '✏️ Placeholder: Nome', source: 'content' },
            { key: 'contact_placeholder_company', type: 'text', label: '✏️ Placeholder: Azienda', source: 'content' },
            { key: 'contact_placeholder_email', type: 'text', label: '✏️ Placeholder: Email', source: 'content' },
            { key: 'contact_placeholder_message', type: 'text', label: '✏️ Placeholder: Messaggio', source: 'content' },
            { key: 'contact_privacy', type: 'text', label: '🔒 Privacy Notice', source: 'content' },
            { key: 'contact_testimonial_text', type: 'textarea', label: '💬 Testimonial: Testo', source: 'content' },
            { key: 'contact_testimonial_author', type: 'text', label: '💬 Testimonial: Autore', source: 'content' },
            { key: 'contact_testimonial_role', type: 'text', label: '💬 Testimonial: Ruolo', source: 'content' },
            { key: 'company_email', type: 'text', label: '📧 Email Azienda', source: 'settings', category: 'contact' },
            { key: 'company_phone', type: 'text', label: '📞 Telefono', source: 'settings', category: 'contact' },
            { key: 'company_address_line1', type: 'text', label: '📍 Indirizzo Linea 1', source: 'settings', category: 'contact' },
            { key: 'company_address_line2', type: 'text', label: '📍 Indirizzo Linea 2', source: 'settings', category: 'contact' },
            { key: 'company_address_line3', type: 'text', label: '📍 Indirizzo Linea 3', source: 'settings', category: 'contact' }
        ]
    },
    {
        id: 'sectors',
        name: 'Settori',
        icon: Grid3x3,
        color: 'cyan',
        description: 'Titoli e testi pagina settori',
        items: [
            { key: 'sectors_title', type: 'text', label: '📄 Titolo Pagina', source: 'content' },
            { key: 'sectors_subtitle', type: 'textarea', label: '📝 Sottotitolo', source: 'content' },
            { key: 'sectors_cta_title', type: 'text', label: '💬 CTA: Titolo', source: 'content' },
            { key: 'sectors_cta_desc', type: 'textarea', label: '💬 CTA: Descrizione', source: 'content' },
            { key: 'sectors_cta_button', type: 'text', label: '💬 CTA: Bottone', source: 'content' }
        ]
    },
    {
        id: 'sectorconfig',
        name: 'Pagina Config Settore',
        icon: Lightbulb,
        color: 'teal',
        description: 'Testi della pagina configurazione settore',
        items: [
            { key: 'sectorconfig_tips_title', type: 'text', label: '💡 Titolo Consigli', source: 'content' },
            { key: 'sectorconfig_examples_title', type: 'text', label: '❓ Titolo Esempi', source: 'content' },
            { key: 'sectorconfig_examples_desc', type: 'textarea', label: '❓ Descrizione Esempi', source: 'content' },
            { key: 'sectorconfig_cta_title', type: 'text', label: '🚀 CTA: Titolo', source: 'content' },
            { key: 'sectorconfig_cta_desc', type: 'textarea', label: '🚀 CTA: Descrizione', source: 'content' },
            { key: 'sectorconfig_cta_contact', type: 'text', label: '🚀 CTA: Bottone Contatto', source: 'content' },
            { key: 'sectorconfig_cta_pricing', type: 'text', label: '🚀 CTA: Bottone Prezzi', source: 'content' },
            { key: 'sectorconfig_back', type: 'text', label: '⬅️ Link Torna indietro', source: 'content' }
        ]
    }
]

// Mappa colori
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
    yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20' },
    red: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20' },
    indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/20' },
    teal: { bg: 'bg-teal-500/10', text: 'text-teal-500', border: 'border-teal-500/20' }
}

interface SectionContentItem {
    section_key: string
    content_it: string
    content_en: string
}

interface SiteSettingsItem {
    key: string
    category: string
    value_it: string
    value_en: string
}

export default function SectionsPage() {
    const [selectedSection, setSelectedSection] = useState<SectionConfig | null>(null)
    const [sectionContent, setSectionContent] = useState<Record<string, SectionContentItem>>({})
    const [siteSettings, setSiteSettings] = useState<Record<string, SiteSettingsItem>>({})
    const [editForm, setEditForm] = useState<Record<string, string>>({})
    const [originalValues, setOriginalValues] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const supabase = createClient()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // Fetch section_content
            const { data: contentData, error: contentError } = await supabase
                .from('section_content')
                .select('*')
            if (contentError) throw contentError

            // Fetch site_settings
            const { data: settingsData, error: settingsError } = await supabase
                .from('site_settings')
                .select('*')
            if (settingsError) throw settingsError

            // Convert to objects keyed by section_key/key
            const contentObj: Record<string, SectionContentItem> = {}
            ;(contentData || []).forEach((item: SectionContentItem) => {
                contentObj[item.section_key] = item
            })

            const settingsObj: Record<string, SiteSettingsItem> = {}
            ;(settingsData || []).forEach((item: SiteSettingsItem) => {
                settingsObj[item.key] = item
            })

            setSectionContent(contentObj)
            setSiteSettings(settingsObj)
        } catch (err) {
            setError('Errore nel caricamento dei dati')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const openSection = (section: SectionConfig) => {
        setSelectedSection(section)
        // Initialize edit form with current values
        const form: Record<string, string> = {}
        section.items.forEach(item => {
            if (item.source === 'content') {
                form[item.key] = sectionContent[item.key]?.content_it || ''
            } else {
                form[item.key] = siteSettings[item.key]?.value_it || ''
            }
        })
        setEditForm(form)
        setOriginalValues({ ...form })
    }

    const handleSave = async () => {
        if (!selectedSection) return

        setSaving(true)
        try {
            // Group items by source
            const contentUpdates: Array<{
                key: string
                content_it: string
                translations?: { en: string; es: string; fr: string; de: string }
                needsTranslation?: boolean
            }> = []
            const settingsUpdates: Array<{
                key: string
                category?: string
                value_it: string
                translations?: { en: string; es: string; fr: string; de: string }
                needsTranslation?: boolean
            }> = []
            let translationsCount = 0

            for (const item of selectedSection.items) {
                if (item.type === 'image') continue // Images handled separately

                const value_it = editForm[item.key]
                const hasChanged = value_it !== originalValues[item.key]

                if (item.source === 'content') {
                    const update: {
                        key: string
                        content_it: string
                        translations?: { en: string; es: string; fr: string; de: string }
                        needsTranslation?: boolean
                    } = {
                        key: item.key,
                        content_it: value_it
                    }
                    // Traduce SOLO se modificato - in TUTTE le lingue (EN, ES, FR, DE)
                    if (hasChanged && value_it) {
                        update.translations = await translateToAllLanguages(value_it)
                        update.needsTranslation = true
                        translationsCount++
                    }
                    contentUpdates.push(update)
                } else {
                    const update: {
                        key: string
                        category?: string
                        value_it: string
                        translations?: { en: string; es: string; fr: string; de: string }
                        needsTranslation?: boolean
                    } = {
                        key: item.key,
                        category: item.category,
                        value_it: value_it
                    }
                    // Traduce SOLO se modificato - in TUTTE le lingue (EN, ES, FR, DE)
                    if (hasChanged && value_it) {
                        update.translations = await translateToAllLanguages(value_it)
                        update.needsTranslation = true
                        translationsCount++
                    }
                    settingsUpdates.push(update)
                }
            }

            if (translationsCount > 0) {
                setSuccess('Traduzione automatica in corso (EN, ES, FR, DE)...')
            }

            // Update section_content
            for (const update of contentUpdates) {
                const updateData: Record<string, unknown> = {
                    content_it: update.content_it,
                    updated_at: new Date().toISOString()
                }
                if (update.needsTranslation && update.translations) {
                    updateData.content_en = update.translations.en
                    updateData.content_es = update.translations.es
                    updateData.content_fr = update.translations.fr
                    updateData.content_de = update.translations.de
                    updateData.auto_translated_en = true
                    updateData.auto_translated_es = true
                    updateData.auto_translated_fr = true
                    updateData.auto_translated_de = true
                }
                await supabase
                    .from('section_content')
                    .update(updateData)
                    .eq('section_key', update.key)
            }

            // Update site_settings
            for (const update of settingsUpdates) {
                const updateData: Record<string, unknown> = {
                    value_it: update.value_it,
                    updated_at: new Date().toISOString()
                }
                if (update.needsTranslation && update.translations) {
                    updateData.value_en = update.translations.en
                    updateData.value_es = update.translations.es
                    updateData.value_fr = update.translations.fr
                    updateData.value_de = update.translations.de
                    updateData.auto_translated_en = true
                    updateData.auto_translated_es = true
                    updateData.auto_translated_fr = true
                    updateData.auto_translated_de = true
                }
                await supabase
                    .from('site_settings')
                    .update(updateData)
                    .eq('key', update.key)
            }

            await fetchData()
            setOriginalValues({ ...editForm })
            setSuccess(translationsCount > 0
                ? 'Salvato con traduzione automatica (5 lingue)!'
                : 'Salvato!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nel salvataggio'
            setError(message)
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    // Vista dettaglio sezione
    if (selectedSection) {
        const colors = colorMap[selectedSection.color]
        const Icon = selectedSection.icon

        return (
            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <button
                        onClick={() => setSelectedSection(null)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-heading">
                            {selectedSection.name}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">{selectedSection.description}</p>
                    </div>
                </motion.div>

                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600">
                        <AlertCircle className="w-5 h-5" />{error}
                        <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
                    </div>
                )}
                {success && (
                    <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600">
                        <Check className="w-5 h-5" />{success}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-6"
                >
                    <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 mb-4">
                        <Languages className="w-4 h-4" />
                        Scrivi in italiano - traduzione automatica al salvataggio
                    </div>

                    {selectedSection.items.map((item) => (
                        <div key={item.key} className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {item.label}
                            </label>

                            {item.type === 'textarea' ? (
                                <textarea
                                    value={editForm[item.key] || ''}
                                    onChange={(e) => setEditForm({ ...editForm, [item.key]: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white resize-none"
                                    placeholder={`Inserisci ${item.label.toLowerCase()}...`}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={editForm[item.key] || ''}
                                    onChange={(e) => setEditForm({ ...editForm, [item.key]: e.target.value })}
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                    placeholder={`Inserisci ${item.label.toLowerCase()}...`}
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => setSelectedSection(null)}
                            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            Annulla
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Salva Modifiche
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    }

    // Vista principale con cards
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                    Sezioni
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Gestisci i contenuti del sito organizzati per sezione
                </p>
            </motion.div>

            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-600">
                    <AlertCircle className="w-5 h-5" />{error}
                    <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600">
                    <Check className="w-5 h-5" />{success}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {SECTION_CONFIG.map((section, index) => {
                    const Icon = section.icon
                    const colors = colorMap[section.color]

                    return (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => openSection(section)}
                            className={`bg-white dark:bg-dark-card border ${colors.border} rounded-xl p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all group`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon className={`w-6 h-6 ${colors.text}`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {section.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {section.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {section.items.length} elementi
                                </span>
                                <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
