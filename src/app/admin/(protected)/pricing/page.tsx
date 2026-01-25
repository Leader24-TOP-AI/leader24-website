'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Loader2, Check, AlertCircle, X, Languages, Star, Plus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateJsonArray, translateChangedFields, hasArrayChanged } from '@/services/deeplService'

// Componente per editare lista di features
interface FeatureListEditorProps {
    label: string
    features: string[]
    onChange: (features: string[]) => void
    placeholder: string
}

const FeatureListEditor = ({ label, features, onChange, placeholder }: FeatureListEditorProps) => {
    const addFeature = () => {
        onChange([...features, ''])
    }

    const removeFeature = (index: number) => {
        onChange(features.filter((_, i) => i !== index))
    }

    const updateFeature = (index: number, value: string) => {
        const updated = [...features]
        updated[index] = value
        onChange(updated)
    }

    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 flex items-center gap-2">
                {label}
            </label>
            <div className="space-y-2">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addFeature}
                    className="w-full py-1.5 text-xs text-primary hover:bg-primary/10 border border-dashed border-primary/30 rounded flex items-center justify-center gap-1"
                >
                    <Plus className="w-3 h-3" /> Aggiungi
                </button>
            </div>
        </div>
    )
}

interface PricingPlan {
    id: string
    name_it: string
    name_en: string
    price_amount: number | null
    price_display_it: string
    price_display_en: string
    billing_period_it: string
    billing_period_en: string
    description_it: string
    description_en: string
    features_it: string[]
    features_en: string[]
    not_included_it: string[]
    not_included_en: string[]
    cta_text_it: string
    cta_text_en: string
    signup_url: string
    is_popular: boolean
    price_yearly: number | null
    price_yearly_display_it: string | null
    price_yearly_display_en: string | null
    display_order: number
    auto_translated_en: boolean
}

