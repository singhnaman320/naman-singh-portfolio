import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Naman Kumar Singh</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full text-center"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-9xl font-bold text-primary-200 mb-4">404</div>
            <div className="text-4xl mb-4">🔍</div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Oops! The page you're looking for doesn't exist. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/"
                className="btn-primary w-full group"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn-outline w-full group"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Or try one of these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Projects', path: '/projects' },
                  { name: 'Experience', path: '/experience' },
                  { name: 'Skills', path: '/skills' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-md transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound
