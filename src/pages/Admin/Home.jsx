import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Save } from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/UI/Loading'
import { useData } from '../../contexts/DataContext'

const AdminHome = () => {
  const { refreshHome } = useData()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const fetchHome = async () => {
      try {
        setLoading(true)
        const response = await adminAPI.getHome()
        const data = response.data
        
        if (data) {
          reset({
            name: data.name || '',
            title: data.title || '',
            tagline: data.tagline || '',
            bio: data.bio || ''
          })
        }
      } catch (error) {
        console.error('Error fetching home data:', error)
        toast.error('Failed to load home information')
      } finally {
        setLoading(false)
      }
    }

    fetchHome()
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      // Core fields only
      const homeData = {
        name: data.name,
        title: data.title,
        tagline: data.tagline,
        bio: data.bio
      }

      console.log('Sending home data:', homeData)
      await adminAPI.updateHome(homeData)
      toast.success('Home information updated successfully!')
      
      // Refresh the frontend data
      await refreshHome()
      
    } catch (error) {
      console.error('Error updating home:', error)
      console.error('Error response:', error.response?.data)
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors)
        // Show specific validation errors
        error.response.data.errors.forEach(err => {
          toast.error(`${err.path}: ${err.msg}`)
        })
      } else {
        toast.error(error.response?.data?.message || 'Failed to update home information')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Home Page - Admin Dashboard</title>
        <meta name="description" content="Manage home page information" />
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Home Page</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your home page information and content</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Home Page Content</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Professional Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Professional title is required' })}
                    className={`input ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="e.g., Full-Stack Developer"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    {...register('tagline', { required: 'Tagline is required' })}
                    className={`input ${errors.tagline ? 'border-red-500' : ''}`}
                    placeholder="A brief tagline about yourself"
                  />
                  {errors.tagline && (
                    <p className="mt-1 text-sm text-red-600">{errors.tagline.message}</p>
                  )}
                </div>

                {/* My Story (Bio) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    My Story *
                  </label>
                  <textarea
                    rows={8}
                    {...register('bio', { required: 'Your story is required' })}
                    className={`textarea ${errors.bio ? 'border-red-500' : ''}`}
                    placeholder="Tell your story, journey, and what drives you as a developer..."
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    This will appear in the "My Story" section on your home page.
                  </p>
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  )
}

export default AdminHome
