'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen, Edit2, Save, Loader2, Check, AlertCircle, X, Languages,
    ChevronUp, ChevronDown, Plus, Trash2, Eye, EyeOff
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateText, translateChangedFields, hasArrayChanged } from '@/services/deeplService'
import ConfirmModal from '@/components/admin/ConfirmModal'

const colorOptions = [
    { value: 'blue', label: 'Blu', bg: 'bg-blue-500/20', text: 'text-blue-600 dark:text-blue-300' },
    { value: 'green', label: 'Verde', bg: 'bg-green-500/20', text: 'text-green-600 dark:text-green-300' },
    { value: 'purple', label: 'Viola', bg: 'bg-purple-500/20', text: 'text-purple-600 dark:text-purple-300' },
    { value: 'orange', label: 'Arancione', bg: 'bg-orange-500/20', text: 'text-orange-600 dark:text-orange-300' },
    { value: 'red', label: 'Rosso', bg: 'bg-red-500/20', text: 'text-red-600 dark:text-red-300' },
    { value: 'cyan', label: 'Ciano', bg: 'bg-cyan-500/20', text: 'text-cyan-600 dark:text-cyan-300' },
]

interface CaseStudy {
    id: string
    case_key: string
    tag_it: string
    tag_en: string
    tag_color: string
    title_it: string
    title_en: string
    challenge_desc_it: string
    challenge_desc_en: string
    solution_desc_it: string
    solution_desc_en: string
    results_list_it: string[]
    results_list_en: string[]
    stat_value: string
    stat_label_it: string
    stat_label_en: string
    is_reversed: boolean
    is_active: boolean
    display_order: number
    auto_translated_en: boolean
}

interface CreateForm {
    case_key: string
    tag_it: string
    tag_color: string
    title_it: string
    challenge_desc_it: string
    solution_desc_it: string
    results_list_it: string[]
    stat_value: string
    stat_label_it: string
    is_reversed: boolean
}

