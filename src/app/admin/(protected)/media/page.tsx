'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, Trash2, Copy, Check, Loader2, AlertCircle, X, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface StorageFile {
    name: string
    created_at: string
}

export default function MediaPage() {
    const [files, setFiles] = useState<StorageFile[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const [dragActive, setDragActive] = useState(false)

    const supabase = createClient()

    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = async () => {
        try {
            const { data, error } = await supabase.storage.from('media').list('uploads', {
                limit: 100,
                sortBy: { column: 'created_at', order: 'desc' }
            })

            if (error) throw error
            setFiles(data || [])
        } catch (err) {
            console.error('Error fetching files:', err)
            // Storage bucket might not exist yet
            setFiles([])
        } finally {
            setLoading(false)
        }
    }

    const handleUpload = async (fileList: FileList | null) => {
        if (!fileList || fileList.length === 0) return

        setUploading(true)
        setError('')

        try {
            for (const file of Array.from(fileList)) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('media')
                    .upload(`uploads/${fileName}`, file)

                if (uploadError) throw uploadError
            }

            await fetchFiles()
            setSuccess(`${fileList.length} file caricati!`)
            setTimeout(() => setSuccess(''), 3000)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error'
            setError('Errore nel caricamento: ' + message)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (fileName: string) => {
        if (!confirm('Eliminare questo file?')) return

        try {
            const { error } = await supabase.storage
                .from('media')
                .remove([`uploads/${fileName}`])

            if (error) throw error
            await fetchFiles()
            setSuccess('File eliminato!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Errore nell\'eliminazione')
        }
    }

    const getPublicUrl = (fileName: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(`uploads/${fileName}`)
        return data?.publicUrl || ''
    }

    const copyUrl = async (fileName: string) => {
        const url = getPublicUrl(fileName)
        await navigator.clipboard.writeText(url)
        setCopiedUrl(fileName)
        setTimeout(() => setCopiedUrl(null), 2000)
    }

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files)
        }
    }, [])

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
    }

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-heading">Media Library</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Carica e gestisci immagini su Supabase Storage</p>
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

            {/* Upload Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center transition-colors
                    ${dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 dark:border-white/20 hover:border-primary hover:bg-primary/5'
                    }
                `}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                <div className="flex flex-col items-center gap-3">
                    {uploading ? (
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    ) : (
                        <Upload className="w-10 h-10 text-gray-400" />
                    )}
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {uploading ? 'Caricamento in corso...' : 'Trascina qui i file o clicca per selezionare'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF, WebP fino a 5MB</p>
                    </div>
                </div>
            </motion.div>

            {/* Files Grid */}
            {files.length === 0 ? (
                <div className="text-center py-12">
                    <FolderOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Nessun file caricato</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Carica il tuo primo file per iniziare</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {files.map((file, index) => (
                        <motion.div
                            key={file.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden"
                        >
                            <div className="aspect-square bg-gray-100 dark:bg-white/5">
                                <img
                                    src={getPublicUrl(file.name)}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none'
                                    }}
                                />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => copyUrl(file.name)}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                                    title="Copia URL"
                                >
                                    {copiedUrl === file.name ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={() => handleDelete(file.name)}
                                    className="p-2 bg-red-500/50 hover:bg-red-500/70 rounded-lg text-white transition-colors"
                                    title="Elimina"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* File name */}
                            <div className="p-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={file.name}>
                                    {file.name}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
