import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X,
  Home, 
  User, 
  FolderOpen, 
  Briefcase, 
  Code, 
  Mail, 
  MessageCircle,
  LogOut,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { cn } from '../../utils'
import ThemeToggle from '../UI/ThemeToggle'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin, logout } = useAuth()
  const { toggleTheme } = useTheme()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Home Page', href: '/admin/home', icon: User },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Skills', href: '/admin/skills', icon: Code },
    { name: 'Contacts', href: '/admin/contacts', icon: MessageCircle }
  ]

  const isActiveLink = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link 
              to="/" 
              className="text-xl font-bold text-gradient focus:outline-none focus:ring-0 hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              Portfolio Admin
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group',
                    isActiveLink(item.href)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:translate-x-1'
                  )}
                >
                  <Icon className={cn(
                    'w-5 h-5 mr-3 transition-transform duration-200',
                    isActiveLink(item.href) ? 'text-white' : 'group-hover:scale-110'
                  )} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info and actions */}
          <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 dark:text-primary-400 font-semibold">
                  {admin?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {admin?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {admin?.email || 'admin@example.com'}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div 
                onClick={toggleTheme}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  <ThemeToggle className="!p-0 !bg-transparent !shadow-none hover:!bg-transparent dark:hover:!bg-transparent !transition-none pointer-events-none" />
                </div>
                <span>Toggle Theme</span>
              </div>
              
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ExternalLink className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                View Portfolio
              </Link>
              
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {admin?.name || 'Admin'}!
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
