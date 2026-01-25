'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Loader2, Check, AlertCircle, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Integration {
    id: string
    name: string
    logo_url: string
    category: string
    external_url: string
    is_active: boolean
    display_order: number
}

export default function IntegrationsPage() {
    const [items, setItems] = useState<Integration[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editForm, setEditForm] = useState<Partial<Integration>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const supabase = createClient()

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase.from('integrations').select('*').order('display_order')
            if (error) throw error
            setItems(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const { error } = await supabase
                .from('integrations')
                .update({
                    name: editForm.name,
                    logo_url: editForm.logo_url,
                    category: editForm.category,
                    external_url: editForm.external_url,
                    is_active: editForm.is_active
                })
                .eq('id', editingId)
            if (error) throw error
            await fetchItems()
            setEditingId(null)
            setSuccess('Salvato!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Errore nel salvataggio')
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">Integrazioni</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Gestisci i tool integrati mostrati sul sito</p>
            </motion.div>

            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600">
                    <AlertCircle className="w-5 h-5" />{error}
                    <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
                </div>
            )}
            {success && (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-600">
                    <Check className="w-5 h-5" />{success}
                </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-4"
                    >
                        {editingId === item.id ? (
                            <div className="space-y-3">
                                <input type="text" value={editForm.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Nome" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white" />
                                <input type="url" value={editForm.logo_url || ''} onChange={(e) => setEditForm({ ...editForm, logo_url: e.target.value })} placeholder="Logo URL" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white" />
                                <input type="text" value={editForm.category || ''} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} placeholder="Categoria" className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white" />
                                <div className="flex gap-2">
                                    <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400">Annulla</button>
                                    <button onClick={handleSave} disabled={saving} className="flex-1 px-3 py-1.5 bg-primary text-white text-sm rounded-lg disabled:opacity-70">
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Salva'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <img src={item.logo_url} alt={item.name} className="w-12 h-12 mx-auto mb-3 object-contain" />
                                <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                                <button
                                    onClick={() => { setEditingId(item.id); setEditForm({ ...item }) }}
                                    className="mt-3 p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
