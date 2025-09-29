import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, MessageCircle, FolderOpen } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useInView } from 'react-intersection-observer'
import { formatDateRange } from '../utils'
import { getCompanyLogo } from '../utils/companyLogos'
import { LoadingPage } from '../components/UI/Loading'

const Experience = () => {
  const { experiences, loading } = useData()
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true })

  if (loading) {
    return <LoadingPage message="Loading experience..." />
  }

  return (
    <>
      <Helmet>
        <title>Experience - Naman Kumar Singh</title>
        <meta name="description" content="Explore my professional experience and career journey in web development and software engineering." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-max section-padding">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              My <span className="text-gradient">Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A journey through my professional career, showcasing the roles and projects that have shaped my expertise in web development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          {experiences.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Experience Coming Soon</h3>
              <p className="text-gray-600 dark:text-gray-300">I'm currently building my professional experience. Check back soon!</p>
            </motion.div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <motion.div
                ref={timelineRef}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Blue Timeline Line - Desktop Horizontal */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 transform -translate-x-1/2 rounded-full" />
                
                {/* Blue Timeline Line - Mobile/Tablet Vertical */}
                <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />

                {/* Experience Items */}
                <div className="space-y-16 lg:space-y-24">
                  {experiences
                    .sort((a, b) => {
                      // Helper function to extract year from date string
                      const extractYear = (dateStr) => {
                        if (!dateStr || dateStr === 'Present') return new Date().getFullYear()
                        
                        // Extract 4-digit year from string
                        const yearMatch = dateStr.match(/(\d{4})/)
                        return yearMatch ? parseInt(yearMatch[1]) : 0
                      }
                      
                      // Helper function to extract month number (for same year sorting)
                      const extractMonth = (dateStr) => {
                        if (!dateStr || dateStr === 'Present') return 12
                        
                        const monthMap = {
                          'jan': 1, 'january': 1, 'feb': 2, 'february': 2,
                          'mar': 3, 'march': 3, 'apr': 4, 'april': 4,
                          'may': 5, 'jun': 6, 'june': 6, 'jul': 7, 'july': 7,
                          'aug': 8, 'august': 8, 'sep': 9, 'september': 9,
                          'oct': 10, 'october': 10, 'nov': 11, 'november': 11,
                          'dec': 12, 'december': 12
                        }
                        
                        const lowerDate = dateStr.toLowerCase()
                        for (const [month, num] of Object.entries(monthMap)) {
                          if (lowerDate.includes(month)) return num
                        }
                        return 1 // Default to January if no month found
                      }
                      
                      // Sort by end date first (most recent experience on top)
                      const aEndYear = extractYear(a.endDate)
                      const bEndYear = extractYear(b.endDate)
                      
                      if (aEndYear !== bEndYear) {
                        return bEndYear - aEndYear // Most recent end year first
                      }
                      
                      // If same end year, sort by end month
                      const aEndMonth = extractMonth(a.endDate)
                      const bEndMonth = extractMonth(b.endDate)
                      
                      if (aEndMonth !== bEndMonth) {
                        return bEndMonth - aEndMonth
                      }
                      
                      // If same end date, sort by start date (most recent start first)
                      const aStartYear = extractYear(a.startDate)
                      const bStartYear = extractYear(b.startDate)
                      
                      if (aStartYear !== bStartYear) {
                        return bStartYear - aStartYear
                      }
                      
                      // If same start year, sort by start month
                      const aStartMonth = extractMonth(a.startDate)
                      const bStartMonth = extractMonth(b.startDate)
                      
                      return bStartMonth - aStartMonth
                    })
                    .map((experience, index) => (
                    <motion.div
                      key={experience._id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`relative ${
                        // Desktop: Alternating sides, Mobile/Tablet: All left
                        index % 2 === 0 
                          ? 'lg:flex-row lg:text-right' 
                          : 'lg:flex-row-reverse lg:text-left'
                      }`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 lg:left-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg lg:transform lg:-translate-x-1/2 z-10">
                        <div className="absolute inset-1 bg-primary-400 rounded-full animate-pulse" />
                      </div>

                      {/* Content Container */}
                      <div className={`lg:flex lg:items-center lg:w-full ${
                        index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'
                      }`}>
                        {/* Experience Card */}
                        <div className={`ml-16 lg:ml-0 lg:w-5/12 ${
                          index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                        }`}>
                          <div className="card p-6 hover:shadow-large transition-all duration-300 group">
                            {/* Company Logo and Header */}
                            <div className="flex items-start space-x-4 mb-4">
                              <div className="flex-shrink-0">
                                <img
                                  src={getCompanyLogo(experience.company)}
                                  alt={experience.company}
                                  className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-primary-400 transition-colors duration-300"
                                  onError={(e) => {
                                    e.target.src = '/images/company-placeholder.jpg'
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                  {experience.company}
                                </h3>
                                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                                  {experience.position}
                                </p>
                                <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span>{experience.startDate} - {experience.endDate || 'Present'}</span>
                                  </div>
                                  {experience.location && (
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                      <span>{experience.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            {experience.description && (
                              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                                {experience.description}
                              </p>
                            )}

                            {/* Technologies */}
                            {experience.technologies && experience.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {experience.technologies.length > 4 && (
                                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">
                                    +{experience.technologies.length - 4} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Summary */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Core Competencies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Skills and expertise developed through professional experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Full-Stack Development',
                description: 'End-to-end web application development using modern technologies',
                icon: '🚀'
              },
              {
                title: 'System Architecture',
                description: 'Designing scalable and maintainable software architectures',
                icon: '🏗️'
              },
              {
                title: 'Performance Optimization',
                description: 'Improving application performance and user experience',
                icon: '⚡'
              },
              {
                title: 'Team Collaboration',
                description: 'Working effectively in cross-functional development teams',
                icon: '🤝'
              },
              {
                title: 'Problem Solving',
                description: 'Analyzing complex problems and implementing effective solutions',
                icon: '🧩'
              },
              {
                title: 'Continuous Learning',
                description: 'Staying updated with latest technologies and best practices',
                icon: '📚'
              }
            ].map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-large transition-all duration-300"
              >
                <div className="text-4xl mb-4">{competency.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {competency.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {competency.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and exciting projects. 
              Let's connect and see how we can collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Get In Touch
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <FolderOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Experience
