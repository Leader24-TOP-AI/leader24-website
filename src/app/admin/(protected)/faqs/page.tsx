'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    HelpCircle, Edit2, Save, Loader2, Check, AlertCircle, X, Languages,
    Plus, Trash2, ChevronDown, ChevronUp
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateText, translateChangedFields } from '@/services/deeplService'
import ConfirmModal from '@/components/admin/ConfirmModal'

interface FAQ {
    id: string
    question_it: string
    question_en: string
    answer_it: string
    answer_en: string
    display_order: number
    is_active: boolean
    sector_slug: string | null
    auto_translated_en: boolean
}

export default function FAQsPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<FAQ>>({})
    const [originalValues, setOriginalValues] = useState<Partial<FAQ>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [expandedId, setExpandedId] = useState<string | null>(null)

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createForm, setCreateForm] = useState({ question_it: '', answer_it: '' })
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchFAQs()
    }, [])

    const fetchFAQs = async () => {
        try {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .is('sector_slug', null)  // Solo FAQ homepage (non settoriali)
                .order('display_order')
            if (error) throw error
            setFaqs(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (faq: FAQ) => {
        setEditingId(faq.id)
        setEditForm({ ...faq })
        setOriginalValues({ ...faq }) // Salva valori originali per confronto
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Prepara oggetto update base
            const updateData: Record<string, unknown> = {
                question_it: editForm.question_it,
                answer_it: editForm.answer_it,
                is_active: editForm.is_active,
                updated_at: new Date().toISOString()
            }

            // Traduce SOLO i campi modificati
            const translations = await translateChangedFields(
                editForm as Record<string, unknown>,
                originalValues as Record<string, unknown>,
                ['question_it', 'answer_it']
            )

            // Se ci sono traduzioni, aggiungile all'update
            if (Object.keys(translations).length > 0) {
                setSuccess('Traduzione automatica in corso...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
            }

            const { error } = await supabase
                .from('faqs')
                .update(updateData)
                .eq('id', editingId)

            if (error) throw error
            await fetchFAQs()
            setEditingId(null)
            setOriginalValues({})
            setSuccess(Object.keys(translations).length > 0
                ? 'Salvato con traduzione automatica!'
                : 'Salvato!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nel salvataggio'
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    // Open create modal
    const handleCreate = () => {
        setCreateForm({ question_it: '', answer_it: '' })
        setShowCreateModal(true)
    }

    // Submit new FAQ with auto-translation
    const handleCreateSubmit = async () => {
        if (!createForm.question_it.trim() || !createForm.answer_it.trim()) {
            setError('Compila tutti i campi')
            return
        }

        setSaving(true)
        setSuccess('Traduzione automatica in corso...')
        try {
            // Auto-translate Italian to English
            const [question_en, answer_en] = await Promise.all([
                translateText(createForm.question_it),
                translateText(createForm.answer_it)
            ])

            const maxOrder = Math.max(...faqs.map(f => f.display_order || 0), 0)
            const { error } = await supabase
                .from('faqs')
                .insert({
                    question_it: createForm.question_it,
                    question_en: question_en,
                    answer_it: createForm.answer_it,
                    answer_en: answer_en,
                    display_order: maxOrder + 1,
                    is_active: true,
                    auto_translated_en: true
                })

            if (error) throw error
            await fetchFAQs()
            setShowCreateModal(false)
            setCreateForm({ question_it: '', answer_it: '' })
            setSuccess('FAQ creata con traduzione automatica!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nella creazione'
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    // Open delete confirmation modal
    const handleDeleteClick = (id: string) => {
        setDeleteTarget(id)
    }

    // Confirm delete
    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return

        setDeleting(true)
        try {
            const { error } = await supabase.from('faqs').delete().eq('id', deleteTarget)
            if (error) throw error
            await fetchFAQs()
            setDeleteTarget(null)
            setSuccess('FAQ eliminata!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nell\'eliminazione'
            setError(message)
        } finally {
            setDeleting(false)
        }
    }

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newFaqs = [...faqs]
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (swapIndex < 0 || swapIndex >= newFaqs.length) return

        // Swap display_order
        const tempOrder = newFaqs[index].display_order
        newFaqs[index].display_order = newFaqs[swapIndex].display_order
        newFaqs[swapIndex].display_order = tempOrder

        // Update in database
        try {
            await Promise.all([
                supabase.from('faqs').update({ display_order: newFaqs[index].display_order }).eq('id', newFaqs[index].id),
                supabase.from('faqs').update({ display_order: newFaqs[swapIndex].display_order }).eq('id', newFaqs[swapIndex].id)
            ])
            await fetchFAQs()
        } catch (err) {
            setError('Errore nel riordinamento')
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                        FAQ
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gestisci le domande frequenti della homepage
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl shadow-lg shadow-primary/25 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Aggiungi FAQ
                </button>
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

            <div className="space-y-3">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-white dark:bg-dark-card border rounded-xl overflow-hidden ${
                            faq.is_active ? 'border-gray-200 dark:border-white/10' : 'border-gray-200/50 dark:border-white/5 opacity-60'
                        }`}
                    >
                        {editingId === faq.id ? (
                            // Edit mode
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900 dark:text-white">Modifica FAQ</span>
                                    <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                                        <Languages className="w-3 h-3" />Auto-traduzione
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500">Domanda (IT)</label>
                                    <input
                                        type="text"
                                        value={editForm.question_it || ''}
                                        onChange={(e) => setEditForm({ ...editForm, question_it: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                        placeholder="Es: Come funziona Leader24?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500">Risposta (IT)</label>
                                    <textarea
                                        value={editForm.answer_it || ''}
                                        onChange={(e) => setEditForm({ ...editForm, answer_it: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white resize-none"
                                        placeholder="Scrivi la risposta completa..."
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`active-${faq.id}`}
                                        checked={editForm.is_active}
                                        onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor={`active-${faq.id}`} className="text-sm text-gray-600 dark:text-gray-400">
                                        Attiva
                                    </label>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Salva
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // View mode
                            <div>
                                <div
                                    className="p-4 flex items-center gap-4 cursor-pointer"
                                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                                >
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); moveItem(index, 'up'); }}
                                            disabled={index === 0}
                                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); moveItem(index, 'down'); }}
                                            disabled={index === faqs.length - 1}
                                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                        <HelpCircle className="w-5 h-5 text-amber-500" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                            {faq.question_it}
                                        </h3>
                                        {!faq.is_active && (
                                            <span className="text-xs text-gray-400">Disattivata</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); startEdit(faq); }}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(faq.id); }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === faq.id ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>

                                {expandedId === faq.id && (
                                    <div className="px-4 pb-4 pl-20">
                                        <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
                                            {faq.answer_it}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {faqs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Nessuna FAQ. Clicca "Aggiungi FAQ" per crearne una.
                </div>
            )}

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => !saving && setShowCreateModal(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative bg-white dark:bg-dark-card rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-white/10"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                            <HelpCircle className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Nuova FAQ
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                                        <Languages className="w-3 h-3" />Auto-traduzione
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Domanda (Italiano)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.question_it}
                                        onChange={(e) => setCreateForm({ ...createForm, question_it: e.target.value })}
                                        placeholder="Es: Come funziona Leader24?"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Risposta (Italiano)
                                    </label>
                                    <textarea
                                        value={createForm.answer_it}
                                        onChange={(e) => setCreateForm({ ...createForm, answer_it: e.target.value })}
                                        placeholder="Scrivi la risposta completa..."
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                                    />
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    La traduzione inglese verra generata automaticamente al salvataggio.
                                </p>
                            </div>

                            <div className="p-6 pt-0 flex gap-3">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    disabled={saving}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleCreateSubmit}
                                    disabled={saving || !createForm.question_it.trim() || !createForm.answer_it.trim()}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Salvataggio...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Salva FAQ
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                title="Elimina FAQ"
                message="Sei sicuro di voler eliminare questa FAQ? L'azione non puo essere annullata."
                confirmText="Elimina"
                loading={deleting}
            />
        </div>
    )
}
