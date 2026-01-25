'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Quote, Plus, Edit2, Trash2, Save, X, Loader2, Languages,
    Check, AlertCircle, Star, Eye, EyeOff, AlertTriangle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { translateText, translateChangedFields } from '@/services/deeplService'
import TestimonialPreview from '@/components/admin/TestimonialPreview'

interface Testimonial {
    id: string
    author_name: string
    company: string
    role_it: string
    role_en: string
    content_it: string
    content_en: string
    image_url: string
    rating: number
    is_active: boolean
    display_order: number
    auto_translated_en: boolean
}

export default function TestimonialsPage() {
    const [items, setItems] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [editForm, setEditForm] = useState<Partial<Testimonial>>({})
    const [originalValues, setOriginalValues] = useState<Partial<Testimonial>>({})
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPreview, setShowPreview] = useState(true)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; testimonial: Testimonial | null }>({
        open: false,
        testimonial: null
    })
    const [deleting, setDeleting] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('display_order')
            if (error) throw error
            setItems(data || [])
        } catch (err) {
            setError('Errore nel caricamento')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (item: Testimonial) => {
        setIsCreating(false)
        setEditingId(item.id)
        setEditForm({ ...item })
        setOriginalValues({ ...item })
    }

    const startCreate = () => {
        setEditingId(null)
        setIsCreating(true)
        setEditForm({
            author_name: '',
            company: '',
            role_it: '',
            content_it: '',
            image_url: '',
            rating: 5,
            is_active: true,
            display_order: items.length + 1
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setIsCreating(false)
        setEditForm({})
    }

    const openDeleteModal = (testimonial: Testimonial) => {
        setDeleteModal({ open: true, testimonial })
    }

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, testimonial: null })
    }

    const confirmDelete = async () => {
        if (!deleteModal.testimonial) return
        setDeleting(true)
        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', deleteModal.testimonial.id)
            if (error) throw error
            await fetchItems()
            closeDeleteModal()
            setSuccess('Testimonianza eliminata!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Errore nell\'eliminazione')
            console.error(err)
        } finally {
            setDeleting(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')
        try {
            const dataToSave: Record<string, unknown> = {
                author_name: editForm.author_name,
                company: editForm.company,
                role_it: editForm.role_it,
                content_it: editForm.content_it,
                image_url: editForm.image_url,
                rating: editForm.rating || 5,
                is_active: editForm.is_active !== false,
                display_order: editForm.display_order || items.length + 1
            }

            if (isCreating) {
                // Per nuove testimonianze, traduce sempre
                setSuccess('Traduzione automatica in corso...')
                const [role_en, content_en] = await Promise.all([
                    translateText(editForm.role_it || ''),
                    translateText(editForm.content_it || '')
                ])
                dataToSave.role_en = role_en
                dataToSave.content_en = content_en
                dataToSave.auto_translated_en = true

                const { error } = await supabase
                    .from('testimonials')
                    .insert(dataToSave)
                if (error) throw error
                setSuccess('Testimonianza creata con traduzione automatica!')
            } else {
                // Per update, traduce SOLO i campi modificati
                const translations = await translateChangedFields(
                    editForm as Record<string, unknown>,
                    originalValues as Record<string, unknown>,
                    ['role_it', 'content_it']
                )

                if (Object.keys(translations).length > 0) {
                    setSuccess('Traduzione automatica in corso...')
                    Object.assign(dataToSave, translations)
                    dataToSave.auto_translated_en = true
                }

                const { error } = await supabase
                    .from('testimonials')
                    .update(dataToSave)
                    .eq('id', editingId)
                if (error) throw error
                setSuccess(Object.keys(translations).length > 0
                    ? 'Salvato con traduzione automatica!'
                    : 'Salvato!')
            }

            await fetchItems()
            cancelEdit()
            setOriginalValues({})
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Errore nel salvataggio')
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
                        Testimonianze
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Gestisci le recensioni dei clienti
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={startCreate}
                        className="
                            flex items-center gap-2 px-5 py-2.5
                            bg-gradient-to-r from-primary to-secondary
                            hover:from-primary-dark hover:to-primary
                            text-white font-medium rounded-xl
                            shadow-lg shadow-primary/25
                            transition-all
                        "
                    >
                        <Plus className="w-5 h-5" />
                        Nuova Testimonianza
                    </button>
                )}
            </motion.div>

            {/* Alert Messages */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600"
                    >
                        <AlertCircle className="w-5 h-5" />{error}
                        <button onClick={() => setError('')} className="ml-auto">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl text-emerald-600"
                    >
                        <Check className="w-5 h-5" />{success}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit/Create Form with Preview */}
            {isEditing ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid lg:grid-cols-2 gap-6"
                >
                    {/* Left: Form */}
                    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                {isCreating ? (
                                    <><Plus className="w-5 h-5 text-primary" />Nuova Testimonianza</>
                                ) : (
                                    <><Edit2 className="w-5 h-5 text-primary" />Modifica</>
                                )}
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                                    <Languages className="w-4 h-4" />
                                    Auto-traduzione
                                </div>
                                <button
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    {showPreview ? 'Nascondi' : 'Preview'}
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nome Autore
                                </label>
                                <input
                                    type="text"
                                    value={editForm.author_name || ''}
                                    onChange={(e) => setEditForm({ ...editForm, author_name: e.target.value })}
                                    placeholder="es. Mario Rossi"
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Azienda
                                </label>
                                <input
                                    type="text"
                                    value={editForm.company || ''}
                                    onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                                    placeholder="es. TechCorp S.r.l."
                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                URL Immagine
                            </label>
                            <input
                                type="url"
                                value={editForm.image_url || ''}
                                onChange={(e) => setEditForm({ ...editForm, image_url: e.target.value })}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                🇮🇹 Ruolo (italiano)
                            </label>
                            <input
                                type="text"
                                value={editForm.role_it || ''}
                                onChange={(e) => setEditForm({ ...editForm, role_it: e.target.value })}
                                placeholder="es. CEO, Marketing Manager, CTO"
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                🇮🇹 Testimonianza (italiano)
                            </label>
                            <textarea
                                value={editForm.content_it || ''}
                                onChange={(e) => setEditForm({ ...editForm, content_it: e.target.value })}
                                placeholder="Scrivi la testimonianza del cliente..."
                                rows={4}
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white resize-none"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Rating
                                </label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setEditForm({ ...editForm, rating: star })}
                                            className="p-1 hover:scale-110 transition-transform"
                                        >
                                            <Star
                                                className={`w-6 h-6 ${
                                                    star <= (editForm.rating || 5)
                                                        ? 'text-yellow-400 fill-yellow-400'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Visibilità
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editForm.is_active !== false}
                                        onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        Visibile sul sito
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                            <button
                                onClick={cancelEdit}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg disabled:opacity-70"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isCreating ? 'Crea' : 'Salva'}
                            </button>
                        </div>
                    </div>

                    {/* Right: Preview */}
                    {showPreview && (
                        <div className="lg:sticky lg:top-4 space-y-4 self-start">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-primary" />
                                    Anteprima
                                </h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Come appare sul sito
                                </span>
                            </div>
                            <TestimonialPreview testimonial={editForm} language="it" />
                        </div>
                    )}
                </motion.div>
            ) : (
                /* List View */
                <div className="grid gap-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
                        >
                            <div className="p-6 flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image_url}
                                        alt={item.author_name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {item.author_name}
                                            </h3>
                                            {!item.is_active && (
                                                <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-full">
                                                    Nascosto
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {item.role_it} @ {item.company}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                            {item.content_it}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2">
                                            {[...Array(item.rating || 5)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => startEdit(item)}
                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(item)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <Quote className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p>Nessuna testimonianza presente</p>
                            <button
                                onClick={startCreate}
                                className="mt-4 text-primary hover:underline"
                            >
                                Crea la prima testimonianza
                            </button>
                        </div>
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        >
                            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200 dark:border-white/10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Elimina Testimonianza
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Questa azione non può essere annullata
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Sei sicuro di voler eliminare la testimonianza di <strong>&quot;{deleteModal.testimonial?.author_name}&quot;</strong>?
                                </p>

                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={closeDeleteModal}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={deleting}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg disabled:opacity-70 transition-colors"
                                    >
                                        {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        Elimina
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
