import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MessageCircle,
  TrendingUp,
  Calendar,
  Clock,
  User,
  BarChart3,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { adminAPI } from '../../services/api'
import Loading from '../../components/UI/Loading'

const Analytics = () => {
  const { admin } = useAuth()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const contactsRes = await adminAPI.getContacts()
        const contactsData = contactsRes.data
        setContacts(contactsData)
        
        // Calculate analytics
        const now = new Date()
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const thisWeek = new Date(now.setDate(now.getDate() - now.getDay()))
        
        const thisMonthContacts = contactsData.filter(contact => 
          new Date(contact.createdAt) >= thisMonth
        )
        const lastMonthContacts = contactsData.filter(contact => {
          const contactDate = new Date(contact.createdAt)
          return contactDate >= lastMonth && contactDate < thisMonth
        })
        const thisWeekContacts = contactsData.filter(contact => 
          new Date(contact.createdAt) >= thisWeek
        )
        
        const unreadContacts = contactsData.filter(contact => !contact.isRead)
        const repliedContacts = contactsData.filter(contact => contact.isReplied)
        
        // Calculate response time (average days to reply)
        const repliedWithTime = repliedContacts.filter(contact => contact.repliedAt)
        const avgResponseTime = repliedWithTime.length > 0 
          ? repliedWithTime.reduce((acc, contact) => {
              const created = new Date(contact.createdAt)
              const replied = new Date(contact.repliedAt)
              return acc + (replied - created) / (1000 * 60 * 60 * 24)
            }, 0) / repliedWithTime.length
          : 0

        // Monthly trend
        const monthlyTrend = thisMonthContacts.length - lastMonthContacts.length
        const monthlyTrendPercent = lastMonthContacts.length > 0 
          ? ((monthlyTrend / lastMonthContacts.length) * 100).toFixed(1)
          : 0

        setAnalytics({
          total: contactsData.length,
          thisMonth: thisMonthContacts.length,
          lastMonth: lastMonthContacts.length,
          thisWeek: thisWeekContacts.length,
          unread: unreadContacts.length,
          replied: repliedContacts.length,
          avgResponseTime: avgResponseTime.toFixed(1),
          monthlyTrend,
          monthlyTrendPercent,
          replyRate: contactsData.length > 0 ? ((repliedContacts.length / contactsData.length) * 100).toFixed(1) : 0
        })
        
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Get recent activity (last 7 days)
  const getRecentActivity = () => {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentContacts = contacts.filter(contact => 
      new Date(contact.createdAt) >= sevenDaysAgo
    )
    
    // Group by day
    const dailyData = {}
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' })
      dailyData[dateStr] = 0
    }
    
    recentContacts.forEach(contact => {
      const date = new Date(contact.createdAt)
      const dateStr = date.toLocaleDateString('en-US', { weekday: 'short' })
      if (dailyData[dateStr] !== undefined) {
        dailyData[dateStr]++
      }
    })
    
    return Object.entries(dailyData)
  }

  const recentActivity = getRecentActivity()
  const maxActivity = Math.max(...recentActivity.map(([, count]) => count), 1)

  if (loading) {
    return <Loading />
  }

  const statCards = [
    {
      name: 'Total',
      value: analytics.total,
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'All messages'
    },
    {
      name: 'This Month',
      value: analytics.thisMonth,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: `${analytics.monthlyTrend >= 0 ? '+' : ''}${analytics.monthlyTrend} vs last`,
      trend: analytics.monthlyTrend,
      trendPercent: analytics.monthlyTrendPercent
    },
    {
      name: 'Unread',
      value: analytics.unread,
      icon: MessageCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Need response'
    },
    {
      name: 'Reply Rate',
      value: `${analytics.replyRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: `${analytics.replied} replied`
    },
    {
      name: 'Avg Response',
      value: `${analytics.avgResponseTime}d`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Days to reply'
    },
    {
      name: 'This Week',
      value: analytics.thisWeek,
      icon: Activity,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      description: 'Recent'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Analytics - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Contact Analytics
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Insights and statistics about your contact messages
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                <Activity className="w-4 h-4 mr-1" />
                Live Data
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="card p-3 sm:p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} mr-2 sm:mr-3 flex-shrink-0`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        {stat.name}
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  {stat.description && (
                    <div className="flex items-center justify-between">
                      {stat.trend !== undefined && (
                        <div className={`flex items-center ${
                          stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend >= 0 ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          )}
                          <span className="text-xs font-medium">
                            {Math.abs(stat.trendPercent)}%
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-500 truncate flex-1 text-right">
                        {stat.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  7-Day Activity
                </h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {recentActivity.map(([day, count]) => (
                  <div key={day} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                      {day}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(count / maxActivity) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-8 text-sm font-medium text-gray-900 dark:text-gray-100 text-right">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Message Status Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Message Status
                </h2>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Replied
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {analytics.replied}
                    </div>
                    <div className="text-xs text-gray-500">
                      {analytics.replyRate}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Unread
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {analytics.unread}
                    </div>
                    <div className="text-xs text-gray-500">
                      {analytics.total > 0 ? ((analytics.unread / analytics.total) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full mr-3" />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Read (No Reply)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {analytics.total - analytics.replied - analytics.unread}
                    </div>
                    <div className="text-xs text-gray-500">
                      {analytics.total > 0 ? (((analytics.total - analytics.replied - analytics.unread) / analytics.total) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Messages Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recent Messages Summary
            </h2>
            
            {contacts.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 hidden sm:table-cell">
                        Subject
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 hidden md:table-cell">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.slice(0, 5).map((contact) => (
                      <tr key={contact._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                            {contact.subject}
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <div className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                            {contact.subject}
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            contact.isReplied
                              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                              : contact.isRead
                              ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                          }`}>
                            {contact.isReplied ? 'Replied' : contact.isRead ? 'Read' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Analytics
