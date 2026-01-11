'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Calendar, GraduationCap, User, HelpCircle } from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Matches', href: '/matches', icon: Users },
    { name: 'Sessions', href: '/sessions', icon: Calendar },
    { name: 'AI Tutor', href: '/tutor', icon: GraduationCap },
    { name: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className="text-xl font-bold gradient-text">TradeCraft</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                <Link
                    href="/help"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <HelpCircle className="w-5 h-5" />
                    <span>Help Center</span>
                </Link>
            </div>
        </div>
    )
}
