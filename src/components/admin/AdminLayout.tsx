'use client'

import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Settings,
  MessageSquare,
  Quote,
  Puzzle,
  CreditCard,
  FileText,
  Image,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sun,
  Moon,
  User,
  ChevronDown,
  HelpCircle,
  Sparkles,
  ListOrdered,
  BookOpen,
  Grid3x3
} from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { useTheme } from 'next-themes'

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/settings', icon: Settings, label: 'Impostazioni' },
  { path: '/admin/sections', icon: FileText, label: 'Sezioni' },
  { path: '/admin/sectors', icon: Grid3x3, label: 'Settori' },
  { path: '/admin/chat-scenarios', icon: MessageSquare, label: 'Chat Demo' },
  { path: '/admin/features', icon: Sparkles, label: 'Features' },
  { path: '/admin/steps', icon: ListOrdered, label: 'Come Funziona' },
  { path: '/admin/faqs', icon: HelpCircle, label: 'FAQ' },
  { path: '/admin/case-studies', icon: BookOpen, label: 'Casi Studio' },
  { path: '/admin/testimonials', icon: Quote, label: 'Testimonianze' },
  { path: '/admin/integrations', icon: Puzzle, label: 'Integrazioni' },
  { path: '/admin/pricing', icon: CreditCard, label: 'Prezzi' },
  { path: '/admin/media', icon: Image, label: 'Media' },
]

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAdmin()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuOpen && !(e.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [userMenuOpen])

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
  }

  const getCurrentPageLabel = () => {
    const currentItem = navItems.find(item => pathname.startsWith(item.path))
    return currentItem?.label || 'Dashboard'
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full overflow-x-hidden">
      {/* Logo */}
      <div className={`flex items-center ${sidebarCollapsed && !isMobile ? 'justify-center px-2' : 'px-4'} h-16 border-b border-gray-200 dark:border-white/10`}>
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <AnimatePresence mode="wait">
            {(!sidebarCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-heading font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap"
              >
                Leader24
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-hide">
        <ul className="space-y-1 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.path)

            return (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={`
                    group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 ease-out
                    ${isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary dark:text-primary border-l-[3px] border-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-[3px] border-transparent'
                    }
                    ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}
                  `}
                >
                  <Icon className={`relative z-10 w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />

                  <AnimatePresence mode="wait">
                    {(!sidebarCollapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="relative z-10 font-medium text-sm whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && !isMobile && (
                    <div className="
                      absolute left-full ml-2 px-2.5 py-1.5
                      bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium
                      rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible
                      transition-all duration-200 whitespace-nowrap z-50
                      shadow-lg
                    ">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
                    </div>
                  )}
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse button (desktop only) */}
      {!isMobile && (
        <div className="p-2 border-t border-gray-200 dark:border-white/10">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="
              w-full flex items-center justify-center gap-2 px-3 py-2.5
              rounded-xl text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-700 dark:hover:text-gray-300
              transition-all duration-200
            "
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Comprimi</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 256 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className="
          hidden lg:block fixed top-0 left-0 h-screen z-40
          bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl
          border-r border-gray-200 dark:border-white/10
          shadow-xl shadow-gray-200/50 dark:shadow-black/20
          overflow-visible
        "
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="
                lg:hidden fixed top-0 left-0 w-72 h-screen z-50
                bg-white dark:bg-dark-card
                border-r border-gray-200 dark:border-white/10
                shadow-2xl
              "
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div
        className={`
          transition-all duration-300 ease-out
          ${sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}
        `}
      >
        {/* Top Header */}
        <header className="
          sticky top-0 z-30 h-16
          bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl
          border-b border-gray-200 dark:border-white/10
          shadow-sm
        ">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left: Mobile menu + Breadcrumb */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 dark:text-gray-500">Admin</span>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getCurrentPageLabel()}
                </span>
              </div>
            </div>

            {/* Right: Theme toggle + User menu */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="
                  p-2.5 rounded-xl
                  bg-gray-100 dark:bg-white/5
                  text-gray-600 dark:text-gray-400
                  hover:bg-gray-200 dark:hover:bg-white/10
                  hover:text-gray-900 dark:hover:text-white
                  transition-all duration-200
                "
                title={theme === 'dark' ? 'Passa a tema chiaro' : 'Passa a tema scuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative user-menu-container">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="
                    flex items-center gap-2 p-1.5 pr-3 rounded-xl
                    bg-gray-100 dark:bg-white/5
                    hover:bg-gray-200 dark:hover:bg-white/10
                    transition-all duration-200
                  "
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="
                        absolute right-0 mt-2 w-56 py-2
                        bg-white dark:bg-dark-card
                        border border-gray-200 dark:border-white/10
                        rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/30
                        overflow-hidden
                      "
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-white/5">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.email || 'admin@leader24.ai'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Amministratore
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="
                          w-full flex items-center gap-3 px-4 py-2.5
                          text-red-600 dark:text-red-400
                          hover:bg-red-50 dark:hover:bg-red-500/10
                          transition-colors duration-150
                        "
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Esci</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
