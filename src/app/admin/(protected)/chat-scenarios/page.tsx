'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MessageSquare, Plus, Edit2, Trash2, Save, X, Loader2, Languages,
    Check, AlertCircle, User, Bot, Eye, AlertTriangle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateText, translateChangedFields } from '@/services/deeplService'
import IconPicker, { getIconComponent } from '@/components/admin/IconPicker'
import ColorPicker from '@/components/admin/ColorPicker'
import ChatPreview from '@/components/admin/ChatPreview'

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
    stat_it: string
    stat_en: string
    is_active: boolean
    display_order: number
    auto_translated_en: boolean
}

export default function ChatScenariosPage() {
    const [scenarios, setScenarios] = useState<ChatScenario[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editForm, setEditForm] = useState<Partial<ChatScenario>>({})
    const [originalValues, setOriginalValues] = useState<Partial<ChatScenario>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPreview, setShowPreview] = useState(true)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; scenario: ChatScenario | null }>({
        open: false,
        scenario: null
    })
    const [deleting, setDeleting] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchScenarios()
    }, [])

    const fetchScenarios = async () => {
        try {
            const { data, error } = await supabase
                .from('hero_chat_scenarios')
                .select('*')
                .order('display_order')

            if (error) throw error
            setScenarios(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Generate sector_key from Italian name
    const generateSectorKey = (name: string): string => {
        if (!name) return ''
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '')
    }

    const startEdit = (scenario: ChatScenario) => {
        setIsCreating(false)
        setEditingId(scenario.id)
        setEditForm({ ...scenario })
        setOriginalValues({ ...scenario })
    }

    const startCreate = () => {
        setEditingId(null)
        setIsCreating(true)
        setEditForm({
            sector_key: '',
            sector_name_it: '',
            icon_name: 'MessageSquare',
            color: 'text-blue-400',
            bg_color: 'bg-blue-500/20',
            user_message_it: '',
            ai_message_it: '',
            stat_it: '',
            is_active: true,
            display_order: scenarios.length + 1
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setIsCreating(false)
        setEditForm({})
        setOriginalValues({})
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')

        try {
            // Generate sector_key if creating new
            const sector_key = editForm.sector_key || generateSectorKey(editForm.sector_name_it || '')

            const saveData: Record<string, unknown> = {
                sector_key,
                sector_name_it: editForm.sector_name_it,
                icon_name: editForm.icon_name,
                color: editForm.color,
                bg_color: editForm.bg_color,
                user_message_it: editForm.user_message_it,
                ai_message_it: editForm.ai_message_it,
                stat_it: editForm.stat_it,
                is_active: editForm.is_active !== false,
                display_order: editForm.display_order || scenarios.length + 1
            }

            if (isCreating) {
                // INSERT: Traduce SEMPRE tutti i campi
                setSuccess('Traduzione automatica in corso...')
                const [
                    sector_name_en,
                    user_message_en,
                    ai_message_en,
                    stat_en
                ] = await Promise.all([
                    translateText(editForm.sector_name_it || ''),
                    translateText(editForm.user_message_it || ''),
                    translateText(editForm.ai_message_it || ''),
                    translateText(editForm.stat_it || '')
                ])

                saveData.sector_name_en = sector_name_en
                saveData.user_message_en = user_message_en
                saveData.ai_message_en = ai_message_en
                saveData.stat_en = stat_en
                saveData.auto_translated_en = true

                const { error } = await supabase
                    .from('hero_chat_scenarios')
                    .insert([saveData])

                if (error) throw error
                setSuccess('Settore creato con traduzione automatica!')
            } else {
                // UPDATE: Traduce SOLO i campi modificati
                const translations = await translateChangedFields(
                    editForm as Record<string, unknown>,
                    originalValues as Record<string, unknown>,
                    ['sector_name_it', 'user_message_it', 'ai_message_it', 'stat_it']
                )

                const hasTranslations = Object.keys(translations).length > 0

                if (hasTranslations) {
                    setSuccess('Traduzione automatica in corso...')
                    Object.assign(saveData, translations)
                    saveData.auto_translated_en = true
                }

                const { error } = await supabase
                    .from('hero_chat_scenarios')
                    .update(saveData)
                    .eq('id', editingId)

                if (error) throw error
                setSuccess(hasTranslations
                    ? 'Salvato con traduzione automatica!'
                    : 'Salvato!')
            }

            await fetchScenarios()
            cancelEdit()
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nel salvataggio'
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    const openDeleteModal = (scenario: ChatScenario) => {
        setDeleteModal({ open: true, scenario })
    }

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, scenario: null })
    }

    const confirmDelete = async () => {
        if (!deleteModal.scenario) return

        setDeleting(true)
        try {
            const { error } = await supabase
                .from('hero_chat_scenarios')
                .delete()
                .eq('id', deleteModal.scenario.id)

            if (error) throw error

            await fetchScenarios()
            closeDeleteModal()
            setSuccess('Settore eliminato con successo')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Errore durante eliminazione')
            console.error(err)
        } finally {
            setDeleting(false)
        }
    }

    // Preview scenario object for ChatPreview
    const previewScenario = useMemo(() => {
        if (!editForm.sector_name_it) return null
        return editForm
    }, [editForm])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        )
    }

    const isEditing = editingId !== null || isCreating

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                        Chat Demo
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gestisci le conversazioni demo nella hero section
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={startCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Nuovo Settore
                    </button>
                )}
            </motion.div>

            {/* Alerts */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400"
                    >
                        <AlertCircle className="w-5 h-5" />
                        {error}
                        <button onClick={() => setError('')} className="ml-auto">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400"
                    >
                        <Check className="w-5 h-5" />
                        {success}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Create/Edit Form */}
            <AnimatePresence>
                {isEditing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            {/* Form Header */}
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    {isCreating ? (
                                        <>
                                            <Plus className="w-5 h-5 text-primary" />
                                            Nuovo Settore
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 className="w-5 h-5 text-primary" />
                                            Modifica Settore
                                        </>
                                    )}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                                        <Languages className="w-4 h-4" />
                                        Traduzione automatica al salvataggio
                                    </div>
                                    <button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${showPreview
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400'
                                        }`}
                                    >
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </button>
                                </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Left: Form Fields */}
                                <div className="space-y-6">
                                    {/* Sector Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            🇮🇹 Nome Settore
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.sector_name_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, sector_name_it: e.target.value })}
                                            placeholder="es. E-commerce, Ristorante, Hotel..."
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        />
                                    </div>

                                    {/* Conversation Demo Section */}
                                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-primary" />
                                            Conversazione Demo
                                        </h4>

                                        {/* User Message */}
                                        <div className="flex justify-end">
                                            <div className="w-full max-w-[90%] space-y-2">
                                                <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 justify-end">
                                                    <User className="w-3 h-3" />
                                                    Messaggio Utente (IT)
                                                </label>
                                                <textarea
                                                    value={editForm.user_message_it || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, user_message_it: e.target.value })}
                                                    placeholder="Ciao, vorrei sapere..."
                                                    rows={2}
                                                    className="w-full px-4 py-3 bg-primary text-white placeholder:text-white/50 rounded-2xl rounded-tr-sm resize-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* AI Response */}
                                        <div className="flex justify-start">
                                            <div className="w-full max-w-[90%] space-y-2">
                                                <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Bot className="w-3 h-3" />
                                                    Risposta AI Agent (IT)
                                                </label>
                                                <textarea
                                                    value={editForm.ai_message_it || ''}
                                                    onChange={(e) => setEditForm({ ...editForm, ai_message_it: e.target.value })}
                                                    placeholder="Ciao! Sì, posso aiutarti..."
                                                    rows={3}
                                                    className="w-full px-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm resize-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stat */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            🇮🇹 Statistica risultato
                                        </label>
                                        <input
                                            type="text"
                                            value={editForm.stat_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, stat_it: e.target.value })}
                                            placeholder="+35% conversioni"
                                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Icon & Color Pickers */}
                                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
                                        <h4 className="font-medium text-gray-900 dark:text-white">
                                            Stile Icona
                                        </h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Icona
                                                </label>
                                                <IconPicker
                                                    value={editForm.icon_name || 'MessageSquare'}
                                                    onChange={(iconName) => setEditForm({ ...editForm, icon_name: iconName })}
                                                    textColor={editForm.color || 'text-blue-400'}
                                                    bgColor={editForm.bg_color || 'bg-blue-500/20'}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Colore Tema
                                                </label>
                                                <ColorPicker
                                                    textColor={editForm.color || 'text-blue-400'}
                                                    bgColor={editForm.bg_color || 'bg-blue-500/20'}
                                                    onChange={({ textColor, bgColor }) => setEditForm(prev => ({
                                                        ...prev,
                                                        color: textColor,
                                                        bg_color: bgColor
                                                    }))}
                                                    iconName={editForm.icon_name || 'MessageSquare'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Preview */}
                                {showPreview && (
                                    <div className="space-y-4">
                                        <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-primary" />
                                            Anteprima Live
                                        </h4>
                                        <div className="sticky top-4">
                                            <ChatPreview scenario={previewScenario} language="it" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-white/10">
                                <button
                                    onClick={cancelEdit}
                                    className="px-5 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    Annulla
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving || !editForm.sector_name_it}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {isCreating ? 'Crea Settore' : 'Salva Modifiche'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scenarios List */}
            {!isEditing && (
                <div className="space-y-4">
                    {scenarios.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl">
                            <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Nessun settore creato</p>
                            <button
                                onClick={startCreate}
                                className="mt-4 text-primary font-medium hover:underline"
                            >
                                Crea il primo settore
                            </button>
                        </div>
                    ) : (
                        scenarios.map((scenario, index) => {
                            const Icon = getIconComponent(scenario.icon_name)

                            return (
                                <motion.div
                                    key={scenario.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-primary/30 dark:hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${scenario.bg_color || 'bg-blue-500/20'} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className={`w-6 h-6 ${scenario.color || 'text-blue-400'}`} />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {scenario.sector_name_it}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 max-w-md">
                                                    {scenario.user_message_it}
                                                </p>
                                                {scenario.stat_it && (
                                                    <div className="flex items-center gap-2 pt-1">
                                                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                                            📈 {scenario.stat_it}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEdit(scenario)}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Modifica"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(scenario)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Elimina"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteModal.open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeDeleteModal}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                        >
                            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
                                {/* Header */}
                                <div className="p-6 pb-0">
                                    <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="w-7 h-7 text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                                        Conferma eliminazione
                                    </h3>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        Sei sicuro di voler eliminare il settore{' '}
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            &quot;{deleteModal.scenario?.sector_name_it}&quot;
                                        </span>
                                        ?
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-500 text-center mt-2">
                                        Questa azione non può essere annullata.
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="p-6 pt-0 flex gap-3">
                                    <button
                                        onClick={closeDeleteModal}
                                        disabled={deleting}
                                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={deleting}
                                        className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {deleting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Eliminando...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="w-4 h-4" />
                                                Elimina
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
