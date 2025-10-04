import axios from 'axios'
import config from '../config'
import { retryApiCall, retryCriticalCall } from '../utils/retry'

// Create axios instance with environment-based configuration
const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle auth errors here, let retry logic handle network errors
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      // Don't redirect immediately, let the calling component handle it
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// Wrapper function to add retry logic to API calls
const withRetry = (apiCall, isCritical = false) => {
  return (...args) => {
    const retryFn = isCritical ? retryCriticalCall : retryApiCall
    return retryFn(() => apiCall(...args))
  }
}

// Auth API endpoints (critical operations)
export const authAPI = {
  login: withRetry((credentials) => api.post('/auth/login', credentials), true),
  signup: withRetry((userData) => api.post('/auth/signup', userData), true),
  getMe: withRetry(() => api.get('/auth/me'), true),
  checkAdmin: withRetry(() => api.get('/auth/check-admin'), true),
}

// Public API endpoints (only for contact form now)
export const publicAPI = {
  submitContact: withRetry((formData) => api.post('/public/contact', formData)),
}

// Admin API endpoints (only for contacts now)
export const adminAPI = {
  // Contacts endpoints - only backend functionality remaining
  getContacts: withRetry(() => api.get('/admin/contacts')),
  markContactRead: withRetry((id) => api.put(`/admin/contacts/${id}/read`)),
  replyContact: withRetry((id, reply) => api.put(`/admin/contacts/${id}/reply`, { reply })),
}

export default api
