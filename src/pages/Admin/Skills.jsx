import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Code, X, Save, AlertCircle, ChevronDown, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'

const AdminSkills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 'Basic',
    level: 50,
    yearsOfExperience: 1
  })
  const [errors, setErrors] = useState({})
  const [dropdownStates, setDropdownStates] = useState({
    category: false,
    proficiency: false
  })

  const categories = [
    { value: 'Frontend', label: 'Frontend', icon: '⚛️', color: 'bg-blue-100 text-blue-800' },
    { value: 'Backend', label: 'Backend', icon: '🔧', color: 'bg-green-100 text-green-800' },
    { value: 'Database', label: 'Database', icon: '🗄️', color: 'bg-purple-100 text-purple-800' },
    { value: 'DevOps/Cloud', label: 'DevOps/Cloud', icon: '☁️', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'Tools', label: 'Tools', icon: '🛠️', color: 'bg-orange-100 text-orange-800' },
    { value: 'Languages', label: 'Languages', icon: '💻', color: 'bg-red-100 text-red-800' },
    { value: 'Other', label: 'Other', icon: '📦', color: 'bg-gray-100 text-gray-800' }
  ]
  
  const proficiencyLevels = [
    { value: 'Basic', label: 'Basic', icon: '🌱', color: 'bg-yellow-100 text-yellow-800', description: 'Learning the fundamentals' },
    { value: 'Intermediate', label: 'Intermediate', icon: '🌿', color: 'bg-blue-100 text-blue-800', description: 'Comfortable with core concepts' },
    { value: 'Advanced', label: 'Advanced', icon: '🌳', color: 'bg-green-100 text-green-800', description: 'Deep understanding and experience' },
    { value: 'Expert', label: 'Expert', icon: '🏆', color: 'bg-purple-100 text-purple-800', description: 'Mastery and teaching ability' }
  ]

  // Custom Dropdown Component
  const CustomDropdown = ({ 
    label, 
    value, 
    options, 
    onChange, 
    isOpen, 
    onToggle, 
    error, 
    placeholder = "Select an option",
    required = false 
  }) => {
    const selectedOption = options.find(option => option.value === value)
    
    return (
      <div className="relative dropdown-container">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && '*'}
        </label>
        
        <div className="relative custom-dropdown">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Dropdown button clicked:', label, 'isOpen:', isOpen) // Debug log
              onToggle()
            }}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 flex items-center justify-between ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}`}
          >
            <div className="flex items-center">
              {selectedOption ? (
                <>
                  <span className="text-lg mr-2">{selectedOption.icon}</span>
                  <span className="font-medium">{selectedOption.label}</span>
                  {selectedOption.description && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      - {selectedOption.description}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              >
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onChange(option.value)
                      onToggle()
                    }}
                    className={`w-full px-3 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center justify-between group ${
                      value === option.value ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{option.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {value === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary-600 dark:text-primary-400"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.p>
        )}
      </div>
    )
  }

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setSkills(data)
      } else {
        toast.error('Failed to fetch skills')
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
      toast.error('Error fetching skills')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close dropdowns if clicking outside the form modal
      if (!event.target.closest('.dropdown-container') && !event.target.closest('.custom-dropdown')) {
        closeAllDropdowns()
      }
    }

    if (showForm && (dropdownStates.category || dropdownStates.proficiency)) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showForm, dropdownStates.category, dropdownStates.proficiency])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' || name === 'yearsOfExperience' ? parseInt(value) : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle dropdown changes
  const handleDropdownChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user selects
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Toggle dropdown state
  const toggleDropdown = (field) => {
    setDropdownStates(prev => {
      // Close other dropdowns when opening a new one
      const newState = {
        category: false,
        proficiency: false,
        [field]: !prev[field]
      }
      console.log('Toggling dropdown:', field, 'New state:', newState) // Debug log
      return newState
    })
  }

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setDropdownStates({
      category: false,
      proficiency: false
    })
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.proficiency) {
      newErrors.proficiency = 'Proficiency level is required'
    }
    
    if (formData.level < 0 || formData.level > 100) {
      newErrors.level = 'Level must be between 0 and 100'
    }
    
    if (formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Years of experience must be positive'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const url = editingSkill 
        ? `/api/admin/skills/${editingSkill._id}`
        : '/api/admin/skills'
      
      const method = editingSkill ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingSkill ? 'Skill updated successfully!' : 'Skill created successfully!')
        fetchSkills()
        resetForm()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Failed to save skill')
      }
    } catch (error) {
      console.error('Error saving skill:', error)
      toast.error('Error saving skill')
    }
  }

  // Handle delete
  const handleDelete = async (skillId) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        toast.success('Skill deleted successfully!')
        fetchSkills()
      } else {
        toast.error('Failed to delete skill')
      }
    } catch (error) {
      console.error('Error deleting skill:', error)
      toast.error('Error deleting skill')
    }
  }

  // Handle edit
  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      level: skill.level,
      yearsOfExperience: skill.yearsOfExperience
    })
    setShowForm(true)
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 'Basic',
      level: 50,
      yearsOfExperience: 1
    })
    setEditingSkill(null)
    setShowForm(false)
    setErrors({})
    closeAllDropdowns()
  }

  // Get proficiency color
  const getProficiencyColor = (proficiency) => {
    const colors = {
      'Basic': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
      'Advanced': 'bg-green-100 text-green-800 border-green-200',
      'Expert': 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[proficiency] || colors['Basic']
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Manage Skills - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Skills</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your technical skills and expertise
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Skill
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {skill.name}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Category:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{skill.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Proficiency:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getProficiencyColor(skill.proficiency)}`}>
                      {skill.proficiency}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Level</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Experience:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {skills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8 text-center"
          >
            <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Skills Yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start building your skills portfolio by adding your first skill.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Skill
            </button>
          </motion.div>
        )}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              closeAllDropdowns()
              resetForm()
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Skill Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skill Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., React.js"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <CustomDropdown
                    label="Category"
                    value={formData.category}
                    options={categories}
                    onChange={(value) => handleDropdownChange('category', value)}
                    isOpen={dropdownStates.category}
                    onToggle={() => {
                      console.log('Category toggle called, current state:', dropdownStates.category)
                      toggleDropdown('category')
                    }}
                    error={errors.category}
                    placeholder="Select a category"
                    required={true}
                  />

                  {/* Proficiency */}
                  <CustomDropdown
                    label="Proficiency Level"
                    value={formData.proficiency}
                    options={proficiencyLevels}
                    onChange={(value) => handleDropdownChange('proficiency', value)}
                    isOpen={dropdownStates.proficiency}
                    onToggle={() => toggleDropdown('proficiency')}
                    error={errors.proficiency}
                    placeholder="Select proficiency level"
                    required={true}
                  />

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skill Level: {formData.level}%
                    </label>
                    <input
                      type="range"
                      name="level"
                      min="0"
                      max="100"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    {errors.level && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.level}
                      </p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      min="0"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 3"
                    />
                    {errors.yearsOfExperience && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.yearsOfExperience}
                      </p>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingSkill ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AdminSkills
