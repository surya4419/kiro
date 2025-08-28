import React, { useState, useEffect } from 'react'
import { Bot, X, Sparkles } from 'lucide-react'
import { useStore } from '../store/useStore'

export const FloatingCartifyButton: React.FC = () => {
  const { setCartifyOpen } = useStore()
  const [showTooltip, setShowTooltip] = useState(true)
  const [messages] = useState([
    "🛒 Need help shopping? I'm your AI assistant!",
    "🧠 Tell me your mood, I'll find perfect products!",
    "💰 Shopping on a budget? Let me help you save!"
  ])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 4000)

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 4000)
    }, 10000)

    return () => {
      clearTimeout(tooltipTimer)
      clearInterval(messageTimer)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Enhanced Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-80 animate-bounce-slow">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm text-gray-800 font-medium break-words line-clamp-2">
                {messages[currentMessageIndex]}
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Arrow */}
          <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r border-b border-gray-200"></div>
        </div>
      )}

      {/* Modern AI Assistant Button */}
      <button
        onClick={() => setCartifyOpen(true)}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative group"
      >
        {/* Animated pulse rings */}
        <div className="absolute inset-0 bg-indigo-600 rounded-2xl animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-purple-600 rounded-2xl animate-ping opacity-10 animation-delay-1000"></div>
        
        {/* Bot Icon with sparkles */}
        <div className="relative z-10 flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <Sparkles className="h-4 w-4 opacity-80" />
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
      </button>
    </div>
  )
}