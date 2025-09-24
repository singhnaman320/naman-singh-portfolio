import axios from 'axios'
import config from '../config'

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
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getMe: () => api.get('/auth/me'),
  checkAdmin: () => api.get('/auth/check-admin'),
}

// Public API endpoints
export const publicAPI = {
  getAbout: () => api.get('/public/about'),
  getProjects: (featured = false) => api.get(`/public/projects${featured ? '?featured=true' : ''}`),
  getProject: (id) => api.get(`/public/projects/${id}`),
  getExperiences: () => api.get('/public/experiences'),
  getSkills: () => api.get('/public/skills'),
  getStats: () => api.get('/public/stats'),
  submitContact: (formData) => api.post('/public/contact', formData),
}

// Admin API endpoints
export const adminAPI = {
  // Home page endpoints
  getAbout: () => api.get('/admin/home'),
  updateAbout: (formData) => api.post('/admin/home', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Projects endpoints
  getProjects: () => api.get('/admin/projects'),
  createProject: (formData) => api.post('/admin/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateProject: (id, formData) => api.put(`/admin/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProject: (id) => api.delete(`/admin/projects/${id}`),

  // Experience endpoints
  getExperiences: () => api.get('/admin/experiences'),
  createExperience: (formData) => api.post('/admin/experiences', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateExperience: (id, formData) => api.put(`/admin/experiences/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteExperience: (id) => api.delete(`/admin/experiences/${id}`),

  // Skills endpoints
  getSkills: () => api.get('/admin/skills'),
  createSkill: (skillData) => api.post('/admin/skills', skillData),
  updateSkill: (id, skillData) => api.put(`/admin/skills/${id}`, skillData),
  deleteSkill: (id) => api.delete(`/admin/skills/${id}`),

  // Contacts endpoints
  getContacts: () => api.get('/admin/contacts'),
  markContactRead: (id) => api.put(`/admin/contacts/${id}/read`),
  replyContact: (id, reply) => api.put(`/admin/contacts/${id}/reply`, { reply }),

}

export default api
