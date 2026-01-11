'use client'

import Link from 'next/link'
import { Brain, Calendar, MessageSquare, Users, TrendingUp, Lightbulb, ArrowRight, CheckCircle, Sparkles, Zap, Shield } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-card relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="orb orb-primary w-[600px] h-[600px] -top-40 -right-40 animate-float-delayed" />
                <div className="orb orb-accent w-[500px] h-[500px] top-1/3 -left-60 animate-float" />
                <div className="orb orb-primary w-[400px] h-[400px] bottom-20 right-1/4 animate-float-delayed" style={{ animationDelay: '-5s' }} />
            </div>

            {/* Dot Pattern Overlay */}
            <div className="fixed inset-0 dot-pattern opacity-50 pointer-events-none" />

            {/* Navigation */}
            <nav className="border-b border-gray-200/50 dark:border-dark-border/50 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-xl sticky top-0 z-50">
                <div className="container-custom py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow-sm animate-pulse-slow">
                                <span className="text-white font-bold text-lg">TC</span>
                            </div>
                            <span className="text-2xl font-bold gradient-text">TradeCraft</span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                                Features
                            </Link>
                            <Link href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                                How it Works
                            </Link>
                            <Link href="#why" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
                                Why TradeCraft
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />
                            <Link href="/login" className="hidden sm:block text-gray-700 dark:text-gray-200 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/auth" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container-custom py-20 md:py-32 relative">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-800">
                            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">AI-Powered Skill Matching</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-balance">
                            Master Technical Skills Through{' '}
                            <span className="gradient-text-animated">Exchange</span>, Not Expenses.
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                            Join our AI-assisted platform where students and professionals swap knowledge.
                            <span className="font-semibold text-gray-800 dark:text-white"> Learn what you need, teach what you know.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/auth" className="btn-primary inline-flex items-center justify-center group">
                                Join the Community
                                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="#how-it-works" className="btn-outline inline-flex items-center justify-center">
                                See How It Works
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="pt-8 grid grid-cols-3 gap-6">
                            <div>
                                <div className="text-3xl font-bold gradient-text">5K+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Active Users</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">150+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Skills Available</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold gradient-text">94%</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Match Accuracy</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Card */}
                    <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <div className="glass-strong rounded-3xl p-8 space-y-6 shadow-2xl dark:shadow-primary-500/5">
                            {/* Match Preview */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl shadow-glow-sm">
                                            A
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg dark:text-white">Alex Chen</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">React & TypeScript Expert</div>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-gradient-to-r from-accent-500/10 to-accent-600/10 rounded-xl border border-accent-500/20">
                                    <span className="text-accent-600 dark:text-accent-400 font-bold">94%</span>
                                    <span className="text-accent-600/70 dark:text-accent-400/70 text-sm ml-1">match</span>
                                </div>
                            </div>

                            {/* AI Insight Box */}
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50/50 dark:from-primary-950/30 dark:to-accent-950/20 rounded-2xl p-5 border-l-4 border-primary-500">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0">
                                        <Brain className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-1">AI Match Insight</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                            Alex excels in React and wants to learn Docker. You're a Docker expert seeking React knowledge.
                                            Your schedules align on Tuesday & Thursday evenings.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Exchange Visual */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-2">
                                    <div className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-700 dark:text-primary-300 text-sm font-medium">
                                        React
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <div className="px-3 py-1.5 bg-accent-100 dark:bg-accent-900/30 rounded-lg text-accent-700 dark:text-accent-300 text-sm font-medium">
                                        Docker
                                    </div>
                                </div>
                                <button className="btn-accent text-sm py-2">
                                    Request Exchange
                                </button>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900/30 dark:to-accent-900/30 blur-sm" />
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section id="features" className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-dark-card/80 dark:to-dark-bg/80 backdrop-blur-sm" />
                <div className="container-custom relative">
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-50 dark:bg-accent-950/50 border border-accent-200 dark:border-accent-800 mb-6">
                            <Zap className="w-4 h-4 text-accent-600 dark:text-accent-400 mr-2" />
                            <span className="text-sm font-medium text-accent-700 dark:text-accent-300">Powerful Features</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            Everything You Need to <span className="gradient-text">Learn & Grow</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Powered by advanced AI to make skill exchange seamless, effective, and enjoyable
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 stagger-children">
                        {/* Feature 1 */}
                        <div className="glass rounded-3xl p-8 card-hover group animate-fade-in-up">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-500">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 dark:text-white">AI Semantic Matching</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Our AI analyzes your skills and learning goals to find perfect exchange partners with complementary knowledge.
                            </p>
                            <ul className="space-y-3">
                                {['Embedding-based similarity', 'Reciprocity scoring', 'Explainable matches'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass rounded-3xl p-8 card-hover group animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow-accent group-hover:shadow-glow-lg transition-shadow duration-500">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 dark:text-white">Smart Session Agendas</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Get AI-generated session plans tailored to your skill levels, learning pace, and available time.
                            </p>
                            <ul className="space-y-3">
                                {['AI-generated agendas', 'Time-optimized sessions', 'Calendar integration'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass rounded-3xl p-8 card-hover group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-purple-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-glow group-hover:shadow-glow-lg transition-shadow duration-500">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 dark:text-white">In-App AI Tutor</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                Get instant help with technical questions, code snippets, and personalized learning guidance.
                            </p>
                            <ul className="space-y-3">
                                {['Technical Q&A', 'Code snippets', 'Learning guidance'].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <CheckCircle className="w-5 h-5 mr-3 text-accent-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            Start Learning in <span className="gradient-text">4 Simple Steps</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            From signup to your first skill exchange in minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary-300 via-accent-300 to-primary-300 dark:from-primary-700 dark:via-accent-700 dark:to-primary-700 rounded-full opacity-50" />

                        {[
                            { num: 1, icon: Users, title: 'Create Profile', desc: 'Add your expertise and learning goals in under 2 minutes' },
                            { num: 2, icon: Brain, title: 'Get Matched', desc: 'AI finds your perfect skill exchange partners instantly' },
                            { num: 3, icon: Calendar, title: 'Schedule Sessions', desc: 'Book learning sessions that fit both schedules' },
                            { num: 4, icon: TrendingUp, title: 'Level Up', desc: 'Track your progress and unlock new opportunities' },
                        ].map((step, idx) => (
                            <div key={step.num} className="text-center relative animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto text-white font-bold text-2xl shadow-glow rotate-3 hover:rotate-0 transition-transform duration-300">
                                        {step.num}
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-white dark:bg-dark-card rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-gray-100 dark:border-dark-border">
                                    <step.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 dark:text-white">{step.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why TradeCraft */}
            <section id="why" className="py-24 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-dark-card/80 dark:to-dark-bg/80" />
                <div className="container-custom relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Why Choose <span className="gradient-text">TradeCraft?</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: TrendingUp,
                                title: 'Faster Skill Acquisition',
                                desc: 'Learn up to 3x faster by teaching while you learn. Active engagement accelerates understanding and retention.',
                                color: 'from-primary-500 to-primary-600'
                            },
                            {
                                icon: Lightbulb,
                                title: 'Personalized Learning',
                                desc: 'No more one-size-fits-all courses. Get tailored sessions matched to your exact skill level and learning style.',
                                color: 'from-accent-500 to-accent-600'
                            },
                            {
                                icon: Shield,
                                title: 'Community Driven',
                                desc: 'Join a verified community of learners and experts. Build connections that accelerate your career growth.',
                                color: 'from-primary-500 to-accent-500'
                            },
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
                                    <item.icon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="glass-strong rounded-[2rem] p-12 md:p-16 text-center relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-400 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-400 rounded-full blur-3xl" />
                        </div>

                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                                Ready to Start Your <span className="gradient-text">Learning Journey?</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                                Join thousands of learners exchanging skills every day. No fees, no subscriptions—just pure knowledge exchange.
                            </p>
                            <Link href="/auth" className="btn-primary inline-flex items-center text-lg px-8 py-4 group">
                                Create Your Free Profile
                                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200/50 dark:border-dark-border/50 py-16 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm">
                <div className="container-custom">
                    <div className="grid md:grid-cols-5 gap-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">TC</span>
                                </div>
                                <span className="text-2xl font-bold gradient-text">TradeCraft</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
                                The AI-powered platform for peer-to-peer technical skill exchange. Learn together, grow together.
                            </p>
                            <div className="flex space-x-4">
                                {['facebook', 'twitter', 'linkedin', 'github'].map((social) => (
                                    <a key={social} href="#" className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border flex items-center justify-center text-gray-500 hover:text-primary-600 hover:border-primary-300 dark:hover:border-primary-600 transition-all">
                                        <span className="sr-only">{social}</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            {social === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                                            {social === 'twitter' && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
                                            {social === 'linkedin' && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />}
                                            {social === 'github' && <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />}
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        {[
                            { title: 'Product', links: ['Features', 'How it Works', 'Pricing', 'API'] },
                            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
                            { title: 'Support', links: ['Help Center', 'Community', 'Contact', 'Status'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4">{col.title}</h4>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                                {link}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            © {new Date().getFullYear()} TradeCraft. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                            <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
