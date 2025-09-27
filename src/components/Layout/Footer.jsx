import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, Heart, Home, User, FolderOpen, Briefcase, Code, MessageCircle } from 'lucide-react'
import { useData } from '../../contexts/DataContext'

const Footer = () => {
  const { about } = useData()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: about?.socialLinks?.github,
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: about?.socialLinks?.linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: about?.socialLinks?.twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${about?.email || 'contact@namanportfolio.com'}`,
      color: 'hover:text-red-500'
    }
  ]

  const quickLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: FolderOpen },
    { name: 'Experience', path: '/experience', icon: Briefcase },
    { name: 'Skills', path: '/skills', icon: Code },
    { name: 'Contact', path: '/contact', icon: MessageCircle }
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="/images/naman-logo.png"
                alt="Naman Kumar Singh"
                className="h-14 w-auto sm:h-16 md:h-19 object-contain"
              />
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 max-w-md">
              Full-Stack Developer passionate about creating innovative solutions 
              and building amazing user experiences with modern technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-400 hover:text-white hover:bg-primary-600 dark:hover:bg-primary-500 transition-all duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="flex items-center text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Web Development</li>
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>API Development</li>
              <li>Database Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-300 dark:text-gray-400">
              <p>Ready to start your project?</p>
              <Link
                to="/contact"
                className="inline-block bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              {new Date().getFullYear()} Naman Kumar Singh. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
