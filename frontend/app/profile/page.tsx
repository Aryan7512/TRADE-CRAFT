'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import AIAssistantWidget from '@/components/AIAssistantWidget'
import { api } from '@/lib/api'
import { User, Mail, Calendar, BookOpen, GraduationCap, Edit, Share2 } from 'lucide-react'

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null)
    const [teachSkills, setTeachSkills] = useState<any[]>([])
    const [learnSkills, setLearnSkills] = useState<any[]>([])

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userData = await api.getCurrentUser()
                setUser(userData)
                const skills = await api.getSkills()
                setTeachSkills(skills.filter((s: any) => s.mode === 'TEACH'))
                setLearnSkills(skills.filter((s: any) => s.mode === 'LEARN'))
            } catch (e) {
                console.error(e)
            }
        }
        fetchProfile()
    }, [])

    if (!user) return null

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                {/* Banner */}
                <div className="relative h-48 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 overflow-hidden mb-16">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Profile Header */}
                <div className="relative px-8">
                    <div className="absolute -top-16 left-8">
                        <div className="w-32 h-32 rounded-full border-4 border-white dark:border-dark-bg bg-white dark:bg-dark-card flex items-center justify-center text-4xl font-bold text-gray-400 overflow-hidden">
                            {user.avatar_url ? (
                                <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                user.name?.[0]
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between items-start pl-40 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                            <div className="flex items-center text-gray-500 mt-1 space-x-4">
                                <span className="flex items-center text-sm"><Mail className="w-4 h-4 mr-1" /> {user.email}</span>
                                <span className="flex items-center text-sm"><Calendar className="w-4 h-4 mr-1" /> Joined Jan 2026</span>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg text-sm font-medium hover:bg-gray-50">
                                <Share2 className="w-4 h-4 mr-2" /> Share Profile
                            </button>
                            <button className="flex items-center px-4 py-2 bg-primary-600 max-w-xs text-white rounded-lg text-sm font-medium hover:bg-primary-700">
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-3 gap-8">
                        <div className="col-span-2 space-y-8">
                            {/* Bio */}
                            <section className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border">
                                <h2 className="text-lg font-bold mb-4">About</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {user.bio || "No bio added yet."}
                                </p>
                            </section>

                            {/* Stats */}
                            <section className="grid grid-cols-3 gap-4">
                                <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border text-center">
                                    <div className="text-3xl font-bold text-primary-600">{teachSkills.length}</div>
                                    <div className="text-sm text-gray-500 mt-1">Skills Offered</div>
                                </div>
                                <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border text-center">
                                    <div className="text-3xl font-bold text-accent-600">{learnSkills.length}</div>
                                    <div className="text-sm text-gray-500 mt-1">Learning Goals</div>
                                </div>
                                <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border text-center">
                                    <div className="text-3xl font-bold text-green-500">0</div>
                                    <div className="text-sm text-gray-500 mt-1">Sessions Hosted</div>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            {/* Teaching */}
                            <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border">
                                <h3 className="font-bold flex items-center mb-4">
                                    <GraduationCap className="w-5 h-5 mr-2 text-primary-600" />
                                    Teaching
                                </h3>
                                <div className="space-y-3">
                                    {teachSkills.map(s => (
                                        <div key={s.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium">{s.name}</span>
                                            <span className="px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs">Lvl {s.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Learning */}
                            <div className="bg-white dark:bg-dark-card p-6 rounded-xl border border-gray-200 dark:border-dark-border">
                                <h3 className="font-bold flex items-center mb-4">
                                    <BookOpen className="w-5 h-5 mr-2 text-accent-600" />
                                    Learning
                                </h3>
                                <div className="space-y-3">
                                    {learnSkills.map(s => (
                                        <div key={s.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium">{s.name}</span>
                                            <span className="px-2 py-0.5 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded text-xs">Lvl {s.level}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AIAssistantWidget />
        </div>
    )
}
