'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check localStorage first, then system preference
        const stored = localStorage.getItem('tradecraft-theme') as Theme | null
        if (stored) {
            setThemeState(stored)
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark')
        } else {
            setThemeState('light')
        }
    }, [])

    useEffect(() => {
        if (!mounted) return

        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('tradecraft-theme', theme)
    }, [theme, mounted])

    const toggleTheme = () => {
        setThemeState(prev => prev === 'dark' ? 'light' : 'dark')
    }

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme)
    }

    // Add dark class initially to prevent flash
    useEffect(() => {
        // Apply dark class immediately on mount to prevent flash
        document.documentElement.classList.add('dark')
    }, [])

    const value = {
        theme,
        toggleTheme,
        setTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    return context
}
