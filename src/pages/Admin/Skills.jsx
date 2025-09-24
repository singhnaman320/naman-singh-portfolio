import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Code } from 'lucide-react'

const AdminSkills = () => {
  return (
    <>
      <Helmet>
        <title>Manage Skills - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Skills</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your technical skills and expertise
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Skill
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-8 text-center"
        >
          <div className="text-6xl mb-4">🛠️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Skills management interface is under development. 
            You can add skills through the API for now.
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default AdminSkills
