import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adminExists, setAdminExists] = useState(false)

  // Check if admin exists
  const checkAdminExists = async () => {
    try {
      const response = await authAPI.checkAdmin()
      setAdminExists(response.data.adminExists)
    } catch (error) {
      // Silently handle error, assume no admin exists
      console.warn('Failed to check admin status, assuming no admin exists')
      setAdminExists(false)
    }
  }

  // Load admin from localStorage and verify token
  const loadAdmin = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await authAPI.getMe()
      setAdmin(response.data.admin)
    } catch (error) {
      // Silently handle error, clear invalid token
      console.warn('Failed to verify admin token, clearing session')
      localStorage.removeItem('adminToken')
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      const { token, admin: adminData } = response.data
      
      localStorage.setItem('adminToken', token)
      setAdmin(adminData)
      toast.success('Login successful!')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData)
      const { token, admin: adminData } = response.data
      
      localStorage.setItem('adminToken', token)
      setAdmin(adminData)
      setAdminExists(true)
      toast.success('Account created successfully!')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      toast.error(message)
      return { success: false, message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('adminToken')
    setAdmin(null)
    toast.success('Logged out successfully!')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!admin && !!localStorage.getItem('adminToken')
  }

  useEffect(() => {
    checkAdminExists()
    loadAdmin()
  }, [])

  const value = {
    admin,
    loading,
    adminExists,
    login,
    signup,
    logout,
    isAuthenticated,
    checkAdminExists
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
