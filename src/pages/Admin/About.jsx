import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Save, Plus, X } from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/UI/Loading'

const AdminAbout = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [highlights, setHighlights] = useState([''])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true)
        const response = await adminAPI.getAbout()
        const data = response.data
        
        if (data) {
          reset({
            name: data.name || '',
            title: data.title || '',
            tagline: data.tagline || '',
            bio: data.bio || '',
            'socialLinks.github': data.socialLinks?.github || '',
            'socialLinks.linkedin': data.socialLinks?.linkedin || '',
            'socialLinks.twitter': data.socialLinks?.twitter || '',
            'socialLinks.leetcode': data.socialLinks?.leetcode || '',
            'socialLinks.codeforces': data.socialLinks?.codeforces || ''
          })
          
          setHighlights(data.highlights?.length > 0 ? data.highlights : [''])
        }
      } catch (error) {
        console.error('Error fetching about data:', error)
        toast.error('Failed to load about information')
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      // Basic fields
      const aboutData = {
        name: data.name,
        title: data.title,
        tagline: data.tagline,
        bio: data.bio,
        socialLinks: JSON.stringify({
          github: data['socialLinks.github'] || '',
          linkedin: data['socialLinks.linkedin'] || '',
          twitter: data['socialLinks.twitter'] || '',
          leetcode: data['socialLinks.leetcode'] || '',
          codeforces: data['socialLinks.codeforces'] || ''
        }),
        highlights: JSON.stringify(highlights.filter(h => h.trim() !== ''))
      }

      await adminAPI.updateAbout(aboutData)
      toast.success('About information updated successfully!')
      
    } catch (error) {
      console.error('Error updating about:', error)
      toast.error('Failed to update about information')
    } finally {
      setSaving(false)
    }
  }


  const addHighlight = () => {
    setHighlights([...highlights, ''])
  }

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  const updateHighlight = (index, value) => {
    const newHighlights = [...highlights]
    newHighlights[index] = value
    setHighlights(newHighlights)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Manage Home Page - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Home Page Content</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Update your personal information, bio, and social links that appear on the home page
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className={`input ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="e.g., Full-Stack Developer"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                  )}
                </div>
              </div>

              {/* Tagline */}
              <div className="mt-6">
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

              {/* Bio */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio *
                </label>
                <textarea
                  rows={6}
                  {...register('bio', { required: 'Bio is required' })}
                  className={`textarea ${errors.bio ? 'border-red-500' : ''}`}
                  placeholder="Tell your story..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>
            </div>

            {/* Files */}
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Files</h2>
              
              {/* File Upload Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Static Files Setup
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Profile image: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">client/public/images/default-profile.jpg</code>
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                  Resume: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">client/public/documents/naman-singh-resume.pdf</code>
                </p>
                <p className="text-sm text-blue-500 dark:text-blue-400 mt-2 italic">
                  Replace these files with your actual profile image and resume.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Social Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub
                  </label>
                  <input
                    type="url"
                    {...register('socialLinks.github')}
                    className="input"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    {...register('socialLinks.linkedin')}
                    className="input"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    {...register('socialLinks.twitter')}
                    className="input"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LeetCode
                  </label>
                  <input
                    type="url"
                    {...register('socialLinks.leetcode')}
                    className="input"
                    placeholder="https://leetcode.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Key Highlights</h2>
              
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="input flex-1"
                      placeholder="Enter a key highlight"
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addHighlight}
                  className="btn-outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
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

export default AdminAbout
