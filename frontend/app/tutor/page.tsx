'use client'

import { useState, useRef, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { api } from '@/lib/api'
import { Send, Bot, Sparkles, User, Code } from 'lucide-react'

export default function TutorPage() {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'assistant', content: 'Hello! I am your AI Technical Tutor. I can help you understand concepts, review code, or prepare a learning plan. What are you working on?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            const response = await api.chatWithAssistant(
                [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
                { context: "User is in full-screen Tutor Mode" }
            )

            setMessages(prev => [...prev, { role: 'assistant', content: response.response }])
        } catch (error) {
            // generic error
            setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error. Please try again." }])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-dark-bg">
            <Sidebar />

            <div className="flex-1 ml-64 flex flex-col h-full relative">
                <header className="px-8 py-4 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
                    <h1 className="text-xl font-bold flex items-center">
                        <Sparkles className="w-5 h-5 text-primary-600 mr-2" />
                        AI Technical Tutor
                    </h1>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''} space-x-4`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-primary-600 text-white'
                                        }`}>
                                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>

                                    <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-100'
                                            : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border'
                                        }`}>
                                        <div className="prose dark:prose-invert text-sm max-w-none whitespace-pre-wrap">
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border p-4 rounded-2xl flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border">
                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSend} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about code, concepts, or trading strategies..."
                                className="w-full pl-5 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || loading}
                                className="absolute right-3 top-3 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        <p className="text-center text-xs text-gray-400 mt-2">
                            AI Tutor may make mistakes. Verify critical code before use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
