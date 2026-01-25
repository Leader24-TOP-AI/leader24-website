'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Palette, X } from 'lucide-react'
import { getIconComponent } from './IconPicker'

// Color palette with Tailwind classes
export const COLOR_PALETTE = [
    {
        name: 'blue',
        label: 'Blu',
        text: 'text-blue-400',
        bg: 'bg-blue-500/20',
        preview: 'bg-blue-400'
    },
    {
        name: 'purple',
        label: 'Viola',
        text: 'text-purple-400',
        bg: 'bg-purple-500/20',
        preview: 'bg-purple-400'
    },
    {
        name: 'orange',
        label: 'Arancione',
        text: 'text-orange-400',
        bg: 'bg-orange-500/20',
        preview: 'bg-orange-400'
    },
    {
        name: 'emerald',
        label: 'Verde',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        preview: 'bg-emerald-400'
    },
    {
        name: 'pink',
        label: 'Rosa',
        text: 'text-pink-400',
        bg: 'bg-pink-500/20',
        preview: 'bg-pink-400'
    },
    {
        name: 'cyan',
        label: 'Cyan',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/20',
        preview: 'bg-cyan-400'
    },
    {
        name: 'yellow',
        label: 'Giallo',
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        preview: 'bg-yellow-400'
    },
    {
        name: 'red',
        label: 'Rosso',
        text: 'text-red-400',
        bg: 'bg-red-500/20',
        preview: 'bg-red-400'
    },
    {
        name: 'indigo',
        label: 'Indigo',
        text: 'text-indigo-400',
        bg: 'bg-indigo-500/20',
        preview: 'bg-indigo-400'
    },
    {
        name: 'teal',
        label: 'Teal',
        text: 'text-teal-400',
        bg: 'bg-teal-500/20',
        preview: 'bg-teal-400'
    },
    {
        name: 'amber',
        label: 'Ambra',
        text: 'text-amber-400',
        bg: 'bg-amber-500/20',
        preview: 'bg-amber-400'
    },
    {
        name: 'lime',
        label: 'Lime',
        text: 'text-lime-400',
        bg: 'bg-lime-500/20',
        preview: 'bg-lime-400'
    }
]

interface ColorOption {
    name: string
    label: string
    text: string
    bg: string
    preview: string
}

// Find color by text or bg class
export const findColorByClass = (textClass: string, bgClass: string): ColorOption | undefined => {
    return COLOR_PALETTE.find(c => c.text === textClass || c.bg === bgClass)
}

interface ColorPickerProps {
    textColor: string
    bgColor: string
    onTextColorChange?: (color: string) => void
    onBgColorChange?: (color: string) => void
    onChange?: (colors: { textColor: string; bgColor: string }) => void
    iconName?: string
}

const ColorPicker = ({
    textColor,
    bgColor,
    onTextColorChange,
    onBgColorChange,
    onChange,
    iconName = 'MessageSquare'
}: ColorPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const Icon = getIconComponent(iconName)

    // Find current selected color
    const currentColor = COLOR_PALETTE.find(c => c.text === textColor) || COLOR_PALETTE[0]

    const handleColorSelect = (color: ColorOption) => {
        // Use single onChange if provided (recommended), otherwise use separate callbacks
        if (onChange) {
            onChange({ textColor: color.text, bgColor: color.bg })
        } else {
            // For backwards compatibility - but this can cause state issues
            if (onTextColorChange) onTextColorChange(color.text)
            if (onBgColorChange) onBgColorChange(color.bg)
        }
        setIsOpen(false)
    }

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="
                    w-full flex items-center gap-3 p-3
                    bg-white dark:bg-dark-bg
                    border border-gray-200 dark:border-white/10
                    rounded-xl
                    hover:border-primary/50 dark:hover:border-primary/50
                    transition-all duration-200
                    group
                "
            >
                {/* Color Preview with Icon */}
                <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                </div>

                {/* Color Info */}
                <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Colore tema</div>
                    <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${currentColor.preview}`} />
                        <span className="font-medium text-gray-900 dark:text-white">{currentColor.label}</span>
                    </div>
                </div>

                {/* Change indicator */}
                <Palette className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        >
                            <div className="
                                w-full max-w-md
                                bg-white dark:bg-dark-card
                                border border-gray-200 dark:border-white/10
                                rounded-2xl shadow-2xl
                                overflow-hidden
                                flex flex-col
                            ">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-white/10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Seleziona Colore Tema
                                    </h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Color Grid */}
                            <div className="p-4">
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                    {COLOR_PALETTE.map((color) => {
                                        const isSelected = textColor === color.text

                                        return (
                                            <button
                                                key={color.name}
                                                onClick={() => handleColorSelect(color)}
                                                title={color.label}
                                                className={`
                                                    relative aspect-square rounded-xl
                                                    flex items-center justify-center
                                                    transition-all duration-200
                                                    ${color.bg}
                                                    ${isSelected
                                                        ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-dark-card scale-110'
                                                        : 'hover:scale-110'
                                                    }
                                                `}
                                            >
                                                <div className={`w-6 h-6 rounded-full ${color.preview}`} />
                                                {isSelected && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Check className={`w-5 h-5 ${color.text}`} />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Live Preview */}
                            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                                    Anteprima
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${textColor}`} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Colore selezionato</div>
                                            <div className="font-medium text-gray-900 dark:text-white">{currentColor.label}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        Conferma
                                    </button>
                                </div>
                            </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ColorPicker
