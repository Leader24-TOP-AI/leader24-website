'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved) {
      setTheme(saved)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // Sync theme to dashboard links: append ?theme= to all dash.leader24.ai links
  useEffect(() => {
    if (!mounted) return

    function updateDashboardLinks() {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="dash.leader24.ai"]').forEach(a => {
        try {
          const url = new URL(a.href)
          url.searchParams.set('theme', theme)
          a.href = url.toString()
        } catch { /* ignore invalid URLs */ }
      })
    }

    updateDashboardLinks()

    // Capture-phase click handler as fallback for dynamically added links
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>('a[href*="dash.leader24.ai"]')
      if (!anchor) return
      try {
        const url = new URL(anchor.href)
        url.searchParams.set('theme', theme)
        anchor.href = url.toString()
      } catch { /* ignore invalid URLs */ }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  }

  // Prevent flash of wrong theme
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
