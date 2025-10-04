import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Database, Cloud, Wrench, Layers, Zap, Rocket, FolderOpen, Award, Eye, X } from 'lucide-react'
import { skillsData, getCategorizedSkills, categoryOrder } from '../data/skillsData'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import InteractiveSkillCards from '../components/Skills/InteractiveSkillCards'
import '../components/Skills/SkillCards.css'

const Skills = () => {
  // Use frontend data instead of backend
  const skills = getCategorizedSkills() // Get categorized skills object
  const loading = false // No loading needed for frontend data
  
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [certificationsRef, certificationsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  // Certifications state
  const [showAllCertifications, setShowAllCertifications] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)

  // Remove loading state since we're using frontend data

  const categoryIcons = {
    'Frontend': Code,
    'Backend': Database,
    'Database': Database,
    'DevOps/Cloud': Cloud,
    'Tools': Wrench,
    'Languages': Layers,
    'Other': Zap
  }

  // Use imported categoryOrder from skillsData
  
  const categoryDescriptions = {
    'Frontend': 'User interface and client-side technologies',
    'Backend': 'Server-side development and APIs',
    'Database': 'Data storage and management systems',
    'DevOps/Cloud': 'Deployment, infrastructure, and cloud services',
    'Tools': 'Development tools and utilities',
    'Languages': 'Programming and markup languages',
    'Other': 'Additional technologies and frameworks'
  }

  const proficiencyColors = {
    'Beginner': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
    'Advanced': 'bg-green-100 text-green-800 border-green-200',
    'Expert': 'bg-purple-100 text-purple-800 border-purple-200'
  }

  const proficiencyLevels = {
    'Beginner': 25,
    'Intermediate': 50,
    'Advanced': 75,
    'Expert': 100
  }

  // Sample certifications data (replace with your actual certificates)
  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024',
      image: '/images/cert-aws.jpg', // Add your certificate images here
      description: 'Validates expertise in designing distributed systems on AWS'
    },
    {
      id: 2,
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023',
      image: '/images/cert-react.jpg',
      description: 'Demonstrates proficiency in React development and best practices'
    },
    {
      id: 3,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2023',
      image: '/images/cert-fullstack.jpg',
      description: 'Comprehensive certification covering full-stack development'
    },
    {
      id: 4,
      title: 'JavaScript Algorithms and Data Structures',
      issuer: 'freeCodeCamp',
      date: '2022',
      image: '/images/cert-javascript.jpg',
      description: 'Advanced JavaScript programming and algorithmic thinking'
    },
    {
      id: 5,
      title: 'Node.js Application Development',
      issuer: 'IBM',
      date: '2023',
      image: '/images/cert-nodejs.jpg',
      description: 'Server-side JavaScript development with Node.js'
    },
    {
      id: 6,
      title: 'MongoDB Developer Certification',
      issuer: 'MongoDB University',
      date: '2023',
      image: '/images/cert-mongodb.jpg',
      description: 'Database design and development with MongoDB'
    }
  ]

  const displayedCertifications = showAllCertifications ? certifications : certifications.slice(0, 3)

  return (
    <>
      <Helmet>
        <title>Skills - Naman Kumar Singh</title>
        <meta name="description" content="Explore my technical skills and expertise in web development, including frontend, backend, and modern technologies." />
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
              My <span className="text-gradient">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive overview of my technical expertise and the technologies I work with to build modern web applications
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-max section-padding">
          {Object.keys(skills).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🛠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Skills Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-300">I'm currently updating my skills section. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div
              ref={skillsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <InteractiveSkillCards skills={skills} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Skills Overview */}
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
              What I Bring to the Table
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My approach to development and the value I provide to projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Technologies',
                description: 'I stay current with the latest frameworks and tools to build cutting-edge applications',
                icon: '🚀',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                title: 'Best Practices',
                description: 'I follow industry standards and best practices for clean, maintainable code',
                icon: '✨',
                color: 'bg-green-100 text-green-600'
              },
              {
                title: 'Performance Focus',
                description: 'I optimize applications for speed, scalability, and excellent user experience',
                icon: '⚡',
                color: 'bg-yellow-100 text-yellow-600'
              },
              {
                title: 'Problem Solving',
                description: 'I approach challenges analytically and find efficient solutions to complex problems',
                icon: '🧩',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                title: 'Continuous Learning',
                description: 'I constantly expand my skillset and adapt to new technologies and methodologies',
                icon: '📚',
                color: 'bg-indigo-100 text-indigo-600'
              },
              {
                title: 'Quality Assurance',
                description: 'I write tests and ensure code quality through thorough testing and code reviews',
                icon: '🔍',
                color: 'bg-red-100 text-red-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-large transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${item.color} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-max section-padding">
          <motion.div
            ref={certificationsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={certificationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={certificationsInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Certifications
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={certificationsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Professional certifications that validate my expertise and commitment to continuous learning
            </motion.p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <AnimatePresence mode="wait">
              {displayedCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  animate={certificationsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  exit={{ opacity: 0, y: -50, rotateX: 15 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="group cursor-pointer h-full perspective-1000"
                  onClick={() => setSelectedCertificate(cert)}
                  whileHover={{ y: -8, rotateX: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-600 overflow-hidden transition-all duration-500 h-full flex flex-col backdrop-blur-sm">
                    {/* Certificate Image Container - Fixed Height */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 h-48 sm:h-52 lg:h-48">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                        onError={(e) => {
                          // Hide the broken image and show CSS-based placeholder
                          e.target.style.display = 'none'
                          const placeholder = e.target.nextElementSibling
                          if (placeholder && placeholder.classList.contains('cert-placeholder')) {
                            placeholder.style.display = 'flex'
                          }
                        }}
                      />
                      
                      {/* CSS-based Theme-Reactive Placeholder */}
                      <div className="cert-placeholder absolute inset-0 hidden items-center justify-center bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
                            <Award className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Certificate</p>
                        </div>
                      </div>
                      
                      {/* Animated Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Floating View Icon */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      >
                        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full p-4 shadow-2xl border border-white/20 dark:border-gray-600/20">
                          <Eye className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </motion.div>

                      {/* Animated Date Badge */}
                      <motion.div 
                        className="absolute top-4 right-4"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <span className="bg-gradient-to-r from-primary-600 to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-white/20">
                          {cert.date}
                        </span>
                      </motion.div>
                    </div>

                    {/* Certificate Info - Fixed Height with Better Dark Theme */}
                    <div className="p-6 flex-1 flex flex-col justify-between min-h-[160px] bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/50">
                      <div className="flex-1">
                        <motion.h3 
                          className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 leading-tight"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {cert.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-primary-600 dark:text-primary-400 font-semibold mb-3 text-sm sm:text-base"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          {cert.issuer}
                        </motion.p>
                        
                        <motion.p 
                          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                        >
                          {cert.description}
                        </motion.p>
                      </div>

                      {/* Animated Click Indicator */}
                      <motion.div 
                        className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-all duration-300">
                          <span className="mr-2">Click to view</span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                          >
                            <Eye className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* View More Button */}
          {certifications.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={certificationsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <button
                onClick={() => setShowAllCertifications(!showAllCertifications)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {showAllCertifications ? (
                  <>
                    <span>Show Less</span>
                    <motion.div
                      animate={{ rotate: showAllCertifications ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-3"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <span>View All Certifications ({certifications.length})</span>
                    <Eye className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform duration-200" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Certificate Modal - Properly Sized */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-3xl backdrop-saturate-150 flex items-center justify-center z-50 p-2"
            style={{ backdropFilter: 'blur(24px) saturate(150%)' }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Compact */}
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm sm:text-base">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors duration-200 group"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                </motion.button>
              </motion.div>

              {/* Modal Content - Fit to Screen */}
              <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(85vh-80px)]">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 min-h-[300px] flex items-center justify-center">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-full max-h-[70vh] object-cover"
                      onError={(e) => {
                        // Hide the broken image and show CSS-based placeholder
                        e.target.style.display = 'none'
                        const container = e.target.parentElement
                        const placeholder = container.querySelector('.modal-placeholder')
                        if (placeholder) {
                          placeholder.style.display = 'flex'
                        }
                      }}
                    />
                    
                    {/* CSS-based Theme-Reactive Modal Placeholder */}
                    <div className="modal-placeholder absolute inset-0 hidden items-center justify-center transition-colors duration-300">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center transition-colors duration-300">
                          <Award className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">Certificate Preview</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Image not available</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learning Journey */}
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
              My Learning Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              How I've developed my skills and continue to grow as a developer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  phase: 'Foundation',
                  description: 'Started with HTML, CSS, and JavaScript fundamentals',
                  technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git'],
                  color: 'bg-blue-500'
                },
                {
                  phase: 'Frontend Mastery',
                  description: 'Mastered modern frontend frameworks and tools',
                  technologies: ['React', 'Vue.js', 'Tailwind CSS', 'Webpack'],
                  color: 'bg-green-500'
                },
                {
                  phase: 'Backend Development',
                  description: 'Expanded into server-side development and databases',
                  technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
                  color: 'bg-purple-500'
                },
                {
                  phase: 'Full-Stack & DevOps',
                  description: 'Integrated full-stack development with deployment and DevOps',
                  technologies: ['AWS', 'Render', 'Vercel', 'Microservices'],
                  color: 'bg-orange-500'
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="card p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className={`w-4 h-4 rounded-full ${phase.color} mr-3`} />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {phase.phase}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-6 flex-1 leading-relaxed">
                      {phase.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {phase.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Let's Build Something Great
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Ready to leverage my skills for your next project? I'm excited to bring my expertise to your team and help create amazing solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Start a Project
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
              >
                <FolderOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                See My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Skills
