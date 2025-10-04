import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, MessageCircle, FolderOpen } from 'lucide-react'
import { experienceData, getCompanyLogo, formatExperienceDate } from '../data/experienceData'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect, useRef } from 'react'

const Experience = () => {
  // Use frontend data instead of backend
  const experiences = experienceData
  const loading = false // No loading needed for frontend data
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [timelineRef, timelineInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [expandedTech, setExpandedTech] = useState({})
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const timelineContainerRef = useRef(null)

  // Function to normalize text spacing
  const normalizeText = (text) => {
    return text?.replace(/\s+/g, ' ').trim()
  }

  // Function to toggle technology expansion
  const toggleTechExpansion = (experienceId) => {
    setExpandedTech(prev => ({
      ...prev,
      [experienceId]: !prev[experienceId]
    }))
  }

  // Mobile detection for text spacing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Scroll progress tracking for timeline animation
  useEffect(() => {
    let animationFrameId = null
    
    const handleScroll = () => {
      // Cancel previous frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const timelineElement = timelineContainerRef.current
        if (!timelineElement) {
          setScrollProgress(0)
          return
        }

        const rect = timelineElement.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementHeight = rect.height
        
        let progress = 0
        
        // Check if timeline is in viewport
        if (rect.bottom > 0 && rect.top < windowHeight) {
          // Timeline is visible
          if (rect.top <= 0) {
            // Timeline has started scrolling past the top
            const scrolledPastTop = Math.abs(rect.top)
            const maxScrollDistance = elementHeight - windowHeight
            
            if (maxScrollDistance > 0) {
              progress = Math.min(1, scrolledPastTop / maxScrollDistance)
            } else {
              // Timeline is shorter than viewport
              progress = scrolledPastTop > 0 ? 1 : 0
            }
          } else {
            // Timeline is entering from bottom
            const entryProgress = (windowHeight - rect.top) / windowHeight
            progress = Math.max(0, Math.min(0.2, entryProgress * 0.2))
          }
        } else if (rect.top >= windowHeight) {
          // Timeline is below viewport - no progress
          progress = 0
        } else if (rect.bottom <= 0) {
          // Timeline has completely scrolled past - keep at 100%
          progress = 1
        }
        
        // Clamp between 0 and 1
        progress = Math.max(0, Math.min(1, progress))
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Remove loading state since we're using frontend data

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
                ref={(el) => {
                  timelineRef(el)
                  timelineContainerRef.current = el
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Scroll-Based Bright Light Timeline - Hidden on Mobile */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
                  {/* Base timeline - subtle background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full opacity-20" />
                  
                  {/* Starting dot at the beginning of timeline */}
                  {scrollProgress > 0.02 && (
                    <div
                      className="absolute w-3 h-3 -left-1 top-0 rounded-full z-20"
                      style={{
                        background: 'radial-gradient(circle, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)',
                        boxShadow: `
                          0 0 10px rgba(59, 130, 246, 0.8),
                          0 0 20px rgba(59, 130, 246, 0.5),
                          0 0 30px rgba(59, 130, 246, 0.3)
                        `,
                        transition: 'all 0.3s ease-out'
                      }}
                    />
                  )}
                  
                  {/* Scroll-based bright blue light line */}
                  <div
                    className="absolute left-0 top-0 w-full rounded-full z-10"
                    style={{
                      height: `${scrollProgress * 100}%`,
                      background: scrollProgress > 0.01 ? 'linear-gradient(to bottom, #60a5fa, #3b82f6, #2563eb, #1d4ed8)' : 'transparent',
                      boxShadow: scrollProgress > 0.01 ? `
                        0 0 20px rgba(59, 130, 246, 0.8),
                        0 0 40px rgba(59, 130, 246, 0.6),
                        0 0 60px rgba(59, 130, 246, 0.4),
                        0 0 80px rgba(59, 130, 246, 0.2)
                      ` : 'none',
                      transition: 'all 0.1s ease-out'
                    }}
                  />
                </div>

                {/* Experience Items */}
                <div className="space-y-8 sm:space-y-12 lg:space-y-24 px-4 lg:px-0">
                  {experiences
                    .sort((a, b) => {
                      // Sort by current position first, then by start date (most recent first)
                      if (a.current && !b.current) return -1
                      if (!a.current && b.current) return 1
                      
                      // Both current or both not current - sort by start date
                      const aDate = new Date(a.startDate)
                      const bDate = new Date(b.startDate)
                      return bDate - aDate // Most recent start date first
                    })
                    .map((experience, index) => (
                    <motion.div
                      key={experience._id}
                      initial={{ opacity: 0, y: 100, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      className="relative"
                    >
                      {/* Enhanced Timeline Dot - Hidden on Mobile */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.2 + 0.3,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="hidden lg:block absolute top-12 z-20"
                        style={{ left: '49%', transform: 'translateX(-50%)' }}
                      >
                        <div className="relative">
                          {/* Outer glow ring */}
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 w-8 h-8 -m-1 bg-primary-400 rounded-full opacity-20" 
                          />
                          
                          {/* Main dot */}
                          <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-4 border-white dark:border-gray-900 shadow-xl relative overflow-hidden">
                            {/* Inner shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                          </div>
                          
                          {/* Ripple effect */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0.6 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              delay: index * 0.8,
                              ease: "easeOut"
                            }}
                            className="absolute inset-0 w-6 h-6 bg-primary-400 rounded-full"
                          />
                        </div>
                      </motion.div>

                      {/* Content Container */}
                      <div className="relative">
                        {/* Experience Card */}
                        <motion.div
                          whileHover={{ 
                            scale: 1.02,
                            y: -5,
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className={`w-full max-w-none sm:max-w-2xl mx-auto px-2 sm:px-0 ${
                            index % 2 === 0 
                              ? 'lg:ml-0 lg:mr-auto lg:max-w-lg' 
                              : 'lg:mr-0 lg:ml-auto lg:max-w-lg'
                          }`}
                        >
                          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100 dark:border-gray-700">
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ padding: '2px' }}>
                              <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-800"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="relative p-4 sm:p-5 lg:p-8">
                              {/* Header Section */}
                              <div className="mb-3 sm:mb-4">
                                {/* Company Name and Position */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                  <div className="flex-1 min-w-0 sm:pr-4">
                                    <motion.h3 
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 + 0.2 }}
                                      className="text-2xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 leading-tight"
                                    >
                                      {experience.company}
                                    </motion.h3>
                                    
                                    <motion.p 
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 + 0.3 }}
                                      className="text-lg sm:text-lg lg:text-base xl:text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2 sm:mb-3 leading-snug"
                                    >
                                      {experience.position}
                                    </motion.p>
                                  </div>
                                  
                                  {/* Logo - Desktop Only */}
                                  <motion.div 
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="hidden sm:flex flex-shrink-0 self-start"
                                  >
                                    <div className="relative">
                                      <img
                                        src={getCompanyLogo(experience.company)}
                                        alt={experience.company}
                                        className="w-24 h-10 lg:w-32 lg:h-12 rounded object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-primary-400 transition-all duration-500 shadow-md group-hover:shadow-lg"
                                        onError={(e) => {
                                          e.target.src = '/images/company-placeholder.jpg'
                                        }}
                                      />
                                      {/* Logo glow effect */}
                                      <div className="absolute inset-0 rounded bg-primary-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                  </motion.div>
                                </div>
                                
                                {/* Date/Location and Logo - Mobile Inline */}
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 + 0.4 }}
                                  className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-300"
                                >
                                  {/* Duration Row with Logo - Mobile */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" />
                                      <span className="font-medium text-sm sm:text-sm">{formatExperienceDate(experience.startDate, experience.endDate, experience.current)}</span>
                                    </div>
                                    
                                    {/* Logo - Mobile Inline with Duration */}
                                    <motion.div 
                                      whileHover={{ scale: 1.05 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                      className="sm:hidden flex-shrink-0 ml-3"
                                    >
                                      <div className="relative">
                                        <img
                                          src={getCompanyLogo(experience.company)}
                                          alt={experience.company}
                                          className="w-16 h-6 rounded object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
                                          onError={(e) => {
                                            e.target.src = '/images/company-placeholder.jpg'
                                          }}
                                        />
                                      </div>
                                    </motion.div>
                                  </div>
                                  
                                  {/* Location Row - Mobile */}
                                  {experience.location && (
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-primary-500" />
                                      <span className="font-medium text-sm sm:text-sm">{experience.location}</span>
                                    </div>
                                  )}
                                </motion.div>
                              </div>

                              {/* Description */}
                              {experience.description && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 + 0.5 }}
                                >
                                  <p className={`text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 text-base sm:text-base leading-relaxed hyphens-auto ${
                                       isMobile ? 'text-left' : 'text-justify'
                                     }`}
                                     style={{ 
                                       wordSpacing: isMobile ? '-0.08em' : 'normal', 
                                       letterSpacing: isMobile ? '0.003em' : '0.01em',
                                       lineHeight: isMobile ? '1.4' : '1.625',
                                       textRendering: 'optimizeLegibility',
                                       WebkitFontSmoothing: 'antialiased'
                                     }}>
                                    {normalizeText(experience.description)}
                                  </p>
                                </motion.div>
                              )}

                              {/* Technologies */}
                              {experience.technologies && experience.technologies.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 + 0.6 }}
                                  className="space-y-2 sm:space-y-3"
                                >
                                  <h4 className="text-sm sm:text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Technologies Used</h4>
                                  <div className="flex flex-wrap gap-2 sm:gap-3">
                                    <AnimatePresence mode="popLayout">
                                      {(expandedTech[experience._id] 
                                        ? experience.technologies 
                                        : experience.technologies.slice(0, 6)
                                      ).map((tech, techIndex) => {
                                      // For expanded items beyond the first 6, use faster animation
                                      const isExpandedItem = expandedTech[experience._id] && techIndex >= 6;
                                      const animationDelay = isExpandedItem 
                                        ? 0.1 + (techIndex - 6) * 0.05  // Faster delay for expanded items
                                        : index * 0.1 + 0.7 + techIndex * 0.1;  // Original delay for initial items
                                      
                                      return (
                                        <motion.span
                                          key={tech}
                                          initial={{ opacity: 0, scale: 0 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0 }}
                                          transition={{ 
                                            duration: 0.2,
                                            delay: animationDelay,
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 30
                                          }}
                                          whileHover={{ scale: 1.1, y: -2 }}
                                          className="px-2 py-1 sm:px-3 sm:py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 text-sm sm:text-sm rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-default"
                                        >
                                          {tech}
                                        </motion.span>
                                      );
                                    })}
                                    </AnimatePresence>
                                    {experience.technologies.length > 6 && (
                                      <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 + 1.3 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTechExpansion(experience._id)}
                                        className="px-2 py-1 sm:px-3 sm:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 text-sm sm:text-sm rounded-full font-medium transition-all duration-300 cursor-pointer"
                                      >
                                        {expandedTech[experience._id] 
                                          ? 'Show Less' 
                                          : `+${experience.technologies.length - 6} more`
                                        }
                                      </motion.button>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
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
