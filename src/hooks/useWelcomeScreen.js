import { useState, useEffect } from 'react'

const WELCOME_SESSION_KEY = 'portfolio_welcome_session'

export const useWelcomeScreen = () => {
  const [showWelcome, setShowWelcome] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if welcome screen has been shown in this session (tab/window)
    const hasSeenWelcomeInSession = sessionStorage.getItem(WELCOME_SESSION_KEY)
    
    if (!hasSeenWelcomeInSession) {
      // New tab/window - show welcome screen
      setShowWelcome(true)
    }
    
    setIsLoading(false)
  }, [])

  const handleWelcomeComplete = () => {
    // Mark welcome screen as seen for this session only
    sessionStorage.setItem(WELCOME_SESSION_KEY, 'true')
    setShowWelcome(false)
  }

  const resetWelcomeScreen = () => {
    // For development/testing - remove the session flag
    sessionStorage.removeItem(WELCOME_SESSION_KEY)
    setShowWelcome(true)
  }

  return {
    showWelcome,
    isLoading,
    handleWelcomeComplete,
    resetWelcomeScreen
  }
}