export default function PricingPage() {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<PricingPlan>>({})
    const [originalValues, setOriginalValues] = useState<Partial<PricingPlan>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const supabase = createClient()

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        try {
            const { data, error } = await supabase.from('pricing_plans').select('*').order('display_order')
            if (error) throw error
            setPlans(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (plan: PricingPlan) => {
        setEditingId(plan.id)
        const formData = {
            ...plan,
            features_it: plan.features_it || [],
            not_included_it: plan.not_included_it || []
        }
        setEditForm(formData)
        setOriginalValues({
            ...plan,
            features_it: plan.features_it ? [...plan.features_it] : [],
            not_included_it: plan.not_included_it ? [...plan.not_included_it] : []
        })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Filtra stringhe vuote
            const features_it = (editForm.features_it || []).filter(f => f.trim() !== '')
            const not_included_it = (editForm.not_included_it || []).filter(f => f.trim() !== '')

            const updateData: Record<string, unknown> = {
                name_it: editForm.name_it,
                price_amount: editForm.price_amount || null,
                price_display_it: editForm.price_display_it,
                price_display_en: editForm.price_display_it,
                billing_period_it: editForm.billing_period_it,
                description_it: editForm.description_it,
                features_it,
                not_included_it,
                cta_text_it: editForm.cta_text_it,
                signup_url: editForm.signup_url,
                is_popular: editForm.is_popular,
                price_yearly: editForm.price_yearly ? parseFloat(String(editForm.price_yearly)) : null,
                price_yearly_display_it: editForm.price_yearly_display_it || null,
                price_yearly_display_en: editForm.price_yearly_display_it || null
            }

            // Traduce SOLO i campi testuali modificati
            const translations = await translateChangedFields(
                editForm as Record<string, unknown>,
                originalValues as Record<string, unknown>,
                ['name_it', 'description_it', 'cta_text_it', 'billing_period_it']
            )

            // Traduce gli array solo se modificati
            const featuresChanged = hasArrayChanged(features_it, originalValues.features_it || [])
            const notIncludedChanged = hasArrayChanged(not_included_it, originalValues.not_included_it || [])

            if (featuresChanged) {
                updateData.features_en = await translateJsonArray(features_it)
            }
            if (notIncludedChanged) {
                updateData.not_included_en = await translateJsonArray(not_included_it)
            }

            const hasTranslations = Object.keys(translations).length > 0 || featuresChanged || notIncludedChanged

            if (hasTranslations) {
                setSuccess('Traduzione automatica in corso...')
                Object.assign(updateData, translations)
                updateData.auto_translated_en = true
            }

            const { error } = await supabase
                .from('pricing_plans')
                .update(updateData)
                .eq('id', editingId)

            if (error) throw error
            await fetchPlans()
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

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
    }

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">Piani Tariffari</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Gestisci prezzi e caratteristiche dei piani</p>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white dark:bg-dark-card border rounded-xl overflow-hidden ${plan.is_popular ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 dark:border-white/10'}`}
                    >
                        {plan.is_popular && (
                            <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-1 text-sm font-medium">
                                <Star className="w-4 h-4 inline mr-1" />Più Popolare
                            </div>
                        )}

                        {editingId === plan.id ? (
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-900 dark:text-white">Modifica Piano</span>
                                    <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                        <Languages className="w-3 h-3" />Auto-traduzione
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500">Nome piano</label>
                                    <input type="text" value={editForm.name_it || ''} onChange={(e) => setEditForm({ ...editForm, name_it: e.target.value })} placeholder="Piano Base" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500">Descrizione</label>
                                    <input type="text" value={editForm.description_it || ''} onChange={(e) => setEditForm({ ...editForm, description_it: e.target.value })} placeholder="Ideale per piccole attività" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">Prezzo Mensile</label>
                                        <input type="text" value={editForm.price_display_it || ''} onChange={(e) => setEditForm({ ...editForm, price_display_it: e.target.value })} placeholder="€49" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">Periodo</label>
                                        <input type="text" value={editForm.billing_period_it || ''} onChange={(e) => setEditForm({ ...editForm, billing_period_it: e.target.value })} placeholder="/mese" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                    </div>
                                </div>

                                {/* Yearly Pricing Section */}
                                <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Prezzi Annuali</span>
                                        <span className="text-xs text-gray-400">(20% sconto)</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-gray-500">Totale Annuo</label>
                                            <input type="number" value={editForm.price_yearly || ''} onChange={(e) => setEditForm({ ...editForm, price_yearly: e.target.value ? parseFloat(e.target.value) : null })} placeholder="470" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-gray-500">Display /mese</label>
                                            <input type="text" value={editForm.price_yearly_display_it || ''} onChange={(e) => setEditForm({ ...editForm, price_yearly_display_it: e.target.value })} placeholder="€39" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-500">Testo pulsante CTA</label>
                                    <input type="text" value={editForm.cta_text_it || ''} onChange={(e) => setEditForm({ ...editForm, cta_text_it: e.target.value })} placeholder="Inizia Ora" className="w-full px-2 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-sm" />
                                </div>

                                <FeatureListEditor
                                    label="✅ Features Incluse"
                                    features={editForm.features_it || []}
                                    onChange={(features) => setEditForm({ ...editForm, features_it: features })}
                                    placeholder="Es: 1 Agente AI"
                                />

                                <FeatureListEditor
                                    label="❌ Features Non Incluse"
                                    features={editForm.not_included_it || []}
                                    onChange={(features) => setEditForm({ ...editForm, not_included_it: features })}
                                    placeholder="Es: API access"
                                />

                                <div className="flex gap-2">
                                    <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-1.5 text-sm text-gray-600">Annulla</button>
                                    <button onClick={handleSave} disabled={saving} className="flex-1 px-3 py-1.5 bg-primary text-white text-sm rounded-lg">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Salva'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name_it}</h3>
                                        <p className="text-sm text-gray-500">{plan.description_it}</p>
                                    </div>
                                    <button onClick={() => startEdit(plan)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price_display_it}</span>
                                    <span className="text-gray-500">{plan.billing_period_it}</span>
                                    {plan.price_yearly && (
                                        <div className="mt-1 text-xs text-purple-600 dark:text-purple-400">
                                            Annuale: {plan.price_yearly_display_it}/mese (€{plan.price_yearly}/anno)
                                        </div>
                                    )}
                                </div>
                                <ul className="mt-4 space-y-1.5">
                                    {(plan.features_it || []).map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{f}
                                        </li>
                                    ))}
                                    {(plan.not_included_it || []).map((f, i) => (
                                        <li key={`not-${i}`} className="flex items-center gap-2 text-sm text-gray-400 opacity-50">
                                            <X className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