export default function CaseStudiesPage() {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<CaseStudy>>({})
    const [originalValues, setOriginalValues] = useState<Partial<CaseStudy>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createForm, setCreateForm] = useState<CreateForm>({
        case_key: '',
        tag_it: '',
        tag_color: 'blue',
        title_it: '',
        challenge_desc_it: '',
        solution_desc_it: '',
        results_list_it: [''],
        stat_value: '',
        stat_label_it: '',
        is_reversed: false
    })
    const [deleteTarget, setDeleteTarget] = useState<CaseStudy | null>(null)
    const [deleting, setDeleting] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchCaseStudies()
    }, [])

    const fetchCaseStudies = async () => {
        try {
            const { data, error } = await supabase
                .from('case_studies')
                .select('*')
                .order('display_order')
            if (error) throw error
            setCaseStudies(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (caseStudy: CaseStudy) => {
        setEditingId(caseStudy.id)
        const formData = {
            ...caseStudy,
            results_list_it: caseStudy.results_list_it || []
        }
        setEditForm(formData)
        setOriginalValues({
            ...caseStudy,
            results_list_it: caseStudy.results_list_it ? [...caseStudy.results_list_it] : []
        })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const updateData: Record<string, unknown> = {
                tag_it: editForm.tag_it,
                tag_color: editForm.tag_color,
                title_it: editForm.title_it,
                challenge_desc_it: editForm.challenge_desc_it,
                solution_desc_it: editForm.solution_desc_it,
                results_list_it: editForm.results_list_it,
                stat_value: editForm.stat_value,
                stat_label_it: editForm.stat_label_it,
                is_reversed: editForm.is_reversed,
                is_active: editForm.is_active,
                updated_at: new Date().toISOString()
            }

            // Traduce SOLO i campi testuali modificati
            const translations = await translateChangedFields(
                editForm as Record<string, unknown>,
                originalValues as Record<string, unknown>,
                ['tag_it', 'title_it', 'challenge_desc_it', 'solution_desc_it', 'stat_label_it']
            )

            // Traduce l'array solo se modificato
            const arrayChanged = hasArrayChanged(
                editForm.results_list_it || [],
                originalValues.results_list_it || []
            )
            if (arrayChanged) {
                const results_list_en = await Promise.all(
                    (editForm.results_list_it || []).map(item => translateText(item))
                )
                updateData.results_list_en = results_list_en
            }

            const hasTranslations = Object.keys(translations).length > 0 || arrayChanged

            if (hasTranslations) {
                setSuccess('Traduzione automatica in corso...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
            }

            const { error } = await supabase
                .from('case_studies')
                .update(updateData)
                .eq('id', editingId)

            if (error) throw error
            await fetchCaseStudies()
            setEditingId(null)
            setOriginalValues({})
            setSuccess(hasTranslations
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

    const handleCreate = () => {
        setCreateForm({
            case_key: '',
            tag_it: '',
            tag_color: 'blue',
            title_it: '',
            challenge_desc_it: '',
            solution_desc_it: '',
            results_list_it: [''],
            stat_value: '',
            stat_label_it: '',
            is_reversed: false
        })
        setShowCreateModal(true)
    }

    const handleCreateSubmit = async () => {
        if (!createForm.case_key.trim() || !createForm.title_it.trim() || !createForm.tag_it.trim()) {
            setError('Compila almeno chiave, tag e titolo')
            return
        }

        setSaving(true)
        setSuccess('Creazione e traduzione in corso...')
        try {
            const [
                tag_en, title_en, challenge_desc_en, solution_desc_en, stat_label_en
            ] = await Promise.all([
                translateText(createForm.tag_it),
                translateText(createForm.title_it),
                translateText(createForm.challenge_desc_it || ''),
                translateText(createForm.solution_desc_it || ''),
                translateText(createForm.stat_label_it || '')
            ])

            const results_list_en = await Promise.all(
                (createForm.results_list_it || []).filter(r => r.trim()).map(item => translateText(item))
            )

            const maxOrder = caseStudies.length > 0
                ? Math.max(...caseStudies.map(c => c.display_order || 0))
                : -1

            const { error } = await supabase
                .from('case_studies')
                .insert({
                    case_key: createForm.case_key.toLowerCase().replace(/\s+/g, '_'),
                    tag_it: createForm.tag_it,
                    tag_en,
                    tag_color: createForm.tag_color,
                    title_it: createForm.title_it,
                    title_en,
                    challenge_desc_it: createForm.challenge_desc_it,
                    challenge_desc_en,
                    solution_desc_it: createForm.solution_desc_it,
                    solution_desc_en,
                    results_list_it: createForm.results_list_it.filter(r => r.trim()),
                    results_list_en: results_list_en.filter(r => r.trim()),
                    stat_value: createForm.stat_value,
                    stat_label_it: createForm.stat_label_it,
                    stat_label_en,
                    is_reversed: createForm.is_reversed,
                    display_order: maxOrder + 1,
                    auto_translated_en: true
                })

            if (error) throw error
            await fetchCaseStudies()
            setShowCreateModal(false)
            setSuccess('Case study creato con successo!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nella creazione'
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteClick = (caseStudy: CaseStudy) => {
        setDeleteTarget(caseStudy)
    }

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return
        setDeleting(true)
        try {
            const { error } = await supabase
                .from('case_studies')
                .delete()
                .eq('id', deleteTarget.id)

            if (error) throw error
            await fetchCaseStudies()
            setDeleteTarget(null)
            setSuccess('Eliminato con successo')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nell\'eliminazione'
            setError(message)
        } finally {
            setDeleting(false)
        }
    }

    const moveItem = async (index: number, direction: 'up' | 'down') => {
        const newItems = [...caseStudies]
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (swapIndex < 0 || swapIndex >= newItems.length) return

        ;[newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]]

        for (let i = 0; i < newItems.length; i++) {
            await supabase
                .from('case_studies')
                .update({ display_order: i })
                .eq('id', newItems[i].id)
        }
        await fetchCaseStudies()
    }

    const toggleActive = async (caseStudy: CaseStudy) => {
        try {
            const { error } = await supabase
                .from('case_studies')
                .update({ is_active: !caseStudy.is_active })
                .eq('id', caseStudy.id)
            if (error) throw error
            await fetchCaseStudies()
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore'
            setError(message)
        }
    }

    const getColorClasses = (color: string) => {
        const option = colorOptions.find(c => c.value === color) || colorOptions[0]
        return option
    }

    // Helper to handle results list
    const updateResultsList = (index: number, value: string, isEdit = false) => {
        if (isEdit) {
            const newList = [...(editForm.results_list_it || [])]
            newList[index] = value
            setEditForm({ ...editForm, results_list_it: newList })
        } else {
            const newList = [...(createForm.results_list_it || [])]
            newList[index] = value
            setCreateForm({ ...createForm, results_list_it: newList })
        }
    }

    const addResultItem = (isEdit = false) => {
        if (isEdit) {
            setEditForm({ ...editForm, results_list_it: [...(editForm.results_list_it || []), ''] })
        } else {
            setCreateForm({ ...createForm, results_list_it: [...(createForm.results_list_it || []), ''] })
        }
    }

    const removeResultItem = (index: number, isEdit = false) => {
        if (isEdit) {
            const newList = [...(editForm.results_list_it || [])]
            newList.splice(index, 1)
            setEditForm({ ...editForm, results_list_it: newList })
        } else {
            const newList = [...(createForm.results_list_it || [])]
            newList.splice(index, 1)
            setCreateForm({ ...createForm, results_list_it: newList })
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
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Casi Studio</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gestisci i casi studio del sito</p>
                    </div>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Aggiungi Case Study
                </button>
            </div>

            {/* Translation Notice */}
            <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-4 flex items-start gap-3">
                <Languages className="w-5 h-5 text-indigo-500 mt-0.5" />
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    Scrivi in italiano - traduzione automatica al salvataggio
                </p>
            </div>

            {/* Messages */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 dark:text-red-300">{error}</p>
                        <button onClick={() => setError('')} className="ml-auto">
                            <X className="w-4 h-4 text-red-500" />
                        </button>
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-4 flex items-center gap-3"
                    >
                        <Check className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 dark:text-green-300">{success}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Case Studies List */}
            <div className="space-y-4">
                {caseStudies.map((caseStudy, index) => {
                    const isEditing = editingId === caseStudy.id
                    const colorClass = getColorClasses(caseStudy.tag_color)

                    return (
                        <motion.div
                            key={caseStudy.id}
                            layout
                            className={`bg-white dark:bg-dark-card rounded-xl border ${
                                caseStudy.is_active
                                    ? 'border-gray-200 dark:border-white/10'
                                    : 'border-gray-200 dark:border-white/5 opacity-60'
                            } overflow-hidden`}
                        >
                            <div className="p-4 flex items-start gap-4">
                                {/* Order Controls */}
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => moveItem(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30"
                                    >
                                        <ChevronUp className="w-4 h-4 text-gray-500" />
                                    </button>
                                    <button
                                        onClick={() => moveItem(index, 'down')}
                                        disabled={index === caseStudies.length - 1}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30"
                                    >
                                        <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {isEditing ? (
                                        <div className="space-y-4">
                                            {/* Tag & Color */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tag</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.tag_it || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, tag_it: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                        placeholder="es. Telecomunicazioni"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Colore Tag</label>
                                                    <select
                                                        value={editForm.tag_color || 'blue'}
                                                        onChange={(e) => setEditForm({ ...editForm, tag_color: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                    >
                                                        {colorOptions.map(c => (
                                                            <option key={c.value} value={c.value}>{c.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo</label>
                                                <input
                                                    type="text"
                                                    value={editForm.title_it || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, title_it: e.target.value })}
                                                    className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                    placeholder="es. FiberNet Italia: +40% di Lead Qualificati"
                                                />
                                            </div>

                                            {/* Challenge */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">La Sfida</label>
                                                <textarea
                                                    value={editForm.challenge_desc_it || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, challenge_desc_it: e.target.value })}
                                                    rows={2}
                                                    className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                    placeholder="Descrivi la sfida del cliente..."
                                                />
                                            </div>

                                            {/* Solution */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">La Soluzione</label>
                                                <textarea
                                                    value={editForm.solution_desc_it || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, solution_desc_it: e.target.value })}
                                                    rows={2}
                                                    className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                    placeholder="Descrivi la soluzione implementata..."
                                                />
                                            </div>

                                            {/* Results */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">I Risultati</label>
                                                {(editForm.results_list_it || []).map((result, idx) => (
                                                    <div key={idx} className="flex gap-2 mb-2">
                                                        <input
                                                            type="text"
                                                            value={result}
                                                            onChange={(e) => updateResultsList(idx, e.target.value, true)}
                                                            className="flex-1 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm"
                                                            placeholder="es. Riduzione del 60% dei ticket"
                                                        />
                                                        <button
                                                            onClick={() => removeResultItem(idx, true)}
                                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => addResultItem(true)}
                                                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                                                >
                                                    <Plus className="w-3 h-3" /> Aggiungi risultato
                                                </button>
                                            </div>

                                            {/* Stat */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Stat Valore</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.stat_value || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, stat_value: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                        placeholder="es. 40%"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Stat Label</label>
                                                    <input
                                                        type="text"
                                                        value={editForm.stat_label_it || ''}
                                                        onChange={(e) => setEditForm({ ...editForm, stat_label_it: e.target.value })}
                                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                                        placeholder="es. AUMENTO CONVERSIONI"
                                                    />
                                                </div>
                                            </div>

                                            {/* Layout Toggle */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={editForm.is_reversed || false}
                                                    onChange={(e) => setEditForm({ ...editForm, is_reversed: e.target.checked })}
                                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Layout invertito (stat a sinistra)</span>
                                            </label>

                                            {/* Save Button - Bottom Right */}
                                            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                    Salva
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass.bg} ${colorClass.text}`}>
                                                    {caseStudy.tag_it}
                                                </span>
                                                {!caseStudy.is_active && (
                                                    <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
                                                        Nascosto
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {caseStudy.title_it}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {caseStudy.challenge_desc_it}
                                            </p>
                                            {caseStudy.stat_value && (
                                                <div className="mt-2 text-sm">
                                                    <span className="font-bold text-primary">{caseStudy.stat_value}</span>
                                                    <span className="text-gray-500 dark:text-gray-400 ml-1">{caseStudy.stat_label_it}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    {isEditing ? (
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                                            title="Chiudi"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => toggleActive(caseStudy)}
                                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                                                title={caseStudy.is_active ? 'Nascondi' : 'Mostra'}
                                            >
                                                {caseStudy.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => startEdit(caseStudy)}
                                                className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(caseStudy)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {caseStudies.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun case study. Clicca &quot;Aggiungi&quot; per crearne uno.</p>
                </div>
            )}

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white dark:bg-dark-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-white/10">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nuovo Case Study</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Scrivi in italiano - traduzione automatica</p>
                            </div>
                            <div className="p-6 space-y-4">
                                {/* Key */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Chiave (URL-friendly)</label>
                                    <input
                                        type="text"
                                        value={createForm.case_key}
                                        onChange={(e) => setCreateForm({ ...createForm, case_key: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                        placeholder="es. fibernet, rentrush"
                                    />
                                </div>

                                {/* Tag & Color */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tag</label>
                                        <input
                                            type="text"
                                            value={createForm.tag_it}
                                            onChange={(e) => setCreateForm({ ...createForm, tag_it: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                            placeholder="es. E-commerce"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Colore Tag</label>
                                        <select
                                            value={createForm.tag_color}
                                            onChange={(e) => setCreateForm({ ...createForm, tag_color: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                        >
                                            {colorOptions.map(c => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Titolo</label>
                                    <input
                                        type="text"
                                        value={createForm.title_it}
                                        onChange={(e) => setCreateForm({ ...createForm, title_it: e.target.value })}
                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                        placeholder="es. ShopMaster: +60% Vendite Online"
                                    />
                                </div>

                                {/* Challenge */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">La Sfida</label>
                                    <textarea
                                        value={createForm.challenge_desc_it}
                                        onChange={(e) => setCreateForm({ ...createForm, challenge_desc_it: e.target.value })}
                                        rows={2}
                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Solution */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">La Soluzione</label>
                                    <textarea
                                        value={createForm.solution_desc_it}
                                        onChange={(e) => setCreateForm({ ...createForm, solution_desc_it: e.target.value })}
                                        rows={2}
                                        className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Results */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">I Risultati</label>
                                    {createForm.results_list_it.map((result, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={result}
                                                onChange={(e) => updateResultsList(idx, e.target.value, false)}
                                                className="flex-1 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm"
                                            />
                                            {createForm.results_list_it.length > 1 && (
                                                <button
                                                    onClick={() => removeResultItem(idx, false)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addResultItem(false)}
                                        className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Aggiungi risultato
                                    </button>
                                </div>

                                {/* Stat */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Stat Valore</label>
                                        <input
                                            type="text"
                                            value={createForm.stat_value}
                                            onChange={(e) => setCreateForm({ ...createForm, stat_value: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                            placeholder="es. 60%"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Stat Label</label>
                                        <input
                                            type="text"
                                            value={createForm.stat_label_it}
                                            onChange={(e) => setCreateForm({ ...createForm, stat_label_it: e.target.value })}
                                            className="w-full bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                                            placeholder="es. AUMENTO VENDITE"
                                        />
                                    </div>
                                </div>

                                {/* Layout */}
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={createForm.is_reversed}
                                        onChange={(e) => setCreateForm({ ...createForm, is_reversed: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Layout invertito</span>
                                </label>
                            </div>
                            <div className="p-6 border-t border-gray-200 dark:border-white/10 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleCreateSubmit}
                                    disabled={saving}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Crea
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Modal */}
            <ConfirmModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
                title="Elimina Case Study"
                message={`Sei sicuro di voler eliminare "${deleteTarget?.title_it}"? Questa azione non può essere annullata.`}
                confirmText="Elimina"
                loading={deleting}
            />
        </div>
    )
}
