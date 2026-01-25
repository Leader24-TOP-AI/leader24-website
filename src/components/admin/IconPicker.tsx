'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Check } from 'lucide-react'
import {
    // Commerce
    ShoppingCart, ShoppingBag, Store, CreditCard, Receipt, Package,
    // Business
    Building2, Briefcase, Building, Factory, Landmark, TrendingUp, Handshake,
    // Food & Hospitality
    Utensils, Coffee, Wine, ChefHat, Hotel, Bed,
    // Travel
    Plane, Car, Train, Ship, Compass, Map, Luggage,
    // Health
    Stethoscope, Heart, Pill, Activity, Hospital,
    // Education
    GraduationCap, Book, Pencil, School,
    // Tech
    Laptop, Smartphone, Monitor, Cpu, Wifi,
    // Communication
    MessageSquare, Phone, Mail, Bell, Send,
    // General
    Star, Users, User, Settings, Home, Zap, Globe,
    // Additional useful icons
    Calendar, Clock, Camera, Image, FileText, Folder,
    Shield, Lock, Key, Eye, Download, Upload,
    Play, Music, Headphones, Mic, Video,
    Gift, Tag, Bookmark, Award, Trophy,
    Truck, Bike, Bus, Rocket, Anchor,
    LucideIcon
} from 'lucide-react'

// Icon map with all available icons
export const AVAILABLE_ICONS: Record<string, LucideIcon> = {
    // Commerce
    ShoppingCart, ShoppingBag, Store, CreditCard, Receipt, Package,
    // Business
    Building2, Briefcase, Building, Factory, Landmark, TrendingUp, Handshake,
    // Food & Hospitality
    Utensils, Coffee, Wine, ChefHat, Hotel, Bed,
    // Travel
    Plane, Car, Train, Ship, Compass, Map, Luggage,
    // Health
    Stethoscope, Heart, Pill, Activity, Hospital,
    // Education
    GraduationCap, Book, Pencil, School,
    // Tech
    Laptop, Smartphone, Monitor, Cpu, Wifi,
    // Communication
    MessageSquare, Phone, Mail, Bell, Send,
    // General
    Star, Users, User, Settings, Home, Zap, Globe,
    // Additional
    Calendar, Clock, Camera, Image, FileText, Folder,
    Shield, Lock, Key, Eye, Download, Upload,
    Play, Music, Headphones, Mic, Video,
    Gift, Tag, Bookmark, Award, Trophy,
    Truck, Bike, Bus, Rocket, Anchor
}

// Categories for filtering
const ICON_CATEGORIES: Record<string, { label: string; icons: string[] }> = {
    all: { label: 'Tutti', icons: Object.keys(AVAILABLE_ICONS) },
    commerce: {
        label: 'Commercio',
        icons: ['ShoppingCart', 'ShoppingBag', 'Store', 'CreditCard', 'Receipt', 'Package', 'Tag', 'Gift']
    },
    business: {
        label: 'Business',
        icons: ['Building2', 'Briefcase', 'Building', 'Factory', 'Landmark', 'TrendingUp', 'Handshake', 'Award', 'Trophy']
    },
    food: {
        label: 'Food & Hotel',
        icons: ['Utensils', 'Coffee', 'Wine', 'ChefHat', 'Hotel', 'Bed']
    },
    travel: {
        label: 'Viaggi',
        icons: ['Plane', 'Car', 'Train', 'Ship', 'Compass', 'Map', 'Luggage', 'Truck', 'Bike', 'Bus', 'Rocket', 'Anchor']
    },
    health: {
        label: 'Salute',
        icons: ['Stethoscope', 'Heart', 'Pill', 'Activity', 'Hospital']
    },
    education: {
        label: 'Educazione',
        icons: ['GraduationCap', 'Book', 'Pencil', 'School']
    },
    tech: {
        label: 'Tech',
        icons: ['Laptop', 'Smartphone', 'Monitor', 'Cpu', 'Wifi', 'Download', 'Upload']
    },
    communication: {
        label: 'Comunicazione',
        icons: ['MessageSquare', 'Phone', 'Mail', 'Bell', 'Send', 'Video', 'Mic']
    },
    media: {
        label: 'Media',
        icons: ['Camera', 'Image', 'Play', 'Music', 'Headphones', 'Video']
    },
    general: {
        label: 'Generale',
        icons: ['Star', 'Users', 'User', 'Settings', 'Home', 'Zap', 'Globe', 'Calendar', 'Clock', 'Bookmark']
    }
}

