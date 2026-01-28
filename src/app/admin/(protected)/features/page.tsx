'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles, Edit2, Save, Loader2, Check, AlertCircle, X, Languages,
    ChevronUp, ChevronDown, Plus, Trash2
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateToAllLanguages, translateChangedFieldsMultiLang } from '@/services/deeplService'
import ConfirmModal from '@/components/admin/ConfirmModal'
import IconPicker, { getIconComponent } from '@/components/admin/IconPicker'

interface Feature {
    id: string
    title_it: string
    title_en: string
    description_it: string
    description_en: string
    icon_name: string
    display_order: number
    is_active: boolean
    auto_translated_en: boolean
}

export default function FeaturesPage() {
    const [features, setFeatures] = useState<Feature[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<Feature>>({})
    const [originalValues, setOriginalValues] = useState<Partial<Feature>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createForm, setCreateForm] = useState({ title_it: '', description_it: '', icon_name: 'Clock' })
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchFeatures()
    }, [])

    const fetchFeatures = async () => {
        try {
            const { data, error } = await supabase
                .from('homepage_features')
                .select('*')
                .order('display_order')
            if (error) throw error
            setFeatures(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (feature: Feature) => {
        setEditingId(feature.id)
        setEditForm({ ...feature })
        setOriginalValues({ ...feature })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const updateData: Record<string, unknown> = {
                title_it: editForm.title_it,
                description_it: editForm.description_it,
                icon_name: editForm.icon_name,
                is_active: editForm.is_active,
                updated_at: new Date().toISOString()
            }

            // Traduce SOLO i campi modificati in TUTTE le lingue (EN, ES, FR, DE)
            const translations = await translateChangedFieldsMultiLang(
                editForm as Record<string, unknown>,
                originalValues as Record<string, unknown>,
                ['title_it', 'description_it']
            )

            if (Object.keys(translations).length > 0) {
                setSuccess('Traduzione automatica in corso (EN, ES, FR, DE)...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
                updateData.auto_translated_es = true
                updateData.auto_translated_fr = true
                updateData.auto_translated_de = true
            }

            const { error } = await supabase
                .from('homepage_features')
                .update(updateData)
                .eq('id', editingId)

            if (error) throw error
            await fetchFeatures()
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
        setCreateForm({ title_it: '', description_it: '', icon_name: 'Clock' })
        setShowCreateModal(true)
    }

    // Submit new feature with auto-translation
    const handleCreateSubmit = async () => {
        if (!createForm.title_it.trim() || !createForm.description_it.trim()) {
            setError('Compila tutti i campi')
            return
        }

        setSaving(true)
        setSuccess('Traduzione automatica in corso (EN, ES, FR, DE)...')
        try {
            // Auto-translate Italian to ALL languages (EN, ES, FR, DE)
            const [titleTrans, descTrans] = await Promise.all([
                translateToAllLanguages(createForm.title_it),
                translateToAllLanguages(createForm.description_it)
            ])

            const maxOrder = Math.max(...features.map(f => f.display_order || 0), 0)
            const { error } = await supabase
                .from('homepage_features')
                .insert({
                    title_it: createForm.title_it,
                    title_en: titleTrans.en,
                    title_es: titleTrans.es,
                    title_fr: titleTrans.fr,
                    title_de: titleTrans.de,
                    description_it: createForm.description_it,
                    description_en: descTrans.en,
                    description_es: descTrans.es,
                    description_fr: descTrans.fr,
                    description_de: descTrans.de,
                    icon_name: createForm.icon_name,
                    display_order: maxOrder + 1,
                    is_active: true,
                    auto_translated_en: true,
                    auto_translated_es: true,
                    auto_translated_fr: true,
                    auto_translated_de: true
                })

            if (error) throw error
            await fetchFeatures()
            setShowCreateModal(false)
            setCreateForm({ title_it: '', description_it: '', icon_name: 'Clock' })
            setSuccess('Feature creata con traduzione automatica (5 lingue)!')
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
            const { error } = await supabase.from('homepage_features').delete().eq('id', deleteTarget)
            if (error) throw error
            await fetchFeatures()
            setDeleteTarget(null)
            setSuccess('Feature eliminata!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nell\'eliminazione'
            setError(message)
        } finally {
            setDeleting(false)
        }
    }

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newFeatures = [...features]
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (swapIndex < 0 || swapIndex >= newFeatures.length) return

        const tempOrder = newFeatures[index].display_order
        newFeatures[index].display_order = newFeatures[swapIndex].display_order
        newFeatures[swapIndex].display_order = tempOrder

        try {
            await Promise.all([
                supabase.from('homepage_features').update({ display_order: newFeatures[index].display_order }).eq('id', newFeatures[index].id),
                supabase.from('homepage_features').update({ display_order: newFeatures[swapIndex].display_order }).eq('id', newFeatures[swapIndex].id)
            ])
            await fetchFeatures()
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
                        Features Homepage
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gestisci le card delle caratteristiche nella homepage
                    </p>
                </div>
                <button
                    onClick={handleCreate}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl shadow-lg shadow-primary/25 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Aggiungi Feature
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => {
                    const IconComponent = getIconComponent(feature.icon_name)

                    return (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`bg-white dark:bg-dark-card border rounded-xl overflow-hidden ${
                                feature.is_active ? 'border-gray-200 dark:border-white/10' : 'border-gray-200/50 dark:border-white/5 opacity-60'
                            }`}
                        >
                            {editingId === feature.id ? (
                                // Edit mode
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900 dark:text-white">Modifica Feature</span>
                                        <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                            <Languages className="w-3 h-3" />Auto-traduzione
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Icona</label>
                                        <IconPicker
                                            value={editForm.icon_name || 'Clock'}
                                            onChange={(iconName) => setEditForm({ ...editForm, icon_name: iconName })}
                                            textColor="text-primary"
                                            bgColor="bg-primary/10"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Titolo (IT)</label>
                                        <input
                                            type="text"
                                            value={editForm.title_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, title_it: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Descrizione (IT)</label>
                                        <textarea
                                            value={editForm.description_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, description_it: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white resize-none"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`active-${feature.id}`}
                                            checked={editForm.is_active}
                                            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`active-${feature.id}`} className="text-sm text-gray-600 dark:text-gray-400">
                                            Attiva
                                        </label>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-1.5 text-sm text-gray-600">
                                            Annulla
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex-1 px-3 py-1.5 bg-primary text-white text-sm rounded-lg flex items-center justify-center gap-2"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Salva'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View mode
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                            <IconComponent className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => moveItem(index, 'up')}
                                                disabled={index === 0}
                                                className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 rounded"
                                            >
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => moveItem(index, 'down')}
                                                disabled={index === features.length - 1}
                                                className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30 rounded"
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => startEdit(feature)}
                                                className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(feature.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title_it}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                        {feature.description_it}
                                    </p>

                                    {!feature.is_active && (
                                        <span className="inline-block mt-2 text-xs text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                                            Disattivata
                                        </span>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {features.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Nessuna feature. Clicca "Aggiungi Feature" per crearne una.
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
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Nuova Feature
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
                                        Icona
                                    </label>
                                    <IconPicker
                                        value={createForm.icon_name}
                                        onChange={(iconName) => setCreateForm({ ...createForm, icon_name: iconName })}
                                        textColor="text-primary"
                                        bgColor="bg-primary/10"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Titolo (Italiano)
                                    </label>
                                    <input
                                        type="text"
                                        value={createForm.title_it}
                                        onChange={(e) => setCreateForm({ ...createForm, title_it: e.target.value })}
                                        placeholder="Es: Risparmio di Tempo"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Descrizione (Italiano)
                                    </label>
                                    <textarea
                                        value={createForm.description_it}
                                        onChange={(e) => setCreateForm({ ...createForm, description_it: e.target.value })}
                                        placeholder="Descrivi la caratteristica..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                                    />
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Le traduzioni (EN, ES, FR, DE) verranno generate automaticamente al salvataggio.
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
                                    disabled={saving || !createForm.title_it.trim() || !createForm.description_it.trim()}
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
                                            Salva Feature
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
                title="Elimina Feature"
                message="Sei sicuro di voler eliminare questa feature? L'azione non puo essere annullata."
                confirmText="Elimina"
                loading={deleting}
            />
        </div>
    )
}
