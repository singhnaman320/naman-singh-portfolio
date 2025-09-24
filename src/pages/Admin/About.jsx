import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Save, Upload, Plus, X } from 'lucide-react'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'
import Loading from '../../components/UI/Loading'

const AdminAbout = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [highlights, setHighlights] = useState([''])
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)

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
          setProfileImagePreview(data.profileImage)
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
      const formData = new FormData()
      
      // Basic fields
      formData.append('name', data.name)
      formData.append('title', data.title)
      formData.append('tagline', data.tagline)
      formData.append('bio', data.bio)
      
      // Social links
      const socialLinks = {
        github: data['socialLinks.github'] || '',
        linkedin: data['socialLinks.linkedin'] || '',
        twitter: data['socialLinks.twitter'] || '',
        leetcode: data['socialLinks.leetcode'] || '',
        codeforces: data['socialLinks.codeforces'] || ''
      }
      formData.append('socialLinks', JSON.stringify(socialLinks))
      
      // Highlights (filter out empty ones)
      const validHighlights = highlights.filter(h => h.trim() !== '')
      formData.append('highlights', JSON.stringify(validHighlights))
      
      // Files
      if (data.profileImage?.[0]) {
        formData.append('profileImage', data.profileImage[0])
      }
      if (data.resume?.[0]) {
        formData.append('resume', data.resume[0])
      }

      await adminAPI.updateAbout(formData)
      toast.success('About information updated successfully!')
      
    } catch (error) {
      console.error('Error updating about:', error)
      toast.error('Failed to update about information')
    } finally {
      setSaving(false)
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Image
                  </label>
                  {profileImagePreview && (
                    <div className="mb-4">
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    {...register('profileImage')}
                    onChange={handleProfileImageChange}
                    className="input"
                  />
                </div>

                {/* Resume */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume (PDF)
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    {...register('resume')}
                    className="input"
                  />
                </div>
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
