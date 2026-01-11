'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { api } from '@/lib/api'
import Sidebar from '@/components/Sidebar'
import MatchCard from '@/components/MatchCard'
import AIAssistantWidget from '@/components/AIAssistantWidget'
import { Search, Bell, ChevronRight, Loader2, Sparkles } from 'lucide-react'

export default function DashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [teachSkills, setTeachSkills] = useState<any[]>([])
    const [learnSkills, setLearnSkills] = useState<any[]>([])
    const [matches, setMatches] = useState<any[]>([])

    useEffect(() => {
        const initDashboard = async () => {
            try {
                setLoading(true)

                // 1. Get User
                const userData = await api.getCurrentUser()
                if (!userData) {
                    router.push('/onboarding')
                    return
                }
                setUser(userData)

                // 2. Get User Skills (for the summary cards)
                // We fetch all skills and filter by mode
                try {
                    const skills = await api.getSkills()
                    setTeachSkills(skills.filter((s: any) => s.mode === 'TEACH'))
                    setLearnSkills(skills.filter((s: any) => s.mode === 'LEARN'))
                } catch (e) {
                    console.error("Failed to fetch skills", e)
                }

                // 3. Discover Matches
                const matchResults = await api.discoverMatches()
                setMatches(matchResults.slice(0, 6)) // Show top 6 matches

            } catch (error) {
                console.error('Error loading dashboard:', error)
                const { data: { session } } = await supabase.auth.getSession()
                if (!session) router.push('/auth')
            } finally {
                setLoading(false)
            }
        }

        initDashboard()
    }, [router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-dark-bg">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64">
                {/* Header */}
                <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border px-8 py-4 sticky top-0 z-20">
                    <div className="flex items-center justify-between">
                        {/* Search */}
                        <div className="relative w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg leading-5 bg-gray-50 dark:bg-dark-bg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                                placeholder="Search..."
                            />
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-500">
                                <Bell className="w-6 h-6" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                                    <p className="text-xs text-gray-500">Pro Member</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                                    {user?.name?.[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">TradeCraft User Dashboard</h1>

                    {/* Stats / Skills Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Skills to Teach */}
                        <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold">Your Skills to Teach</h2>
                            </div>

                            <div className="space-y-5">
                                {teachSkills.length > 0 ? teachSkills.slice(0, 4).map(skill => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                            <span className="text-gray-500">Level {skill.level}/5</span>
                                        </div>
                                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-primary-600 h-2 rounded-full"
                                                style={{ width: `${(skill.level / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-4 text-gray-500">No skills added yet.</div>
                                )}
                                <div className="pt-2 flex justify-between text-sm text-gray-500 font-medium">
                                    <span>Total</span>
                                    <span>{teachSkills.reduce((acc, s) => acc + s.level, 0)} points</span>
                                </div>
                            </div>
                        </div>

                        {/* Skills to Learn */}
                        <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold">Skills to Learn</h2>
                            </div>

                            <div className="space-y-4">
                                {learnSkills.length > 0 ? learnSkills.slice(0, 4).map(skill => (
                                    <div key={skill.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg cursor-pointer group transition-colors">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">{skill.name}</h3>
                                            <p className="text-xs text-gray-500">Recommended matches</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                                    </div>
                                )) : (
                                    <div className="text-center py-4 text-gray-500">No learning goals yet.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top AI Matches */}
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top AI Matches</h2>
                        <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">View all</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {matches.length > 0 ? (
                            matches.map(match => (
                                <MatchCard key={match.id} match={match} currentUserId={user?.id} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-dark-card rounded-xl border border-dashed border-gray-300">
                                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary-300" />
                                <p>No matches found yet. Try adding more skills!</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <AIAssistantWidget />
        </div>
    )
}
