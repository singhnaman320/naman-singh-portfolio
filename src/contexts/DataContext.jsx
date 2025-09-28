import { createContext, useContext, useState, useEffect } from 'react'
import { publicAPI } from '../services/api'
import WelcomeScreen from '../components/WelcomeScreen'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [home, setHome] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState({})
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(() => {
    // Check if user has seen welcome screen in this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    return !hasSeenWelcome // Show welcome only if not seen in this session
  })
  const [dataLoaded, setDataLoaded] = useState(false)

  // Fetch all public data
  const fetchAllData = async () => {
    try {
      const [
        homeRes,
        projectsRes,
        experiencesRes,
        skillsRes,
        statsRes
      ] = await Promise.all([
        publicAPI.getHome(),
        publicAPI.getProjects(),
        publicAPI.getExperiences(),
        publicAPI.getSkills(),
        publicAPI.getStats()
      ])

      setHome(homeRes.data)
      setProjects(projectsRes.data)
      setExperiences(experiencesRes.data)
      setSkills(skillsRes.data)
      setStats(statsRes.data)
      setDataLoaded(true)
    } catch (error) {
      console.error('Error fetching data:', error)
      setDataLoaded(true) // Still hide welcome screen even on error
    }
    // Note: Loading state is managed by useEffect, not here
  }

  // Fetch individual data sections
  const fetchHome = async () => {
    try {
      const response = await publicAPI.getHome()
      setHome(response.data)
    } catch (error) {
      console.error('Error fetching home:', error)
    }
  }

  const fetchProjects = async (featured = false) => {
    try {
      const response = await publicAPI.getProjects(featured)
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchExperiences = async () => {
    try {
      const response = await publicAPI.getExperiences()
      setExperiences(response.data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await publicAPI.getSkills()
      setSkills(response.data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }


  const fetchStats = async () => {
    try {
      const response = await publicAPI.getStats()
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  // Get single project
  const getProject = async (id) => {
    try {
      const response = await publicAPI.getProject(id)
      return response.data
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  }


  // Submit contact form
  const submitContact = async (formData) => {
    try {
      const response = await publicAPI.submitContact(formData)
      return { success: true, message: response.data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send message'
      return { success: false, message }
    }
  }

  // Handle welcome screen completion
  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    // Mark that user has seen the welcome screen in this session
    sessionStorage.setItem('hasSeenWelcome', 'true')
  }

  // Reset welcome screen (for testing or clearing cache)
  const resetWelcomeScreen = () => {
    sessionStorage.removeItem('hasSeenWelcome')
    setShowWelcome(true)
  }

  // Ensure welcome screen shows for exactly 5 seconds
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    
    if (hasSeenWelcome) {
      // If user has seen welcome screen, load data quickly without loading state
      setLoading(false)
      fetchAllData()
    } else {
      // First time visit - show welcome screen and load data in background
      fetchAllData()
      
      // Always hide welcome screen after exactly 5 seconds, regardless of data loading status
      const welcomeTimer = setTimeout(() => {
        setShowWelcome(false)
        setLoading(false) // Remove loading state after welcome screen
        // Mark that user has seen the welcome screen in this session
        sessionStorage.setItem('hasSeenWelcome', 'true')
      }, 5000)

      return () => clearTimeout(welcomeTimer)
    }
  }, [])

  const value = {
    // Data
    home,
    projects,
    experiences,
    skills,
    stats,
    loading,
    
    // Methods
    fetchAllData,
    fetchHome,
    fetchProjects,
    fetchExperiences,
    fetchSkills,
    fetchStats,
    getProject,
    submitContact,
    resetWelcomeScreen,
    
    // Admin methods
    refreshHome: fetchHome
  }

  return (
    <DataContext.Provider value={value}>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      {children}
    </DataContext.Provider>
  )
}
