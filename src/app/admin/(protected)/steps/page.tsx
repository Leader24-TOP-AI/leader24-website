'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    ListOrdered, Edit2, Save, Loader2, Check, AlertCircle, X, Languages,
    FolderOpen, MessageSquare, BarChart3, Zap, Upload, Settings, Play,
    LucideIcon
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateChangedFields } from '@/services/deeplService'

// Icon map for steps
const iconMap: Record<string, LucideIcon> = {
    FolderOpen, MessageSquare, BarChart3, Zap, Upload, Settings, Play
}

interface Step {
    id: string
    step_number: number
    title_it: string
    title_en: string
    description_it: string
    description_en: string
    icon_name: string
    is_active: boolean
    auto_translated_en: boolean
}

export default function StepsPage() {
    const [steps, setSteps] = useState<Step[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<Step>>({})
    const [originalValues, setOriginalValues] = useState<Partial<Step>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const supabase = createClient()

    useEffect(() => {
        fetchSteps()
    }, [])

    const fetchSteps = async () => {
        try {
            const { data, error } = await supabase
                .from('homepage_steps')
                .select('*')
                .order('step_number')
            if (error) throw error
            setSteps(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (step: Step) => {
        setEditingId(step.id)
        setEditForm({ ...step })
        setOriginalValues({ ...step })
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

            // Traduce SOLO i campi modificati
            const translations = await translateChangedFields(
                editForm as Record<string, unknown>,
                originalValues as Record<string, unknown>,
                ['title_it', 'description_it']
            )

            if (Object.keys(translations).length > 0) {
                setSuccess('Traduzione automatica in corso...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
            }

            const { error } = await supabase
                .from('homepage_steps')
                .update(updateData)
                .eq('id', editingId)

            if (error) throw error
            await fetchSteps()
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

    const availableIcons = Object.keys(iconMap)

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
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">
                    Come Funziona
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Gestisci i 3 passaggi della sezione "Come Funziona" nella homepage
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

            <div className="grid md:grid-cols-3 gap-6">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon_name] || ListOrdered

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white dark:bg-dark-card border rounded-xl overflow-hidden ${
                                step.is_active ? 'border-gray-200 dark:border-white/10' : 'border-gray-200/50 dark:border-white/5 opacity-60'
                            }`}
                        >
                            {/* Step number badge */}
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                {step.step_number}
                            </div>

                            {editingId === step.id ? (
                                // Edit mode
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            Modifica Step {step.step_number}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                            <Languages className="w-3 h-3" />Auto-traduzione
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Icona</label>
                                        <select
                                            value={editForm.icon_name || ''}
                                            onChange={(e) => setEditForm({ ...editForm, icon_name: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                        >
                                            {availableIcons.map(icon => (
                                                <option key={icon} value={icon}>{icon}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Titolo (IT)</label>
                                        <input
                                            type="text"
                                            value={editForm.title_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, title_it: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                            placeholder="Es: Addestra l'AI"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-gray-500">Descrizione (IT)</label>
                                        <textarea
                                            value={editForm.description_it || ''}
                                            onChange={(e) => setEditForm({ ...editForm, description_it: e.target.value })}
                                            rows={3}
                                            className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white resize-none"
                                            placeholder="Descrizione del passaggio..."
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={`active-${step.id}`}
                                            checked={editForm.is_active}
                                            onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`active-${step.id}`} className="text-sm text-gray-600 dark:text-gray-400">
                                            Attivo
                                        </label>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-2 text-sm text-gray-600">
                                            Annulla
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg flex items-center justify-center gap-2"
                                        >
                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Salva
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View mode
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-primary" />
                                        </div>
                                        <button
                                            onClick={() => startEdit(step)}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                        {step.title_it}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {step.description_it}
                                    </p>

                                    {!step.is_active && (
                                        <span className="inline-block mt-3 text-xs text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded">
                                            Disattivato
                                        </span>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {steps.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Nessuno step configurato.
                </div>
            )}
        </div>
    )
}
