'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Grid3x3, Edit2, Save, Loader2, Check, AlertCircle, X, Languages,
    ChevronUp, ChevronDown, Plus, Trash2, Eye, EyeOff, ExternalLink,
    HelpCircle, ImageIcon, Upload
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateText, translateToAllLanguages, translateChangedFieldsMultiLang, translateArrayToAllLanguages, hasArrayChanged } from '@/services/deeplService'
import ConfirmModal from '@/components/admin/ConfirmModal'
import IconPicker, { getIconComponent } from '@/components/admin/IconPicker'
import ColorPicker from '@/components/admin/ColorPicker'

interface UseCase {
    icon: string
    title: string
    description: string
}

interface Sector {
    id: string
    slug: string
    icon_name: string
    color_bg: string
    color_text: string
    title_it: string
    title_en: string
    description_it: string
    description_en: string
    hero_title_it: string
    hero_title_en: string
    hero_subtitle_it: string
    hero_subtitle_en: string
    hero_cta_text_it: string
    hero_cta_text_en: string
    hero_cta_url: string | null
    hero_background_url: string | null
    usecases_title_it: string
    usecases_title_en: string
    usecases_it: UseCase[]
    usecases_en: UseCase[]
    social_proof_stat_value: string
    social_proof_stat_suffix: string
    social_proof_stat_label_it: string
    social_proof_stat_label_en: string
    testimonial_quote_it: string
    testimonial_quote_en: string
    testimonial_author: string
    testimonial_company: string
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
    display_order: number
    is_active: boolean
    auto_translated_en: boolean
}

interface FAQ {
    id: string
    question_it: string
    question_en: string
    answer_it: string
    answer_en: string
    sector_slug: string
    display_order: number
    is_active: boolean
    auto_translated_en: boolean
}

interface CreateForm {
    slug: string
    icon_name: string
    color_bg: string
    color_text: string
    title_it: string
    description_it: string
    hero_title_it: string
    hero_subtitle_it: string
    hero_cta_text_it: string
    hero_cta_url: string
    hero_background_url: string
    usecases_title_it: string
    usecases_it: UseCase[]
    social_proof_stat_value: string
    social_proof_stat_suffix: string
    social_proof_stat_label_it: string
    testimonial_quote_it: string
    testimonial_author: string
    testimonial_company: string
    final_cta_title_it: string
    final_cta_subtitle_it: string
    seo_title_it: string
    seo_description_it: string
    seo_keywords_it: string[]
}

interface PendingFAQ {
    id: number
    question_it: string
    answer_it: string
    display_order: number
}

