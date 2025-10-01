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

// Public API endpoints (critical for initial load)
export const publicAPI = {
  getHome: withRetry(() => api.get('/public/home'), true),
  getProjects: withRetry((featured = false) => api.get(`/public/projects${featured ? '?featured=true' : ''}`), true),
  getProject: withRetry((id) => api.get(`/public/projects/${id}`)),
  getExperiences: withRetry(() => api.get('/public/experiences'), true),
  getSkills: withRetry(() => api.get('/public/skills'), true),
  getStats: withRetry(() => api.get('/public/stats'), true),
  submitContact: withRetry((formData) => api.post('/public/contact', formData)),
}

// Admin API endpoints
export const adminAPI = {
  // Home page endpoints
  getHome: withRetry(() => api.get('/admin/home')),
  updateHome: withRetry((homeData) => api.post('/admin/home', homeData)),

  // Projects endpoints
  getProjects: withRetry(() => api.get('/admin/projects')),
  createProject: withRetry((projectData) => api.post('/admin/projects', projectData)),
  updateProject: withRetry((id, projectData) => api.put(`/admin/projects/${id}`, projectData)),
  deleteProject: withRetry((id) => api.delete(`/admin/projects/${id}`)),

  // Experience endpoints
  getExperiences: withRetry(() => api.get('/admin/experiences')),
  createExperience: withRetry((data) => api.post('/admin/experiences', data)),
  updateExperience: withRetry((id, data) => api.put(`/admin/experiences/${id}`, data)),
  deleteExperience: withRetry((id) => api.delete(`/admin/experiences/${id}`)),

  // Skills endpoints
  getSkills: withRetry(() => api.get('/admin/skills')),
  createSkill: withRetry((skillData) => api.post('/admin/skills', skillData)),
  updateSkill: withRetry((id, skillData) => api.put(`/admin/skills/${id}`, skillData)),
  deleteSkill: withRetry((id) => api.delete(`/admin/skills/${id}`)),

  // Contacts endpoints
  getContacts: withRetry(() => api.get('/admin/contacts')),
  markContactRead: withRetry((id) => api.put(`/admin/contacts/${id}/read`)),
  replyContact: withRetry((id, reply) => api.put(`/admin/contacts/${id}/reply`, { reply })),

}

export default api
