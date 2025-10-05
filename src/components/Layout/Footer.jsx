import { Link } from 'react-router-dom'
import { Github, Linkedin, Instagram, Mail, Heart, Home, User, FolderOpen, Briefcase, Code, MessageCircle } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/singhnaman320',
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/namankumarsingh-dev/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/im_singhnaman/?next=%2F&hl=en',
      color: 'hover:text-pink-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:singhnaman320@gmail.com',
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
                src="/images/naman-logo.gif"
                alt="Naman Kumar Singh"
                className="h-20 w-auto sm:h-20 md:h-24 object-contain rounded-lg"
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
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-400 hover:text-white hover:bg-orange-600 dark:hover:bg-orange-500 transition-all duration-200"
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
                      onClick={() => {
                        // Scroll to top when navigating to a new page
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }, 100)
                      }}
                      className="flex items-center text-gray-300 dark:text-gray-400 hover:text-white hover:text-orange-400 transition-colors duration-200 group"
                    >
                      <Icon className="w-4 h-4 mr-2 group-hover:text-orange-400 transition-colors duration-200" />
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
              {/* <li>Database Design</li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-300 dark:text-gray-400">
              <p>Ready to start your project?</p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  onClick={() => {
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }, 100)
                  }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 dark:from-orange-500 dark:to-amber-500 dark:hover:from-orange-600 dark:hover:to-amber-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Contact Me
                  <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </Link>
                {/* <p className="text-sm text-gray-400 dark:text-gray-500">Let's discuss your next project!</p> */}
              </div>
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
