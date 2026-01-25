'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { getIconComponent } from './IconPicker'

interface ChatScenarioData {
    sector_name_it?: string
    sector_name_en?: string
    icon_name?: string
    color?: string
    bg_color?: string
    user_message_it?: string
    user_message_en?: string
    ai_message_it?: string
    ai_message_en?: string
    stat_it?: string
    stat_en?: string
}

interface ChatPreviewProps {
    scenario: ChatScenarioData | null
    language?: 'it' | 'en'
}

export default function ChatPreview({ scenario, language = 'it' }: ChatPreviewProps) {
    const Icon = getIconComponent(scenario?.icon_name || 'MessageSquare')

    // Get localized content
    const sectorName = language === 'it'
        ? scenario?.sector_name_it
        : scenario?.sector_name_en || scenario?.sector_name_it

    const userMessage = language === 'it'
        ? scenario?.user_message_it
        : scenario?.user_message_en || scenario?.user_message_it

    const aiMessage = language === 'it'
        ? scenario?.ai_message_it
        : scenario?.ai_message_en || scenario?.ai_message_it

    const statText = language === 'it'
        ? scenario?.stat_it
        : scenario?.stat_en || scenario?.stat_it

    if (!scenario) {
        return (
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 text-center">
                <div className="text-gray-400 dark:text-gray-500">
                    Nessuna anteprima disponibile
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* LIVE DEMO Badge */}
            <div className="absolute -top-10 left-0 w-full flex justify-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-300 dark:border-white/10">
                    LIVE DEMO
                </span>
            </div>

            {/* Chat Widget Container - same dimensions as website */}
            <div className="relative w-full max-w-[380px] mx-auto h-[600px] flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-full relative z-10 backdrop-blur-sm"
                >
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-dark-bg/50 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${scenario.bg_color || 'bg-blue-500/20'} flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 ${scenario.color || 'text-blue-400'}`} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm">
                                {sectorName || 'Nome Settore'}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-500 dark:text-green-400 font-medium">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide">
                        {/* Today timestamp */}
                        <div className="text-center text-xs text-gray-500 my-4">
                            Oggi
                        </div>

                        {/* User Message */}
                        {userMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex justify-end"
                            >
                                <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm bg-primary text-white">
                                    {userMessage}
                                </div>
                            </motion.div>
                        )}

                        {/* AI Message */}
                        {aiMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex justify-start"
                            >
                                <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-sm text-sm leading-relaxed shadow-sm bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200">
                                    {aiMessage}
                                </div>
                            </motion.div>
                        )}

                        {/* Stat Card - Inline */}
                        {statText && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex justify-end mt-4"
                            >
                                <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 p-3 rounded-xl shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 rounded-lg">
                                            <Icon className="w-5 h-5 text-green-500 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Risultato</div>
                                            <div className="text-sm font-bold text-gray-900 dark:text-white">{statText}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Input Area - exact same styling as website */}
                    <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-dark-bg/50">
                        <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3 flex items-center justify-between">
                            <span className="text-sm text-gray-500">Scrivi un messaggio...</span>
                            <div className="p-1.5 rounded-lg bg-primary text-white">
                                <Send className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
