'use client'

import { useState, useRef, useEffect } from 'react'
import { api } from '@/lib/api'
import { MessageSquare, X, Minus, Send, Bot, User } from 'lucide-react'

export default function AIAssistantWidget() {
    const [isOpen, setIsOpen] = useState(true) // Default open as per image
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'assistant', content: 'Hi! 👋' },
        { role: 'assistant', content: 'I\'m your AI Assistant. How can I help you find a match today?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || loading) return

        const userMsg = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            // Prepare context - currently mocked, but could assume user profile data is available
            const response = await api.chatWithAssistant(
                [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
                { context: "User is checking dashboard matches" }
            )

            setMessages(prev => [...prev, { role: 'assistant', content: response.response }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }])
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-white dark:bg-dark-card rounded-full shadow-lg border border-gray-200 dark:border-dark-border flex items-center justify-center text-primary-600 hover:scale-110 transition-transform z-50 p-0"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-600/10 rounded-full" />
                <MessageSquare className="w-6 h-6" />
            </button>
        )
    }

    if (isMinimized) {
        return (
            <div className="fixed bottom-6 right-6 w-72 bg-white dark:bg-dark-card rounded-t-xl shadow-xl z-50 border border-gray-200 dark:border-dark-border">
                <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-t-xl cursor-pointer" onClick={() => setIsMinimized(false)}>
                    <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-primary-600" />
                        <h3 className="font-semibold text-sm">AI Assistant</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }} className="hover:bg-gray-200 p-1 rounded"><Minus className="w-4 h-4" /></button>
                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:bg-gray-200 p-1 rounded"><X className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white dark:bg-dark-card rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-dark-border flex flex-col animate-scale-in">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-gray-50 dark:bg-dark-bg rounded-t-xl">
                <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-primary-600" />
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                    <button onClick={() => setIsMinimized(true)} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded"><Minus className="w-4 h-4" /></button>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded"><X className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-dark-card">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm flex items-start space-x-2 ${msg.role === 'user'
                                ? 'bg-primary-600 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                            }`}>
                            {msg.role === 'assistant' && <Bot className="w-4 h-4 mt-0.5 shrink-0" />}
                            <span>{msg.content}</span>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card rounded-b-xl">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-2 top-2 p-1.5 bg-white dark:bg-gray-700 text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    )
}
