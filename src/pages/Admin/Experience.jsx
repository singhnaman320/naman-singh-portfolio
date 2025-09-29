import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin, X, Save } from 'lucide-react'
import { useData } from '../../contexts/DataContext'
import { adminAPI } from '../../services/api'
import { getCompanyLogo } from '../../utils/companyLogos'
import toast from 'react-hot-toast'

const AdminExperience = () => {
  const { experiences, fetchExperiences } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrentRole: false,
    location: '',
    description: '',
    technologies: []
  })
  const [techInput, setTechInput] = useState('')

  // Reset form
  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      location: '',
      description: '',
      technologies: []
    })
    setTechInput('')
    setEditingExperience(null)
  }

  // Open modal for adding new experience
  const handleAddNew = () => {
    resetForm()
    setIsModalOpen(true)
  }

  // Open modal for editing experience
  const handleEdit = (experience) => {
    setEditingExperience(experience)
    setFormData({
      company: experience.company || '',
      position: experience.position || '',
      startDate: experience.startDate || '',
      endDate: experience.endDate === 'Present' ? '' : (experience.endDate || ''),
      isCurrentRole: experience.endDate === 'Present',
      location: experience.location || '',
      description: experience.description || '',
      technologies: experience.technologies || []
    })
    setIsModalOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }


  // Add technology to list
  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  // Remove technology from list
  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Client-side validation
    if (!formData.company?.trim()) {
      toast.error('Company name is required')
      setIsLoading(false)
      return
    }
    
    if (!formData.position?.trim()) {
      toast.error('Position is required')
      setIsLoading(false)
      return
    }
    
    if (!formData.startDate?.trim()) {
      toast.error('Start date is required')
      setIsLoading(false)
      return
    }

    const submitData = {
      company: formData.company.trim(),
      position: formData.position.trim(),
      startDate: formData.startDate.trim(), // Keep original format for display
      endDate: formData.isCurrentRole ? 'Present' : (formData.endDate || '').trim(),
      location: (formData.location || '').trim(),
      description: (formData.description || '').trim(),
      technologies: JSON.stringify(formData.technologies || []),
      achievements: JSON.stringify([]),
      order: 0
    }

    console.log('Submitting data:', submitData)

    try {
      if (editingExperience) {
        await adminAPI.updateExperience(editingExperience._id, submitData)
        toast.success('Experience updated successfully!')
      } else {
        await adminAPI.createExperience(submitData)
        toast.success('Experience added successfully!')
      }

      await fetchExperiences()
      setIsModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving experience:', error)
      console.error('Error response:', error.response?.data)
      
      let errorMessage = 'Failed to save experience'
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        console.error('Validation errors:', error.response.data.errors)
        errorMessage = error.response.data.errors.map(err => `${err.param}: ${err.msg}`).join(', ')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return

    try {
      await adminAPI.deleteExperience(id)
      toast.success('Experience deleted successfully!')
      await fetchExperiences()
    } catch (error) {
      console.error('Error deleting experience:', error)
      toast.error('Failed to delete experience')
    }
  }

  return (
    <>
      <Helmet>
        <title>Manage Experience - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Experience</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your work experience and professional history
            </p>
          </div>
          <button onClick={handleAddNew} className="btn-primary w-full sm:w-auto flex-shrink-0 flex items-center justify-center whitespace-nowrap">
            <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>Add Experience</span>
          </button>
        </div>

        {/* Experience List */}
        <div className="grid gap-6">
          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8 text-center"
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Experience Added</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Start building your professional timeline by adding your work experience.
              </p>
              <button onClick={handleAddNew} className="btn-primary flex items-center justify-center whitespace-nowrap">
                <Plus className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Add Your First Experience</span>
              </button>
            </motion.div>
          ) : (
            experiences
              .sort((a, b) => {
                // Helper function to extract year from date string
                const extractYear = (dateStr) => {
                  if (!dateStr || dateStr === 'Present') return new Date().getFullYear()
                  
                  // Extract 4-digit year from string
                  const yearMatch = dateStr.match(/(\d{4})/)
                  return yearMatch ? parseInt(yearMatch[1]) : 0
                }
                
                // Helper function to extract month number (for same year sorting)
                const extractMonth = (dateStr) => {
                  if (!dateStr || dateStr === 'Present') return 12
                  
                  const monthMap = {
                    'jan': 1, 'january': 1, 'feb': 2, 'february': 2,
                    'mar': 3, 'march': 3, 'apr': 4, 'april': 4,
                    'may': 5, 'jun': 6, 'june': 6, 'jul': 7, 'july': 7,
                    'aug': 8, 'august': 8, 'sep': 9, 'september': 9,
                    'oct': 10, 'october': 10, 'nov': 11, 'november': 11,
                    'dec': 12, 'december': 12
                  }
                  
                  const lowerDate = dateStr.toLowerCase()
                  for (const [month, num] of Object.entries(monthMap)) {
                    if (lowerDate.includes(month)) return num
                  }
                  return 1 // Default to January if no month found
                }
                
                // Sort by end date first (most recent experience on top)
                const aEndYear = extractYear(a.endDate)
                const bEndYear = extractYear(b.endDate)
                
                if (aEndYear !== bEndYear) {
                  return bEndYear - aEndYear // Most recent end year first
                }
                
                // If same end year, sort by end month
                const aEndMonth = extractMonth(a.endDate)
                const bEndMonth = extractMonth(b.endDate)
                
                if (aEndMonth !== bEndMonth) {
                  return bEndMonth - aEndMonth
                }
                
                // If same end date, sort by start date (most recent start first)
                const aStartYear = extractYear(a.startDate)
                const bStartYear = extractYear(b.startDate)
                
                if (aStartYear !== bStartYear) {
                  return bStartYear - aStartYear
                }
                
                // If same start year, sort by start month
                const aStartMonth = extractMonth(a.startDate)
                const bStartMonth = extractMonth(b.startDate)
                
                return bStartMonth - aStartMonth
              })
              .map((experience, index) => (
                <motion.div
                  key={experience._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 hover:shadow-large transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Experience Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {experience.company}
                            </h3>
                            <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                              {experience.position}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {experience.startDate} - {experience.endDate || 'Present'}
                            </span>
                          </div>
                          {experience.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{experience.location}</span>
                            </div>
                          )}
                        </div>

                        {experience.description && (
                          <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                            {experience.description}
                          </p>
                        )}

                        {experience.technologies && experience.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(experience)}
                        className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Edit experience"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(experience._id)}
                        className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Delete experience"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>

        {/* Modal for Add/Edit Experience */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="e.g., Google Inc."
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position/Role *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="text"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="e.g., Jan 2023, Summer 2022, Q1 2024"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="text"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="e.g., Dec 2023, Present, Ongoing"
                      disabled={formData.isCurrentRole}
                    />
                    <div className="mt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isCurrentRole"
                          checked={formData.isCurrentRole}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          This is my current role (sets end date to "Present")
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="e.g., Remote, New York, USA"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="textarea"
                    rows={3}
                    placeholder="Brief description of your role and responsibilities (1-2 lines recommended)"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies Used
                  </label>
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      className="input flex-1"
                      placeholder="e.g., React, TypeScript, Node.js"
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
                    >
                      <span>Add</span>
                    </button>
                  </div>
                  {formData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 flex-shrink-0" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{editingExperience ? 'Update Experience' : 'Add Experience'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminExperience
