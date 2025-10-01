import { createContext, useContext, useState, useEffect } from 'react'
import { publicAPI } from '../services/api'
import WelcomeScreen from '../components/WelcomeScreen'
import { getFallbackData } from '../utils/fallbackData'
import { loadMultipleWithFastFallback } from '../utils/fastLoader'

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

  // Fast data loading with quick fallbacks
  const fetchAllData = async () => {
    try {
      // Load all data in parallel with fast fallbacks (3 second timeout per call)
      const results = await loadMultipleWithFastFallback([
        { 
          apiCall: publicAPI.getHome, 
          fallbackData: getFallbackData('home'),
          timeout: 3000 
        },
        { 
          apiCall: publicAPI.getProjects, 
          fallbackData: getFallbackData('projects'),
          timeout: 3000 
        },
        { 
          apiCall: publicAPI.getExperiences, 
          fallbackData: getFallbackData('experiences'),
          timeout: 3000 
        },
        { 
          apiCall: publicAPI.getSkills, 
          fallbackData: getFallbackData('skills'),
          timeout: 3000 
        },
        { 
          apiCall: publicAPI.getStats, 
          fallbackData: getFallbackData('stats'),
          timeout: 3000 
        }
      ])

      // Set data from results (either API or fallback)
      const [homeResult, projectsResult, experiencesResult, skillsResult, statsResult] = results

      setHome(homeResult.data)
      setProjects(projectsResult.data)
      setExperiences(experiencesResult.data)
      setSkills(skillsResult.data)
      setStats(statsResult.data)

      setDataLoaded(true)
      
      // Log which data came from API vs fallback (for debugging)
      if (process.env.NODE_ENV === 'development') {
        console.log('Data sources:', {
          home: homeResult.source,
          projects: projectsResult.source,
          experiences: experiencesResult.source,
          skills: skillsResult.source,
          stats: statsResult.source
        })
      }
    } catch (error) {
      // This should rarely happen, but handle it gracefully
      console.warn('Unexpected error during fast data fetch, using all fallbacks')
      setHome(getFallbackData('home'))
      setProjects(getFallbackData('projects'))
      setExperiences(getFallbackData('experiences'))
      setSkills(getFallbackData('skills'))
      setStats(getFallbackData('stats'))
      setDataLoaded(true)
    }
  }

  // Fetch individual data sections with graceful error handling
  const fetchHome = async () => {
    try {
      const response = await publicAPI.getHome()
      setHome(response.data)
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to refresh home data')
    }
  }

  const fetchProjects = async (featured = false) => {
    try {
      const response = await publicAPI.getProjects(featured)
      setProjects(response.data)
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to refresh projects data')
    }
  }

  const fetchExperiences = async () => {
    try {
      const response = await publicAPI.getExperiences()
      setExperiences(response.data)
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to refresh experiences data')
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await publicAPI.getSkills()
      setSkills(response.data)
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to refresh skills data')
    }
  }

  const fetchStats = async () => {
    try {
      const response = await publicAPI.getStats()
      setStats(response.data)
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to refresh stats data')
    }
  }

  // Get single project
  const getProject = async (id) => {
    try {
      const response = await publicAPI.getProject(id)
      return response.data
    } catch (error) {
      // Silently handle error, don't show to user
      console.warn('Failed to load project details')
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

  // Load all data during welcome screen period
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome')
    const startTime = Date.now()
    
    // Always start loading data immediately
    const loadData = async () => {
      await fetchAllData()
      
      // Calculate how long data loading took
      const loadTime = Date.now() - startTime
      const minWelcomeTime = hasSeenWelcome ? 1000 : 2500 // 1s for returning users, 2.5s for first time
      
      // Ensure welcome screen shows for minimum time
      const remainingTime = Math.max(0, minWelcomeTime - loadTime)
      
      setTimeout(() => {
        setShowWelcome(false)
        setLoading(false)
        if (!hasSeenWelcome) {
          sessionStorage.setItem('hasSeenWelcome', 'true')
        }
      }, remainingTime)
    }
    
    loadData()
  }, [])

  const value = {
    // Data
    home,
    projects,
    experiences,
    skills,
    stats,
    loading,
    dataLoaded,
    
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
