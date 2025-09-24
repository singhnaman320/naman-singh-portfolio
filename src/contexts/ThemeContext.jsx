import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize theme from localStorage or system preference (only once)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const userHasPreference = localStorage.getItem('userHasSetTheme')
    
    if (savedTheme && userHasPreference === 'true') {
      // User has manually set a preference, use it
      setIsDark(savedTheme === 'dark')
    } else if (savedTheme) {
      // Theme exists but user hasn't manually set it, use saved theme
      setIsDark(savedTheme === 'dark')
    } else {
      // No saved theme, use system preference as default
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(systemPrefersDark)
      localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light')
    }
    
    setIsInitialized(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!isInitialized) return
    
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, isInitialized])

  const toggleTheme = () => {
    setIsDark(!isDark)
    // Mark that user has manually set a theme preference
    localStorage.setItem('userHasSetTheme', 'true')
  }

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
    isInitialized
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
