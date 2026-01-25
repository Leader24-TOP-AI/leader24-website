'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Save, Loader2, AlertCircle, Check, X, ImageIcon, Upload, Globe, Link as LinkIcon, Video } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Setting {
    id: string
    key: string
    value_it: string
    value_en: string
    category: string
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Setting[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [uploading, setUploading] = useState<Record<string, boolean>>({})

    const supabase = createClient()

    // Helper per estrarre path da URL Supabase
    const getFilePathFromUrl = (url: string | null | undefined): string | null => {
        if (!url) return null
        const match = url.match(/\/media\/(.+)$/)
        return match ? match[1] : null
    }

    // Helper per eliminare immagine da Storage
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

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .order('category')

            if (error) throw error
            setSettings(data || [])
        } catch (err) {
            console.error('Error fetching settings:', err)
            setError('Errore nel caricamento delle impostazioni')
        } finally {
            setLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    const handleLogoUpload = async (key: string, file: File | undefined) => {
        if (!file) return

        setUploading(prev => ({ ...prev, [key]: true }))
        setError('')

        try {
            const bucket = 'media'
            const fileExt = file.name.split('.').pop()
            const fileName = `logos/${key.replace('_url', '')}-${Date.now()}.${fileExt}`

            // Delete old file if exists and is from Supabase
            const currentSetting = settings.find(s => s.key === key)
            const oldUrl = currentSetting?.value_it
            if (oldUrl && oldUrl.includes('supabase')) {
                await deleteImageFromStorage(oldUrl)
            }

            // Upload new file
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, file, { upsert: true })

            if (uploadError) throw uploadError

            // Get public URL
            const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
            const publicUrl = data?.publicUrl

            // Update site_settings
            if (currentSetting?.id) {
                const { error: updateError } = await supabase
                    .from('site_settings')
                    .update({
                        value_it: publicUrl,
                        value_en: publicUrl,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', currentSetting.id)

                if (updateError) throw updateError
            }

            // Refresh settings
            await fetchSettings()
            setSuccess('Logo caricato con successo!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore upload'
            setError('Errore nel caricamento: ' + message)
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }))
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setError('')

        try {
            // Update all settings
            for (const setting of settings) {
                const { error: updateError } = await supabase
                    .from('site_settings')
                    .update({
                        value_it: setting.value_it,
                        value_en: setting.value_en,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', setting.id)

                if (updateError) throw updateError
            }

            setSuccess('Impostazioni salvate!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Errore nel salvataggio'
            setError(message)
        } finally {
            setSaving(false)
        }
    }

    const updateSetting = (id: string, field: 'value_it' | 'value_en', value: string) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    // Get specific settings for logo section
    const logoLightUrl = settings.find(s => s.key === 'logo_light_url')?.value_it
    const logoDarkUrl = settings.find(s => s.key === 'logo_dark_url')?.value_it

    // Filter settings excluding logos (shown separately)
    const filteredSettings = settings.filter(s => !s.key.includes('logo'))

    // Group settings by category
    const groupedSettings = filteredSettings.reduce((acc, setting) => {
        if (!acc[setting.category]) acc[setting.category] = []
        acc[setting.category].push(setting)
        return acc
    }, {} as Record<string, Setting[]>)

    // Category icons
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'urls':
                return <LinkIcon className="w-5 h-5 text-blue-500" />
            case 'videos':
                return <Video className="w-5 h-5 text-purple-500" />
            default:
                return <Globe className="w-5 h-5 text-primary" />
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
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-500/20 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Impostazioni</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Gestisci loghi, URL e impostazioni del sito</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Salva Modifiche
                        </>
                    )}
                </button>
            </motion.div>

            {/* Toast Messages */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-300 flex-1">{error}</p>
                        <button onClick={() => setError('')} className="p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded transition-colors">
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
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-green-700 dark:text-green-300">{success}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Logo Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-6"
            >
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Loghi del Sito</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Carica i loghi per modalità chiara e scura</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {/* Logo Light (per sfondi scuri) */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Logo Light <span className="text-gray-400 font-normal">(per sfondi scuri)</span>
                        </label>
                        <div className="relative aspect-[3/1] bg-gray-900 rounded-lg overflow-hidden border-2 border-dashed border-gray-600">
                            {logoLightUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={logoLightUrl}
                                    alt="Logo Light"
                                    className="w-full h-full object-contain p-4"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <span>Nessun logo caricato</span>
                                </div>
                            )}
                        </div>
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg cursor-pointer transition-colors font-medium">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleLogoUpload('logo_light_url', e.target.files?.[0])}
                                disabled={uploading['logo_light_url']}
                            />
                            {uploading['logo_light_url'] ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Caricamento...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Carica Logo
                                </>
                            )}
                        </label>
                    </div>

                    {/* Logo Dark (per sfondi chiari) */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Logo Dark <span className="text-gray-400 font-normal">(per sfondi chiari)</span>
                        </label>
                        <div className="relative aspect-[3/1] bg-white rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                            {logoDarkUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={logoDarkUrl}
                                    alt="Logo Dark"
                                    className="w-full h-full object-contain p-4"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <span>Nessun logo caricato</span>
                                </div>
                            )}
                        </div>
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg cursor-pointer transition-colors font-medium">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleLogoUpload('logo_dark_url', e.target.files?.[0])}
                                disabled={uploading['logo_dark_url']}
                            />
                            {uploading['logo_dark_url'] ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Caricamento...
                                </>
                            ) : (
                                <>
                                    <Upload className="w-4 h-4" />
                                    Carica Logo
                                </>
                            )}
                        </label>
                    </div>
                </div>
            </motion.div>

            {/* Other Settings by Category */}
            <div className="space-y-6">
                {Object.entries(groupedSettings).map(([category, categorySettings], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl p-6"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                                {getCategoryIcon(category)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                                    {category === 'urls' ? 'URL del Sito' : category === 'videos' ? 'Video Hero' : category}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {category === 'urls' ? 'Configura gli URL principali' : category === 'videos' ? 'Video per la sezione hero' : `Impostazioni ${category}`}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {categorySettings.map(setting => (
                                <div key={setting.id} className="grid md:grid-cols-3 gap-4 items-start">
                                    <div className="flex items-center h-10">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {setting.key
                                                .replace(/_/g, ' ')
                                                .replace('hero video', 'Video')
                                                .replace('dashboard', 'Dashboard')
                                                .replace('signup', 'Registrazione')}
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={setting.value_it}
                                            onChange={(e) => updateSetting(setting.id, 'value_it', e.target.value)}
                                            placeholder="Valore IT"
                                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={setting.value_en}
                                            onChange={(e) => updateSetting(setting.id, 'value_en', e.target.value)}
                                            placeholder="Valore EN"
                                            className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {settings.length === 0 && (
                <div className="text-center py-12">
                    <Settings className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Nessuna impostazione trovata</p>
                </div>
            )}
        </div>
    )
}
