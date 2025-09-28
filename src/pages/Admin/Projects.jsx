import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Plus, Edit, Trash2, ExternalLink, Github, Eye, X, Save, Image, Link as LinkIcon, Code, Target, User, Zap, TrendingUp } from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/UI/Loading'

const AdminProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [techStack, setTechStack] = useState([''])
  const [implementationDetails, setImplementationDetails] = useState([''])
  const [results, setResults] = useState([''])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getProjects()
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const projectData = {
        ...data,
        techStack: techStack.filter(tech => tech.trim() !== ''),
        implementationDetails: implementationDetails.filter(detail => detail.trim() !== ''),
        results: results.filter(result => result.trim() !== ''),
        featured: data.featured || false
      }

      console.log('Sending project data:', projectData)

      if (editingProject) {
        await adminAPI.updateProject(editingProject._id, projectData)
        toast.success('Project updated successfully!')
      } else {
        await adminAPI.createProject(projectData)
        toast.success('Project created successfully!')
      }

      await fetchProjects()
      handleCloseForm()
    } catch (error) {
      console.error('Error saving project:', error)
      console.error('Error response:', error.response?.data)
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(`${err.path}: ${err.msg}`)
        })
      } else {
        toast.error(error.response?.data?.message || 'Failed to save project')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    reset(project)
    setTechStack(project.techStack?.length > 0 ? project.techStack : [''])
    setImplementationDetails(project.implementationDetails?.length > 0 ? project.implementationDetails : [''])
    setResults(project.results?.length > 0 ? project.results : [''])
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await adminAPI.deleteProject(id)
        toast.success('Project deleted successfully!')
        await fetchProjects()
      } catch (error) {
        console.error('Error deleting project:', error)
        toast.error('Failed to delete project')
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProject(null)
    reset()
    setTechStack([''])
    setImplementationDetails([''])
    setResults([''])
  }

  const addArrayField = (array, setArray) => {
    setArray([...array, ''])
  }

  const removeArrayField = (array, setArray, index) => {
    setArray(array.filter((_, i) => i !== index))
  }

  const updateArrayField = (array, setArray, index, value) => {
    const newArray = [...array]
    newArray[index] = value
    setArray(newArray)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Manage Projects - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Projects</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your portfolio projects and case studies
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Project
          </button>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack?.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-12 text-center"
          >
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Projects Yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start building your portfolio by adding your first project.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </button>
          </motion.div>
        )}

        {/* Project Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={(e) => e.target === e.currentTarget && handleCloseForm()}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button
                    onClick={handleCloseForm}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-primary-600" />
                      Basic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          {...register('title', { required: 'Title is required' })}
                          className={`input ${errors.title ? 'border-red-500' : ''}`}
                          placeholder="e.g., Meeting Room Booking System"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Role *
                        </label>
                        <input
                          type="text"
                          {...register('role', { required: 'Role is required' })}
                          className={`input ${errors.role ? 'border-red-500' : ''}`}
                          placeholder="e.g., Full-Stack Developer"
                        />
                        {errors.role && (
                          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Short Description *
                      </label>
                      <input
                        type="text"
                        {...register('shortDescription', { required: 'Short description is required' })}
                        className={`input ${errors.shortDescription ? 'border-red-500' : ''}`}
                        placeholder="MERN stack app with real-time booking and conflict handling"
                      />
                      {errors.shortDescription && (
                        <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        rows={4}
                        {...register('problemStatement', { required: 'Problem statement is required' })}
                        className={`textarea ${errors.problemStatement ? 'border-red-500' : ''}`}
                        placeholder="What problem does this project solve? Why was it needed?"
                      />
                      {errors.problemStatement && (
                        <p className="mt-1 text-sm text-red-600">{errors.problemStatement.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      <Code className="w-5 h-5 mr-2 text-primary-600" />
                      Tech Stack
                    </h3>
                    
                    <div className="space-y-3">
                      {techStack.map((tech, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => updateArrayField(techStack, setTechStack, index, e.target.value)}
                            className="input flex-1"
                            placeholder="e.g., React, Node.js, MongoDB"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(techStack, setTechStack, index)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            disabled={techStack.length === 1}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField(techStack, setTechStack)}
                        className="btn-secondary flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Technology
                      </button>
                    </div>
                  </div>

                  {/* Implementation Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary-600" />
                      Implementation Details
                    </h3>
                    
                    <div className="space-y-3">
                      {implementationDetails.map((detail, index) => (
                        <div key={index} className="flex gap-3">
                          <textarea
                            rows={2}
                            value={detail}
                            onChange={(e) => updateArrayField(implementationDetails, setImplementationDetails, index, e.target.value)}
                            className="textarea flex-1"
                            placeholder="Key challenges and how you solved them (e.g., optimized queries, used Redis caching)"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(implementationDetails, setImplementationDetails, index)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            disabled={implementationDetails.length === 1}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField(implementationDetails, setImplementationDetails)}
                        className="btn-secondary flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Implementation Detail
                      </button>
                    </div>
                  </div>

                  {/* Results & Impact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                      Impact & Results
                    </h3>
                    
                    <div className="space-y-3">
                      {results.map((result, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={result}
                            onChange={(e) => updateArrayField(results, setResults, index, e.target.value)}
                            className="input flex-1"
                            placeholder="e.g., Reduced API response time by 40%, Increased user engagement by 25%"
                          />
                          <button
                            type="button"
                            onClick={() => removeArrayField(results, setResults, index)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            disabled={results.length === 1}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField(results, setResults)}
                        className="btn-secondary flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Result
                      </button>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      <LinkIcon className="w-5 h-5 mr-2 text-primary-600" />
                      Project Links
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          GitHub Repository
                        </label>
                        <input
                          type="url"
                          {...register('githubUrl')}
                          className="input"
                          placeholder="https://github.com/username/project"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Live Demo
                        </label>
                        <input
                          type="url"
                          {...register('liveUrl')}
                          className="input"
                          placeholder="https://project-demo.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Project Settings
                    </h3>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('featured')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Featured Project (show on homepage)
                      </label>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={handleCloseForm}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          {editingProject ? 'Update Project' : 'Create Project'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default AdminProjects
