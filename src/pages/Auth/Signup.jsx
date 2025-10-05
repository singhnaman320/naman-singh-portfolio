import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signup, isAuthenticated, adminExists } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const result = await signup({
        name: data.name,
        email: data.email,
        password: data.password
      })
      if (result.success) {
        navigate('/admin')
      }
    } catch (error) {
      console.error('Signup error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // If admin already exists, show message
  if (adminExists) {
    return (
      <>
        <Helmet>
          <title>Admin Signup - Naman Kumar Singh</title>
          <meta name="description" content="Admin signup for portfolio management" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full text-center"
          >
            <div className="card p-8">
              <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Admin Already Exists
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                An admin account has already been created for this portfolio. 
                Only one admin account is allowed for security purposes.
              </p>
              <div className="space-y-4">
                <Link
                  to="/auth/login"
                  className="btn-primary w-full"
                >
                  Go to Login
                </Link>
                <Link
                  to="/"
                  className="btn-outline w-full"
                >
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Admin Signup - Naman Kumar Singh</title>
        <meta name="description" content="Create admin account for portfolio management" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Portfolio
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Create Admin Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your admin account to manage portfolio content
            </p>
          </div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  className={`input ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`input ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className={`input pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className={`input pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Admin Account
                    <UserPlus className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/auth/login"
                  className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Important</span>
              </div>
              <p className="text-xs text-yellow-700">
                Only one admin account can be created for security purposes. 
                Make sure to remember your credentials as they cannot be recovered easily.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default Signup
