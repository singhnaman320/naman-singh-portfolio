import { createContext, useContext, useState } from 'react'
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
  // Only keep loading state for contact form
  const [loading, setLoading] = useState(false)

  // Contact form submission
  const submitContact = async (formData) => {
    setLoading(true)
    try {
      const response = await publicAPI.submitContact(formData)
      return { success: true, message: response.data.message }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send message'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    // Only provide what's needed for Contact page
    loading,
    submitContact
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
