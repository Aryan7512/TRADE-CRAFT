'use client'

import { Star, ArrowRight, Sparkles, Brain, Calendar, Users } from 'lucide-react'
import Link from 'next/link'

interface MatchCardProps {
    match: any
    currentUserId: string
}

export default function MatchCard({ match, currentUserId }: MatchCardProps) {
    const isUser1 = match.user1?.id === currentUserId || match.user1_id === currentUserId
    const partner = isUser1 ? match.user2 : match.user1

    // Handle both discovered matches and saved matches from database
    const teachSkill = isUser1
        ? (match.skill1_teach || match.skill1)
        : (match.skill2_teach || match.skill2)
    const learnSkill = isUser1
        ? (match.skill2_teach || match.skill2)
        : (match.skill1_teach || match.skill1)

    // Get match score (handle both naming conventions)
    const totalScore = match.total_score ?? match.score ?? 0

    // Component scores for the AI breakdown
    const semanticScore = match.semantic_score ?? 0
    const reciprocityScore = match.reciprocity_score ?? 0
    const availabilityScore = match.availability_score ?? 0

    // Generate a unique match ID for discovered matches that don't have a DB id yet
    const matchId = match.id || `discover-${partner?.id}`

    if (!partner) return null

    return (
        <div className="bg-white dark:bg-dark-card rounded-xl overflow-hidden border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 relative group">
            {/* Header with Avatar */}
            <div className="p-5 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ring-2 ring-primary-100 dark:ring-primary-900">
                            {partner.avatar_url ? (
                                <img src={partner.avatar_url} alt={partner.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 text-white font-bold text-xl">
                                    {partner.name?.[0] || '?'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{partner.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[160px]">
                                {partner.bio || 'Skill exchange partner'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {Math.round(totalScore * 100)}%
                        </div>
                        <span className="text-xs text-gray-500">AI Match</span>
                    </div>
                </div>
            </div>

            {/* Skills Exchange */}
            <div className="px-5 py-3 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:from-primary-900/20 dark:to-accent-900/20">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300 rounded-md text-xs font-medium">
                            You teach: {teachSkill?.name || 'Your skill'}
                        </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 hidden sm:block" />
                    <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-md text-xs font-medium">
                            You learn: {learnSkill?.name || 'Their skill'}
                        </span>
                    </div>
                </div>
            </div>

            {/* AI Score Breakdown - Shows sentence transformer magic */}
            <div className="p-5 pt-3 space-y-3">
                <div className="flex items-center space-x-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    <span>Powered by AI Matching</span>
                </div>

                {/* Score bars */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5">
                            <Brain className="w-3 h-3 text-purple-500" />
                            <span className="text-gray-600 dark:text-gray-400">Skill Similarity</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{Math.round(semanticScore * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(semanticScore * 100)}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5">
                            <Users className="w-3 h-3 text-blue-500" />
                            <span className="text-gray-600 dark:text-gray-400">Level Match</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{Math.round(reciprocityScore * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(reciprocityScore * 100)}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3 h-3 text-green-500" />
                            <span className="text-gray-600 dark:text-gray-400">Availability</span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{Math.round(availabilityScore * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(availabilityScore * 100)}%` }}
                        />
                    </div>
                </div>

                {/* AI Explanation */}
                {match.explanation && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic border-l-2 border-primary-300 dark:border-primary-700 pl-2 mt-3">
                        "{match.explanation}"
                    </p>
                )}
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/5 dark:group-hover:bg-primary-400/5 transition-colors duration-300 pointer-events-none" />

            <Link
                href={match.id ? `/match/${match.id}` : '#'}
                className="absolute inset-0 z-10"
                aria-label={`View match with ${partner.name}`}
            />
        </div>
    )
}
