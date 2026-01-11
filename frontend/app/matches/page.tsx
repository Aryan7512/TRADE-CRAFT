'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import AIAssistantWidget from '@/components/AIAssistantWidget'
import MatchCard from '@/components/MatchCard'
import { api } from '@/lib/api'
import { Filter, Search, Loader2 } from 'lucide-react'

export default function MatchesPage() {
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'DISCOVER' | 'MY_MATCHES'>('DISCOVER')
    const [matches, setMatches] = useState<any[]>([])
    const [currentUserId, setCurrentUserId] = useState<string>('')

    useEffect(() => {
        fetchMatches()
    }, [activeTab])

    const fetchMatches = async () => {
        setLoading(true)
        try {
            const user = await api.getCurrentUser()
            if (user) setCurrentUserId(user.id)

            let data
            if (activeTab === 'DISCOVER') {
                data = await api.discoverMatches(20)
            } else {
                data = await api.getMatches()
                // If my matches returns null/empty, it's empty array
                if (!data) data = []
            }
            setMatches(data)
        } catch (error) {
            console.error('Error fetching matches:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Find Your Skill Partners</h1>

                    <div className="flex items-center justify-between">
                        {/* Tabs */}
                        <div className="flex space-x-4 bg-white dark:bg-dark-card p-1 rounded-lg border border-gray-200 dark:border-dark-border inline-flex">
                            <button
                                onClick={() => setActiveTab('DISCOVER')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'DISCOVER'
                                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                Discover
                            </button>
                            <button
                                onClick={() => setActiveTab('MY_MATCHES')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'MY_MATCHES'
                                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                My Matches
                            </button>
                        </div>

                        {/* Filter Button (Mock) */}
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            <span>Filter Skills</span>
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {matches.length > 0 ? (
                            matches.map((match) => (
                                <MatchCard key={match.id} match={match} currentUserId={currentUserId} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white dark:bg-dark-card rounded-xl border border-dashed border-gray-300">
                                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {activeTab === 'DISCOVER' ? 'No new matches found.' : 'You haven\'t matched with anyone yet.'}
                                </h3>
                                <p className="text-gray-500 max-w-sm mx-auto mt-2">
                                    {activeTab === 'DISCOVER'
                                        ? 'Try adding more general skills to your profile.'
                                        : 'Go to the Discover tab to find people to trade skills with!'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <AIAssistantWidget />
        </div>
    )
}
