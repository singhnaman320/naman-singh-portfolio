import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MessageCircle,
  Eye, 
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
        
        // Fetch contact data only
        const contactsRes = await adminAPI.getContacts()

        setStats({
          contacts: contactsRes.data.length,
          unreadContacts: contactsRes.data.filter(contact => !contact.isRead).length
        })

        // Get recent contacts (last 2)
        setRecentContacts(contactsRes.data.slice(0, 2))
        
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
      name: 'Manage Messages',
      description: 'View and respond to contact messages',
      href: '/admin/contacts',
      icon: Mail,
      color: 'bg-red-500'
    },
    {
      name: 'Contact Analytics',
      description: 'View detailed message statistics and trends',
      href: '/admin/analytics',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      name: 'View Portfolio',
      description: 'Check how your portfolio looks to visitors',
      href: '/',
      icon: Eye,
      color: 'bg-blue-500',
      external: true
    }
  ]

  const statCards = [
    {
      name: 'Total Messages',
      value: stats.contacts || 0,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : null,
      description: 'Contact form submissions'
    },
    {
      name: 'Unread Messages',
      value: stats.unreadContacts || 0,
      icon: MessageCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Messages awaiting response'
    },
    {
      name: 'Portfolio Status',
      value: 'Live',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Frontend data active'
    },
    {
      name: 'Last Updated',
      value: new Date().toLocaleDateString(),
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Dashboard refresh'
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
                    {stat.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
                    )}
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
                  const ActionComponent = action.external ? 'a' : Link
                  const linkProps = action.external 
                    ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: action.href }
                  
                  return (
                    <ActionComponent
                      key={action.name}
                      {...linkProps}
                      className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
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
                      {action.external && (
                        <div className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <Eye className="w-4 h-4" />
                        </div>
                      )}
                    </ActionComponent>
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
                      className={`p-4 rounded-lg border relative ${
                        contact.isRead 
                          ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700' 
                          : 'border-primary-200 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                      }`}
                    >
                      {!contact.isRead && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</h4>
                          {!contact.isRead && (
                            <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{contact.subject}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