export default function SectorsPage() {
    const [sectors, setSectors] = useState<Sector[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<Sector>>({})
    const [originalValues, setOriginalValues] = useState<Partial<Sector>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createForm, setCreateForm] = useState<CreateForm>({
        slug: '',
        icon_name: 'ShoppingCart',
        color_bg: 'bg-blue-500/20',
        color_text: 'text-blue-400',
        title_it: '',
        description_it: '',
        hero_title_it: '',
        hero_subtitle_it: '',
        hero_cta_text_it: 'Prova Gratis',
        hero_cta_url: '',
        hero_background_url: '',
        usecases_title_it: '',
        usecases_it: [{ icon: 'CheckCircle', title: '', description: '' }],
        social_proof_stat_value: '',
        social_proof_stat_suffix: '%',
        social_proof_stat_label_it: '',
        testimonial_quote_it: '',
        testimonial_author: '',
        testimonial_company: '',
        final_cta_title_it: '',
        final_cta_subtitle_it: '',
        seo_title_it: '',
        seo_description_it: '',
        seo_keywords_it: []
    })
    const [deleteTarget, setDeleteTarget] = useState<Sector | null>(null)
    const [deleting, setDeleting] = useState(false)
    const [activeTab, setActiveTab] = useState<'card' | 'landing' | 'seo' | 'faq'>('card')

    const [sectorFaqs, setSectorFaqs] = useState<FAQ[]>([])
    const [loadingFaqs, setLoadingFaqs] = useState(false)
    const [editingFaqId, setEditingFaqId] = useState<string | number | null>(null)
    const [faqForm, setFaqForm] = useState({ question_it: '', answer_it: '' })
    const [showFaqModal, setShowFaqModal] = useState(false)
    const [savingFaq, setSavingFaq] = useState(false)
    const [pendingFaqs, setPendingFaqs] = useState<PendingFAQ[]>([])
    const [uploadingImage, setUploadingImage] = useState(false)

    const supabase = createClient()

    const getFilePathFromUrl = (url: string | null | undefined): string | null => {
        if (!url) return null
        const match = url.match(/\/media\/(.+)$/)
        return match ? match[1] : null
    }

    const deleteImageFromStorage = async (url: string | null | undefined) => {
        const filePath = getFilePathFromUrl(url)
        if (filePath) {
            try {
                await supabase.storage.from('media').remove([filePath])
            } catch (err) {
                console.error('Error deleting image:', err)
            }
        }
    }

    const handleImageUpload = async (file: File | undefined, isEdit: boolean) => {
        if (!file) return
        setUploadingImage(true)
        try {
            const currentUrl = isEdit ? editForm.hero_background_url : createForm.hero_background_url
            if (currentUrl) await deleteImageFromStorage(currentUrl)

            const fileExt = file.name.split('.').pop()
            const fileName = `sectors/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file)
            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('media').getPublicUrl(fileName)
            const url = data?.publicUrl

            if (isEdit) setEditForm({ ...editForm, hero_background_url: url })
            else setCreateForm({ ...createForm, hero_background_url: url })
            setSuccess('Immagine caricata!')
            setTimeout(() => setSuccess(''), 2000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore upload'
            setError('Errore upload: ' + message)
        } finally {
            setUploadingImage(false)
        }
    }

    const handleRemoveImage = async (isEdit: boolean) => {
        const currentUrl = isEdit ? editForm.hero_background_url : createForm.hero_background_url
        if (currentUrl) await deleteImageFromStorage(currentUrl)
        if (isEdit) setEditForm({ ...editForm, hero_background_url: '' })
        else setCreateForm({ ...createForm, hero_background_url: '' })
    }

    useEffect(() => { fetchSectors() }, [])

    const fetchSectors = async () => {
        try {
            const { data, error } = await supabase.from('sectors').select('*').order('display_order')
            if (error) throw error
            setSectors(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchSectorFaqs = async (sectorSlug: string) => {
        if (!sectorSlug) return
        setLoadingFaqs(true)
        try {
            const { data, error } = await supabase.from('faqs').select('*').eq('sector_slug', sectorSlug).order('display_order')
            if (error) throw error
            setSectorFaqs(data || [])
        } catch (err) {
            console.error('Error fetching sector FAQs:', err)
        } finally {
            setLoadingFaqs(false)
        }
    }

    const handleCreateFaq = async (sectorSlug: string) => {
        if (!faqForm.question_it.trim() || !faqForm.answer_it.trim()) {
            setError('Compila domanda e risposta')
            return
        }
        setSavingFaq(true)
        try {
            const [qTrans, aTrans] = await Promise.all([translateToAllLanguages(faqForm.question_it), translateToAllLanguages(faqForm.answer_it)])
            const maxOrder = sectorFaqs.length > 0 ? Math.max(...sectorFaqs.map(f => f.display_order || 0)) : 199
            const { error } = await supabase.from('faqs').insert({
                question_it: faqForm.question_it, question_en: qTrans.en, question_es: qTrans.es, question_fr: qTrans.fr, question_de: qTrans.de,
                answer_it: faqForm.answer_it, answer_en: aTrans.en, answer_es: aTrans.es, answer_fr: aTrans.fr, answer_de: aTrans.de,
                sector_slug: sectorSlug, display_order: maxOrder + 1, is_active: true,
                auto_translated_en: true, auto_translated_es: true, auto_translated_fr: true, auto_translated_de: true
            })
            if (error) throw error
            await fetchSectorFaqs(sectorSlug)
            setShowFaqModal(false)
            setFaqForm({ question_it: '', answer_it: '' })
            setSuccess('FAQ creata (5 lingue)!')
            setTimeout(() => setSuccess(''), 2000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore')
        } finally {
            setSavingFaq(false)
        }
    }

    const handleUpdateFaq = async (faqId: string, sectorSlug: string) => {
        setSavingFaq(true)
        try {
            const [qTrans, aTrans] = await Promise.all([translateToAllLanguages(faqForm.question_it), translateToAllLanguages(faqForm.answer_it)])
            const { error } = await supabase.from('faqs').update({
                question_it: faqForm.question_it, question_en: qTrans.en, question_es: qTrans.es, question_fr: qTrans.fr, question_de: qTrans.de,
                answer_it: faqForm.answer_it, answer_en: aTrans.en, answer_es: aTrans.es, answer_fr: aTrans.fr, answer_de: aTrans.de,
                auto_translated_en: true, auto_translated_es: true, auto_translated_fr: true, auto_translated_de: true,
                updated_at: new Date().toISOString()
            }).eq('id', faqId)
            if (error) throw error
            await fetchSectorFaqs(sectorSlug)
            setEditingFaqId(null)
            setFaqForm({ question_it: '', answer_it: '' })
            setSuccess('FAQ aggiornata (5 lingue)!')
            setTimeout(() => setSuccess(''), 2000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore')
        } finally {
            setSavingFaq(false)
        }
    }

    const handleDeleteFaq = async (faqId: string, sectorSlug: string) => {
        if (!confirm('Eliminare questa FAQ?')) return
        try {
            const { error } = await supabase.from('faqs').delete().eq('id', faqId)
            if (error) throw error
            await fetchSectorFaqs(sectorSlug)
            setSuccess('FAQ eliminata!')
            setTimeout(() => setSuccess(''), 2000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore')
        }
    }

    const addPendingFaq = () => {
        if (!createForm.slug?.trim()) { setError('Inserisci prima lo slug del settore'); return }
        if (!faqForm.question_it.trim() || !faqForm.answer_it.trim()) { setError('Compila domanda e risposta'); return }
        setPendingFaqs([...pendingFaqs, { id: Date.now(), question_it: faqForm.question_it, answer_it: faqForm.answer_it, display_order: pendingFaqs.length }])
        setFaqForm({ question_it: '', answer_it: '' })
        setShowFaqModal(false)
        setSuccess('FAQ aggiunta (sarà salvata alla creazione)')
        setTimeout(() => setSuccess(''), 2000)
    }

    const removePendingFaq = (tempId: number) => setPendingFaqs(pendingFaqs.filter(f => f.id !== tempId))

    const updatePendingFaq = (tempId: number) => {
        setPendingFaqs(pendingFaqs.map(f => f.id === tempId ? { ...f, question_it: faqForm.question_it, answer_it: faqForm.answer_it } : f))
        setEditingFaqId(null)
        setFaqForm({ question_it: '', answer_it: '' })
    }

    const startEdit = (sector: Sector) => {
        setEditingId(sector.id)
        setEditForm({ ...sector, usecases_it: sector.usecases_it || [{ icon: 'CheckCircle', title: '', description: '' }], seo_keywords_it: sector.seo_keywords_it || [] })
        setOriginalValues({ ...sector, usecases_it: sector.usecases_it ? JSON.parse(JSON.stringify(sector.usecases_it)) : [], seo_keywords_it: sector.seo_keywords_it ? [...sector.seo_keywords_it] : [] })
        setActiveTab('card')
        fetchSectorFaqs(sector.slug)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const updateData: Record<string, unknown> = {
                slug: editForm.slug, icon_name: editForm.icon_name, color_bg: editForm.color_bg, color_text: editForm.color_text,
                title_it: editForm.title_it, description_it: editForm.description_it,
                hero_title_it: editForm.hero_title_it, hero_subtitle_it: editForm.hero_subtitle_it,
                hero_cta_text_it: editForm.hero_cta_text_it, hero_cta_url: editForm.hero_cta_url?.trim() || null,
                hero_background_url: editForm.hero_background_url?.trim() || null,
                usecases_title_it: editForm.usecases_title_it, usecases_it: (editForm.usecases_it || []).filter(u => u.title?.trim()),
                social_proof_stat_value: editForm.social_proof_stat_value, social_proof_stat_suffix: editForm.social_proof_stat_suffix,
                social_proof_stat_label_it: editForm.social_proof_stat_label_it, testimonial_quote_it: editForm.testimonial_quote_it,
                testimonial_author: editForm.testimonial_author, testimonial_company: editForm.testimonial_company,
                final_cta_title_it: editForm.final_cta_title_it, final_cta_subtitle_it: editForm.final_cta_subtitle_it,
                seo_title_it: editForm.seo_title_it, seo_description_it: editForm.seo_description_it,
                seo_keywords_it: editForm.seo_keywords_it?.filter(k => k?.trim()) || [],
                is_active: editForm.is_active, updated_at: new Date().toISOString()
            }

            // Traduce SOLO i campi testuali modificati in TUTTE le lingue (EN, ES, FR, DE)
            const translations = await translateChangedFieldsMultiLang(editForm as Record<string, unknown>, originalValues as Record<string, unknown>, [
                'title_it', 'description_it', 'hero_title_it', 'hero_subtitle_it', 'hero_cta_text_it',
                'usecases_title_it', 'social_proof_stat_label_it', 'testimonial_quote_it',
                'final_cta_title_it', 'final_cta_subtitle_it', 'seo_title_it', 'seo_description_it'
            ])

            const usecasesChanged = hasArrayChanged(editForm.usecases_it || [], originalValues.usecases_it || [])
            if (usecasesChanged) {
                const filteredUsecases = (editForm.usecases_it || []).filter(u => u.title?.trim())
                // Traduce use cases in tutte le lingue
                const usecasesTranslations = await Promise.all(filteredUsecases.map(async (u) => {
                    const [titleTrans, descTrans] = await Promise.all([
                        translateToAllLanguages(u.title || ''),
                        translateToAllLanguages(u.description || '')
                    ])
                    return { icon: u.icon, titleTrans, descTrans }
                }))
                updateData.usecases_en = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.en, description: t.descTrans.en }))
                updateData.usecases_es = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.es, description: t.descTrans.es }))
                updateData.usecases_fr = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.fr, description: t.descTrans.fr }))
                updateData.usecases_de = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.de, description: t.descTrans.de }))
            }

            const keywordsChanged = hasArrayChanged(editForm.seo_keywords_it || [], originalValues.seo_keywords_it || [])
            if (keywordsChanged) {
                const filteredKeywords = (editForm.seo_keywords_it || []).filter(k => k?.trim())
                const keywordsTrans = await translateArrayToAllLanguages(filteredKeywords)
                updateData.seo_keywords_en = keywordsTrans.en
                updateData.seo_keywords_es = keywordsTrans.es
                updateData.seo_keywords_fr = keywordsTrans.fr
                updateData.seo_keywords_de = keywordsTrans.de
            }

            const hasTranslations = Object.keys(translations).length > 0 || usecasesChanged || keywordsChanged
            if (hasTranslations) {
                setSuccess('Traduzione automatica in corso (EN, ES, FR, DE)...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
                updateData.auto_translated_es = true
                updateData.auto_translated_fr = true
                updateData.auto_translated_de = true
            }

            const { error } = await supabase.from('sectors').update(updateData).eq('id', editingId)
            if (error) throw error
            await fetchSectors()
            setEditingId(null)
            setOriginalValues({})
            setSuccess(hasTranslations ? 'Salvato con traduzione automatica (5 lingue)!' : 'Salvato!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore nel salvataggio')
        } finally {
            setSaving(false)
        }
    }

    const handleCreate = () => {
        setCreateForm({
            slug: '', icon_name: 'ShoppingCart', color_bg: 'bg-blue-500/20', color_text: 'text-blue-400',
            title_it: '', description_it: '', hero_title_it: '', hero_subtitle_it: '',
            hero_cta_text_it: 'Prova Gratis', hero_cta_url: '', hero_background_url: '',
            usecases_title_it: '', usecases_it: [{ icon: 'CheckCircle', title: '', description: '' }],
            social_proof_stat_value: '', social_proof_stat_suffix: '%', social_proof_stat_label_it: '',
            testimonial_quote_it: '', testimonial_author: '', testimonial_company: '',
            final_cta_title_it: '', final_cta_subtitle_it: '', seo_title_it: '', seo_description_it: '', seo_keywords_it: []
        })
        setPendingFaqs([])
        setActiveTab('card')
        setShowCreateModal(true)
    }

    const handleCreateSubmit = async () => {
        if (!createForm.slug.trim() || !createForm.title_it.trim()) { setError('Compila almeno slug e titolo'); return }
        setSaving(true)
        setSuccess('Creazione e traduzione in corso (EN, ES, FR, DE)...')
        try {
            // Traduce tutti i campi testuali in tutte le lingue
            const [titleTrans, descTrans, heroTitleTrans, heroSubtitleTrans, heroCtaTrans, usecasesTitleTrans,
                statLabelTrans, testimonialTrans, finalCtaTitleTrans, finalCtaSubtitleTrans, seoTitleTrans, seoDescTrans
            ] = await Promise.all([
                translateToAllLanguages(createForm.title_it), translateToAllLanguages(createForm.description_it || ''),
                translateToAllLanguages(createForm.hero_title_it || ''), translateToAllLanguages(createForm.hero_subtitle_it || ''),
                translateToAllLanguages(createForm.hero_cta_text_it || 'Prova Gratis'), translateToAllLanguages(createForm.usecases_title_it || ''),
                translateToAllLanguages(createForm.social_proof_stat_label_it || ''), translateToAllLanguages(createForm.testimonial_quote_it || ''),
                translateToAllLanguages(createForm.final_cta_title_it || ''), translateToAllLanguages(createForm.final_cta_subtitle_it || ''),
                translateToAllLanguages(createForm.seo_title_it || ''), translateToAllLanguages(createForm.seo_description_it || '')
            ])

            // Traduce use cases in tutte le lingue
            const filteredUsecases = (createForm.usecases_it || []).filter(u => u.title?.trim())
            const usecasesTranslations = await Promise.all(filteredUsecases.map(async (u) => {
                const [tTrans, dTrans] = await Promise.all([translateToAllLanguages(u.title || ''), translateToAllLanguages(u.description || '')])
                return { icon: u.icon, titleTrans: tTrans, descTrans: dTrans }
            }))
            const usecases_en = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.en, description: t.descTrans.en }))
            const usecases_es = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.es, description: t.descTrans.es }))
            const usecases_fr = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.fr, description: t.descTrans.fr }))
            const usecases_de = usecasesTranslations.map(t => ({ icon: t.icon, title: t.titleTrans.de, description: t.descTrans.de }))

            // Traduce keywords in tutte le lingue
            const filteredKeywords = (createForm.seo_keywords_it || []).filter(k => k?.trim())
            const keywordsTrans = await translateArrayToAllLanguages(filteredKeywords)

            const maxOrder = sectors.length > 0 ? Math.max(...sectors.map(s => s.display_order || 0)) : -1

            const { error } = await supabase.from('sectors').insert({
                slug: createForm.slug.toLowerCase().replace(/\s+/g, '-'),
                icon_name: createForm.icon_name, color_bg: createForm.color_bg, color_text: createForm.color_text,
                title_it: createForm.title_it, title_en: titleTrans.en, title_es: titleTrans.es, title_fr: titleTrans.fr, title_de: titleTrans.de,
                description_it: createForm.description_it, description_en: descTrans.en, description_es: descTrans.es, description_fr: descTrans.fr, description_de: descTrans.de,
                hero_title_it: createForm.hero_title_it, hero_title_en: heroTitleTrans.en, hero_title_es: heroTitleTrans.es, hero_title_fr: heroTitleTrans.fr, hero_title_de: heroTitleTrans.de,
                hero_subtitle_it: createForm.hero_subtitle_it, hero_subtitle_en: heroSubtitleTrans.en, hero_subtitle_es: heroSubtitleTrans.es, hero_subtitle_fr: heroSubtitleTrans.fr, hero_subtitle_de: heroSubtitleTrans.de,
                hero_cta_text_it: createForm.hero_cta_text_it, hero_cta_text_en: heroCtaTrans.en, hero_cta_text_es: heroCtaTrans.es, hero_cta_text_fr: heroCtaTrans.fr, hero_cta_text_de: heroCtaTrans.de,
                hero_cta_url: createForm.hero_cta_url?.trim() || null, hero_background_url: createForm.hero_background_url?.trim() || null,
                usecases_title_it: createForm.usecases_title_it, usecases_title_en: usecasesTitleTrans.en, usecases_title_es: usecasesTitleTrans.es, usecases_title_fr: usecasesTitleTrans.fr, usecases_title_de: usecasesTitleTrans.de,
                usecases_it: filteredUsecases, usecases_en, usecases_es, usecases_fr, usecases_de,
                social_proof_stat_value: createForm.social_proof_stat_value, social_proof_stat_suffix: createForm.social_proof_stat_suffix,
                social_proof_stat_label_it: createForm.social_proof_stat_label_it, social_proof_stat_label_en: statLabelTrans.en, social_proof_stat_label_es: statLabelTrans.es, social_proof_stat_label_fr: statLabelTrans.fr, social_proof_stat_label_de: statLabelTrans.de,
                testimonial_quote_it: createForm.testimonial_quote_it, testimonial_quote_en: testimonialTrans.en, testimonial_quote_es: testimonialTrans.es, testimonial_quote_fr: testimonialTrans.fr, testimonial_quote_de: testimonialTrans.de,
                testimonial_author: createForm.testimonial_author, testimonial_company: createForm.testimonial_company,
                final_cta_title_it: createForm.final_cta_title_it, final_cta_title_en: finalCtaTitleTrans.en, final_cta_title_es: finalCtaTitleTrans.es, final_cta_title_fr: finalCtaTitleTrans.fr, final_cta_title_de: finalCtaTitleTrans.de,
                final_cta_subtitle_it: createForm.final_cta_subtitle_it, final_cta_subtitle_en: finalCtaSubtitleTrans.en, final_cta_subtitle_es: finalCtaSubtitleTrans.es, final_cta_subtitle_fr: finalCtaSubtitleTrans.fr, final_cta_subtitle_de: finalCtaSubtitleTrans.de,
                seo_title_it: createForm.seo_title_it, seo_title_en: seoTitleTrans.en, seo_title_es: seoTitleTrans.es, seo_title_fr: seoTitleTrans.fr, seo_title_de: seoTitleTrans.de,
                seo_description_it: createForm.seo_description_it, seo_description_en: seoDescTrans.en, seo_description_es: seoDescTrans.es, seo_description_fr: seoDescTrans.fr, seo_description_de: seoDescTrans.de,
                seo_keywords_it: filteredKeywords, seo_keywords_en: keywordsTrans.en, seo_keywords_es: keywordsTrans.es, seo_keywords_fr: keywordsTrans.fr, seo_keywords_de: keywordsTrans.de,
                display_order: maxOrder + 1, is_active: true,
                auto_translated_en: true, auto_translated_es: true, auto_translated_fr: true, auto_translated_de: true
            })
            if (error) throw error

            const sectorSlug = createForm.slug.toLowerCase().replace(/\s+/g, '-')
            if (pendingFaqs.length > 0) {
                setSuccess('Salvando FAQ (5 lingue)...')
                for (let i = 0; i < pendingFaqs.length; i++) {
                    const faq = pendingFaqs[i]
                    const [qTrans, aTrans] = await Promise.all([translateToAllLanguages(faq.question_it), translateToAllLanguages(faq.answer_it)])
                    await supabase.from('faqs').insert({
                        question_it: faq.question_it, question_en: qTrans.en, question_es: qTrans.es, question_fr: qTrans.fr, question_de: qTrans.de,
                        answer_it: faq.answer_it, answer_en: aTrans.en, answer_es: aTrans.es, answer_fr: aTrans.fr, answer_de: aTrans.de,
                        sector_slug: sectorSlug, display_order: 200 + i, is_active: true,
                        auto_translated_en: true, auto_translated_es: true, auto_translated_fr: true, auto_translated_de: true
                    })
                }
            }

            await fetchSectors()
            setPendingFaqs([])
            setShowCreateModal(false)
            setSuccess(`Settore creato con traduzione automatica (5 lingue)${pendingFaqs.length > 0 ? ` + ${pendingFaqs.length} FAQ` : ''}!`)
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore nella creazione')
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        setDeleting(true)
        try {
            if (deleteTarget.hero_background_url) await deleteImageFromStorage(deleteTarget.hero_background_url)
            const { error } = await supabase.from('sectors').delete().eq('id', deleteTarget.id)
            if (error) throw error
            await fetchSectors()
            setDeleteTarget(null)
            setSuccess('Eliminato con successo')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore nell\'eliminazione')
        } finally {
            setDeleting(false)
        }
    }

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newItems = [...sectors]
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (swapIndex < 0 || swapIndex >= newItems.length) return
        ;[newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]]
        for (let i = 0; i < newItems.length; i++) {
            await supabase.from('sectors').update({ display_order: i }).eq('id', newItems[i].id)
        }
        await fetchSectors()
    }

    const toggleActive = async (sector: Sector) => {
        try {
            const { error } = await supabase.from('sectors').update({ is_active: !sector.is_active }).eq('id', sector.id)
            if (error) throw error
            await fetchSectors()
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Errore')
        }
    }

    const updateUseCase = (index: number, field: keyof UseCase, value: string, isEdit = false) => {
        if (isEdit) {
            const newUseCases = [...(editForm.usecases_it || [])]
            newUseCases[index] = { ...newUseCases[index], [field]: value }
            setEditForm({ ...editForm, usecases_it: newUseCases })
        } else {
            const newUseCases = [...(createForm.usecases_it || [])]
            newUseCases[index] = { ...newUseCases[index], [field]: value }
            setCreateForm({ ...createForm, usecases_it: newUseCases })
        }
    }

    const addUseCase = (isEdit = false) => {
        if (isEdit) setEditForm({ ...editForm, usecases_it: [...(editForm.usecases_it || []), { icon: 'CheckCircle', title: '', description: '' }] })
        else setCreateForm({ ...createForm, usecases_it: [...(createForm.usecases_it || []), { icon: 'CheckCircle', title: '', description: '' }] })
    }

    const removeUseCase = (index: number, isEdit = false) => {
        if (isEdit) {
            const newUseCases = [...(editForm.usecases_it || [])]
            newUseCases.splice(index, 1)
            setEditForm({ ...editForm, usecases_it: newUseCases })
        } else {
            const newUseCases = [...(createForm.usecases_it || [])]
            newUseCases.splice(index, 1)
            setCreateForm({ ...createForm, usecases_it: newUseCases })
        }
    }

    const updateKeyword = (index: number, value: string, isEdit = false) => {
        if (isEdit) {
            const newKeywords = [...(editForm.seo_keywords_it || [])]
            newKeywords[index] = value
            setEditForm({ ...editForm, seo_keywords_it: newKeywords })
        } else {
            const newKeywords = [...(createForm.seo_keywords_it || [])]
            newKeywords[index] = value
            setCreateForm({ ...createForm, seo_keywords_it: newKeywords })
        }
    }

    const addKeyword = (isEdit = false) => {
        if (isEdit) setEditForm({ ...editForm, seo_keywords_it: [...(editForm.seo_keywords_it || []), ''] })
        else setCreateForm({ ...createForm, seo_keywords_it: [...(createForm.seo_keywords_it || []), ''] })
    }

    const removeKeyword = (index: number, isEdit = false) => {
        if (isEdit) {
            const newKeywords = [...(editForm.seo_keywords_it || [])]
            newKeywords.splice(index, 1)
            setEditForm({ ...editForm, seo_keywords_it: newKeywords })
        } else {
            const newKeywords = [...(createForm.seo_keywords_it || [])]
            newKeywords.splice(index, 1)
            setCreateForm({ ...createForm, seo_keywords_it: newKeywords })
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderFormFields = (form: any, setForm: any, isEdit = false) => (
        <div className="space-y-6">
            <div className="flex gap-2 border-b border-gray-200 dark:border-white/10 pb-2 overflow-x-auto">
                {(['card', 'landing', 'seo', 'faq'] as const).map(tab => (
                    <button key={tab} type="button" onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                        {tab === 'card' ? 'Card' : tab === 'landing' ? 'Landing Page' : tab === 'seo' ? 'SEO' : 'FAQ Settore'}
                    </button>
                ))}
            </div>

            {activeTab === 'card' && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Slug (URL) <span className="text-red-500">*</span></label>
                        <input type="text" value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className={`w-full bg-gray-50 dark:bg-dark-bg border rounded-lg px-3 py-2 text-gray-900 dark:text-white ${!form.slug?.trim() ? 'border-red-300 dark:border-red-500/50' : 'border-gray-200 dark:border-white/10'}`}
                            placeholder="es. ecommerce, immobiliare" />
                        {!form.slug?.trim() && <p className="text-xs text-red-500 mt-1">Lo slug è obbligatorio</p>}
                    </div>
                    <div className="space-y-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <h4 className="font-medium text-gray-900 dark:text-white">Stile Card</h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Icona</label>
                                <IconPicker value={form.icon_name || 'ShoppingCart'} onChange={(iconName) => setForm({ ...form, icon_name: iconName })}
                                    textColor={form.color_text || 'text-blue-400'} bgColor={form.color_bg || 'bg-blue-500/20'} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Colore Tema</label>
                                <ColorPicker textColor={form.color_text || 'text-blue-400'} bgColor={form.color_bg || 'bg-blue-500/20'}
                                    onChange={({ textColor, bgColor }) => setForm({ ...form, color_text: textColor, color_bg: bgColor })}
                                    iconName={form.icon_name || 'ShoppingCart'} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo</label>
                        <input type="text" value={form.title_it || ''} onChange={(e) => setForm({ ...form, title_it: e.target.value })}
                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" placeholder="es. E-commerce" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Descrizione Card</label>
                        <textarea value={form.description_it || ''} onChange={(e) => setForm({ ...form, description_it: e.target.value })} rows={3}
                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" placeholder="Breve descrizione..." />
                    </div>
                </>
            )}

            {activeTab === 'landing' && (
                <>
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-4">Hero Section</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo Hero (H1)</label>
                                <input type="text" value={form.hero_title_it || ''} onChange={(e) => setForm({ ...form, hero_title_it: e.target.value })}
                                    className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" placeholder="es. Trasforma il Tuo E-commerce" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Sottotitolo Hero</label>
                                <textarea value={form.hero_subtitle_it || ''} onChange={(e) => setForm({ ...form, hero_subtitle_it: e.target.value })} rows={2}
                                    className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Testo CTA</label>
                                    <input type="text" value={form.hero_cta_text_it || 'Prova Gratis'} onChange={(e) => setForm({ ...form, hero_cta_text_it: e.target.value })}
                                        className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">URL CTA (opzionale)</label>
                                    <input type="text" value={form.hero_cta_url || ''} onChange={(e) => setForm({ ...form, hero_cta_url: e.target.value })}
                                        className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white" placeholder="Lascia vuoto per default" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">
                        <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-3 flex items-center gap-2"><ImageIcon className="w-4 h-4" />Immagine Sfondo Hero</h4>
                        {form.hero_background_url ? (
                            <div className="space-y-3">
                                <div className="relative rounded-lg overflow-hidden h-40 bg-gray-100 dark:bg-white/5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={form.hero_background_url} alt="Hero background" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => handleRemoveImage(isEdit)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><X className="w-4 h-4" /></button>
                                </div>
                                <label className="block">
                                    <span className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer"><Upload className="w-4 h-4" />Cambia immagine</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files?.[0], isEdit)} />
                                </label>
                            </div>
                        ) : (
                            <label className={`flex flex-col items-center justify-center h-32 border-2 border-dashed border-indigo-300 dark:border-indigo-500/30 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-500/10 ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                                {uploadingImage ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <><Upload className="w-8 h-8 text-indigo-400 mb-2" /><span className="text-sm text-indigo-600 dark:text-indigo-400">Clicca per caricare</span></>}
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files?.[0], isEdit)} disabled={uploadingImage} />
                            </label>
                        )}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Dimensioni consigliate: 1920x1080px</p>
                    </div>

                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-4">Use Cases (3-4 consigliati)</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo Sezione</label>
                            <input type="text" value={form.usecases_title_it || ''} onChange={(e) => setForm({ ...form, usecases_title_it: e.target.value })}
                                className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white mb-4" placeholder="es. Come Leader24 aiuta..." />
                        </div>
                        {(form.usecases_it || []).map((usecase: UseCase, idx: number) => (
                            <div key={idx} className="p-3 bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-white/10 mb-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use Case {idx + 1}</span>
                                    {(form.usecases_it || []).length > 1 && <button type="button" onClick={() => removeUseCase(idx, isEdit)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"><X className="w-4 h-4" /></button>}
                                </div>
                                <div className="grid sm:grid-cols-3 gap-2">
                                    <input type="text" value={usecase.icon || ''} onChange={(e) => updateUseCase(idx, 'icon', e.target.value, isEdit)} className="bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded px-2 py-1 text-sm" placeholder="Icona" />
                                    <input type="text" value={usecase.title || ''} onChange={(e) => updateUseCase(idx, 'title', e.target.value, isEdit)} className="bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded px-2 py-1 text-sm" placeholder="Titolo" />
                                    <input type="text" value={usecase.description || ''} onChange={(e) => updateUseCase(idx, 'description', e.target.value, isEdit)} className="bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded px-2 py-1 text-sm sm:col-span-3" placeholder="Descrizione" />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addUseCase(isEdit)} className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"><Plus className="w-3 h-3" /> Aggiungi Use Case</button>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20">
                        <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-4">Social Proof</h4>
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Valore Stat</label>
                                    <input type="text" value={form.social_proof_stat_value || ''} onChange={(e) => setForm({ ...form, social_proof_stat_value: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="es. 40" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Suffisso</label>
                                    <input type="text" value={form.social_proof_stat_suffix || '%'} onChange={(e) => setForm({ ...form, social_proof_stat_suffix: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="%" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Label Stat</label>
                                    <input type="text" value={form.social_proof_stat_label_it || ''} onChange={(e) => setForm({ ...form, social_proof_stat_label_it: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="es. Aumento conversioni" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Testimonial (opzionale)</label>
                                <textarea value={form.testimonial_quote_it || ''} onChange={(e) => setForm({ ...form, testimonial_quote_it: e.target.value })} rows={2} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Citazione del cliente..." />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input type="text" value={form.testimonial_author || ''} onChange={(e) => setForm({ ...form, testimonial_author: e.target.value })} className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Nome autore" />
                                <input type="text" value={form.testimonial_company || ''} onChange={(e) => setForm({ ...form, testimonial_company: e.target.value })} className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Azienda" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                        <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-4">CTA Finale</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo CTA</label>
                                <input type="text" value={form.final_cta_title_it || ''} onChange={(e) => setForm({ ...form, final_cta_title_it: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="es. Pronto a trasformare...?" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Sottotitolo CTA</label>
                                <input type="text" value={form.final_cta_subtitle_it || ''} onChange={(e) => setForm({ ...form, final_cta_subtitle_it: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="es. Inizia la prova gratuita" />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'seo' && (
                <>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Meta Tags</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">SEO Title</label>
                                <input type="text" value={form.seo_title_it || ''} onChange={(e) => setForm({ ...form, seo_title_it: e.target.value })} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="es. WhatsApp AI per E-commerce | Leader24" />
                                <p className="text-xs text-gray-500 mt-1">Max 60 caratteri consigliati</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Meta Description</label>
                                <textarea value={form.seo_description_it || ''} onChange={(e) => setForm({ ...form, seo_description_it: e.target.value })} rows={3} className="w-full bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Descrizione per i motori di ricerca..." />
                                <p className="text-xs text-gray-500 mt-1">Max 160 caratteri consigliati</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-4">Keywords</h4>
                        {(form.seo_keywords_it || []).map((keyword: string, idx: number) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <input type="text" value={keyword} onChange={(e) => updateKeyword(idx, e.target.value, isEdit)} className="flex-1 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="es. whatsapp ecommerce" />
                                <button type="button" onClick={() => removeKeyword(idx, isEdit)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addKeyword(isEdit)} className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"><Plus className="w-3 h-3" /> Aggiungi keyword</button>
                    </div>
                </>
            )}

            {activeTab === 'faq' && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    {!isEdit && !form.slug?.trim() && (
                        <div className="mb-4 p-3 bg-orange-100 dark:bg-orange-500/20 border border-orange-300 dark:border-orange-500/30 rounded-lg">
                            <p className="text-sm text-orange-700 dark:text-orange-300 flex items-center gap-2"><AlertCircle className="w-4 h-4" />Inserisci prima lo <strong>slug</strong> nel tab Card per poter aggiungere FAQ.</p>
                        </div>
                    )}
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5" />FAQ Specifiche per {form.title_it || 'questo settore'}
                            {!isEdit && pendingFaqs.length > 0 && <span className="ml-2 px-2 py-0.5 bg-amber-200 dark:bg-amber-500/30 text-amber-700 dark:text-amber-200 rounded-full text-xs">{pendingFaqs.length} in attesa</span>}
                        </h4>
                        <button type="button" onClick={() => { if (!isEdit && !form.slug?.trim()) { setError('Inserisci prima lo slug'); return }; setFaqForm({ question_it: '', answer_it: '' }); setShowFaqModal(true) }}
                            disabled={!isEdit && !form.slug?.trim()} className="text-sm bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"><Plus className="w-3 h-3" /> Nuova FAQ</button>
                    </div>

                    {isEdit && (loadingFaqs ? <div className="text-center py-8"><Loader2 className="w-6 h-6 text-amber-500 animate-spin mx-auto" /></div> : sectorFaqs.length === 0 ? <p className="text-center text-gray-500 dark:text-gray-400 py-8">Nessuna FAQ per questo settore.</p> : (
                        <div className="space-y-3">
                            {sectorFaqs.map((faq) => (
                                <div key={faq.id} className="bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-white/10 p-4">
                                    {editingFaqId === faq.id ? (
                                        <div className="space-y-3">
                                            <input type="text" value={faqForm.question_it} onChange={(e) => setFaqForm({ ...faqForm, question_it: e.target.value })} className="w-full bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="Domanda..." />
                                            <textarea value={faqForm.answer_it} onChange={(e) => setFaqForm({ ...faqForm, answer_it: e.target.value })} rows={3} className="w-full bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="Risposta..." />
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={() => { setEditingFaqId(null); setFaqForm({ question_it: '', answer_it: '' }) }} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">Annulla</button>
                                                <button type="button" onClick={() => handleUpdateFaq(faq.id, form.slug || '')} disabled={savingFaq} className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1">{savingFaq ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}Salva</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h5 className="font-medium text-gray-900 dark:text-white text-sm">{faq.question_it}</h5>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <button type="button" onClick={() => { setEditingFaqId(faq.id); setFaqForm({ question_it: faq.question_it, answer_it: faq.answer_it }) }} className="p-1 text-gray-400 hover:text-primary hover:bg-primary/10 rounded"><Edit2 className="w-3 h-3" /></button>
                                                    <button type="button" onClick={() => handleDeleteFaq(faq.id, form.slug || '')} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{faq.answer_it}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {!isEdit && (pendingFaqs.length === 0 ? <p className="text-center text-gray-500 dark:text-gray-400 py-8">{form.slug?.trim() ? 'Nessuna FAQ. Clicca "Nuova FAQ" per aggiungerne una.' : 'Inserisci lo slug per poter aggiungere FAQ.'}</p> : (
                        <div className="space-y-3">
                            <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">Queste FAQ verranno salvate quando crei il settore.</p>
                            {pendingFaqs.map((faq) => (
                                <div key={faq.id} className="bg-white dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-white/10 p-4">
                                    {editingFaqId === faq.id ? (
                                        <div className="space-y-3">
                                            <input type="text" value={faqForm.question_it} onChange={(e) => setFaqForm({ ...faqForm, question_it: e.target.value })} className="w-full bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="Domanda..." />
                                            <textarea value={faqForm.answer_it} onChange={(e) => setFaqForm({ ...faqForm, answer_it: e.target.value })} rows={3} className="w-full bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm" placeholder="Risposta..." />
                                            <div className="flex gap-2 justify-end">
                                                <button type="button" onClick={() => { setEditingFaqId(null); setFaqForm({ question_it: '', answer_it: '' }) }} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">Annulla</button>
                                                <button type="button" onClick={() => updatePendingFaq(faq.id)} className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center gap-1"><Save className="w-3 h-3" />Aggiorna</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h5 className="font-medium text-gray-900 dark:text-white text-sm">{faq.question_it}</h5>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    <button type="button" onClick={() => { setEditingFaqId(faq.id); setFaqForm({ question_it: faq.question_it, answer_it: faq.answer_it }) }} className="p-1 text-gray-400 hover:text-primary hover:bg-primary/10 rounded"><Edit2 className="w-3 h-3" /></button>
                                                    <button type="button" onClick={() => removePendingFaq(faq.id)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"><Trash2 className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{faq.answer_it}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {showFaqModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFaqModal(false)} />
                            <div className="relative bg-white dark:bg-dark-card rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-500" />Nuova FAQ per {form.title_it || form.slug || 'settore'}</h3>
                                <input type="text" value={faqForm.question_it} onChange={(e) => setFaqForm({ ...faqForm, question_it: e.target.value })} className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Domanda (italiano)..." autoFocus />
                                <textarea value={faqForm.answer_it} onChange={(e) => setFaqForm({ ...faqForm, answer_it: e.target.value })} rows={4} className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2" placeholder="Risposta (italiano)..." />
                                <p className="text-xs text-gray-500">{isEdit ? 'Traduzione inglese automatica al salvataggio.' : 'La FAQ verrà salvata con traduzione automatica quando crei il settore.'}</p>
                                <div className="flex gap-2 justify-end">
                                    <button type="button" onClick={() => setShowFaqModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">Annulla</button>
                                    <button type="button" onClick={() => isEdit ? handleCreateFaq(form.slug || '') : addPendingFaq()} disabled={(isEdit && savingFaq) || !faqForm.question_it.trim() || !faqForm.answer_it.trim()}
                                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2">
                                        {isEdit && savingFaq ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}{isEdit ? 'Crea FAQ' : 'Aggiungi FAQ'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Grid3x3 className="w-6 h-6 text-emerald-500" /></div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settori</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gestisci i settori e le pagine di configurazione</p>
                    </div>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"><Plus className="w-4 h-4" />Aggiungi Settore</button>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4 flex items-start gap-3">
                <Languages className="w-5 h-5 text-indigo-500 mt-0.5" /><p className="text-sm text-indigo-700 dark:text-indigo-300">Scrivi in italiano - traduzione automatica al salvataggio</p>
            </div>

            <AnimatePresence>
                {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" /><p className="text-red-700 dark:text-red-300">{error}</p><button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4 text-red-500" /></button>
                </motion.div>}
                {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" /><p className="text-green-700 dark:text-green-300">{success}</p>
                </motion.div>}
            </AnimatePresence>

            <div className="space-y-4">
                {sectors.map((sector, index) => {
                    const isEditing = editingId === sector.id
                    const IconComponent = getIconComponent(sector.icon_name)
                    return (
                        <motion.div key={sector.id} layout className={`bg-white dark:bg-dark-card rounded-xl border ${sector.is_active ? 'border-gray-200 dark:border-white/10' : 'border-gray-200 dark:border-white/5 opacity-60'} overflow-hidden`}>
                            <div className="p-4 flex items-start gap-4">
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30"><ChevronUp className="w-4 h-4 text-gray-500" /></button>
                                    <button onClick={() => moveItem(index, 'down')} disabled={index === sectors.length - 1} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30"><ChevronDown className="w-4 h-4 text-gray-500" /></button>
                                </div>
                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            {renderFormFields(editForm, setEditForm, true)}
                                            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10">
                                                <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Salva</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${sector.color_bg} flex items-center justify-center flex-shrink-0`}><IconComponent className={`w-6 h-6 ${sector.color_text}`} /></div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">{sector.title_it}</h3>
                                                    {!sector.is_active && <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">Nascosto</span>}
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{sector.description_it}</p>
                                                <p className="text-xs text-gray-400 mt-1">/{sector.slug}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {isEditing ? <button onClick={() => setEditingId(null)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg" title="Chiudi"><X className="w-4 h-4" /></button> : (
                                        <>
                                            <button onClick={() => toggleActive(sector)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg" title={sector.is_active ? 'Nascondi' : 'Mostra'}>{sector.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                                            <a href={`/settori/${sector.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg" title="Apri landing page"><ExternalLink className="w-4 h-4" /></a>
                                            <button onClick={() => startEdit(sector)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                                            <button onClick={() => setDeleteTarget(sector)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {sectors.length === 0 && <div className="text-center py-12 text-gray-500 dark:text-gray-400"><Grid3x3 className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Nessun settore. Clicca &quot;Aggiungi&quot; per crearne uno.</p></div>}

            <AnimatePresence>
                {showCreateModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200 dark:border-white/10">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nuovo Settore</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Scrivi in italiano - traduzione automatica</p>
                            </div>
                            <div className="p-6">{renderFormFields(createForm, setCreateForm, false)}</div>
                            <div className="p-6 border-t border-gray-200 dark:border-white/10 flex justify-end gap-3">
                                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg">Annulla</button>
                                <button onClick={handleCreateSubmit} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}Crea</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleteConfirm} title="Elimina Settore" message={`Sei sicuro di voler eliminare "${deleteTarget?.title_it}"? Questa azione non può essere annullata.`} confirmText="Elimina" loading={deleting} />
        </div>
    )
}
