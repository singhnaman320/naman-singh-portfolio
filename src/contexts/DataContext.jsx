import { createContext, useContext, useState, useEffect } from 'react'
import { publicAPI } from '../services/api'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState({})
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  // Fetch all public data
  const fetchAllData = async () => {
    try {
      setLoading(true)
      const [
        aboutRes,
        projectsRes,
        experiencesRes,
        skillsRes,
        statsRes
      ] = await Promise.all([
        publicAPI.getAbout(),
        publicAPI.getProjects(),
        publicAPI.getExperiences(),
        publicAPI.getSkills(),
        publicAPI.getStats()
      ])

      setAbout(aboutRes.data)
      setProjects(projectsRes.data)
      setExperiences(experiencesRes.data)
      setSkills(skillsRes.data)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch individual data sections
  const fetchAbout = async () => {
    try {
      const response = await publicAPI.getAbout()
      setAbout(response.data)
    } catch (error) {
      console.error('Error fetching about:', error)
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

  useEffect(() => {
    fetchAllData()
  }, [])

  const value = {
    // Data
    about,
    projects,
    experiences,
    skills,
    stats,
    loading,
    
    // Methods
    fetchAllData,
    fetchAbout,
    fetchProjects,
    fetchExperiences,
    fetchSkills,
    fetchStats,
    getProject,
    submitContact
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
