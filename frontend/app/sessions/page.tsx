'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import AIAssistantWidget from '@/components/AIAssistantWidget'
import { api } from '@/lib/api'
import { format, isFuture, isPast } from 'date-fns'
import { Calendar, Clock, Video, MoreHorizontal, User } from 'lucide-react'
import Link from 'next/link'

export default function SessionsPage() {
    const [loading, setLoading] = useState(true)
    const [sessions, setSessions] = useState<any[]>([])

    useEffect(() => {
        fetchSessions()
    }, [])

    const fetchSessions = async () => {
        try {
            const data = await api.getSessions()
            setSessions(data)
        } catch (error) {
            console.error('Error fetching sessions:', error)
        } finally {
            setLoading(false)
        }
    }

    const upcomingSessions = sessions.filter(s => isFuture(new Date(s.scheduled_at)))
    const pastSessions = sessions.filter(s => isPast(new Date(s.scheduled_at)))

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg">
            <Sidebar />
            <div className="flex-1 ml-64 p-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Sessions</h1>

                {/* Upcoming Sessions */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Upcoming
                    </h2>

                    <div className="space-y-4">
                        {upcomingSessions.length > 0 ? (
                            upcomingSessions.map(session => (
                                <SessionRow key={session.id} session={session} type="UPCOMING" />
                            ))
                        ) : (
                            <div className="p-8 text-center bg-white dark:bg-dark-card rounded-xl border border-dashed border-gray-300 dark:border-dark-border text-gray-500">
                                No upcoming sessions scheduled.
                            </div>
                        )}
                    </div>
                </section>

                {/* Past Sessions */}
                <section>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Past History
                    </h2>

                    <div className="space-y-4 opacity-75">
                        {pastSessions.length > 0 ? (
                            pastSessions.map(session => (
                                <SessionRow key={session.id} session={session} type="PAST" />
                            ))
                        ) : (
                            <div className="p-8 text-center bg-white dark:bg-dark-card rounded-xl border border-dashed border-gray-300 dark:border-dark-border text-gray-500">
                                No past sessions.
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <AIAssistantWidget />
        </div>
    )
}

function SessionRow({ session, type }: { session: any, type: 'UPCOMING' | 'PAST' }) {
    // session.match or related user info might act as partner info
    // For MVP we just show "Session with Partner"
    const partnerName = session.match?.user1?.name || "Partner" // simplified logic

    return (
        <div className="bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-200 dark:border-dark-border flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-6">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/10 rounded-lg text-primary-700 dark:text-primary-300">
                    <span className="text-xs font-bold uppercase">{format(new Date(session.scheduled_at), 'MMM')}</span>
                    <span className="text-xl font-bold">{format(new Date(session.scheduled_at), 'dd')}</span>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">Skill Exchange Session</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {format(new Date(session.scheduled_at), 'HH:mm')} ({session.duration_minutes} min)
                        </span>
                        <Link href={`/match/${session.match_id}`} className="flex items-center hover:text-primary-600">
                            <User className="w-4 h-4 mr-1" />
                            View Match Context
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                {type === 'UPCOMING' && (
                    <a
                        href={session.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2 px-4 flex items-center text-sm"
                    >
                        <Video className="w-4 h-4 mr-2" />
                        Join Meeting
                    </a>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