// Get icon component by name
export const getIconComponent = (iconName: string): LucideIcon => {
    return AVAILABLE_ICONS[iconName] || MessageSquare
}

interface IconPickerProps {
    value: string
    onChange: (iconName: string) => void
    textColor?: string
    bgColor?: string
}

const IconPicker = ({ value, onChange, textColor = 'text-blue-400', bgColor = 'bg-blue-500/20' }: IconPickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    // Filter icons based on search and category
    const filteredIcons = useMemo(() => {
        let icons = ICON_CATEGORIES[category].icons

        if (search) {
            icons = icons.filter(name =>
                name.toLowerCase().includes(search.toLowerCase())
            )
        }

        return icons
    }, [search, category])

    // Get current icon component
    const CurrentIcon = AVAILABLE_ICONS[value] || MessageSquare

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
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
                {/* Icon Preview */}
                <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center flex-shrink-0`}>
                    <CurrentIcon className={`w-6 h-6 ${textColor}`} />
                </div>

                {/* Icon Name */}
                <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Icona selezionata</div>
                    <div className="font-medium text-gray-900 dark:text-white">{value || 'Seleziona...'}</div>
                </div>

                {/* Change indicator */}
                <div className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Cambia
                </div>
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
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        >
                            <div className="
                                w-full max-w-2xl max-h-[80vh]
                                bg-white dark:bg-dark-card
                                border border-gray-200 dark:border-white/10
                                rounded-2xl shadow-2xl
                                overflow-hidden
                                flex flex-col
                            ">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-200 dark:border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Seleziona Icona
                                    </h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Cerca icona..."
                                        className="
                                            w-full pl-10 pr-4 py-2.5
                                            bg-gray-100 dark:bg-white/5
                                            border-0 rounded-xl
                                            text-gray-900 dark:text-white
                                            placeholder:text-gray-500
                                            focus:ring-2 focus:ring-primary/50
                                            transition-all
                                        "
                                    />
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {Object.entries(ICON_CATEGORIES).map(([key, { label }]) => (
                                        <button
                                            key={key}
                                            onClick={() => setCategory(key)}
                                            className={`
                                                px-3 py-1.5 text-xs font-medium rounded-lg
                                                transition-all duration-200
                                                ${category === key
                                                    ? 'bg-primary text-white'
                                                    : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                                                }
                                            `}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Icon Grid */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                                    {filteredIcons.map((iconName) => {
                                        const Icon = AVAILABLE_ICONS[iconName]
                                        const isSelected = value === iconName

                                        return (
                                            <button
                                                key={iconName}
                                                onClick={() => {
                                                    onChange(iconName)
                                                    setIsOpen(false)
                                                }}
                                                title={iconName}
                                                className={`
                                                    relative p-3 rounded-xl
                                                    flex items-center justify-center
                                                    transition-all duration-200
                                                    ${isSelected
                                                        ? `${bgColor} ring-2 ring-primary`
                                                        : 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10'
                                                    }
                                                `}
                                            >
                                                <Icon className={`w-5 h-5 ${isSelected ? textColor : 'text-gray-600 dark:text-gray-400'}`} />
                                                {isSelected && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                                        <Check className="w-2.5 h-2.5 text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>

                                {filteredIcons.length === 0 && (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        Nessuna icona trovata
                                    </div>
                                )}
                            </div>

                            {/* Footer with preview */}
                            <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
                                            <CurrentIcon className={`w-5 h-5 ${textColor}`} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Selezionata</div>
                                            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
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

export default IconPicker
