'use client'

import { useTheme } from './ThemeProvider'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20 dark:hover:shadow-primary-400/20 group"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {/* Sun icon for light mode */}
            <Sun
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                        ? 'opacity-0 rotate-90 scale-0'
                        : 'opacity-100 rotate-0 scale-100 text-amber-500'
                    }`}
            />
            {/* Moon icon for dark mode */}
            <Moon
                className={`w-5 h-5 absolute transition-all duration-300 ${theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100 text-primary-400'
                        : 'opacity-0 -rotate-90 scale-0'
                    }`}
            />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300" />
        </button>
    )
}
