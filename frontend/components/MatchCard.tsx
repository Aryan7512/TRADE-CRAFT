'use client'

import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface MatchCardProps {
    match: any
    currentUserId: string
}

export default function MatchCard({ match, currentUserId }: MatchCardProps) {
    const isUser1 = match.user1.id === currentUserId
    const partner = isUser1 ? match.user2 : match.user1

    // For the design: "Shared skills" - strictly speaking it's one teach/learn pair per match object in our DB,
    // but conceptually we display it as what connects them.
    const teachSkill = isUser1 ? match.skill1 : match.skill2
    const learnSkill = isUser1 ? match.skill2 : match.skill1

    return (
        <div className="bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow relative">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        {/* If avatar_url exists use it, else generic */}
                        {partner.avatar_url ? (
                            <img src={partner.avatar_url} alt={partner.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-lg">
                                {partner.name[0]}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{partner.name}</h3>
                        <p className="text-xs text-gray-500">Shared skills:</p>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px]">
                            {teachSkill.name}, {learnSkill.name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {Math.round(match.score * 100)}% Match
                </div>
            </div>

            <Link
                href={`/match/${match.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View match with ${partner.name}`}
            />
        </div>
    )
}
