import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Users, 
  FolderOpen, 
  Briefcase, 
  Code, 
  Mail, 
  FileText, 
  Eye, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { adminAPI } from '../../services/api'
import Loading from '../../components/UI/Loading'

const Dashboard = () => {
  const { admin } = useAuth()
  const [stats, setStats] = useState({})
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch basic stats
        const [projectsRes, experiencesRes, skillsRes, contactsRes] = await Promise.all([
          adminAPI.getProjects(),
          adminAPI.getExperiences(),
          adminAPI.getSkills(),
          adminAPI.getContacts()
        ])

        setStats({
          projects: projectsRes.data.length,
          experiences: experiencesRes.data.length,
          skills: skillsRes.data.length,
          contacts: contactsRes.data.length,
          unreadContacts: contactsRes.data.filter(contact => !contact.isRead).length
        })

        // Get recent contacts (last 5)
        setRecentContacts(contactsRes.data.slice(0, 5))
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const quickActions = [
    {
      name: 'Manage Home',
      description: 'Update your personal information and home page content',
      href: '/admin/home',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Add Project',
      description: 'Showcase a new project in your portfolio',
      href: '/admin/projects',
      icon: FolderOpen,
      color: 'bg-green-500'
    },
    {
      name: 'Update Experience',
      description: 'Add or edit your work experience',
      href: '/admin/experience',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      name: 'Manage Skills',
      description: 'Update your technical skills and expertise',
      href: '/admin/skills',
      icon: Code,
      color: 'bg-orange-500'
    }
  ]

  const statCards = [
    {
      name: 'Total Projects',
      value: stats.projects || 0,
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Work Experience',
      value: stats.experiences || 0,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Skills',
      value: stats.skills || 0,
      icon: Code,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Messages',
      value: stats.contacts || 0,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : null
    }
  ]

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {admin?.name || 'Admin'}! 👋
            </h1>
            <p className="text-primary-100">
              Here's what's happening with your portfolio today.
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="card p-4 relative hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                  </div>
                  {stat.badge && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {stat.badge}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.name}
                      to={action.href}
                      className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
                    >
                      <div className={`p-2 rounded-lg ${action.color} text-white mr-4`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-700 dark:group-hover:text-primary-400">
                          {action.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Recent Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Messages</h2>
                <Link
                  to="/admin/contacts"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              {recentContacts.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className={`p-4 rounded-lg border ${
                        contact.isRead 
                          ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700' 
                          : 'border-primary-200 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{contact.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {contact.message}
                      </p>
                      {!contact.isRead && (
                        <span className="inline-block mt-2 px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Portfolio Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card p-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Portfolio Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Portfolio Visibility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your portfolio is live and accessible to visitors
                </p>
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Portfolio
                  <Eye className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Content Status</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stats.projects > 0 ? 'Portfolio content is ready' : 'Add content to get started'}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Last Updated</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </>
  )
}

export default Dashboard
