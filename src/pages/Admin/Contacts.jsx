import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Eye, Reply, Trash2, X, Calendar, User, MessageSquare, ExternalLink } from 'lucide-react'
import { adminAPI } from '../../services/api'
import Loading from '../../components/UI/Loading'
import toast from 'react-hot-toast'

const AdminContacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getContacts()
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      toast.error('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleContactClick = async (contact) => {
    setSelectedContact(contact)
    setIsModalOpen(true)
    
    // Mark as read if not already read
    if (!contact.isRead) {
      try {
        await adminAPI.markContactRead(contact._id)
        setContacts(prev => prev.map(c => 
          c._id === contact._id ? { ...c, isRead: true } : c
        ))
      } catch (error) {
        console.error('Error marking contact as read:', error)
      }
    }
  }

  const handleReply = () => {
    if (!selectedContact) return
    
    const subject = `Re: ${selectedContact.subject}`
    const body = `\n\n--- Original Message ---\nFrom: ${selectedContact.name}\nEmail: ${selectedContact.email}\nSubject: ${selectedContact.subject}\nDate: ${new Date(selectedContact.createdAt).toLocaleString()}\n\n${selectedContact.message}`
    
    const mailtoUrl = `mailto:${selectedContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl, '_blank')
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContact(null)
  }

  const unreadCount = contacts.filter(contact => !contact.isRead).length

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Manage Contacts - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Messages</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              View and respond to messages from your portfolio visitors
            </p>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-600 dark:text-red-400 font-semibold">
                {unreadCount} unread
              </span>
            </div>
          )}
        </div>

        {contacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card p-8 text-center"
          >
            <Mail className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Messages Yet</h3>
            <p className="text-gray-600 dark:text-gray-300">
              When visitors send messages through your contact form, they'll appear here.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={() => handleContactClick(contact)}
                className={`card p-6 cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                  contact.isRead 
                    ? 'border-gray-200 dark:border-gray-600' 
                    : 'border-primary-200 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                }`}
              >
                {!contact.isRead && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {contact.name}
                      </h3>
                      {!contact.isRead && (
                        <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                      {contact.isReplied && (
                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                          Replied
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{contact.email}</p>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                      {contact.subject}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Message Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedContact && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Message Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {selectedContact.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {selectedContact.email}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {new Date(selectedContact.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                          <div className="flex gap-2">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              selectedContact.isRead 
                                ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                                : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300'
                            }`}>
                              {selectedContact.isRead ? 'Read' : 'Unread'}
                            </span>
                            {selectedContact.isReplied && (
                              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                Replied
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Subject</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {selectedContact.subject}
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Message</p>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                          {selectedContact.message}
                        </p>
                      </div>
                    </div>

                    {/* Reply Section */}
                    {selectedContact.isReplied && selectedContact.reply && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Reply</p>
                        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                            {selectedContact.reply}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Replied on {new Date(selectedContact.repliedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleReply}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    Reply via Email
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default AdminContacts
