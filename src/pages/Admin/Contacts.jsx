import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Mail, Eye, Reply, Trash2 } from 'lucide-react'

const AdminContacts = () => {
  return (
    <>
      <Helmet>
        <title>Manage Contacts - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Messages</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and respond to messages from your portfolio visitors
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8 text-center"
        >
          <div className="text-6xl mb-4">📧</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Contact management interface is under development. 
            You can view contacts through the API for now.
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default AdminContacts
